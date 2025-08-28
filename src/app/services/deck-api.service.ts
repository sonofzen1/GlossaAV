import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck.model';
import { API_BASE } from '../../../public/api-base';

@Injectable({
  providedIn: 'root',
})
export class DeckAPIService {
  //private apiUrl = 'https://localhost:5001/api/FlashCards';
  private apiUrl = `${API_BASE}/api/FlashCards`;

  constructor(private http: HttpClient) {}

  getAllDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(`${this.apiUrl}/GetAllDecks`);
  }

  getDeckById(id: string): Observable<Deck> {
    return this.http.get<Deck>(`${this.apiUrl}/${id}`);
  }

  createDeck(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>(this.apiUrl, deck);
  }

  updateDeck(id: string, deck: Deck): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, deck);
  }

  deleteDeck(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}