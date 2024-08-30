<script lang="ts">
export type Location = [string, Record<string, any>] | string | undefined | null;
</script>
<script setup lang="ts">
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';

import { useRouter } from 'vue-router';
const router = useRouter();


const props = defineProps<{
    label?: string,
    action?: Location | ((...args: any[]) => Promise<Location | void | number> | Location | void | number),
    class?: string
}>();

const error = defineModel<string>('error');

const loading = ref(false);

async function onClick() {
    try {
        error.value = '';
        const result = typeof props.action === 'function' ? (loading.value = true) && await props.action() : props.action;
        if (typeof result === 'string') {
            router.push({ name: result });
        } else if (Array.isArray(result)) {
            router.push({ name: result[0], params: result[1] });
        } else if (typeof result === 'number') {
            router.go(result);
        }

    } catch (e) {
        error.value = (e as Error).message;
    } finally {

        loading.value = false;
    }
}

</script>
<template>
    <button
        class="action-button"
        :loading="loading"
        @click="onClick"
        :class="props.class">
        <slot>{{ label }}</slot>
    </button>
</template>

<style scoped>
.action-button {
 background-color: #4CAF50;
 text-transform: none !important;
 font-weight: 400;
 font-size: 13px;
 border-top-left-radius: 0px;
 border-top-right-radius: 0px;
 border-bottom-left-radius: 0px;
 border-bottom-right-radius: 0px;
 color:white;
}

.cancel {
    color: black;
    background-color: white;
    border: 1px solid #ccc;
}
</style>
