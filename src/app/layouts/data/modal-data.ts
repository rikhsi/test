import { ConfirmModal } from '@typings';

export const RESET_MODAL_DATA: ConfirmModal = {
  title: 'Очистка формы',
  description: 'Это действие обнулит форму!',
  cancel: {
    title: 'Отмена',
    danger: false,
  },
  submit: {
    title: 'Согласие',
    danger: true,
  },
};

export const SUBMIT_MODAL_DATA: ConfirmModal = {
  title: 'Подтвердить форму',
  description: 'Это действие сохранить форму!',
  cancel: {
    title: 'Отмена',
    danger: false,
  },
  submit: {
    title: 'Согласие',
    danger: false,
  },
};
