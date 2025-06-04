import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FunctionType } from '@typings';

@Component({
  template: ``,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlBaseComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class ControlBaseComponent<T> implements ControlValueAccessor {
  value = model<T>();
  disabled = model<boolean>(false, { alias: 'blocked' });

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
}
