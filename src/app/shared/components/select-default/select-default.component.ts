import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'test-select-default',
  imports: [],
  templateUrl: './select-default.component.html',
  styleUrl: './select-default.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectDefaultComponent {

}
