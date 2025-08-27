using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GlossaAPI.Features.FlashCards.Models
{
  public class Deck
  {
    public string Title { get; set; }
    public List<FlashCard> Flashcards { get; set; } = new();

  }
}
