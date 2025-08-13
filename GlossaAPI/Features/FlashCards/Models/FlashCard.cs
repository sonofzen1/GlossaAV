using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace GlossaAPI.Features.FlashCards.Models
{
  public class FlashCard
  {
    [JsonPropertyName("Term")]
    public string Term { get; set; }
    [JsonPropertyName("Definition")]
    public string Definition { get; set; }

  }
}
