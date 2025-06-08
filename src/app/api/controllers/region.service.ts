import { Injectable } from '@angular/core';
import { RegionApiUrl } from '@api/constants';
import { FilterItem } from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionService extends BaseApiService {
  getAll$(): Observable<FilterItem[]> {
    return this.getQuery$(RegionApiUrl.LIST);
  }
}
