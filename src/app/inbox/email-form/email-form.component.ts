import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {
  @Input() email!: Email;

  emailForm = new FormGroup({
    to: new FormControl('',
      [
        Validators.required,
        Validators.email
      ]),
    from: new FormControl({ value: '', disabled: true }),
    subject: new FormControl('',
      [
        Validators.required
      ]),
    text: new FormControl('',
      [
        Validators.required
      ]),
  });

  constructor() {

  }

  ngOnInit() {
    const { subject, from, to, text } = this.email;
    this.emailForm.patchValue({ subject, from, to, text });
  }


}
