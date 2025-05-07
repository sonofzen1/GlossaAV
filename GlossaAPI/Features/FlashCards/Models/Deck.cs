using MongoDB.Bson.Serialization.Attributes;

namespace GlossaAPI.Features.FlashCards.Models
{
  public class Deck
  {
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; }
    public string Title { get; set; }
    public List<string> FlashCardIds { get; set; }

  }
}
