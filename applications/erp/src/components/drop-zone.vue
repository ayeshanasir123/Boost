<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Dropzone from 'dropzone'
import type { Ref } from 'vue'

const props = defineProps({
  paramName: {
    type: String,
    required: true
  }
})

const dropRef: Ref<HTMLElement | null> = ref(null)

const customPreview: string = `
        <div class="d-flex flex-wrap dz-preview dz-processing dz-image-preview dz-complete pt-5">
          <div class="dz-image pr-3">
          </div>
          <div class="dz-details d-flex w-100">
              <div class="pr-5">
                <img data-dz-thumbnail />
              </div>
              <div>
                <div class="dz-filename"><span data-dz-name></span></div>
                <div class="dz-size"><span data-dz-size></span></div>
              </div>
            </div>
            <div class="dz-progress">
              <span class="dz-upload" data-dz-uploadprogress></span>
            </div>
            <div class="dz-success-mark">
                <i class="bi bi-check-circle-fill" style="font-size: 2rem; color: green;"></i>
            </div>
            <div class="dz-error-mark">
                <i class="bi bi-exclamation-circle-fill" style="font-size: 2rem; color: red;"></i>
          </div>
        </div>
      `;

onMounted(() => {
  if (dropRef.value) {
    new Dropzone(dropRef.value, {
      url: 'https://erp.qeeping.se/services/file.cfc?method=dropzone',
      method: 'POST',
      paramName: props.paramName,
      previewTemplate: customPreview,
      previewsContainer: dropRef.value.parentElement?.querySelector('.preview-container'),
    })

    const dzDefault = dropRef.value.querySelector('.dz-default')
    if (dzDefault) {
      dzDefault.innerHTML = `
              <div style="display: flex; justify-content: center;">
                <span class="material-symbols-outlined pt-3 pb-2">upload</span>
              </div>
              <p class="pb-3" style="text-align: center; margin: 0; font-size:14px;">Släpp filer här som du vill koppla till ärendet. Du kan även klicka här för att välja en fil.</p>
            `;
    }
  }
})
</script>

<style scoped>
.w300px {
  width: 300px;
}

.custom-dropzone {
  border-style: dashed;
  border-color: #cccccc;
  border-width: 1px;
  padding: 10px;
  background-color: #f5f5f5;
}
</style>

<template>
  <div>
    <div ref="dropRef" class="dropzone custom-dropzone"></div>
    <div class="dropzone preview-container"></div>
  </div>
</template>
