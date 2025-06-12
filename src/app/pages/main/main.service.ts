import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormView } from '@typings';
import { FormEnabledValidator } from './validators';

@Injectable()
export class MainService {
  readonly formViewControl: FormControl<FormView>;

  constructor(private formEnabledValidator: FormEnabledValidator) {
    this.formViewControl = new FormControl<FormView>(
      null,
      [Validators.required],
      [this.formEnabledValidator.validate()],
    );
  }
}
