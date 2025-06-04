import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FormLayoutService {
  readonly disableSubmit = signal<boolean>(true);
  readonly disableReset = signal<boolean>(false);

  readonly submit$ = new Subject<void>();
  readonly reset$ = new Subject<void>();
}
