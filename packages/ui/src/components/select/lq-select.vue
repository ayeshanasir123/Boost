<script setup lang="ts">
import { ref, computed, nextTick, isReactive, isRef, reactive, watch, onMounted } from 'vue';
import LqAutocomplete from './lq-autocomplete.vue';
import type { AutocompleteConfig } from './lq-autocomplete'

type Item = { id: number | string, title: string, count?: number };

const props = defineProps<{
    items: (string | Item)[] | Set<string | Item> | Record<string | number, string>
}>();

const items = reactive<Item[]>([]);

const model = defineModel<number | string | null>({ required: true });

const $autocomplete = ref<InstanceType<typeof LqAutocomplete>>();

watch(() => props.items, async from => {

    items.length = 0;
    let to: (string | Item)[] = [];

    if (Array.isArray(from)) {
        to = from;
    } else if (from instanceof Set) {
        to = [...from];
    } else if (typeof props.items === 'object') {
        to = Object.entries(from).map(([id, title]) => ({ id, title }));
    }

    items.push(...to.map(item => typeof item === 'string' ? { id: item, title: item } : item));
    await nextTick();
    $autocomplete.value?.updateItems();
}, { deep: true, immediate: true });

const item = computed(() => items.find(item => item.id === model.value));

const config: AutocompleteConfig = {
    value: {
        get: () => item.value?.title,
        set: row => model.value = row?.item.id || null
    },
    search: async (what: string) => computed(() => {
        if (what === item.value?.title) {
            what = '';
        }
        return items.filter(({ title }) => what ? title.toLowerCase().includes(what.toLowerCase()) : true).map(item => {
            if ('count' in item) {
                return Object.assign([item.title, item.count], { item });
            }
            return Object.assign([item.title], { item });
        });
    })
};

</script>
<template>
    <lq-autocomplete ref="$autocomplete" :config dropdown-button search-empty />
</template>