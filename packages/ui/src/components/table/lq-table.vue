<script setup lang="ts">
import { ref, isRef, h, watch, reactive, nextTick, unref, computed, isReadonly, useSlots } from 'vue';
import type { TableConfig, TableRow, Cell, WritableCell, WritableRow, CellDataType } from './lq-table';
import LqTableRowMenu from './lq-table-row-menu.vue';
import LqTextInput from '../lq-text-input.vue';
import LqDatepicker from '../datetime/lq-datepicker.vue';
import { jdom as $ } from '@boost/shared';

const types = new Set(['date', 'datetime', 'time', 'number']);
type TableColumnType = 'date' | 'datetime' | 'time' | 'number';
type TableColumn = Partial<{
    title: string
    width: number | string
    type: TableColumnType,
    model: boolean
}>;

const props = defineProps<{
    config: TableConfig,
    debug?: boolean,
    addButton?: boolean,
}>();

const log = (...msg: any[]) => {
    if (!props.debug) return;
    console.log(...msg);
}

const $slots = useSlots();
const items = props.config.data;

const self = {
    dispatchKeys: (e: KeyboardEvent) => (onInputKeydown(e), self),
    assign, assignRow, selectCell
};
defineExpose(self);

const emit = defineEmits<{
    'row-activate': [row: WritableRow, index: number];
}>();


type Indices = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
defineSlots<{
    [K in Indices as `cell[${K}]`]: (props: {
        value: string,
        row: WritableRow,
        table: typeof self
    }) => void
}>();

const $table = $.table;

const currentIdx = ref(items.value.length ? 0 : -1);
const currentCellIdx = ref(-1);
const columns = reactive<TableColumn[]>([]);


props.config.header && watch(() => props.config.header, header => {
    columns.push(...header!.map(col => {
        let title, type, width;
        if (Array.isArray(col)) {
            for (const prop of col) {
                if (typeof prop === 'string') {
                    if (prop.match(/^[\d.]+%$/)) {
                        width = prop;
                    } else if (types.has(prop)) {
                        type = prop;
                    } else title = prop;
                } else {
                    width = prop;
                }
            }
        } else {
            title = col;
        }
        return {
            title,
            type,
            width
        } as TableColumn;
    }));
}, { immediate: true, deep: true });


const formatters = {
    date: (date: Date) => date?.toLocaleDateString('sv-SE') ?? ''
} as Record<string, (v: any) => string>;

const $elems = {
    get inputs() {
        return [...$table.rows].slice(1).flatMap(row => [...row.querySelectorAll('input')]);
    },
    isLastInput(input: HTMLInputElement | null) {
        if (!input) return false;
        const { inputs } = this;
        return inputs.indexOf(input) === inputs.length - 1;
    },
    get focusedInput() {
        return $table.querySelector('input:focus') as HTMLInputElement | null;
    },
    nextInput(input: HTMLInputElement | null = null) {
        input ??= this.focusedInput;
        if (!input) return null;
        const { inputs } = this;
        const idx = inputs.indexOf(input) + 1;
        if (idx < inputs.length) {
            return inputs[idx];
        }
        return null;
    },
    prevInput(input: HTMLInputElement | null = null) {
        input ??= this.focusedInput;
        if (!input) return null;
        const { inputs } = this;
        const idx = inputs.indexOf(input) - 1;
        if (idx >= 0) {
            return inputs[idx];
        }
        return null;
    }
};

if (props.config.raw && props.config.minRows !== 0) {

    watch(() => items.value.length, length => {
        const min = (props.config.minRows ?? 3);
        if (length < min) {
            while (++length <= min) addRow(length, false);
        }
    }, { immediate: true });

    const lastRowNonEmpty = () => Object.values(items.value[items.value.length - 1] ?? {})?.map((cell: Cell) => {
        const value = unref(cell);
        if (value === '' || value === null || value === undefined) return 0;
        return 1;
    }).reduce((r, n) => r + n, 0 as number);

    watch(lastRowNonEmpty, val => {
        val && addRow(items.value.length);
    }, { immediate: true });
}

watch([currentIdx, currentCellIdx], async ([_, cellIdx]) => {
    await nextTick()
    const $row = $table.querySelector('tr.active') as HTMLTableRowElement;
    const $input = $row.cells[Math.max(0, cellIdx)].querySelector('input') as HTMLInputElement;
    const { focusedInput } = $elems;
    if (focusedInput !== $input) {
        $input?.focus();
        await new Promise(r => setTimeout(r));
    }
    $input?.select();
    $row.scrollIntoView({ block: 'nearest' });
});

function assignRow(row: WritableCell[], data: Cell[], ...mapIndices: number[]) {
    for (let i = 0; i < data.length; i++) {
        row[mapIndices[i] ?? i]!.value = unref(data[i]);
    }
    return self;
}

function assign(row: WritableRow, data: Record<string, any> | CellDataType[]) {
    if (Array.isArray(data)) {
        for (const [idx, val] of data.entries()) {
            row[idx].value = val;
        }
    } else {
        for (const k in data) {
            row[k].value = data[k];
        }
    }
    return self;
}

async function selectCell(idx: number | string) {
    if (!items.value.length) return;
    await nextTick();
    let $input: HTMLInputElement | null;
    if (idx === ':next') {
        $input = $elems.nextInput();
    } else if (idx === ':prev') {
        $input = $elems.prevInput();
    } else {
        if (typeof idx === 'string') {
            idx = Object.keys(items.value[0]).indexOf(idx);
        }
        $input = $table.querySelector(`tr:has(input:focus) td:nth-child(${idx + 1}) input`) as HTMLInputElement | null;
    }
    $input?.focus();
    $input?.select();
    return self;
}

function toRow(row: TableRow) {
    const cells = Array.isArray(row) ? row : Object.values(row);
    return cells.slice(0, props.config.header?.length ?? cells.length);
}

function onInputKeydown(e: KeyboardEvent) {
    if (!items.value.length) return;
    // const { selectionStart, selectionEnd, value } = $elems.focusedInput!;
    // if (0 && selectionStart === selectionEnd) {
    //   if (e.key === 'ArrowLeft' && !selectionStart) {
    //     selectCell(':prev');
    //   } else if (e.key === 'ArrowRight' && selectionEnd === value.length) {
    //     selectCell(':next');
    //   }
    // }
    const delta = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0;
    if (delta) {
        let { value } = currentIdx, { length } = items.value;
        value += delta;
        if (value >= length) value = length - 1;
        else if (value < 0) value = 0;
        currentIdx.value = value;
    } else if (e.key === 'Enter' || e.key === 'Tab') {
        if (e.key === 'Enter') {
            const { value: idx } = currentIdx;
            if (idx > -1) {
                emit('row-activate', items.value[idx] as WritableRow, idx);
            }
        }
    }
}

function formatValue(value: any, idx: number) {
    let type = columns[idx]?.type ?? '';
    if (!type && value instanceof Date) {
        type = 'date';
    }
    return formatters[type]?.(value) ?? value ?? '';
}

function cellComponent(cell: Cell, idx: number) {
    const keys = Object.keys(items.value[0]);

    for (const k in $slots) {
        const [name, ...modifiers] = k.split('.');
        if (modifiers.includes('model')) {
            (columns[idx] ??= {}).model = true;
        }
        if (name === `cell[${idx}]` || name === `cell:${keys[idx]}`) {
            const comp = $slots[k];
            return comp;
        }
    }
    const col = (columns[idx] ??= {});
    if (col.type === 'date') {
        col.width = 80;
        col.model = true;
        return LqDatepicker;
    }
    return LqTextInput;
}

function cellProps(idx: number) {
    const props = {};
    const col = columns[idx];
    if (col) {
        if (typeof col.width === 'number') {
            props.width = col.width;
        }
    }
    return props;
}

function componentProps(cell: WritableCell, idx: number) {

    const out: any = {};

    const col = columns[idx] ?? {};

    if (props.config.tabstops) {
        const stops = props.config.tabstops.match(/\S+/g);
        const names = Object.keys(items.value[0]);
        if (!stops?.includes(names[idx])) {
            out.tabindex = -1;
        }
    }

    out.width = "100%";
    out.modelValue = cell.value;
    out['onUpdate:modelValue'] = (value: any) => {
        cell.value = value;
    }
    return out;
}

function addButtonClick(e: MouseEvent) {
    e.target!.dispatchEvent(new Event('add-button-click', {
        bubbles: true
    }));
}

async function addRow(idx: number, focus = true) {
    const { newRow, raw } = props.config;
    raw!.splice(idx, 0, newRow?.() ?? {});
    if (!focus) return;
    currentIdx.value = idx;
    currentCellIdx.value = -1;
    await nextTick();
    selectCell(':next');
}

function moveRow(idx: number, delta: -1 | 1) {
    const raw = props.config.raw!;
    [raw[idx + delta], raw[idx]] = [raw[idx], raw[idx + delta]];
    currentIdx.value = idx + delta;
}

</script>
<template>
    <table ref="$table"
        class="lq-edit-table table table-bordered gs-0 mb-0 fw-bold text-black-700 mycl gridTableForData"
        style="background-color: white">
        <thead v-if="config.header">
            <tr class="fs-7 fw-bold text-black-700">
                <th class="text-left text-black" v-for="({ title }, index) in columns" :key="index"
                    style="white-space: nowrap;">
                    {{ title }}
                    <span class="add-button" @click="addButtonClick"
                        v-if="addButton && index === config.header.length - 1">+</span>
                </th>
                <th v-if="config.raw"></th>
            </tr>
        </thead>
        <tbody id="tablestyle" ref="gridTableForData">
            <tr v-for="(row, idx) in items" :key="idx" :class="{ active: currentIdx === idx }"
                @click="currentIdx = idx, emit('row-activate', row as WritableRow, idx)">
                <template v-for="(cell, cellIdx) in toRow(row)" :key="cellIdx">
                    <td :="cellProps(cellIdx)">
                        <div v-if="!isRef(cell) || isReadonly(cell)" class="readonly gridInput"
                            :class="{ number: typeof (cell) === 'number' }" v-html="formatValue(cell, cellIdx)"></div>
                        <component v-else :is="cellComponent(cell, cellIdx)" :="componentProps(cell, cellIdx)"
                            class="gridInput" :row :table="self"
                            @focusin="currentIdx = idx, currentCellIdx = cellIdx"
                            @keydown="onInputKeydown($event as KeyboardEvent)" />
                    </td>
                </template>
                <lq-table-row-menu v-if="config.raw" :idx :length="items.length" @add-above="addRow(idx)"
                    @add-below="addRow(idx + 1)"
                    @move-up="moveRow(idx, -1)" @move-down="moveRow(idx, 1)" @delete="config.raw!.splice(idx, 1)"
                    @focusin="currentIdx = idx, currentCellIdx = config.header.length" />
            </tr>
        </tbody>
    </table>
</template>
<style scoped lang="scss">
.lq-edit-table {
    thead {
        z-index: 1;
        position: sticky;
        top: -1px;
        letter-spacing: 0.6px;

        th:has(.add-button) {
            position: relative;
            padding-right: 48px;
        }

        .add-button {
            user-select: none;
            opacity: .6;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            background: green;
            cursor: pointer;
            width: 32px;
            font-size: 28px;
            color: white;
            text-align: center;
            line-height: 34px;

            &:hover {
                opacity: .7;
            }

        }
    }

    tbody {
        > tr {
            > td {
                height: 32px !important;
                padding: 0 !important;

                > div {
                    white-space: nowrap;
                }
            }

            &:not(:has(input)) {
                cursor: pointer;

                &:hover {
                    td {
                        position: relative;

                        &:after {
                            content: '';
                            background-color: rgba(0, 0, 0, .1);
                            pointer-events: none;
                            position: absolute;
                            inset: 0;
                        }
                    }
                }
            }

            &.active > td {
                background-color: rgba(225, 225, 65, 0.12) !important;

                &:has(:focus) {
                    position: relative;

                    &:before {
                        content: '';
                        z-index: 1;
                        pointer-events: none;
                        position: absolute;
                        inset: 0;
                        border: 1px solid #aaa;
                    }
                }
            }
        }
    }
}

:deep(.lq-common-input>.outline) {
    display: none !important;
}

:deep(.gridInput) {
    color: black;
    border: 0;
    height: 35px;
    line-height: 35px;
    width: 100%;
    font-size: 12px !important;
    border: none !important;
    outline: none !important;
    position: relative;

    &.readonly {
        padding: 0 10px;
    }

    &.readonly.number {
        text-align: right;

        &:after {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: rgba(0, 128, 255, .05);
        }
    }

    input {
        color: black;
        border: 0;
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        width: 100%;
        font-size: 12px;
        border: none !important;
        outline: none !important;
        padding: 0 10px !important;
    }

    label {
        display: none;
    }

}
</style>
