// import { routes } from './routes';
import { routes } from './routes';
import { createVueApp } from '@boost/ui';

export default function appCreate() {
    return createVueApp({
        id: 'accounting',
        routes
    });
}


// import '@css/style.css';

// import { createApp } from 'vue'
// import App from './boost-app.vue'
// import { createNewRouter } from './router'
// import { useRouterStateStore } from '@boost/repository';
// import { routes } from './router';
// import { initializePlugins } from './plugins/initialize-plugins'; 

// export default function appCreate() {
//     const app = createApp(App);

//     initializePlugins(app, true);

//     const router = createNewRouter(true);    
//     const routerStateStore = useRouterStateStore();
    
//     //Manage parent route changes
//     routerStateStore.$subscribe((mutation, state) => {
//         if (state.currentRoute === null) {
//             return;
//         }

//         if (router.currentRoute.value.path !== state.currentRoute.path && state.currentRoute.path.split('/')[2] == 'accounting') {
//             router.push(state.currentRoute.path);
//         }        
//     });

//     router.afterEach((to) => {
//         routerStateStore.setRoute(to);
//       });
          
//     app.use(router);
//     return app;
// }

// export { routes };