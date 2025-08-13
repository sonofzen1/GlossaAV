import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TranslationService } from './translation.service';
import { Song } from '../models/song.model'; // Assuming you have a Song model defined

export interface ScrapeResponse {
  success: boolean;
  message: string;
}

@Injectable({
    providedIn: 'root'
})
export class SongsService {
    private apiUrl = 'https://localhost:5001/api/FlashCards';

    constructor(private http: HttpClient, private translationService: TranslationService) {}

    getAllSongs(): Observable<Song[]> {
        return this.http.get<any[]>(`${this.apiUrl}/songs`).pipe(
            map((songs: any[]) => songs.map(song => ({
                title: song.title,
                artist: song.artist,
                spanishLyrics: song.spanishLyrics,
                englishLyrics: song.englishLyrics,
                image: song.imageUrl
            } as Song))),
            catchError(this.handleError)
        );
    }

  scrapeLyrics(url: string): Observable<ScrapeResponse> {
    return this.http.get<ScrapeResponse>(`${this.apiUrl}/scrape?url=${encodeURIComponent(url)}`);
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