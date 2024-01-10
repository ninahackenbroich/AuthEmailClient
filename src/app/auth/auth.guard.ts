import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { take, skipWhile, tap } from 'rxjs';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router); // Get the Router instance using Angular's inject function
  const authService = inject(AuthService); // Similarly, get the AuthService instance

  return authService.signedin$.pipe(
    skipWhile(value => value === null), // Skip while the authentication status is unknown (null)
    take(1), // Take the first emitted value that is not null
    tap(authenticated => {
      if (!authenticated) {
        router.navigateByUrl('/'); // Redirect to the home page if not authenticated
        return false; // Prevent route activation
      }
      return true; // Allow route activation
    })
  );
};
