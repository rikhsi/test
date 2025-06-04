import { Injectable, signal } from '@angular/core';
import { NgProgressbar } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  readonly progressState = signal<boolean>(false);

  toggleBar(component: NgProgressbar): void {
    if (this.progressState()) {
      component.progressRef.start();
    } else {
      component.progressRef.complete();
    }
  }
}
