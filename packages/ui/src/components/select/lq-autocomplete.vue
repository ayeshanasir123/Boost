<script setup lang="ts">

defineOptions({ inheritAttrs: false });

import { ref, watch, reactive, useSlots, mergeProps, nextTick, computed, h, onMounted, type StyleValue } from 'vue';
import { jdom as $ } from '@boost/shared';
import LqDropdown from '../lq-dropdown.vue';
import LqCommonInput from '../lq-common-input.vue';
import type { TableConfig, WritableRow, CellDataType } from '../table/lq-table';
import LqEditGrid from '../table/lq-table.vue';
import LqInput from '../lq-input';
import type { AutocompleteConfig } from './lq-autocomplete';

const props = defineProps<{
    searchEmpty?: boolean;
    config: AutocompleteConfig;
    value?: string
    label?: string;
    required?: boolean;
    loading?: boolean;
}>();

const writableRef = { get: () => null, set: () => null };
Object.assign(writableRef, props.config.value);
const model = computed<string | undefined | null>(writableRef);

const search = ref<string>(model.value ?? ''); // displayed in the standalone input
model && watch(model, val => search.value = val ?? '');

const isOpen = defineModel<boolean>('open', { default: false });
const isInput = props.config.value !== undefined;

const emit = defineEmits<{
    'select-value': [row: CellDataType[] & Record<string, any>, idx: number]
}>();

const
    items = ref<TableConfig['data']>([] as unknown as TableConfig['data']),
    $input = $.input,
    $table = ref<InstanceType<typeof LqEditGrid>>(),
    $container = $.span
    ;

defineExpose({
    updateItems,
    container: $.container
});

const TableConfig: TableConfig = { header: props.config.header, data: computed(() => items.value) }

const vInput = {
    mounted($el: HTMLInputElement) {
        $container.add($el);
        if ($el.matches('input')) {
            $input.add($el);
        } else {
            $input.add($el.querySelector('input'));
        }
    }
}

onMounted(async () => {
    if (props.searchEmpty) {
        updateItems();
    }
});

async function updateItems() {
    items.value = await (await props.config.search($input.value)).value;
}

function onKeydown(e: KeyboardEvent) {
    if (isOpen.value) {
        if (['Enter', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
            $table.value?.dispatchKeys(e);
            if (['ArrowUp', 'ArrowDown'].includes(e.key) || !isInput) {
                e.stopImmediatePropagation();
            }
        }
    }
}

async function onInput() {
    items.value = await (await props.config.search($input.value)).value;
    if (isOpen.value) return;
    isOpen.value = true;
    await nextTick(); // allow the dialog to position
    $input.focus();
}


async function onRowActivate(item: WritableRow | null, idx: number) {
    isOpen.value = false;
    $input.focus();
    await nextTick();
    if (isInput) {
        model.value = item as unknown as string;
        search.value = model.value ?? '';
    }
    emit('select-value', item as unknown as CellDataType[], idx);
    $input.dispatchEvent(new Event('select-value', { target: $input }));
}

function onBlur() {
    if (props.value !== undefined) return;
    search.value = model.value ?? '';
}

function clear() {
    onRowActivate(null, -1);
}

</script>
<template>
    <lq-dropdown v-model:open="isOpen">
        <template #activator="props">
            <lq-input @input-clear="clear" v-model="search"
                :required :label
                width="300"
                :="mergeProps({ onKeydown, onInput, onBlur }, props, $attrs)">
                <lq-common-input v-input
                    :class="{ loading }" :readonly="searchEmpty && !items.length && !search.trim().length">
                    <template #prepend-inner v-if="searchEmpty && !items.length && !search.trim().length">
                        <div class="no-items-placeholder">Nothing to select...</div>
                    </template>
                </lq-common-input>
            </lq-input>
        </template>
        <lq-table ref="$table" readonly @row-activate="onRowActivate" :config="TableConfig"
            @add-button-click="isOpen = false, $emit('add-button-click')" :add-button="'add-button' in $attrs" />
        <div class="no-found" v-if="!items.length">No items found</div>
    </lq-dropdown>
</template>

<style scoped lang="scss">
.no-found {
    font-size: 12px;
    padding: 8px 16px;
}

.loading {
    opacity: .5;
    pointer-events: none;
}

.no-items-placeholder {
    display: none;
}

:deep(.v-field--focused) {
    .no-items-placeholder {
        display: block;
        width: 100%;
        position: absolute;
        color: #aaa;
        font-size: smaller;
        padding-left: 10px;
    }
}

:deep(.v-field) {
    background-color: white;
}

:deep(.v-field__outline__notch) {
    padding: 0;

    label {
        border-radius: 4px 4px 0 0;
        background-color: white;
        margin: 0 !important;
        padding: 0 8px;
    }
}
</style>