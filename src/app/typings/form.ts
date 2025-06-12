import { AbstractControl, FormGroup, FormArray } from '@angular/forms';

export type FormView = 'vacancy' | 'resume';
export type ControlType = AbstractControl | FormGroup | FormArray;
