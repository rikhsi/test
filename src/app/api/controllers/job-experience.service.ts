import { Injectable } from '@angular/core';
import { JobExperienceApiUrl } from '@api/constants';
import { FilterItem } from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobExperienceService extends BaseApiService {
  getAll$(): Observable<FilterItem[]> {
    return this.getQuery$(JobExperienceApiUrl.LIST);
  }
}
