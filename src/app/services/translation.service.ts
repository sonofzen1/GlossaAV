import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private apiUrl = 'https://localhost:5001/api/chat/translate'; // adjust port

  constructor(private http: HttpClient) {}

  translateText(text: string, source = 'es', target = 'en'): Observable<string> {
    return this.http.post<{ translatedText: string }>(this.apiUrl, {
      text, source, target
    }).pipe(map(r => r.translatedText));
  }
}
