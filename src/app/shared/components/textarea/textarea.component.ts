import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
} from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { ControlBaseDirective } from '@shared/directives';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import {
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormControlComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'test-textarea',
  imports: [
    NzInputDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    FormsModule,
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent
  extends ControlBaseDirective<string>
  implements Validator, AfterViewInit
{
  label = input<string>();
  placeholder = input<string>('');
  noColon = input<boolean>(true);
  size = input<NzSizeLDSType>('large');

  validate(control: AbstractControl): ValidationErrors | null {
    this.validate$.next(control);

    return null;
  }

  ngAfterViewInit(): void {
    this.initValidation();
  }
}
