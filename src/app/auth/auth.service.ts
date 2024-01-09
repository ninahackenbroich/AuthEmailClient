import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = "https://api.angular-email.com/auth/"
  signedin$ = new BehaviorSubject(true); // BehaviorSubject is a type of Subject, a subject is a type of observable. $ is a convention to indicate that this is an observable.

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    const url = `${this.rootUrl}username`

    const body = { username: username };
    const headers = { "content-type": "application/json" };

    return this.http.post<UsernameAvailableResponse>(url, body, { headers })
  }

  signup(credentials: SignupCredentials) {
    const url = `${this.rootUrl}signup`

    return this.http.post<SignupResponse>(url, credentials).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }

  signin(credentials: SigninCredentials) {
    const url = `${this.rootUrl}signin`

    return this.http.post<SignupResponse>(url, credentials).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }

  checkAuth() {
    const url = `${this.rootUrl}signedin`

    return this.http.get<SignedinResponse>(url).pipe(
      tap(({ authenticated }) => {
        this.signedin$.next(authenticated);
        console.log(authenticated);

      })
    )
  }

  signout() {
    const url = `${this.rootUrl}signout`

    return this.http.post(url, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    )
  }
}
