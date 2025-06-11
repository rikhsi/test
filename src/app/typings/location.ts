import { FormControl } from '@angular/forms';

export type LocationBaseForm = {
  region: FormControl<number>;
  district: FormControl<number>;
  address: FormControl<string>;
  coords: FormControl<number[]>;
};
