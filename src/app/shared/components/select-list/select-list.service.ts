import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class SelectListService {
  readonly searchControl = new FormControl<string>(null);
}
