import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'test-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
