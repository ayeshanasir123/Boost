import type { TableConfig, TableRow } from '../table/lq-table';

export interface AutocompleteConfig {
    header?: TableConfig['header'];
    search: (search: string) => Promise<TableConfig['data']>;
    value?: {
        get(): string | undefined | null, // a value to display in the text box
        set(row: TableRow): void // a row from the dropdown's grid, use it to assign its values to something that would provide the value for the getter above
    };
};