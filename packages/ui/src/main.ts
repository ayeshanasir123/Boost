import '@css/style.css';

import { createApp } from 'vue'

import { initializePlugins } from './plugins/initializePlugins'; 

import App from './App.vue'
import router from './router'

console.log('boost-ui main.ts');

const app = createApp(App)

initializePlugins(app);

app.use(router)

app.mount('#app')
