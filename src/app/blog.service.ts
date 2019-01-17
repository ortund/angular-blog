import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResult } from './models/login-result';
import { LoginModel } from './models/login-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogUrl = 'http://blog.service' // URL to web api

  constructor(private http: HttpClient) { }

  login(emailAddress: string, password: string): Observable<LoginResult> {
    const loginData = "grant_type=password&username=" + emailAddress + "&password=" + password;

    const url = `${this.blogUrl}/Token`;

    // Service errors with HTTP 400 because credentials are invalid.
    return this.http.post<LoginResult>(url, loginData, httpOptions)
  }
}
