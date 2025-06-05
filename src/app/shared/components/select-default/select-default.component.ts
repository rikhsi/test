import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SelectItem } from '@typings';
import { NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { ControlBaseDirective } from '@shared/directives';

@Component({
  selector: 't-select-default',
  templateUrl: './select-default.component.html',
  styleUrl: './select-default.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzSelectModule,
    NzFormItemComponent,
  ],
})
export class SelectDefaultComponent extends ControlBaseDirective<NzSafeAny> {
  label = input<string>('');
  options = model<SelectItem<NzSafeAny>[]>([]);
  placeholder = input<string>('Выберите варианты');
  size = input<NzSizeLDSType>('large');
  noColon = input<boolean>(true);
}
