import { Injectable } from '@angular/core';
import { DistrictApiUrl } from '@api/constants';
import { DistrictItem } from '@api/models';
import { BaseApiService } from '@core/services';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DistrictService extends BaseApiService {
  getAll$(): Observable<DistrictItem[]> {
    return this.getQuery$(DistrictApiUrl.LIST);
  }

  getByRegion$(regionId: number): Observable<DistrictItem[]> {
    return this.getQuery$<DistrictItem[]>(DistrictApiUrl.LIST).pipe(
      map((districts) => districts.filter((item) => item.regionId === regionId))
    );
  }
}
