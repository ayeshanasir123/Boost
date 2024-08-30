<script setup lang="ts">
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';
import { LqCommonInput } from '@boost/ui';
//import type {File as lqFile} from '@boost/repository';
const inputKey = ref(0);
const $input = ref<HTMLInputElement>();

const $emit = defineEmits<{
    add: [file: File]
}>();

async function onChange(e: InputEvent) {
    const files = [...(e.target as HTMLInputElement).files as any as File[]];
    for (const file of files) {
        $emit('add', file);
    }
    inputKey.value++;
}

</script>
<template>

    <div class="lq-file-input">
        <lq-common-input ref="$input" type="file" multiple @change="onChange" :key="inputKey" />
        <div class="hint">Drag files to here or click (space) to open a file select dialog</div>
    </div>
</template>

<style scoped lang="scss">
.lq-file-input {
    position: relative;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;

    &:hover {
        background-color: #eee;
    }

    :deep(.lq-common-input) {
        position: absolute;
        inset: 0 !important;

        input {
            position: absolute;
            inset: 0;
            cursor: pointer;
            opacity: .01;
        }
    }


}
</style>