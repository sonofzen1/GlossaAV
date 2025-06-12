import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TranslationService } from './translation.service';

@Injectable({
    providedIn: 'root'
})
export class SongsService {
    private apiUrl = 'https://localhost:5001/api/FlashCards';

    constructor(private http: HttpClient, private translationService: TranslationService) {}

    scrapeLyrics(url: string): Observable<{
        title: string;
        artist: string;
        spanishLyrics: string[];
        englishLyrics: string[];
        image: URL;
    }> {
        return this.http.get<any>(`${this.apiUrl}/scrape?url=${encodeURIComponent(url)}`).pipe(
            mergeMap(response => {
              const verses = this.splitIntoVerses(response.lyrics);
              const rawLyrics = verses.join('/');
        
              return this.translationService.translateText(rawLyrics, 'es', 'en').pipe(
                map(translated => {
                  const englishLyrics = translated.split('/').map(line => line.trim()).filter(Boolean);
        
                  return {
                    title: response.title,
                    artist: response.artist,
                    spanishLyrics: verses,
                    englishLyrics,
                    image: new URL(response.imageURL || 'https://via.placeholder.com/150')
                  };
                })
              );
            }),
            catchError(this.handleError)
        );
    }

    private splitIntoVerses(cleanedLyrics: string): string[] {
        if (!cleanedLyrics) return [];
    
        return cleanedLyrics
            .split(/\n{1,}/) // split on 1 or more line breaks
            .map(line => line.trim())
            .filter(Boolean);
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}