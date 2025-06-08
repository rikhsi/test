import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { arrayLengthValidator } from '@shared/validators';
import { LocationBaseForm } from '@typings';
import {
  VacancyPaymentForm,
  VacancyBaseForm,
  VacancyLanguageForm,
} from '../models';
import {
  fromLessThanToValidator,
  paymentDurationValidator,
} from '../validators';

export const VACANCY_PAYMENT_FORM = new FormGroup<VacancyPaymentForm>(
  {
    from: new FormControl(null, [
      Validators.minLength(1),
      Validators.maxLength(5),
    ]),
    to: new FormControl(null, [
      Validators.minLength(1),
      Validators.maxLength(5),
    ]),
    currency: new FormControl(null),
    type: new FormControl(null),
    duration: new FormControl('NONE'),
  },
  [paymentDurationValidator(), fromLessThanToValidator()]
);

export const VACANCY_LOCATION_FORM = new FormGroup<LocationBaseForm>({
  region: new FormControl(null, [Validators.required]),
  district: new FormControl(null, [Validators.required]),
  address: new FormControl(null, [
    Validators.required,
    Validators.minLength(10),
  ]),
  coords: new FormControl(null, [
    Validators.required,
    arrayLengthValidator(2, 2),
  ]),
});

export const VACANCY_FORM = new FormGroup<VacancyBaseForm>({
  title: new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(50),
  ]),
  payment: VACANCY_PAYMENT_FORM,
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
  location: VACANCY_LOCATION_FORM,
});
