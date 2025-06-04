import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'test-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
