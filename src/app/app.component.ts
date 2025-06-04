import { Component, effect, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressService } from '@core/services';
import { NgProgressbar } from 'ngx-progressbar';

@Component({
  selector: 'test-root',
  imports: [RouterOutlet, NgProgressbar],
  template: `
    <ng-progress [ariaLabel]="'progress'" [spinner]="false" />

    <router-outlet />
  `,
})
export class AppComponent {
  progressBar = viewChild(NgProgressbar);

  constructor(private pService: ProgressService) {
    effect(() => this.pService.toggleBar(this.progressBar()));
  }
}
