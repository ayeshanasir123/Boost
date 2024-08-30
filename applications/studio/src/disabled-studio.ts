import './assets/main.css'

import { createApp } from 'vue'
import App from './BoostApp.vue'
import router from './router/boostAppRoutes'

export default function appCreate() {
    const app = createApp(App)
    app.use(router)
    return app;
}