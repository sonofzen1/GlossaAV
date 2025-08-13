import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DeckAPIService {
  private apiUrl = 'https://localhost:5001/api/FlashCards';

  constructor(private http: HttpClient) {}

  getAllDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(`${this.apiUrl}/decks`);
  }
  
  addDeck(deck: Deck): Observable<any> {
    return this.http.post(`${this.apiUrl}/decks`, deck);
  }

  createDeck(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>(this.apiUrl, deck);
  }

  updateDeckTitle(oldTitle: string, newTitle: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/deck`, null, {
    params: {
      oldTitle: oldTitle,
      newTitle: newTitle
    }
    });
  }

  deleteDeck(deckTitle: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/deck`, {
      params: { deckTitle }
    });
  }
}