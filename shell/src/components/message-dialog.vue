<script setup lang="ts">
import { ref } from 'vue';
defineProps<{
  title: string;
  message: string;
  debugInfo?: object
}>();
const showDebugInfo = ref(false);
</script>
<template>
  <dialog open>
    <h1>{{ title }}</h1>
    <div class="content">
      {{ message }}
    </div>
    <div v-if="debugInfo">
      <div class="debug-toolbar">
        <button class="btn btn-small bg-blue" @click="showDebugInfo = !showDebugInfo">Show debug info</button>
      </div>
      <div v-if="showDebugInfo" class="debug-info">
        <pre>{{ JSON.stringify(debugInfo, null, 4) }}</pre>
      </div>
    </div>
  </dialog>
</template>

<style scoped lang=scss>
dialog {
  margin: auto;
  margin-top: 200px;
  padding: 32px;
  border: 1px solid #aaa;
  background-color: white;
  color: #555;

  &.error {
    h1 {
      color: red;
    }
  }

  h1 {
    font-size: 22px;

  }

  .debug-toolbar {
    margin: 8px 0;
    display: flex;
    justify-content: right;
    gap: 16px;

    button {
      padding: 4px 8px;
    }
  }

  .debug-info {
    font-size: 13px;
    max-height: 300px;
    max-width: calc(100vw - 128px);
    overflow: auto;
  }
}
</style>