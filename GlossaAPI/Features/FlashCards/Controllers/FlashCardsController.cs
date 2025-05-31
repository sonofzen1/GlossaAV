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
using System.Threading.Tasks;

namespace GlossaAPI.Features.FlashCards.Controllers
{
  [Route("api/FlashCards")]
  public class FlashCardsController : ControllerBase
  {
    private readonly FlashCardHandler<FlashCard> _flashCardContext;
    private readonly FlashCardHandler<Deck> _deckContext;
    private readonly HttpClient _httpClient;

    public FlashCardsController(FlashCardHandler<FlashCard> flashCardContext, FlashCardHandler<Deck> deckContext, IHttpClientFactory httpClientFactory)
    {
      _flashCardContext = flashCardContext;
      _deckContext = deckContext;
      _httpClient = httpClientFactory.CreateClient();
      _httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");
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
        // Fetch the page
        var response = await _httpClient.GetStringAsync(url);

        // Parse HTML
        var htmlDocument = new HtmlDocument();
        htmlDocument.LoadHtml(response);

        // Extract lyrics from Lyrics__Container divs
        
        var lyricsNodes = htmlDocument.DocumentNode
            .SelectNodes("//*[contains(@class, 'Lyrics__Container')]");
        var artist = htmlDocument.DocumentNode.SelectSingleNode("//*[contains(@class, 'PortalTooltip__Trigger')]//a/text()");
        var imageParent = htmlDocument.DocumentNode.SelectSingleNode("//div[contains(@class, 'CoverArt')]").OuterHtml;
        var image = htmlDocument.DocumentNode.SelectSingleNode("//div[contains(@class, 'CoverArt')]/img")?.Attributes["src"]?.Value ?? htmlDocument.DocumentNode.SelectSingleNode("//div[contains(@class, 'CoverArt')]/img").OuterHtml;
        var primaryAlbum = htmlDocument.DocumentNode.SelectSingleNode("//a[contains(@href, '#primary-album')]/text()");
        var title = htmlDocument.DocumentNode.SelectSingleNode("//h1[contains(@class, 'Title-sc')]//div//div//div//span/text()");//Generated from the XPATH that inspect element gave
        if (lyricsNodes == null || !lyricsNodes.Any())
        {
          return NotFound("No lyrics found on the page.");
        }
        if (artist == null)
        {
          return NotFound("No artist found on the page.");
        }
        if (image == null)
        {
          return NotFound("No album cover found on the page.");
        }
        if (primaryAlbum == null)
        {
          return NotFound("No primary album found on the page.");
        }
        if(title == null)
        {
          return NotFound("No title found on the page.");
        }

        // Combine lyrics, removing HTML tags
        var lyrics = string.Join("\n", lyricsNodes
            .Select(node => node.InnerText.Trim())
            .Where(text => !string.IsNullOrWhiteSpace(text)));

        return Ok(new { Lyrics = lyrics, Artist = artist.InnerText, ImageURL = image, PrimaryAlbum = primaryAlbum.InnerText, Title = title.InnerText, ImageParent = imageParent});
      }
      catch (HttpRequestException ex)
      {
        return StatusCode(500, $"Failed to fetch the page: {ex.Message}");
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"An error occurred: {ex.Message}");
      }
    }
  }
}
