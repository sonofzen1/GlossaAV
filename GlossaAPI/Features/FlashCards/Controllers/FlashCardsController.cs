using GlossaAPI.Features.FlashCards.Models;
using GlossaAPI.Features.FlashCards.Models.Requests;
using GlossaAPI.Features.FlashCards.Services;
using Microsoft.AspNetCore.Mvc;

namespace GlossaAPI.Features.FlashCards.Controllers
{
  [Route("api/FlashCards")]
  public class FlashCardsController : Controller
  {
    [HttpGet]
    [Route("GetAllDecks")]
    public IActionResult GetAllDecks()
    {
      FlashCardHandler handler = new FlashCardHandler(new Models.MongoConnection());
      try
      {
        var res = handler.GetDecks();
        return Ok(res);
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
      FlashCardHandler handler = new FlashCardHandler(new MongoConnection());
      try
      {
        handler.AddDeck(deck);

        return Ok();
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
      FlashCardHandler handler = new FlashCardHandler(new MongoConnection());

      try
      {
        handler.UpdateDeck(deck);

        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }
  }
}
