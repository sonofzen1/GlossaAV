using Amazon.Runtime;
using GlossaAPI.Features.FlashCards.Models;
using GlossaAPI.Features.FlashCards.Models.Requests;
using GlossaAPI.Features.FlashCards.Services;
using GlossaAPI.Mongo;
using HtmlAgilityPack; //Begin imports added evening of May 19th, 2025
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;

namespace GlossaAPI.Features.FlashCards.Controllers
{
  [Route("api/FlashCards")]
  public class FlashCardsController : ControllerBase
  {
    private readonly FlashCardHandler<User> _userContext;
    private readonly FlashCardHandler<Song> _songContext;
    private readonly HttpClient _httpClient;
    private readonly string _geniusAccessToken;
    private readonly IUserContextService _userContextService;
    private readonly string _googleTranslateKey = "AIzaSyB0QOTZdGNH7_3WtPoYios1OX_L37tsfC0";

    public FlashCardsController(FlashCardHandler<User> userContext, IHttpClientFactory httpClientFactory, IUserContextService userContextService, FlashCardHandler<Song> songContext, IConfiguration configuration)
    {
      _userContext = userContext;
      _songContext = songContext;
      _userContextService = userContextService;
      _httpClient = httpClientFactory.CreateClient();
      _httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");
      _geniusAccessToken = configuration["Genius:AccessToken"] ?? throw new InvalidOperationException("Genius Access Token is not configured.");
    }

    [HttpGet("decks")]
    public async Task<IActionResult> GetUserDeckTitles()
    {
      try
      {
        var username = _userContextService.Username;
        var user = await _userContext.FindByFieldAsync("Username", username);

        if (user == null)
          return NotFound("User not found.");

        var deckTitles = user.Decks
            .Select(d => new { d.Title })
            .ToList();

        return Ok(deckTitles);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred: {ex.Message}");
      }
    }

    [HttpGet("decks/{deckTitle}")]
    public async Task<IActionResult> GetDeckFlashcards(string deckTitle)
    {
      try
      {
        var username = _userContextService.Username;
        var user = await _userContext.FindByFieldAsync("Username", username);

        if (user == null)
          return NotFound("User not found.");

        var deck = user.Decks.FirstOrDefault(d => d.Title == deckTitle);

        if (deck == null)
          return NotFound("Deck not found.");

        return Ok(deck.Flashcards);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred: {ex.Message}");
      }
    }

    [HttpGet("songs")]
    public async Task<IActionResult> GetUserSongs()
    {
      try
      {
        var username = _userContextService.Username;

        // Get the user document
        var user = await _userContext.FindByFieldAsync("Username", username);
        if (user == null)
          return NotFound("User not found.");

        if (user.Songs == null || !user.Songs.Any())
          return Ok(new List<Song>()); // No songs saved

        // Assuming you have a songContext (Mongo collection for songs)
        var filter = Builders<Song>.Filter.In(s => s.Id, user.Songs);
        var songs = await _songContext.Find(filter);

        return Ok(songs);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred: {ex.Message}");
      }
    }


    [HttpPost("decks")]
    public async Task<IActionResult> AddDeckToUser([FromBody] Deck newDeck)
    {
      try
      {
        var username = _userContextService.Username;
        var update = Builders<User>.Update.Push(u => u.Decks, newDeck);
        var result = await _userContext.UpdateOneAsync("Username", username, update);

        if (result.MatchedCount == 0)
          return NotFound("User not found.");

        return Ok(new { message = "Deck added successfully." });

      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred: {ex.Message}");
      }
    }

    [HttpPost("decks/{deckTitle}/Flashcards")]
    public async Task<IActionResult> AddFlashcardToDeck(string deckTitle, [FromBody] FlashCard newFlashcard)
    {
      try
      {
        var username = _userContextService.Username;

        var user = await _userContext.FindByFieldAsync("Username", username);
        if (user == null)
          return NotFound("User not found.");

        var deckIndex = user.Decks.FindIndex(d => d.Title == deckTitle);
        if (deckIndex == -1)
          return NotFound("Deck not found.");

        // Manually append flashcard in-memory
        user.Decks[deckIndex].Flashcards.Add(newFlashcard);

        // Save updated user object back to DB
        await _userContext.UpdateAsync(user.Id, user);

        return Ok(new { message = "Flashcard added successfully." });
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred: {ex.Message}");
      }
    }

    [HttpDelete("flashcard")]
    public async Task<IActionResult> DeleteFlashcard(string deckTitle, int index)
    {
      try
      {
        var username = _userContextService.Username;

        // 1) Load user
        var user = await _userContext.FindByFieldAsync("Username", username);
        if (user == null)
          return NotFound("User not found.");

        // 2) Find the deck by title
        var deckIdx = user.Decks.FindIndex(d => d.Title == deckTitle);
        if (deckIdx == -1)
          return NotFound("Deck not found.");

        var deck = user.Decks[deckIdx];

        // 3) Bounds check for index
        if (index < 0 || index >= (deck.Flashcards?.Count ?? 0))
          return BadRequest("Index out of range.");

        // 4) Remove exactly one flashcard at that index
        deck.Flashcards.RemoveAt(index);

        // 5) Persist user doc (consistent with your other endpoints)
        await _userContext.UpdateAsync(user.Id, user);

        return Ok(new { message = "Flashcard deleted.", index });
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred: {ex.Message}");
      }
    }

    [HttpDelete("deck/by-index")]
    public async Task<IActionResult> DeleteDeck([FromQuery] int index)
    {
      try
      {
        var username = _userContextService.Username;

        // 1) Load user
        var user = await _userContext.FindByFieldAsync("Username", username);
        if (user == null)
          return NotFound("User not found.");

        var decks = user.Decks ?? new List<Deck>();
        if (index < 0 || index >= decks.Count)
          return BadRequest("Index out of range.");

        // 2) Remove the deck at index
        decks.RemoveAt(index);

        // 3) Persist the updated user document
        await _userContext.UpdateAsync(user.Id, user);

        return Ok(new { message = "Deck deleted.", index });
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred: {ex.Message}");
      }
    }


    [HttpDelete("songs/{songId:int}")]
    public async Task<IActionResult> RemoveSongById(int songId)
    {
      try
      {
        var username = _userContextService.Username;

        var userFilter = Builders<User>.Filter.Eq(u => u.Username, username);
        var update = Builders<User>.Update.PullFilter(u => u.Songs, s => s == songId);
        var result = await _userContext.UpdateOneAsync(userFilter, update);

        if (result.ModifiedCount == 0)
          return NotFound("Song not found in your library.");

        return Ok(new { message = "Song removed.", songId });
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred: {ex.Message}");
      }
    }


    [HttpPut("deck")]
    public async Task<IActionResult> UpdateDeckTitle(string oldTitle, string newTitle)
    {
      try
      {
        var username = _userContextService.Username;

        var user = await _userContext.FindByFieldAsync("Username", username);
        if (user == null)
          return NotFound("User not found.");

        var deckIndex = user.Decks.FindIndex(d => d.Title == oldTitle);
        if (deckIndex == -1)
          return NotFound("Deck not found.");

        // Update title in memory
        user.Decks[deckIndex].Title = newTitle;

        // Save updated user object back to DB
        await _userContext.UpdateAsync(user.Id, user);

        return Ok(new { message = "Deck title updated successfully." });
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred: {ex.Message}");
      }
    }

    // PUT /api/FlashCards/deck/flashcards/by-index?index=2
    [HttpPut("deck/flashcards/by-index")]
    public async Task<IActionResult> ReplaceDeckFlashcards([FromQuery] int index, [FromBody] List<FlashCard> flashcards)
    {
      try
      {
        var username = _userContextService.Username;

        // Quick existence + bounds check
        var user = await _userContext.FindByFieldAsync("Username", username);
        if (user == null) return NotFound("User not found.");
        if (user.Decks == null || index < 0 || index >= user.Decks.Count)
          return BadRequest("Index out of range.");

        // Atomic update: set Decks.{index}.Flashcards = flashcards
        var filter = Builders<User>.Filter.Eq(u => u.Username, username);
        var path = $"Decks.{index}.Flashcards";
        var update = Builders<User>.Update.Set(path, flashcards ?? new List<FlashCard>());

        var result = await _userContext.UpdateOneAsync(filter, update);
        if (result.ModifiedCount == 0)
          return NotFound("Deck not found or not modified.");

        return Ok(new { message = "Flashcards replaced.", index, count = flashcards?.Count ?? 0 });
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred: {ex.Message}");
      }
    }

    [HttpGet("user/by-username/{username}")]
    public async Task<IActionResult> GetUserByUsername(string username)
    {
      var user = await _userContext.FindByFieldAsync("Username", username); // Ensure case matches DB

      if (user == null)
      {
        return NotFound($"User '{username}' not found.");
      }

      return Ok(user);
    }

    [HttpGet("scrape")]
    public async Task<IActionResult> ScrapeLyrics([FromQuery] string url)
    {
      try
      {
        // Load the HTML from the Genius page
        var html1 = await _httpClient.GetStringAsync(url);
        var doc = new HtmlDocument();
        doc.LoadHtml(html1);

        // Select the meta tag with property="twitter:app:url:iphone"
        var songMeta = doc.DocumentNode
            .SelectSingleNode("//meta[@property='twitter:app:url:iphone']");

        if (songMeta == null)
          return Ok(new ScrapeResponse { Success = false, Message = "Song ID meta tag not found." });

        // Extract the content attribute
        var content = songMeta.GetAttributeValue("content", "");
        if (string.IsNullOrEmpty(content) || !content.Contains("/"))
          return Ok(new ScrapeResponse { Success = false, Message = "Song ID not found in meta tag content." });

        // Parse the Genius song ID
        if (!int.TryParse(content.Split('/').Last(), out int geniusSongId))
          return Ok(new ScrapeResponse { Success = false, Message = "Failed to parse Genius song ID." });

        // Call the Genius API using the extracted song ID
        var apiUrl = $"https://api.genius.com/songs/{geniusSongId.ToString()}?access_token={_geniusAccessToken}";
        var apiResponse = await _httpClient.GetStringAsync(apiUrl);
        var searchJson = JsonDocument.Parse(apiResponse);

        var song = searchJson.RootElement
            .GetProperty("response")
            .GetProperty("song");

        if (song.ValueKind == JsonValueKind.Undefined)
          return NotFound("No song found.");

          var SongId = song.GetProperty("id").GetInt32();

        // 1. Check if song exists in Songs collection
        var existingSong = await _songContext.Find(Builders<Song>.Filter.Eq(s => s.Id, SongId));
        bool songExists = existingSong.Any();

        // 2. Get user info and check if song already in user's Songs array
        var username = _userContextService.Username; // however you get current user
        var userFilter = Builders<User>.Filter.Eq(u => u.Username, username);
        var user = await _userContext.FindByFieldAsync("Username", username);

        if (user == null)
          return Unauthorized("User not found.");

        bool userHasSong = user.Songs?.Contains(geniusSongId) ?? false;

        if (userHasSong)
        {
          // Song already associated with user
          return Ok(new ScrapeResponse { Success = false, Message = "Song already exists in your library." });
        }

        if (!songExists)
        {
          // Song does NOT exist in collection - create new song
          var artist = song.GetProperty("primary_artist").GetProperty("name").GetString() ?? "Unknown Artist";
          var title = song.GetProperty("title").GetString() ?? "Unknown Title";
          var imageUrl = song.GetProperty("song_art_image_url").GetString() ?? "";

          var html = await _httpClient.GetStringAsync(url);
          var htmlDocument = new HtmlDocument();
          htmlDocument.LoadHtml(html);

          var lyricsContainers = htmlDocument.DocumentNode
              .SelectNodes("//div[starts-with(@class, 'Lyrics__Container')]");

          string ExtractTextWithLineBreaks(HtmlNode node)
          {
            if (node.Name.Equals("br", StringComparison.OrdinalIgnoreCase))
              return "\n";

            if (node.NodeType == HtmlNodeType.Text)
              return HttpUtility.HtmlDecode(node.InnerText);

            var sb = new StringBuilder();
            foreach (var child in node.ChildNodes)
              sb.Append(ExtractTextWithLineBreaks(child));

            // After block-level nodes, ensure a newline boundary
            switch (node.Name.ToLowerInvariant())
            {
              case "div":
              case "p":
              case "section":
              case "ul":
              case "ol":
              case "li":
              case "h1":
              case "h2":
              case "h3":
              case "h4":
              case "h5":
              case "h6":
                sb.Append("\n");
                break;
            }
            return sb.ToString();
          }

          // Build full lyrics text
          var lyricsBuilder = new StringBuilder();
          foreach (var container in lyricsContainers)
          {
            lyricsBuilder.Append(ExtractTextWithLineBreaks(container));
            lyricsBuilder.Append("\n");
          }

          var cleanedLyrics = lyricsBuilder.ToString().Trim();

          // Find the first '[' and keep everything from there
          int bracketIndex = cleanedLyrics.IndexOf('[');
          if (bracketIndex >= 0)
          {
            cleanedLyrics = cleanedLyrics.Substring(bracketIndex);
          }

          var spanishLyrics = cleanedLyrics
              .Split(new[] { "\n" }, StringSplitOptions.RemoveEmptyEntries)
              .Select(line => line.Trim())
              .Where(line => !string.IsNullOrWhiteSpace(line))
              .ToList();

          // Translate lyrics
          var rawLyrics = string.Join(" / ", spanishLyrics);
          var translateRequest = new
          {
            q = rawLyrics,
            target = "en",
            source = "es"
          };

          var translateResponse = await _httpClient.PostAsync(
              $"https://translation.googleapis.com/language/translate/v2?key={_googleTranslateKey}",
              new StringContent(JsonSerializer.Serialize(translateRequest), Encoding.UTF8, "application/json")
          );

          translateResponse.EnsureSuccessStatusCode();

          var translateJson = JsonDocument.Parse(await translateResponse.Content.ReadAsStringAsync());
          var translatedLyricsRaw = translateJson.RootElement
              .GetProperty("data")
              .GetProperty("translations")[0]
              .GetProperty("translatedText")
              .GetString();

          string decodedText = HttpUtility.HtmlDecode(translatedLyricsRaw);

          var englishLyrics = decodedText
              .Split('/')
              .Select(line => line.Trim())
              .Where(line => !string.IsNullOrWhiteSpace(line))
              .ToList();

          var newSong = new Song
          {
            Id = geniusSongId,
            Artist = artist,
            Title = title,
            ImageUrl = imageUrl,
            SpanishLyrics = spanishLyrics,
            EnglishLyrics = englishLyrics
          };

          await _songContext.CreateAsync(newSong);
        }

        // Add song ID to user's Songs array if it wasn't there
        var update = Builders<User>.Update.AddToSet(u => u.Songs, geniusSongId);
        var updateResult = await _userContext.UpdateOneAsync(userFilter, update);

        return Ok(new ScrapeResponse { Success = true, Message = "Song added successfully." });
      }
      catch (Exception ex)
      {
        return Ok(new ScrapeResponse { Success = false, Message = $"An error occurred: {ex.Message}" });
      }
    }

    public class ScrapeResponse
    {
      public bool Success { get; set; }
      public string Message { get; set; }
    }


  }
}
