import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzInputDirective } from 'ng-zorro-antd/input';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { ControlBaseDirective } from '@shared/directives';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'test-input-default',
  imports: [
    NzInputDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    FormsModule,
  ],
  templateUrl: './input-default.component.html',
  styleUrl: './input-default.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDefaultComponent extends ControlBaseDirective<string> {
  label = input<string>();
  placeholder = input<string>('');
  noColon = input<boolean>(true);
  size = input<NzSizeLDSType>('large');
  type = input<string>('text');
}
