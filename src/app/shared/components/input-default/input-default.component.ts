import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'test-input-default',
  imports: [],
  templateUrl: './input-default.component.html',
  styleUrl: './input-default.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDefaultComponent {

}
