<script setup>
import { useNavigationStore } from "@boost/repository";
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute from vue-router
import { boostApi } from '@boost/shared';

const navigationStore = useNavigationStore();

const iframeSrc = ref('https://services02.luqon.net/dn/boost/bus.cfm?id=' + location.pathname);

const name = location.pathname.split('/')[2];

let currentApp = null;
const loading = ref(true); // To manage the loading state
const error = ref(null);   // To manage any error that occurs

const route = useRoute(); // Get the current route

onMounted(() => {
    console.log('HTML page loaded');
});

onUnmounted(() => {
    console.log('HTML page unloaded');
  // Clean-up if necessary
});
</script>

<template>
  <div id="iframe-container">
    <iframe :src="iframeSrc" ref="iframe" @load="onIframeLoad"></iframe>
  </div>
</template>

<style scoped>
#iframe-container {
  position: fixed;
  top: 48px;
  left: 0;
  width: 100%;
  height: calc(100% - 48px);
  overflow: hidden;
  margin: 0;
  padding: 0;
  border: none;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
