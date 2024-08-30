<script setup>
import { useNavigationStore } from "@boost/repository";
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute from vue-router

const navigationStore = useNavigationStore();

const name = location.pathname.split('/')[2];
const apps = import.meta.glob('../../applications/*/src/boost-*.ts');

let currentApp = null;
const loading = ref(true); // To manage the loading state
const error = ref(null);   // To manage any error that occurs

const route = useRoute(); // Get the current route

const loadApp = async () => {
  try {
    for (const path in apps) {
      const appName = path.split('/')[3]; // Get the directory name of the application
      if (appName === name) {
        const appCreate = (await apps[path]()).default;
        currentApp = appCreate(route);
        currentApp.mount('#micro-app');
        console.log(`Mounted ${name}`);
        //loading.value = false; // Ensure loading state is set to false
        break;
      }
   }
  } catch (err) {
    console.error(`Failed to load app: ${err.message}`);
    error.value = `Failed to load app: ${err.message}`;
  }
};

onMounted(loadApp);

onUnmounted(() => {
  if (currentApp) {
    currentApp.unmount();
    console.log('App unmounted');
    navigationStore.clearTopbarNav();    
  }
});
</script>

<template>
  <div id="micro-app">
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<style scoped>
</style>
