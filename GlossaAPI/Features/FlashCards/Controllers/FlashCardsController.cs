using Amazon.Runtime;
using GlossaAPI.Features.FlashCards.Models;
using GlossaAPI.Features.FlashCards.Models.Requests;
using GlossaAPI.Features.FlashCards.Services;
using GlossaAPI.Mongo;
using HtmlAgilityPack; //Begin imports added evening of May 19th, 2025
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System;
using System.Linq;
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
    private readonly FlashCardHandler<FlashCard> _flashCardContext;
    private readonly FlashCardHandler<Deck> _deckContext;
    private readonly HttpClient _httpClient;
    private readonly string _geniusAccessToken;

    public FlashCardsController(FlashCardHandler<FlashCard> flashCardContext, FlashCardHandler<Deck> deckContext, IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
      _flashCardContext = flashCardContext;
      _deckContext = deckContext;
      _httpClient = httpClientFactory.CreateClient();
      _httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");
      _geniusAccessToken = configuration["Genius:AccessToken"] ?? throw new InvalidOperationException("Genius Access Token is not configured.");
    }

    [HttpGet]
    [Route("GetAllDecks")]
    public async Task<IActionResult> GetAllDecks()
    {
      try
      {
        return Ok(await _deckContext.GetAllAsync());
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPost]
    [Route("AddDeck")]
    public IActionResult AddDeck([FromBody] Deck deck)
    {
      try
      {
        return Ok(_deckContext.CreateAsync(deck));
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    // Takes a deck from the front end and updates the data of the corresponding deck
    [HttpPut]
    [Route("UpdateDeck")]
    public IActionResult UpdateDeck([FromBody] Deck deck)
    {
      try
      {
        return Ok(_deckContext.UpdateAsync(deck.Id, deck));
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet]
    [Route("GetAllFlashCards")]
    public async Task<IActionResult> GetAllFlashCards()
    {
      try
      {
        return Ok(await _flashCardContext.GetAllAsync());
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
      try
      {
        return Ok(await _flashCardContext.GetByIdAsync(id));
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet("scrape")]
    public async Task<IActionResult> ScrapeLyrics([FromQuery] string url)
    {
        try
            {
                // Extract search query from URL (e.g., "Tate-mcrae-sports-car")
                var searchQuery = url.Split('/').Last().Replace("-lyrics", "");
                Console.WriteLine($"Search query: {searchQuery}");

                // Fetch webpage for lyrics
                Console.WriteLine($"Fetching webpage: {url}");
                await Task.Delay(1000); // Respectful delay
                var html = await _httpClient.GetStringAsync(url);

                // Parse HTML
                var htmlDocument = new HtmlDocument();
                htmlDocument.LoadHtml(html);

        var lyricsBuilder = new StringBuilder();

        var lyricsContainers = htmlDocument.DocumentNode
            .SelectNodes("//div[starts-with(@class, 'Lyrics__Container')]");

        if (lyricsContainers == null || !lyricsContainers.Any())
        {
          return NotFound("No lyrics containers found.");
        }

        foreach (var container in lyricsContainers)
        {
          foreach (var node in container.ChildNodes)
          {
            if (node.Name == "br")
            {
              lyricsBuilder.Append("\n");
            }
            else if (node.Name == "#text" || node.Name == "a" || node.Name == "span")
            {
              lyricsBuilder.Append(HttpUtility.HtmlDecode(node.InnerText));
            }
            else if (node.Name == "div")
            {
              // Skip header or metadata divs inside the container
              continue;
            }
            else
            {
              lyricsBuilder.Append(HttpUtility.HtmlDecode(node.InnerText));
            }
          }

          lyricsBuilder.Append("\n");
        }

        var cleanedLyrics = lyricsBuilder.ToString().Trim();


        // Search Genius API for metadata
        var searchApiUrl = $"https://api.genius.com/search?q={Uri.EscapeDataString(searchQuery)}&access_token={_geniusAccessToken}";
                Console.WriteLine($"Search API: {searchApiUrl}");
                var searchResponse = await _httpClient.GetStringAsync(searchApiUrl);
                var searchJson = JsonDocument.Parse(searchResponse);

                // Get first song hit
                var song = searchJson.RootElement
                    .GetProperty("response")
                    .GetProperty("hits")
                    .EnumerateArray()
                    .Where(h => h.GetProperty("type").GetString() == "song")
                    .Select(h => h.GetProperty("result"))
                    .FirstOrDefault();

                // Extract metadata from search API
                var artistTextApi = song
                    .GetProperty("primary_artist")
                    .GetProperty("name")
                    .GetString() ?? "Unknown Artist";
                var titleTextApi = song
                    .GetProperty("title")
                    .GetString() ?? "Unknown Title";
                var imageUrlApi = song
                    .GetProperty("song_art_image_url")
                    .GetString() ?? "No Image";

                // Return JSON response
                return Ok(new ScrapeLyricsResponse
                {
                    Lyrics = cleanedLyrics,
                    Artist = artistTextApi,
                    ImageURL = imageUrlApi,
                    Title = titleTextApi
                });
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"HTTP error: {ex.Message}");
                return StatusCode(500, $"Failed to fetch data: {ex.Message}");
            }
            catch (JsonException ex)
            {
                Console.WriteLine($"JSON error: {ex.Message}");
                return StatusCode(500, $"Failed to parse API response: {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General error: {ex.Message}");
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
    public class ScrapeLyricsResponse
    {
      public string Lyrics { get; set; }
      public string Artist { get; set; }
      public string ImageURL { get; set; }
      public string Title { get; set; }
    }
  }
