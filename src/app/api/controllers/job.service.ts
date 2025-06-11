import { Injectable } from '@angular/core';
import { JobApiUrl } from '@api/constants';
import { FilterItem } from '@api/models';
import { BaseApiService } from '@core/services';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService extends BaseApiService {
  getAll$(): Observable<FilterItem[]> {
    return this.getQuery$(JobApiUrl.LIST);
  }

  getByPagination$(
    size: number,
    page: number,
    searchValue: string | null
  ): Observable<FilterItem[]> {
    return this.getQuery$<FilterItem[]>(JobApiUrl.LIST).pipe(
      map((items) => {
        let filtered = items;

        if (searchValue && searchValue.trim() !== '') {
          const value = searchValue.toLowerCase().trim();

          filtered = items.filter((item) =>
            item.name.toLowerCase().includes(value)
          );
        }

        const start = (page - 1) * size;
        const end = start + size;

        return filtered.slice(start, end);
      })
    );
  }
}
