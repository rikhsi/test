import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'test-box-content',
  imports: [NgClass],
  templateUrl: './box-content.component.html',
  styleUrl: './box-content.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxContentComponent {
  name = input.required<string>();
  required = input<boolean>();
}
