export type SelectItem<T = number> = {
  label: string;
  value: T;
};

export interface CardItem<T> extends SelectItem<T> {
  icon: string;
}
