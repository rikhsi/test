import { Injectable } from '@angular/core';
import { LevelApiUrl } from '@api/constants';
import { LevelItem } from '@api/models';
import { BaseApiService } from '@core/services';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LevelService extends BaseApiService {
  getAll$(): Observable<LevelItem[]> {
    return this.getQuery$(LevelApiUrl.LIST);
  }

  getByLanguage$(languageId: number): Observable<LevelItem[]> {
    return this.getQuery$<LevelItem[]>(LevelApiUrl.LIST).pipe(
      map((languages) =>
        languages.filter((item) => item.languageId === languageId)
      )
    );
  }
}
