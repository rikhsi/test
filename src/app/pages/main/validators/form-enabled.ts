import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, catchError, of } from 'rxjs';
import { FormsService } from '@api/controllers';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class FormEnabledValidator {
  constructor(
    private formsService: FormsService,
    private notification: NzNotificationService
  ) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const formId = control.value;

      if (!formId) return of(null);

      return this.formsService.getAll$().pipe(
        map((forms) => {
          const form = forms.find((f) => f.id === formId);

          if(!form.enable) {
            this.notification.warning('Форма не доступна!', 'Пожалуйста, следите за новостями')
          }

          return form?.enable ? null : { formDisabled: true };
        }),
        catchError(() => of({ formDisabled: true }))
      );
    };
  }
}
