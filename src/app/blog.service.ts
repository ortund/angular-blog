import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResult } from './models/login-result';
import { LoginModel } from './models/login-model';
import { User } from './models/bloguser';

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
    return this.http.post<LoginResult>(url, loginData, httpOptions)
  }

  getUser(username: string) : Observable<User> {
    // Add the request header auth stuff
    this.setAuthHeaders();

    // Get the user
    const data = "username=" + username;

    const url = `${this.blogUrl}/api/Users/Get`;
    return this.http.post<User>(url, data, httpOptions);
  }

  setAuthHeaders() : void {
    var bearer = sessionStorage.getItem("fuzzyBear");
    var token = sessionStorage.getItem("shmooToken");
    var authHeader = bearer + ' ' + token;

    httpOptions.headers.set("Authorization", authHeader);
  }
}
