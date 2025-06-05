import { Directive, model } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FunctionType } from '@typings';

@Directive()
export abstract class ControlBaseDirective<T> implements ControlValueAccessor {
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
