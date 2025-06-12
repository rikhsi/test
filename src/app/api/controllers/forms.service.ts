import { Injectable } from '@angular/core';
import { FormsApiUrl } from '@api/constants';
import { FormItem } from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormsService extends BaseApiService {
  getAll$(): Observable<FormItem[]> {
    return this.getQuery$(FormsApiUrl.LIST);
  }
}
