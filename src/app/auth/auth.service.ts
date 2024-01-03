import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsernameAvailableResponse {
  available: boolean
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = "https://api.angular-email.com/auth/"

  constructor(private http: HttpClient) {
  }

  usernameAvailable(username: string) {
    const url = `${this.rootUrl}username`

    const body = { username: username };
    const headers = { "content-type": "application/json" };

    return this.http.post<UsernameAvailableResponse>(url, body, { headers })
  }

  onSignup(credentials: SignupCredentials) {
    const url = `${this.rootUrl}signup`

    return this.http.post<SignupResponse>(url, credentials, { withCredentials: true });
  }
}
