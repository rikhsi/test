import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { VacancyResourseService } from '../services';
import { VcRequirement } from '../models';

export const requirementResolver: ResolveFn<VcRequirement> = () => {
  const vrService = inject(VacancyResourseService);

  return vrService.getRequirements$();
};
