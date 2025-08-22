using GlossaAPI.Features.FlashCards.Models;
using GlossaAPI.Mongo;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Data.Common;

namespace GlossaAPI.Features.FlashCards.Services
{
  public interface IUserContextService
  {
    string Username { get; set; }
    void SetUsername(string username);
    void ClearUsername();
  }
  public class UserContextService : IUserContextService
  {
    private string _username;

    public string Username
    {
      get => _username ?? "mycooluser"; // Fallback to "Guest" if not set
      set => _username = value;
    }

    public void SetUsername(string username)
    {
      _username = username;
    }

    public void ClearUsername()
    {
      _username = null;
    }
  }
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
      var objectId = new ObjectId(id);
      return await _collection.Find(Builders<T>.Filter.Eq("_id", objectId)).FirstOrDefaultAsync();
    }

    public async Task<List<T>> Find(FilterDefinition<T> filter)
    {
      return await _collection.Find(filter).ToListAsync();
    }

    public async Task<T?> FindByFieldAsync(string fieldName, string value)
    {
      var filter = Builders<T>.Filter.Eq(fieldName, value);
      return await _collection.Find(filter).FirstOrDefaultAsync();
    }

    public async Task CreateAsync(T item)
    {
      await _collection.InsertOneAsync(item);
    }

    public async Task UpdateAsync(string id, T item)
    {
      await _collection.ReplaceOneAsync(Builders<T>.Filter.Eq("Id", id), item);
    }

    public async Task<UpdateResult> UpdateOneAsync(FilterDefinition<T> filter, UpdateDefinition<T> update)
    {
      return await _collection.UpdateOneAsync(filter, update);
    }

    public async Task<UpdateResult> UpdateOneAsync(string fieldName, string fieldValue, UpdateDefinition<T> update)
    {
      var filter = Builders<T>.Filter.Eq(fieldName, fieldValue);
      return await _collection.UpdateOneAsync(filter, update);
    }


    public async Task DeleteAsync(string id)
    {
      await _collection.DeleteOneAsync(Builders<T>.Filter.Eq("Id", id));
    }
  }
}
