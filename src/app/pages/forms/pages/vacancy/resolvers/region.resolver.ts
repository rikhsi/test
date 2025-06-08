import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { RegionService } from '@api/controllers';
import { FilterItem } from '@api/models';

export const regionResolver: ResolveFn<FilterItem[]> = () => {
  const vrService = inject(RegionService);

  return vrService.getAll$();
};
