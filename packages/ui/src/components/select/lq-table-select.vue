<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, reactive, useAttrs, watch, ref } from 'vue';
import { type TableSelectConfig, type AutocompleteConfig, LqAutocomplete } from '@boost/ui';

const props = defineProps<{
    config: TableSelectConfig<T>
    items: T[]
}>();

const model = defineModel<number | string | null>({ required: true });
const $autocomplete = ref<InstanceType<typeof LqAutocomplete>>();
watch(props.items, () => {
    $autocomplete.value?.updateItems();
}, { deep: true });

const items = computed(() => props.items.map(props.config.getRow));

const config: AutocompleteConfig = {
    header: props.config.header,
    value: {
        get: () => items.value.find(({ item }) => item.id === model.value)?.item.title,
        set: row => {
            model.value = row?.item.id ?? null
        }
    },
    search: async (what: string) => computed(() => {
        return items.value.filter(item => what ? Object.values(item).join(' ').toLowerCase().includes(what.toLowerCase()) : true);
    })
};

</script>
<template>
    <lq-autocomplete ref="$autocomplete" :dropdown-button="items.length" search-empty :config :="$attrs" />
</template>