import { Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from '@typings';

@Pipe({
  name: 'languageSelected',
})
export class LanguageSelectedPipe implements PipeTransform {
  transform(value: SelectItem[], selected: SelectItem[]): SelectItem[] {
    if (!Array.isArray(value)) return [];

    const selectedValues = new Set(selected?.map((item) => item.value));

    return value.filter((item) => !selectedValues.has(item.value));
  }
}
