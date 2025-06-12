import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { arrayLengthValidator } from '@shared/validators';
import { LocationBaseForm } from '@typings';
import {
  VacancyPaymentForm,
  VacancyBaseForm,
  VacancyLanguageForm,
} from '../models';

export const LANGUAGE_FORM = new FormGroup<VacancyLanguageForm>({
  type: new FormControl<number>(null, [Validators.required]),
  level: new FormControl<number>(null, [Validators.required]),
});

export function createVacancyForm(): FormGroup<VacancyBaseForm> {
  return new FormGroup<VacancyBaseForm>({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
    job: new FormControl([], [Validators.required]),
    skills: new FormControl([], [Validators.required]),
    payment: new FormGroup<VacancyPaymentForm>({
      from: new FormControl(null),
      to: new FormControl(null),
      currency: new FormControl(null),
      type: new FormControl(null),
      duration: new FormControl('NONE'),
    }),
    workExperience: new FormControl(null, [Validators.required]),
    workType: new FormControl(null, [Validators.required]),
    workTime: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(20),
    ]),
    languages: new FormArray<FormGroup<VacancyLanguageForm>>(
      [],
      [arrayLengthValidator(1, 5)]
    ),
    location: new FormGroup<LocationBaseForm>({
      region: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
      coords: new FormControl(null),
    }),
  });
}
