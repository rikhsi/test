import { DestroyRef, Directive, inject, model, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
import { ValidationService } from '@core/services';
import { ControlType, FunctionType } from '@typings';
import { NzValidateStatus } from 'ng-zorro-antd/core/types';
import { debounceTime, Subject } from 'rxjs';

@Directive()
export abstract class ControlBaseDirective<T> implements ControlValueAccessor {
  value = model<T>();
  disabled = model<boolean>(false, { alias: 'blocked' });

  validate$ = new Subject<ControlType>();

  message = signal<string>(null);
  status = signal<NzValidateStatus>('');
  required = signal<boolean>(false);

  protected validationService = inject(ValidationService);
  protected destroyRef = inject(DestroyRef);

  public onChange: FunctionType<T>;
  public onTouched: FunctionType<T>;

  writeValue(value: T): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  modelChange(value: T): void {
    this.value.set(value);
    this.onChange?.(value);
  }

  markAsTouched(): void {
    this.onTouched?.();
  }

  initValidation(): void {
    this.validate$
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe((control) => {
        this.status.set(this.validationService.validateStatus(control));
        this.message.set(this.validationService.validateField(control));
      });
  }
}
