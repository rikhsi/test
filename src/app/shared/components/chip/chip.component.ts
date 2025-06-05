import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'test-chip',
  imports: [NzIconDirective],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  name = input.required<string>();
}
