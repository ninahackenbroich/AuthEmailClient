import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({ providedIn: "root" })

export class UniqueUsername implements AsyncValidator {

  constructor(private authService: AuthService) { }

  validate = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const { value } = control;

    return this.authService.usernameAvailable(value).pipe(
      map((value: any) => {
        return null;
      }),
      catchError((err) => {
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  }
}
