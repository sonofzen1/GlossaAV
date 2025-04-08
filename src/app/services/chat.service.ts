// services/chat.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  sendMessage(message: string): Observable<string> {
    // Simulate Llama-like response
    const mockResponse = `I understood: "${message}". How can I assist you today?`;
    return of(mockResponse).pipe(delay(500));
  }
}