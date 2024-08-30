import type { TableConfig, TableRow } from '@boost/ui';
export type TableSelectConfig<T> = {
    header?: TableConfig['header'],
    getRow: (row: T) => TableRow
}