import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({ providedIn: "root" })

export class UniqueUsername implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const { value } = control;
    const url = "https://api.angular-email.com/auth/username"

    const body = { username: value };
    const headers = { "content-type": "application/json" };

    return this.http.post<any>(url, body, { headers }).pipe(
      map((value: any) => {
        return null;
      }),
      catchError((err) => {
        if (err.message.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  }
}
