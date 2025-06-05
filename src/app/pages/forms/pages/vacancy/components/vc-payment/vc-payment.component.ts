import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  InputDefaultComponent,
  SelectDefaultComponent,
} from '@shared/components';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import {
  NzSegmentedComponent,
  NzSegmentedItemComponent,
} from 'ng-zorro-antd/segmented';

@Component({
  selector: 'test-vc-payment',
  imports: [
    SelectDefaultComponent,
    InputDefaultComponent,
    NzRadioComponent,
    NzRadioGroupComponent,
    NzSegmentedComponent,
    NzSegmentedItemComponent,
  ],
  templateUrl: './vc-payment.component.html',
  styleUrl: './vc-payment.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VcPaymentComponent {}
