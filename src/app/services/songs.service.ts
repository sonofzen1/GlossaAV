import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TranslationService } from './translation.service';
<<<<<<< Updated upstream
=======
import { Song } from '../models/song.model'; // Assuming you have a Song model defined
import { API_BASE } from '../../../public/api-base';

export interface ScrapeResponse {
  success: boolean;
  message: string;
}
>>>>>>> Stashed changes

@Injectable({
    providedIn: 'root'
})
export class SongsService {
    //private apiUrl = 'https://localhost:5001/api/FlashCards';
    private apiUrl = `${API_BASE}/api/FlashCards`;

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

<<<<<<< Updated upstream
=======

    scrapeLyrics(url: string): Observable<ScrapeResponse> {
    const proxied = this.viaScraperAPI(url);
    // safer than string concat: lets HttpClient handle encoding
    const params = new HttpParams().set('url', proxied);
    return this.http.get<ScrapeResponse>(`${this.apiUrl}/scrape`, { params });
    }

    // keep this in one place so you can change providers later
    viaScraperAPI(targetUrl: string): string {
    const base = 'https://api.scraperapi.com/';
    const params = new URLSearchParams({
        api_key: 'YOUR_SCRAPERAPI_KEY',  // see security note below
        url: targetUrl,                  // URLSearchParams encodes this for the proxy
        country: 'us',                   // optional
        // render: 'true',               // only if the page really needs JS
        // device_type: 'desktop'
    });
    return `${base}?${params.toString()}`;
    }

>>>>>>> Stashed changes
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