import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {
  @Input() email!: Email;
  @Output() emailSubmit = new EventEmitter();

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

  onSubmit() {
    if (this.emailForm.invalid) {
      return;
    }

    /* console.log(this.emailForm.getRawValue()); // gets all values, even if disabled */
    /* xonscle.log(this.emailForm.value); // gets only enabled values
      */
    this.emailSubmit.emit(this.emailForm.value);
  }
}
