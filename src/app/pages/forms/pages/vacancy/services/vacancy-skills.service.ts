import { Injectable, signal } from '@angular/core';
import { SkillsService } from '@api/controllers';
import { FilterItem } from '@api/models';
import { filterToSelect } from '@shared/utils';
import { SelectItem } from '@typings';
import { Subject, Observable, tap, debounceTime, switchMap } from 'rxjs';

@Injectable()
export class VacancySkillsService extends SkillsService {
  readonly page = signal<number>(1);
  readonly size = signal<number>(20);
  readonly isLoading = signal<boolean>(false);
  readonly selectedOptions = signal<SelectItem[]>([]);

  readonly search$ = new Subject<string>();

  readonly options = signal<SelectItem[]>([]);

  onSelect(id: number): void {
    const findedItem = this.options().find((item) => item.value === id);

    this.selectedOptions.update((current) => [...current, findedItem]);
  }

  onRemove(id: number): void {
    this.selectedOptions.update((current) =>
      current.filter((item) => item.value !== id)
    );
  }

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
