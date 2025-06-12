import { Injectable, signal } from '@angular/core';
import { SelectItem } from '@typings';

@Injectable()
export class VacancyLanguageService {
  selectedOptions = signal<SelectItem[]>([]);

  onPush([type, level]: [SelectItem, SelectItem]): void {
    this.selectedOptions.update((current) => [
      ...current,
      {
        label: `${type.label} (${level.label})`,
        value: type.value,
      },
    ]);
  }

  onRemove(optionId: number): void {
    this.selectedOptions.update((current) =>
      current.filter((c) => c.value !== optionId)
    );
  }
}
