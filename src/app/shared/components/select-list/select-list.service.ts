import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectItem } from '@typings';

@Injectable()
export class SelectListService {
  readonly searchControl = new FormControl<string>(null);
  readonly selectedOptions = signal<SelectItem[]>([]);
}
