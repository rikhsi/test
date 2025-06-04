import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { VacancyResourseService } from '../services';

export const requirementResolver: ResolveFn<any> = () => {
  const vrService = inject(VacancyResourseService);

  return vrService.getRequirements$();
};
