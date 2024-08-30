<script setup lang="ts">
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';
import LqInput from './lq-input';
defineProps<{
    label?: string,
    required?: boolean,
}>();

const model = defineModel<string>();
const $area = ref<HTMLTextAreaElement>();

onMounted(() => {
    watch(model, () => {
        const area = $area.value!;
        const height = area.scrollHeight;
        if (height > area.offsetHeight) {
            area.style.height = height + 3 + 'px';
        }
    }, { flush: 'post', immediate: true });
});

</script>
<template>
    <lq-input :required :label v-model="model" width="300">
        <div>
            <textarea ref="$area" v-model="model"></textarea>
        </div>
    </lq-input>
</template>

<style scoped lang="scss">
textarea {
    background: white;
    font-size:14px;
    width: 100%;
    padding: 8px 16px 6px 16px;
    border: .8px solid rgba(0, 0, 0, .38);
    border-radius: 2px;
}
</style>