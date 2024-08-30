import './assets/main.css'

import { createApp } from 'vue'

import { initializePlugins } from './plugins/initializePlugins'; 

import App from './App.vue'
import router from './router'

const app = createApp(App)

initializePlugins(app, false);

app.use(router)

app.mount('#app')