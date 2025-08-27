using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace GlossaAPI.Features.FlashCards.Models
{
  public class Conversation
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = default!;

    public string UserId { get; set; } = ""; // tie to your Users collection
    public string? Summary { get; set; }      // rolling Spanish summary
    public List<ChatMessage> Messages { get; set; } = new();
    public int TurnCount { get; set; }        // number of user turns
  }
}
