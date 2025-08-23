using Amazon.BedrockRuntime;
using Amazon.BedrockRuntime.Model;
using GlossaAPI.Features.FlashCards.Models;
using GlossaAPI.Features.FlashCards.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using MongoDB.Driver;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Net; // for WebUtility.HtmlDecode
using static System.Net.WebRequestMethods;

[ApiController]
[Route("api/chat")]
public class ChatController : ControllerBase
{
  private readonly IAmazonBedrockRuntime _bedrock;
  private readonly FlashCardHandler<Conversation> _convos;
  private readonly FlashCardHandler<User> _users;
  private readonly IUserContextService _userCtx;
  private readonly string _googleApiKey;
  private readonly string _googleEndpoint;
  private readonly HttpClient _http;

  public ChatController(
    IAmazonBedrockRuntime bedrock,
    FlashCardHandler<Conversation> convos,
    FlashCardHandler<User> users,
    IUserContextService userCtx,
    IConfiguration config,
    IHttpClientFactory httpFactory)
  {
    _bedrock = bedrock;
    _convos = convos;
    _users = users;
    _userCtx = userCtx;

    _googleApiKey = config["GoogleTranslate:ApiKey"] ?? throw new Exception("Google API key missing");
    _googleEndpoint = config["GoogleTranslate:Endpoint"] ?? "https://translation.googleapis.com/language/translate/v2";
    _http = httpFactory.CreateClient();
  }

  public class TranslateRequest
  {
    public string Text { get; set; } = "";
    public string Source { get; set; } = "es";
    public string Target { get; set; } = "en";
  }

  [HttpPost("translate")]
  public async Task<IActionResult> Translate([FromBody] TranslateRequest req)
  {
    if (string.IsNullOrWhiteSpace(req?.Text))
      return BadRequest("text is required");

    var url = $"{_googleEndpoint}?key={_googleApiKey}";
    var payload = new
    {
      q = req.Text,             // single string; array also supported if you want batch
      source = req.Source,
      target = req.Target,
      format = "text"
    };

    using var resp = await _http.PostAsJsonAsync(url, payload);
    var body = await resp.Content.ReadAsStringAsync();
    if (!resp.IsSuccessStatusCode)
      return StatusCode((int)resp.StatusCode, body);

    using var doc = JsonDocument.Parse(body);
    var translations = doc.RootElement
        .GetProperty("data")
        .GetProperty("translations");

    // Google returns an array; we’ll take the first item and HTML-decode it.
    var raw = translations[0].GetProperty("translatedText").GetString() ?? string.Empty;

    // Decode HTML entities (some responses are double-encoded, so decode twice if needed).
    string Decoded(string s)
    {
      var once = WebUtility.HtmlDecode(s);
      return once == s ? s : WebUtility.HtmlDecode(once);
    }

    var decoded = Decoded(raw);
    return Ok(new { translatedText = decoded });
  }


  public class ChatMessageRequest { public string Message { get; set; } = ""; }

  [HttpPost]
  public async Task<IActionResult> Send([FromBody] ChatMessageRequest req)
  {
    if (string.IsNullOrWhiteSpace(req?.Message))
      return BadRequest("message is required");

    // 1) Resolve user from server-side context (no IDs from client)
    var username = _userCtx.Username;

    // 2) Load user and their active conversation id (create if missing)
    var user = await _users.FindByFieldAsync("Username", username);
    if (user == null) return BadRequest("user not found");

    Conversation convo;
    if (string.IsNullOrWhiteSpace(GetUserConversationId(user)))
    {
      convo = new Conversation { UserId = username };
      await _convos.CreateAsync(convo);

      // Set the user's active ConversationId if empty
      var filter = Builders<User>.Filter.Eq("Username", username) &
                   (Builders<User>.Filter.Or(
                      Builders<User>.Filter.Exists("ConversationId", false),
                      Builders<User>.Filter.Eq("ConversationId", "")));
      var update = Builders<User>.Update.Set("ConversationId", convo.Id);
      await _users.UpdateOneAsync(filter, update);
    }
    else
    {
      var convoId = GetUserConversationId(user)!;
      convo = await _convos.GetByIdAsync(convoId)
              ?? new Conversation { UserId = username, Id = convoId }; // fallback create if needed
    }

    // 3) Append user message
    convo.Messages.Add(new ChatMessage { Role = "user", Text = req.Message });
    convo.TurnCount += 1;

    // 4) Summarize every 10 user messages and trim history
    const int SUMMARIZE_EVERY = 10;
    const int KEEP_LAST_MSGS = 12;

    if (convo.TurnCount % SUMMARIZE_EVERY == 0 && convo.Messages.Count > KEEP_LAST_MSGS)
    {
      var toSummarize = convo.Messages.Take(convo.Messages.Count - KEEP_LAST_MSGS).ToList();
      var summaryPrompt = BuildSummaryPrompt(convo.Summary ?? "", toSummarize);
      var newSummary = await InvokeLlama(summaryPrompt, 220);

      convo.Summary = string.IsNullOrWhiteSpace(convo.Summary)
        ? newSummary
        : $"{convo.Summary}\n{newSummary}";

      // Keep only the recent messages
      convo.Messages = convo.Messages.Skip(convo.Messages.Count - KEEP_LAST_MSGS).ToList();
    }

    // 5) Sophia’s behavior (system instruction)
    var system = @"You are Sophia, a friendly Spanish tutor.
      Debes hablar únicamente en español en todo momento.
      Si el usuario escribe en inglés, corrígelo en español y muéstrale cómo decirlo en español.
      Mantén un tono cálido y conversacional. Sé breve al corregir y ofrece ejemplos.
      Haz preguntas abiertas para continuar la conversación.";

    var prompt = BuildTutorPrompt(system, convo.Summary, convo.Messages);

    // 6) Invoke Bedrock (Llama 3)
    var reply = await InvokeLlama(prompt, 300);

    // 7) Append assistant reply and persist
    convo.Messages.Add(new ChatMessage { Role = "assistant", Text = reply });
    await _convos.UpdateAsync(convo.Id, convo);

    return Ok(new { reply });
  }

  // ---- helpers ----

  // Handles string vs array schema; adjust if your User model is strictly one or the other
  private static string? GetUserConversationId(User user)
  {
    // If your schema is a single string property:
    var single = user.GetType().GetProperty("ConversationId")?.GetValue(user) as string;
    if (!string.IsNullOrWhiteSpace(single)) return single;

    // If your schema is an array (e.g., string[] or List<string>) and you kept it:
    var arrProp = user.GetType().GetProperty("ConversationId")?.GetValue(user);
    if (arrProp is IEnumerable<string> arr && arr.Any()) return arr.First();

    return null;
  }

  private async Task<string> InvokeLlama(string prompt, int maxGenLen,
                                         double temperature = 0.7, double topP = 0.9)
  {
    var body = new { prompt, max_gen_len = maxGenLen, temperature, top_p = topP };
    var req = new InvokeModelRequest
    {
      ModelId = "meta.llama3-8b-instruct-v1:0",
      ContentType = "application/json",
      Accept = "application/json",
      Body = new MemoryStream(Encoding.UTF8.GetBytes(JsonSerializer.Serialize(body)))
    };

    var resp = await _bedrock.InvokeModelAsync(req);
    using var reader = new StreamReader(resp.Body);
    var json = await reader.ReadToEndAsync();
    using var doc = JsonDocument.Parse(json);
    return doc.RootElement.GetProperty("generation").GetString() ?? "";
  }

  private static string BuildTutorPrompt(string system, string? summary, IEnumerable<ChatMessage> history)
  {
    var sb = new StringBuilder();
    sb.Append("<|begin_of_text|>");

    sb.Append("<|start_header_id|>user<|end_header_id|>\n");
    sb.Append(system).Append("\n");
    if (!string.IsNullOrWhiteSpace(summary))
      sb.Append("\nContexto resumido: ").Append(summary.Trim()).Append("\n");
    sb.Append("<|eot_id|>");

    foreach (var m in history)
    {
      var header = m.Role == "assistant" ? "assistant" : "user";
      sb.Append("<|start_header_id|>").Append(header).Append("<|end_header_id|>\n");
      sb.Append(m.Text).Append("\n<|eot_id|>");
    }

    sb.Append("<|start_header_id|>assistant<|end_header_id|>\n");
    return sb.ToString();
  }

  private static string BuildSummaryPrompt(string prior, IEnumerable<ChatMessage> msgs)
  {
    var sb = new StringBuilder();
    sb.Append("<|begin_of_text|>");
    sb.Append("<|start_header_id|>user<|end_header_id|>\n");
    sb.Append("Eres Sophia, una tutora de español. Resume la conversación en 5–8 líneas en español, ");
    sb.Append("resaltando: nivel del alumno, errores comunes, vocabulario nuevo, objetivos y sugerencias breves.\n");
    if (!string.IsNullOrWhiteSpace(prior))
      sb.Append("Resumen previo: ").Append(prior).Append("\n");
    sb.Append("\nFragmento a resumir:\n");
    foreach (var m in msgs) sb.Append($"[{m.Role}] {m.Text}\n");
    sb.Append("<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n");
    return sb.ToString();
  }

  // GET /api/chat/history?last=50
  [HttpGet("history")]
  public async Task<IActionResult> GetHistory([FromQuery] int last = 12)
  {
    // 1) Resolve user & their active conversation
    var username = _userCtx.Username;
    var user = await _users.FindByFieldAsync("Username", username);
    if (user == null) return NotFound("user not found");

    var convoId = GetUserConversationId(user);
    if (string.IsNullOrWhiteSpace(convoId))
    {
      // No conversation yet
      return Ok(new
      {
        conversationId = (string?)null,
        summary = (string?)null,
        messages = Array.Empty<ChatMessage>(),
        turnCount = 0
      });
    }

    // 2) Load conversation
    var convo = await _convos.GetByIdAsync(convoId!);
    if (convo == null)
    {
      return Ok(new
      {
        conversationId = convoId,
        summary = (string?)null,
        messages = Array.Empty<ChatMessage>(),
        turnCount = 0
      });
    }

    // 3) Return last N messages (oldest -> newest)
    var msgs = convo.Messages ?? new List<ChatMessage>();
    var take = Math.Max(0, Math.Min(last, msgs.Count));
    var slice = msgs.Skip(Math.Max(0, msgs.Count - take)).ToList();

    return Ok(new
    {
      conversationId = convo.Id,
      summary = convo.Summary,
      messages = slice,     // [{ role, text, ts }]
      turnCount = convo.TurnCount
    });
  }

}
