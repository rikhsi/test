import { Injectable } from '@angular/core';
import { WorkTimeApiUrl } from '@api/constants';
import { FilterItem } from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkTimeService extends BaseApiService {
  getAll$(): Observable<FilterItem[]> {
    return this.getQuery$(WorkTimeApiUrl.LIST);
  }
}
