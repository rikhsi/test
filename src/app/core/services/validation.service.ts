import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationError } from '@constants';
import { NzValidateStatus } from 'ng-zorro-antd/core/types';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  #validationMessages: Record<string, (control: AbstractControl) => string> = {
    [ValidationError.REQUIRED]: () => 'Обязательное поле',
    [ValidationError.EMAIL]: () => 'Введите корректный email',
    [ValidationError.MIN_LENGTH]: (control) =>
      `Минимальная длина — ${
        control.getError(ValidationError.MIN_LENGTH).requiredLength
      }`,
    [ValidationError.MAX_LENGTH]: (control) =>
      `Максимальная длина — ${
        control.getError(ValidationError.MAX_LENGTH).requiredLength
      }`,
  };

  #validationStatusType: Record<string, () => NzValidateStatus> = {
    [ValidationError.REQUIRED]: () => 'error',
    [ValidationError.EMAIL]: () => 'error',
    [ValidationError.MIN_LENGTH]: () => 'error',
    [ValidationError.MAX_LENGTH]: () => 'error',
  };

  validateStatus(control: AbstractControl): NzValidateStatus {
    if (control?.valid && control?.dirty) return 'success';

    if (control?.errors && control?.dirty) {
      const errorKeys = Object.keys(control.errors || {});
      for (const key of Object.values(ValidationError)) {
        if (errorKeys.includes(key)) {
          return this.#validationStatusType[key]?.() || 'error';
        }
      }
    }

    return '';
  }

  validateField(control: AbstractControl): string {
    if (!control?.invalid || !control?.dirty) return '';

    const errorKeys = Object.keys(control.errors || {});
    for (const key of Object.values(ValidationError)) {
      if (errorKeys.includes(key)) {
        return this.#validationMessages[key]?.(control) || '';
      }
    }

    return '';
  }
}
