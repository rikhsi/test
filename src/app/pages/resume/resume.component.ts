import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'test-resume',
  imports: [],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent {}
