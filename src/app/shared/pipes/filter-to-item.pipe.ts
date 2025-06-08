import { Pipe, PipeTransform } from '@angular/core';
import { FilterItem } from '@api/models';
import { filterToSelect } from '@shared/utils';
import { SelectItem } from '@typings';

@Pipe({
  name: 'fti',
})
export class FilterToItemPipe implements PipeTransform {
  transform(value: FilterItem[]): SelectItem<number>[] {
    return filterToSelect(value);
  }
}
