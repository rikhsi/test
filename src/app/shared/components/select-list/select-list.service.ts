import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable()
export class SelectListService {
  searchControl = new FormControl<string>(null);

  selectedItemValue = signal<any>(null);

  search$ = new Subject<string>();
}
