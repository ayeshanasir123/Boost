// initialize-plugins.ts
import type { App } from 'vue';
import vuetify from "./vuetify";
import { i18n } from '@boost/ui';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { initializeStores } from '@boost/repository'; 
// <-- this file exports a function that does all store setups
import { createPinia } from 'pinia';
import pahoMqttPlugin from "./mqtt";

export function initializePlugins(app: App, inShell: boolean) {
  // Setup Vuetify
  app.use(vuetify);

  // Setup axios
  configureAxios();

  // Register axios with VueAxios
  app.use(VueAxios, axios);
  app.provide('axios', app.config.globalProperties.axios);
  
  // Setup i18n
  app.use(i18n);

  if (!inShell) {
    // Setup Pinia
    const pinia = createPinia();
    app.use(pinia);
    initializeStores(pinia);

    // Setup MQTT Plugin
    app.use(pahoMqttPlugin);
  }
}

function configureAxios() {
  // Here you can set up all the defaults for axios
  axios.defaults.withCredentials = true;
  
  // Example: Setting a common header like the Authorization header
  if (import.meta.env.DEV) {
    axios.defaults.headers.common['Authorization'] = import.meta.env.VITE_API_TOKEN;
  }

  // Example: Extracting the tenant ID from the URL and setting it as a default header
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pathSegments = url.pathname.split('/');
  axios.defaults.headers.common['X-Tenantid'] = pathSegments[1];
  
}
