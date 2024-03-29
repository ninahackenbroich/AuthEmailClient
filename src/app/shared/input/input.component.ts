import { Component, OnInit, Input } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() inputType?: string = 'text';
  @Input() inputId: string = '';
  @Input() controlType?: string = 'input';

  constructor() { }

  ngOnInit() {
  }

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
