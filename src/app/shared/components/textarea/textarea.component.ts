import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlBaseComponent } from '@shared/helpers';
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
})
export class TextareaComponent extends ControlBaseComponent<string> {
  label = input<string>();
  placeholder = input<string>('');
  noColon = input<boolean>(true);
  size = input<NzSizeLDSType>('large');
}
