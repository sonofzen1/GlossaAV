using GlossaAPI.Features.FlashCards.Models;
using GlossaAPI.Mongo;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Data.Common;

namespace GlossaAPI.Features.FlashCards.Services
{
  public class FlashCardHandler<T> : IMongoDbService<T>
  {
    private readonly IMongoCollection<T> _collection;
    public FlashCardHandler(IMongoClient client, MongoDbSettings settings, string collectionName)
    {
      var database = client.GetDatabase(settings.DatabaseName);
      _collection = database.GetCollection<T>(collectionName);
    }

    public async Task<List<T>> GetAllAsync()
    {
      return await _collection.Find(_ => true).ToListAsync();
    }

    public async Task<T?> GetByIdAsync(string id)
    {
      return await _collection.Find(Builders<T>.Filter.Eq("Id", id)).FirstOrDefaultAsync();
    }

    public async Task CreateAsync(T item)
    {
      await _collection.InsertOneAsync(item);
    }

    public async Task UpdateAsync(string id, T item)
    {
      await _collection.ReplaceOneAsync(Builders<T>.Filter.Eq("Id", id), item);
    }

    public async Task DeleteAsync(string id)
    {
      await _collection.DeleteOneAsync(Builders<T>.Filter.Eq("Id", id));
    }
  }
}
