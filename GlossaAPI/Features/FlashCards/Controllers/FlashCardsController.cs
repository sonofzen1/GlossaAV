using GlossaAPI.Features.FlashCards.Models;
using GlossaAPI.Features.FlashCards.Models.Requests;
using GlossaAPI.Features.FlashCards.Services;
using GlossaAPI.Mongo;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace GlossaAPI.Features.FlashCards.Controllers
{
  [Route("api/FlashCards")]
  public class FlashCardsController : ControllerBase
  {
    private readonly FlashCardHandler<FlashCard> _flashCardContext;
    private readonly FlashCardHandler<Deck> _deckContext;

    public FlashCardsController(FlashCardHandler<FlashCard> flashCardContext, FlashCardHandler<Deck> deckContext)
    {
      _flashCardContext = flashCardContext;
      _deckContext = deckContext;
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
  }
}
