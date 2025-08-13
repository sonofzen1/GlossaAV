using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace GlossaAPI.Features.FlashCards.Models
{
  public class Song
  {
    [BsonId]
    [BsonElement("_id")]
    public int Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; }
    [BsonElement("artist")]
    public string Artist { get; set; }

    [BsonElement("spanishLyrics")]
    public List<string> SpanishLyrics { get; set; }

    [BsonElement("englishLyrics")]
    public List<string> EnglishLyrics { get; set; }

    [BsonElement("imageUrl")]
    public string ImageUrl { get; set; }
  }
}
