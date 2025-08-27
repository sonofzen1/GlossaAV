import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface ChatReply { reply: string; }

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly url = 'https://localhost:5001/api/chat'; // base controller, not flashcards

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<string> {
    return this.http.post<ChatReply>(this.url, { message })
      .pipe(
        map(res => res.reply),
        catchError(err => {
          console.error('Chat error', err);
          return throwError(() => new Error('No se pudo obtener la respuesta de Sophia.'));
        })
      );
  }

  getHistory(last = 12): Observable<any> {
    const params = new HttpParams().set('last', last.toString());
    return this.http.get<any>(`${this.url}/history`, { params });
  }

}
