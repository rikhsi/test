import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'test-vacancy',
  imports: [],
  templateUrl: './vacancy.component.html',
  styleUrl: './vacancy.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyComponent {}
