using GlossaAPI.Features.FlashCards.Models;
using GlossaAPI.Features.FlashCards.Models.Requests;
using GlossaAPI.Features.FlashCards.Services;
using GlossaAPI.Mongo;
using Microsoft.AspNetCore.Mvc;

namespace GlossaAPI.Features.FlashCards.Controllers
{
  [Route("api/FlashCards")]
  public class FlashCardsController : ControllerBase
  {
    private readonly IMongoDbService<FlashCard> _flashCardContext;
    private readonly IMongoDbService<Deck> _deckContext;

    public FlashCardsController(IMongoDbService<FlashCard> flashCardContext, IMongoDbService<Deck> deckContext)
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
  }
}
