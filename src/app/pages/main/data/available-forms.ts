import { CardItem, FormView } from '@typings';

export const AVAILABLE_FORMS: CardItem<FormView>[] = [
  {
    label: 'Создать вакансию',
    value: 'vacancy',
    icon: 'apartment',
  },
  {
    label: 'Создать резюме',
    value: 'resume',
    icon: 'file-pdf',
  },
];
