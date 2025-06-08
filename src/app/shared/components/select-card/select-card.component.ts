import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Host,
  input,
  Optional,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlBaseDirective } from '@shared/directives';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';

@Component({
  selector: 'test-select-card',
  imports: [NzIconDirective, NzRadioComponent],
  templateUrl: './select-card.component.html',
  styleUrl: './select-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCardComponent),
      multi: true,
    },
  ],
})
export class SelectCardComponent extends ControlBaseDirective<NzSafeAny> {
  name = input.required<string>();
  cardId = input.required<NzSafeAny>();
  icon = input<string>('question');

  constructor(@Optional() @Host() private radioGroup: NzRadioGroupComponent) {
    super();
  }

  override modelChange(value: NzSafeAny): void {
    if (!this.radioGroup) {
      const toggleValue = value ? null : value;

      this.value.set(toggleValue);
      this.onChange?.(toggleValue);
    }
  }
}
