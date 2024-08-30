import { useFilterWidget } from '../crossfilter/filter-widget';

type SelectItem = {
  id: string | number;
  originalTitle: string;
  title: string;
  group?: string;
  disabled?: boolean;
  count?: number
};

export function useSelectWidget<T>(widget: ReturnType<typeof useFilterWidget<T>>, options?: Record<string, any>): typeof widget & {
  sortedItems: SelectItem[]
};