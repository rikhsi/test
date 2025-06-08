import { MoneyBase, SelectItem } from '@typings';

export const PAYMENT_LIST: SelectItem<MoneyBase>[] = [
  {
    label: 'Сум',
    value: 'SUM',
  },
  {
    label: 'Доллар',
    value: 'DOLLAR',
  },
];
