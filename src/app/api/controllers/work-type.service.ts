import { Injectable } from '@angular/core';
import { WorkTypeApiUrl } from '@api/constants';
import { FilterItem } from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkTypeService extends BaseApiService {
  getAll$(): Observable<FilterItem[]> {
    return this.getQuery$(WorkTypeApiUrl.LIST);
  }
}
