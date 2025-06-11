import { Injectable, signal } from '@angular/core';
import { JobService } from '@api/controllers';
import { FilterItem } from '@api/models';
import { filterToSelect } from '@shared/utils';
import { SelectItem } from '@typings';
import { debounceTime, Observable, Subject, switchMap, tap } from 'rxjs';

@Injectable()
export class VacancyJobService extends JobService {
  readonly page = signal<number>(1);
  readonly size = signal<number>(20);
  readonly isLoading = signal<boolean>(false);

  readonly search$ = new Subject<string>();

  readonly options = signal<SelectItem[]>([]);

  initSearch$(): Observable<FilterItem[]> {
    return this.search$.pipe(
      tap(() => this.isLoading.set(true)),
      debounceTime(1000),
      switchMap((value) =>
        this.getByPagination$(this.size(), this.page(), value)
      ),
      tap((options) => {
        this.options.set(filterToSelect(options));
        this.size.update((current) => current + 20);
        this.isLoading.set(false);
      })
    );
  }
}
