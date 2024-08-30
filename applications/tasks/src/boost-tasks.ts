import { routes } from './routes';
import { createVueApp } from '@boost/ui';

export default function appCreate() {
    console.log(routes);

    return createVueApp({
        id: 'tasks',
        routes
    });
}

/*

import '@css/style.css';

import { createApp } from 'vue'
import App from './boost-app.vue'
import { createNewRouter , routes } from './router'
import { useRouterStateStore } from '@boost/repository';
import { initializePlugins } from './plugins/initialize-plugins'; 
import { useNavigationStore } from '@boost/repository';
import { MenuItem } from '@boost/repository';

export default function appCreate() {
    const app = createApp(App);

    initializePlugins(app, true);

    const navigationStore = useNavigationStore();
    
    navigationStore.addTopbarNavOption(new MenuItem('a', 'Dashboard', '/tasks/home', null, []));
    navigationStore.addTopbarNavOption(new MenuItem('b', 'Focus', '/tasks/focus', null, []));
    navigationStore.addTopbarNavOption(new MenuItem('b', 'Tasks', '/tasks', null, []));
    navigationStore.addTopbarNavOption(new MenuItem('b', 'Taskboard', '/tasks/board', null, []));

    const router = createNewRouter(true);    
    const routerStateStore = useRouterStateStore();
    
    //Manage parent route changes
    routerStateStore.$subscribe((mutation, state) => {
        if (state.currentRoute === null) {
            return;
        }

        if (router.currentRoute.value.path !== state.currentRoute.path && state.currentRoute.path.split('/')[2] == 'tasks') {
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