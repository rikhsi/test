import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function arrayLengthValidator(min?: number, max?: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!Array.isArray(value)) {
      return { notArray: true };
    }

    const length = value.length;

    if (min !== undefined && length < min) {
      return { arrayTooShort: { requiredMin: min, actual: length } };
    }

    if (max !== undefined && length > max) {
      return { arrayTooLong: { requiredMax: max, actual: length } };
    }

    return null;
  };
}
