import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
} from '@angular/core';
import { NzInputDirective } from 'ng-zorro-antd/input';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { ControlBaseDirective } from '@shared/directives';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import {
  AbstractControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'test-input-default',
  imports: [
    NzInputDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    FormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './input-default.component.html',
  styleUrl: './input-default.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDefaultComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDefaultComponent),
      multi: true,
    },
  ],
})
export class InputDefaultComponent
  extends ControlBaseDirective<string>
  implements Validator
{
  label = input<string>();
  placeholder = input<string>('');
  noColon = input<boolean>(true);
  size = input<NzSizeLDSType>('large');

  mask = input<string>(null);
  separator = input<string>(' ');

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }
}
