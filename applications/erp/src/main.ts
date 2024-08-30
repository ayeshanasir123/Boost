// import './assets/style.css';
import '@css/style.css';

import { createApp } from 'vue';

import { initializePlugins } from './plugins/initialize-plugins'; 

import App from './app.vue';
import { createNewRouter } from './router';

const app = createApp(App);

initializePlugins(app, false);

app.use(createNewRouter(false));

app.mount('#app');