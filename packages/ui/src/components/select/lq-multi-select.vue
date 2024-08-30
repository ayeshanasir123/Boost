<script setup lang="ts">
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';

const props = defineProps<{

}>();

const value = defineModel<string | number | null>('value');
const values = reactive<(string | number)[]>([]);

watch(value, async () => {
    if (!value.value) return;
    values.push(value.value);
    await nextTick();
    value.value = null;
});

</script>
<template>
    <slot :="{ items, value }">
        <lq-select :items v-model="value" />
    </slot>
    <div>{{ values }}</div>
</template>