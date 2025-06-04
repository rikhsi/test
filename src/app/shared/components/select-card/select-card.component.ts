import {
  ChangeDetectionStrategy,
  Component,
  Host,
  input,
  Optional,
} from '@angular/core';
import { ControlBaseComponent } from '@shared/helpers';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';

@Component({
  selector: 'test-select-card',
  imports: [NzIconDirective, NzRadioComponent],
  templateUrl: './select-card.component.html',
  styleUrl: './select-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCardComponent extends ControlBaseComponent<NzSafeAny> {
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
