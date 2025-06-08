import {
  ValidatorFn,
  ValidationErrors,
  Validators,
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { setValidatorsAndUpdate } from '@shared/utils';
import { VacancyPaymentForm } from '../models';

export function paymentDurationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup<VacancyPaymentForm>;

    const from = group.controls.from;
    const to = group.controls.to;
    const currency = group.controls.currency;
    const type = group.controls.type;
    const duration = group.controls.duration;

    switch (duration.value ?? 'NONE') {
      case 'NONE':
        setValidatorsAndUpdate(from);
        setValidatorsAndUpdate(to);
        setValidatorsAndUpdate(currency);
        setValidatorsAndUpdate(type);
        break;

      case 'ONE':
        setValidatorsAndUpdate(from, [Validators.required]);
        setValidatorsAndUpdate(to);
        setValidatorsAndUpdate(currency, [Validators.required]);
        setValidatorsAndUpdate(type, [Validators.required]);
        break;

      case 'BOTH':
        setValidatorsAndUpdate(from, [Validators.required]);
        setValidatorsAndUpdate(to, [Validators.required]);
        setValidatorsAndUpdate(currency, [Validators.required]);
        setValidatorsAndUpdate(type, [Validators.required]);
        break;
    }

    return null;
  };
}
