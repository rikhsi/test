import { AbstractControl, ValidatorFn } from '@angular/forms';

export function setValidatorsAndUpdate(
  control: AbstractControl | null,
  validators: ValidatorFn[] = []
): void {
  if (!control) return;

  control.setValidators(validators.length ? validators : null);
  control.updateValueAndValidity({ onlySelf: true });
}

export function toggleControlState(
  control: AbstractControl,
  enabled: boolean = false
): void {
  if (enabled) {
    control.enable({ emitEvent: false });
  } else {
    control.disable({ emitEvent: false });
  }
}

export function toggleWithResetControl(
  control: AbstractControl,
  enabled: boolean = false
): void {
  if (enabled) {
    control.enable({ emitEvent: false });
  } else {
    control.disable({ emitEvent: false });
    control.reset(null);
  }
}
