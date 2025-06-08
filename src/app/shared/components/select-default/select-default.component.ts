import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { ControlBaseDirective } from '@shared/directives';
import { SelectItem } from '@typings';

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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDefaultComponent),
      multi: true,
    },
  ],
})
export class SelectDefaultComponent extends ControlBaseDirective<NzSafeAny> {
  options = input<SelectItem<NzSafeAny>[]>([]);

  label = input<string>('');
  placeholder = input<string>('Выберите варианты');
  size = input<NzSizeLDSType>('large');
  noColon = input<boolean>(true);
}
