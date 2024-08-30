export type Leaves<T> = T extends object ? { [K in keyof T]:
    `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`}`
}[keyof T] : never

import type { ComputedRef, Ref } from 'vue';

type TableColumn = string | (string | number)[];

export type CellDataType = string | number | null | undefined;
export type WritableCell = Ref<CellDataType>;
export type Cell = WritableCell | ComputedRef<CellDataType> | CellDataType;
export type TableRow = Cell[] & Record<string, any> | Record<string, Cell>;
export type WritableRow = (WritableCell[] & Record<string, any>) | Record<string, WritableCell>;

export type TableConfig = {
    header?: TableColumn[];
    data: ComputedRef<TableRow[]>;
    minRows?: number;
    newRow?: () => any,
    raw?: any[],
    tabstops?: string;
}