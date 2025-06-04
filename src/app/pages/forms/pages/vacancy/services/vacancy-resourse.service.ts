import { Injectable } from '@angular/core';
import {
  JobExperienceService,
  WorkTimeService,
  WorkTypeService,
} from '@api/controllers';
import { FilterItem } from '@api/models';
import { forkJoin, Observable } from 'rxjs';

@Injectable()
export class VacancyResourseService {
  constructor(
    private jeService: JobExperienceService,
    private wTimeService: WorkTimeService,
    private wTypeService: WorkTypeService
  ) {}

  getRequirements$(): Observable<Array<FilterItem>[]> {
    return forkJoin([
      this.jeService.getAll$(),
      this.wTypeService.getAll$(),
      this.wTimeService.getAll$(),
    ]);
  }
}
