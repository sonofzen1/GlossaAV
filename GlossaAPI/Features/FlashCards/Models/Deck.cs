namespace GlossaAPI.Features.FlashCards.Models
{
  public class Deck
  {
    public string Id { get; set; }
    public string Title { get; set; }
    public List<FlashCard> Cards { get; set; }

  }
}
