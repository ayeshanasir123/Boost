import { routes } from './routes';
import { createVueApp } from '@boost/ui';

export default function appCreate() {
    return createVueApp({
        id: 'erp',
        routes
    });
}


/*
import '@css/style.css';

import { createApp } from 'vue'
import { RouterView } from 'vue-router';
import { createNewRouter } from './router'
import { useRouterStateStore } from '@boost/repository';
import { useNavigationStore } from "@boost/repository";
import { routes } from './router';
import { initializePlugins } from './plugins/initialize-plugins'; 
import { MenuItem } from '@boost/repository';

export default function appCreate() {
    const app = createApp(RouterView);

    initializePlugins(app, true);

    const router = createNewRouter(true);    
    const routerStateStore = useRouterStateStore();
    
    const navigationStore = useNavigationStore();
    navigationStore.clearTopbarNav();
    navigationStore.addTopbarNavOption(new MenuItem('a', 'Testar', '/', null, []));
      
    //Manage parent route changes
    routerStateStore.$subscribe((mutation, state) => {
        if (state.currentRoute === null) {
            return;
        }

        if (router.currentRoute.value.path !== state.currentRoute.path && state.currentRoute.path.split('/')[2] == 'erp') {
            router.push(state.currentRoute.path);
        }        
    });

    router.afterEach((to) => {
        routerStateStore.setRoute(to);
      });

      app.use(router);
    return app;
}

export { routes };
*/