import { FilterItem } from '@api/models';
import { SelectItem } from '@typings';

export function filterToSelect(value: FilterItem[]): SelectItem<number>[] {
  return value.map(({ name, id }) => ({
    label: name,
    value: id,
  }));
}
