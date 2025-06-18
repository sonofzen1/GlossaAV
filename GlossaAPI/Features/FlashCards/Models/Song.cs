using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace GlossaAPI.Features.FlashCards.Models
{
  public class Song
  {
    [BsonId] // This sets GeniusSongId as the MongoDB _id
    [BsonRepresentation(BsonType.Int32)]
    public int GeniusSongId { get; set; }

    public string Title { get; set; }
    public string Artist { get; set; }

    public List<string> SpanishLyrics { get; set; }
    public List<string> EnglishLyrics { get; set; }

    public string ImageUrl { get; set; }
  }
}
