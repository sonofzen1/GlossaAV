using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace GlossaAPI.Features.FlashCards.Models
{
  public class User
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public string Email { get; set; }

    public List<Deck> Decks { get; set; } = new();
    public List<int> Songs { get; set; } = new();

    public string? ConversationId { get; set; }   // nullable until first convo created
  }
}
