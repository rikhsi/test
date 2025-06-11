import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  LocationBaseForm,
  MoneyBase,
  PaymentBase,
  PaymentDuration,
} from '@typings';

export type VacancyPaymentForm = {
  from: FormControl<number>;
  to: FormControl<number>;
  currency: FormControl<MoneyBase>;
  type: FormControl<PaymentBase>;
  duration: FormControl<PaymentDuration>;
};

export type VacancyLanguageForm = {
  type: FormControl<number>;
  level: FormControl<number>;
};

export type VacancyBaseForm = {
  title: FormControl<string>;
  job: FormControl<number[]>;
  payment: FormGroup<VacancyPaymentForm>;
  workExperience: FormControl<number>;
  workType: FormControl<number>;
  workTime: FormControl<number>;
  description: FormControl<string>;
  location: FormGroup<LocationBaseForm>;
  languages: FormArray<FormGroup<VacancyLanguageForm>>;
};
