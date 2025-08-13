import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flashcard } from '../models/flashcard.model';

@Injectable({
  providedIn: 'root',
})
export class FlashcardAPIService {
  private apiUrl = 'https://localhost:5001/api/FlashCards';

  constructor(private http: HttpClient) {}

  getFlashcards(deckTitle: string): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(`${this.apiUrl}/decks/${encodeURIComponent(deckTitle)}`);
  }

  addFlashcard(deckTitle: string, flashcard: Flashcard): Observable<any> {
    return this.http.post(`${this.apiUrl}/decks/${encodeURIComponent(deckTitle)}/Flashcards`, flashcard);
  }
  
  deleteFlashcard(deckTitle: string, termToDelete: string): Observable<any> {
    const url = `${this.apiUrl}/flashcard?deckTitle=${encodeURIComponent(deckTitle)}&termToDelete=${encodeURIComponent(termToDelete)}`;
    return this.http.delete(url);
  }

}