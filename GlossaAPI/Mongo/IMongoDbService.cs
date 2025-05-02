using GlossaAPI.Features.FlashCards.Models;

namespace GlossaAPI.Mongo
{
  public interface IMongoDbService<T>
  {
    Task<List<T>> GetAllAsync();
    Task<T?> GetByIdAsync(string id);
    Task CreateAsync(T item);
    Task UpdateAsync(string id, T item);
    Task DeleteAsync(string id);
  }
}
