<template>
  <div ref="viewer"></div>
</template>
<style scoped>
div {
  width: 100%;
  height: calc(100vh - 65px);
}
</style>

<script setup>
import {ref, computed, onMounted } from 'vue';
import WebViewer from "@pdftron/pdfjs-express-viewer";
import {useDocumentStore} from '../../../stores/documentStore';
const documentStore = useDocumentStore();
// Props
const props = defineProps({
  path: String,
});


const files  = documentStore.filesData;

const fileNames = ref(files);
let docViewer = null;
const viewer = ref(null);

const currentFileIndex = ref(0);
const showCurrentFileIndex = ref(1);


const emit = defineEmits();

// Methods
const nextClick = () => {
  if (currentFileIndex.value < fileNames.value.length - 1) {
    currentFileIndex.value++;
    showCurrentFileIndex.value++;
    const nextFile = fileNames.value[currentFileIndex.value].url;
    emit('update-counters', {
      counterCurrent: currentFileIndex.value,
      counterTotal: fileNames.value.length
    });
    docViewer.loadDocument(nextFile);
  }
};

const previous = () => {
  if (currentFileIndex.value > 0) {
    currentFileIndex.value--;
    showCurrentFileIndex.value--;
    const previousFile = fileNames.value[currentFileIndex.value].url;
    emit('update-counters', {
      counterCurrent: currentFileIndex.value,
      counterTotal: fileNames.value.length
    });
    docViewer.loadDocument(previousFile);
  }
};

defineExpose({
  nextClick,
  previous,
});


// Lifecycle hook
onMounted(() => {
  const viewerElement = viewer.value;
  WebViewer({
    path: props.path,
    initialDoc: fileNames.value[0].url,
    licenseKey: 'VMeLR5MsW5lX3X9YfqQF',
    css: '/assets/pdfviewer.css',
    preloadWorker: 'all'
  }, viewerElement).then((instance) => {
    const {docViewer: instanceDocViewer, Core, UI} = instance;
    docViewer = instanceDocViewer;

    //UI.setTheme('dark');

    Core.documentViewer.addEventListener("documentLoaded", () => {
      // Handle document loaded event
    });

    Core.documentViewer.addEventListener("pageNumberUpdated", (pageNumber) => {
      // Handle page number updated event
    });
  });
});
</script>