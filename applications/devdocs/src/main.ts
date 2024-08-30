import './assets/style.css'

import { createApp } from 'vue'

import { initializePlugins } from './plugins/initializePlugins'; 

import App from './App.vue'
import { createNewRouter } from './router'

const app = createApp(App)

initializePlugins(app, false);

app.use(createNewRouter(false));

app.mount('#app')