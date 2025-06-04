import { Injectable } from '@angular/core';
import {
  JobExperienceService,
  WorkTimeService,
  WorkTypeService,
} from '@api/controllers';
import { forkJoin, map, Observable } from 'rxjs';
import { VcRequirement } from '../models';

@Injectable()
export class VacancyResourseService {
  constructor(
    private jeService: JobExperienceService,
    private wTimeService: WorkTimeService,
    private wTypeService: WorkTypeService
  ) {}

  public getRequirements$(): Observable<VcRequirement> {
    return forkJoin([
      this.jeService.getAll$(),
      this.wTypeService.getAll$(),
      this.wTimeService.getAll$(),
    ]).pipe(
      map(([experiences, workTypes, workTimes]) => ({
        experiences,
        workTypes,
        workTimes,
      }))
    );
  }
}
