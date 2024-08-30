import type { Crossfilter } from 'crossfilter2';

export type IDs = (string | number)[] | 'default';

export function useFilter<T>(source?: Crossfilter<T> | Array<T>): {
  setFilter(filter: Record<string, IDs>): void,
  //dimension, clear,
  update(items: T | T[]),// updates 1 item or array of items,
  //remove, getItems, toggleSelected, getSelected, isAllSelected, on, //listens for filter events
  trigger(events: string, ...args: any[]), //triggers filter events
  //triggerCb,
  //group, //creates a new automatically updated crossfilter based on aggregated data,
  reload(items: T[]): void, //reload data in crossfilter completely
};
