import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'test-item-label',
  imports: [],
  templateUrl: './item-label.component.html',
  styleUrl: './item-label.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemLabelComponent {
  label = input.required<string>();
}
