import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  InputDefaultComponent,
  SelectDefaultComponent,
} from '@shared/components';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import {
  NzSegmentedComponent,
  NzSegmentedItemComponent,
} from 'ng-zorro-antd/segmented';
import { VacancyPaymentForm } from '../../models';

@Component({
  selector: 'test-vc-payment',
  imports: [
    SelectDefaultComponent,
    InputDefaultComponent,
    NzRadioComponent,
    NzRadioGroupComponent,
    NzSegmentedComponent,
    NzSegmentedItemComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './vc-payment.component.html',
  styleUrl: './vc-payment.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VcPaymentComponent {
  get paymentForm() {
    return <FormGroup<VacancyPaymentForm>>(
      this.fgDirective.form.controls['payment']
    );
  }

  get typeControl() {
    return this.paymentForm.controls.type;
  }

  constructor(private fgDirective: FormGroupDirective) {}
}
