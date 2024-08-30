<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onMounted } from "vue";
import Quill from 'quill';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const { modelValue } = defineProps({
  label: String,
  color: String,
  modelValue: null, // Use appropriate type or validator here
  locale: {
    type: String,
    default: "en",
  },
});

const editor = ref<HTMLElement | null>(null);

const quillEditor = ref<Quill>();

const emit = defineEmits({
  "update:modelValue": null,
});

const isMenuOpen = ref(false);
const selectedDate = ref(modelValue);

watch(modelValue, (newDate) => {
  selectedDate.value = newDate;
});

watch(selectedDate, (newDate) => {
  emit("update:modelValue", newDate);
  isMenuOpen.value = false;
});

onMounted(() => {
    if (editor.value) {
        quillEditor.value = new Quill(editor.value, {
        theme: 'snow'
      });
    }
});

</script>

<style scoped>
</style>

<template>
<div ref="editor"></div>
</template>
