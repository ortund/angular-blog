import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginResult } from './login-result';
import { LoginError } from './login-error';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogUrl = 'http://blog.service' // URL to web api

  constructor(private http: HttpClient) { }

  login(emailAddress: string, password: string): Observable<LoginResult | LoginError> {
    const loginData = "grant_type=password&username=" + emailAddress + "&password=" + password;

    const url = `${this.blogUrl}/Token`;

    // Service errors with HTTP 400 because credentials are invalid.
    return this.http.post<LoginResult>(url, loginData, httpOptions)
      .pipe (
        catchError(this.handleError<LoginError>('login'))
      );
  }

  private handleError<T> (operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(error.error as T);
    };
  }
}
