import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  usernameAvailable(username: string) {
    const url = "https://api.angular-email.com/auth/username"

    const body = { username: username };
    const headers = { "content-type": "application/json" };

    return this.http.post<{ available: boolean }>(url, body, { headers })
  }
}
