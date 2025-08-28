import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flashcard } from '../models/flashcard.model';
import { API_BASE } from '../../../public/api-base';

@Injectable({
  providedIn: 'root',
})
export class FlashcardAPIService {
  //private apiUrl = 'https://localhost:5001/api/FlashCards';
  private apiUrl = `${API_BASE}/api/FlashCards`;

  constructor(private http: HttpClient) {}

  getById(id: string): Observable<Flashcard> {
    return this.http.get<Flashcard>(`${this.apiUrl}/${id}`);
  }

}