namespace GlossaAPI.Features.FlashCards.Models.Requests
{
  public class UpdateDeckRequest
  {
    public string DeckId { get; set; }

    public Deck deck {get; set;}
  }
}
