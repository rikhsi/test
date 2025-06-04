import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormView } from '@typings';

@Injectable()
export class MainService {
  readonly formViewControl = new FormControl<FormView>(null, [
    Validators.required,
  ]);
}
