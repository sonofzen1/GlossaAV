import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Singleton, available app-wide
})
export class TranslationService {
  private apiUrl = 'https://translation.googleapis.com/language/translate/v2';
  private apiKey = 'AIzaSyB0QOTZdGNH7_3WtPoYios1OX_L37tsfC0'; // Replace with your API key or use environment variables

  constructor(private http: HttpClient) {}

  translateText(text: string, sourceLang: string = 'es', targetLang: string = 'en'): Observable<string> {
    if (!text) {
      return throwError(() => new Error('No text provided for translation'));
    }

    const requestBody = {
      q: text,
      target: targetLang,
      source: sourceLang
    };

    return this.http
      .post(this.apiUrl, requestBody, { params: { key: this.apiKey } })
      .pipe(
        map((response: any) => {
          if (response && response.data && response.data.translations) {
            return response.data.translations[0].translatedText;
          }
          throw new Error('Unexpected response format');
        }),
        catchError((error) => {
          console.error('Translation error:', error);
          return throwError(() => error);
        })
      );
  }
}