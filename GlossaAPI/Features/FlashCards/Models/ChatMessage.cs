using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace GlossaAPI.Features.FlashCards.Models
{
  public class ChatMessage
  {
    public string Role { get; set; } = ""; // "user" | "assistant"
    public string Text { get; set; } = "";
    public DateTime Ts { get; set; } = DateTime.UtcNow;
  }
}
