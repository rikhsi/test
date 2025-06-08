import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { VcRequirement } from '../models';
import {
  JobExperienceService,
  WorkTimeService,
  WorkTypeService,
} from '@api/controllers';
import { forkJoin, map } from 'rxjs';

export const requirementResolver: ResolveFn<VcRequirement> = () => {
  const jeService = inject(JobExperienceService);
  const wTimeService = inject(WorkTimeService);
  const wTypeService = inject(WorkTypeService);

  return forkJoin([
    jeService.getAll$(),
    wTypeService.getAll$(),
    wTimeService.getAll$(),
  ]).pipe(
    map(([experiences, workTypes, workTimes]) => ({
      experiences,
      workTypes,
      workTimes,
    }))
  );
};
