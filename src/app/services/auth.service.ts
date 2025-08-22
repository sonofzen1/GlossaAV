import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly url = 'https://localhost:5001/api/auth'; // base controller, not flashcards

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ message: string; username: string }> {
  const params = new HttpParams()
    .set('username', encodeURIComponent(username))
    .set('password', encodeURIComponent(password));

    return this.http.post<{ message: string; username: string }>(
      `${this.url}/login`,
      null, // No body
      { params }
  );}

  signup(username: string, password: string, email: string): Observable<{ message: string; username: string }> {
      const params = new HttpParams()
        .set('username', encodeURIComponent(username))
        .set('password', encodeURIComponent(password))
        .set('email', encodeURIComponent(email));

      return this.http.post<{ message: string; username: string }>(
        `${this.url}/signup`,
        null,
        { params }
      );
    }

}
