import { Injectable } from '@angular/core';
import { LanguageApiUrl } from '@api/constants';
import { FilterItem } from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends BaseApiService {
  getAll$(): Observable<FilterItem[]> {
    return this.getQuery$(LanguageApiUrl.LIST);
  }
}
