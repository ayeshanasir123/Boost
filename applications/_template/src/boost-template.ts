import './assets/style.css'

import { createApp } from 'vue'
import App from './BoostApp.vue'
import { createNewRouter } from './router/boostAppRoutes'
import { useRouterStateStore } from '@boost/repository';
import { initializePlugins } from './plugins/initializePlugins'; 

export default function appCreate() {
    const app = createApp(App);

    initializePlugins(app, true);

    const router = createNewRouter();    
    const routerStateStore = useRouterStateStore();
    
    //Manage parent route changes
    routerStateStore.$subscribe((mutation, state) => {
        if (state.currentRoute === null) {
            return;
        }

        if (router.currentRoute.value.path !== state.currentRoute.path && state.currentRoute.path.split('/')[2] == 'template') {
            router.push(state.currentRoute.path);
        }        
    });

    app.use(router);
    return app;
}