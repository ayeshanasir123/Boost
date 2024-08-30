<script setup lang="ts">
import { watch, type Component, shallowRef } from 'vue';
const props = defineProps<{
    component: () => { default: Component },
    on: boolean
}>();

const comp = shallowRef<Component>();

watch(() => props.on, async val => {
    if (val) {
        comp.value = (await props.component()).default;
    } else {
        comp.value = null;
    }
}, { immediate: true });

</script>
<template>
    <component :is="comp" :="$attrs" />
</template>