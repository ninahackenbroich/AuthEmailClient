import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  authForm = new FormGroup({
    username: new FormControl("",
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
      ]),
    password: new FormControl("",
      [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
      ])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    const { username, password } = this.authForm.value;
    const signinCredentials = {
      username: username || '',
      password: password || '',
    };
    this.authService.signin(signinCredentials).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/inbox');
        // Navigate to some other route
      },
      error: (err) => {
        console.log(err.error);

        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else if (err.error.username || err.error.password) {
          this.authForm.setErrors({ credentials: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });
  }

}
