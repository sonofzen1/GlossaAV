using MongoDB.Bson.Serialization.Attributes;

namespace GlossaAPI.Features.FlashCards.Models
{
  public class FlashCard
  {
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; }
    public string Term { get; set; }
    public string Definition { get; set; }
    
  }
}
