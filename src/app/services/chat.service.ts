// services/chat.service.ts
import { Injectable } from '@angular/core';
<<<<<<< Updated upstream
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
=======
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { API_BASE } from '../../../public/api-base';
>>>>>>> Stashed changes

@Injectable({
  providedIn: 'root'
})
export class ChatService {
<<<<<<< Updated upstream
=======
  //private readonly url = 'https://localhost:5001/api/chat'; // base controller, not flashcards
  private readonly url = `${API_BASE}/api/chat`; // base controller, not flashcards

  constructor(private http: HttpClient) {}

>>>>>>> Stashed changes
  sendMessage(message: string): Observable<string> {
    // Simulate Llama-like response
    const mockResponse = `I understood: "${message}". How can I assist you today?`;
    return of(mockResponse).pipe(delay(500));
  }
}