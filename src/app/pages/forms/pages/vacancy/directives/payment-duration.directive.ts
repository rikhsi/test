import { Directive, Host, DestroyRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { VacancyBaseForm, VacancyPaymentForm } from '../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { setValidatorsAndUpdate, toggleControlState } from '@shared/utils';

@Directive({
  selector: '[tPaymentDuration]',
})
export class PaymentDurationDirective implements AfterViewInit {
  get form(): FormGroup<VacancyBaseForm> {
    return this.fgDirective.form;
  }

  get paymentForm(): FormGroup<VacancyPaymentForm> {
    return this.form.controls.payment;
  }

  get duration() {
    return this.paymentForm.controls.duration;
  }

  get from() {
    return this.paymentForm.controls.from;
  }

  get to() {
    return this.paymentForm.controls.to;
  }

  get currency() {
    return this.paymentForm.controls.currency;
  }

  get type() {
    return this.paymentForm.controls.type;
  }

  constructor(
    @Host() private fgDirective: FormGroupDirective,
    private destroyRef: DestroyRef
  ) {}

  ngAfterViewInit(): void {
    this.initPaymentControl();
  }

  private initPaymentControl(): void {
    this.handleDurationChange(this.duration.value);

    this.duration.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.handleDurationChange(value));
  }

  private handleDurationChange(value: string): void {
    switch (value ?? 'NONE') {
      case 'NONE':
        toggleControlState(this.from);
        toggleControlState(this.to);
        toggleControlState(this.currency);
        toggleControlState(this.type);

        setValidatorsAndUpdate(this.from);
        setValidatorsAndUpdate(this.to);
        setValidatorsAndUpdate(this.currency);
        setValidatorsAndUpdate(this.type);

        this.paymentForm.reset(
          {
            type: 'MONTH',
            duration: 'NONE',
          },
          { emitEvent: false }
        );

        break;

      case 'ONE':
        toggleControlState(this.from, true);
        toggleControlState(this.currency, true);
        toggleControlState(this.type, true);
        toggleControlState(this.to);

        setValidatorsAndUpdate(this.from, [Validators.required]);
        setValidatorsAndUpdate(this.to);
        setValidatorsAndUpdate(this.currency, [Validators.required]);
        setValidatorsAndUpdate(this.type, [Validators.required]);

        this.to?.reset();

        break;

      case 'BOTH':
        this.from?.enable();
        this.to?.enable();
        this.currency?.enable();
        this.type?.enable();

        setValidatorsAndUpdate(this.from, [Validators.required]);
        setValidatorsAndUpdate(this.to, [Validators.required]);
        setValidatorsAndUpdate(this.currency, [Validators.required]);
        setValidatorsAndUpdate(this.type, [Validators.required]);

        break;
    }
  }
}
