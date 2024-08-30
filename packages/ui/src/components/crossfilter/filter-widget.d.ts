import type { IDs } from './filter';
export type FilterWidget<T> = {
  name: string;
  filter: (string | number)[];
  items: any[]
  range: [number, number];
  setFilter(val: IDs): void;
  //  toggleFilter,
  //  hasFilter,
  //  getFilter,
};

export function useFilterWidget<T>(name: string, dimFn: (item: T) => [string | number, string][], dimOps?: {
  default?: (string | number)[],
  keepEmptyItems?: boolean,
  and?: boolean
}): FilterWidget<T>