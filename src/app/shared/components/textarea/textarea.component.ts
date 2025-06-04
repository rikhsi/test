import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'test-textarea',
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent {

}
