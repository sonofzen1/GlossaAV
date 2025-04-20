using GlossaAPI.Features.FlashCards.Models;
using System.Data.Common;

namespace GlossaAPI.Features.FlashCards.Services
{
  public class FlashCardHandler
  {
    private DbDataSource dataSource;
    public FlashCardHandler(MongoConnection? connection) { }

    // Gets All Decks for a user
    public List<Deck> GetDecks()
    {
      return new List<Deck>();
    }

    // Gets all Flashcards for a deck
    public List<FlashCard> GetFlashCardForDeck(string deckId)
    {
      return new List<FlashCard>();
    }

    public void AddDeck(Deck deck)
    {

    }
    public void AddFlashCardsToDeck(List<FlashCard> flashCards, string deckId)
    {

    }

    public void UpdateDeck(Deck deck)
    {
      // retrieve deck from cluster

      // compare data
    }

    public void DeleteDeck(string deckId)
    {

    }

    public void ChangeDeckName(string deckId, string title)
    {

    }
  }
}
