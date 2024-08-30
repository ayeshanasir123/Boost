<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onMounted } from "vue";
import LqInput from './lq-input';
import Quill from 'quill';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const props = defineProps<{
    label?: string,
    required?: boolean,
    delta: any
}>();

const emits = defineEmits(['update:delta']);

const model = defineModel<string | null>();

const editor = ref<HTMLDivElement>();
const $wrapper = ref<HTMLDivElement>();

let quill: Quill;

onMounted(async () => {
    quill = new Quill(editor.value!, {
        theme: 'snow'
    });

    if (props.delta) {
        quill.setContents(props.delta);
    } else {
        quill.setText(model.value ?? '');
    }

    quill.on('text-change', () => {
        model.value = quill.getText();
        emits('update:delta', quill.getContents());
    });
    // const $container = $wrapper.value!.querySelector('.ql-container')!;
    // $container.addEventListener('mousedown', (e: MouseEvent) => {
    //     if (e.target === $container) {
    //         //quill.focus();
    //     }
    // });
});

watch(() => props.delta, (newDelta) => {
    if (JSON.stringify(newDelta) !== JSON.stringify(quill.getContents())) {
        quill.setContents(newDelta);
    }
});
</script>

<template>
    <lq-input :label :required>
        <div ref="$wrapper" class="lq-text-editor">
            <div ref="editor"></div>
        </div>
    </lq-input>
</template>

<style scoped lang="scss">
:deep(.ql-editor) {
    min-height: 180px;
    //cursor: text;
}
.lq-text-editor{
    position: relative;
    &:has(.ql-editor:focus){
        &:after{
            content: '';
            position: absolute;
            inset: 0;
            border: 2px solid black;
            border-radius: 2px;
        }
    }
}
</style>