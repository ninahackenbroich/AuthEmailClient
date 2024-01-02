import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

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
        if (value.available) {
          return null;
        }
        return { usernameTaken: true };
      })
    );
  }
}
