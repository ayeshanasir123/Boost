<script setup lang="ts">

import { reactive, ref, watch, nextTick } from 'vue';
type Item = { id: number | string, title: string, count?: number };

const props = defineProps<{
    items: (string | Item)[] | Set<string | Item> | Record<string | number, string>
}>();

const items = reactive<Item[]>([]);

const model = defineModel<number | string | null>({ required: true });

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
}, { deep: true, immediate: true });


</script>
<template>
    <div class="route-tabs">
        <v-card class="router-block">
            <v-btn class="route-tab" v-for="item in items" :active="model === item.id" @click="model = item.id">{{
                // @ts-ignore
                item.title
            }}</v-btn>
        </v-card>
    </div>
</template>

<style scoped lang="scss">
.route-tabs {
    display: flex;
}

.router-block {
    box-shadow: none;
}

.route-tab {
    border-radius: 0;
    border: none;
    box-shadow: none;
}
</style>