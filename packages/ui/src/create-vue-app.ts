import { createApp } from 'vue';
import { RouterView, createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import { initializeVueAppPlugins } from './plugins/initialize-vue-app';
import { useRouterStateStore } from '@boost/repository';
import { useNavigationStore } from "@boost/repository";
import { MenuItem } from '@boost/repository';

interface Route extends Pick<RouteRecordRaw, 'component'> {
    localPath?: string, // internal, do not use
    path?: string, // if omitted the name is used
    name: string, // kebab case, only the name of the child, the parent's name is prepended
    // for example name: 'items', the route name will be 'parent-name.items'
    title: string, // all routes should have a title
    children?: Route[],
    topMenu?: boolean // whether to display the route in <boost-header>'s menu
}

type VueAppConfig = {
    id: string,
    routes: Route[]
}

// Map to keep track of initialized apps
const initializedApps = new Map<string, boolean>();

export function createVueApp(config: VueAppConfig) {
    const { id: appId, routes } = config;
    const app = createApp(RouterView);

    // Check if the app was initialized before
    if (!initializedApps.has(appId)) {
        parseRoutes(routes);
        initializedApps.set(appId, true);
    }

    const router = createRouter({
        history: createWebHistory(),
        routes: routes as RouteRecordRaw[],
    });

    const routerStateStore = useRouterStateStore();
    const navigationStore = useNavigationStore();
    
    routes.filter(route => route.topMenu).forEach(route => {
        navigationStore.addTopbarNavOption(new MenuItem(
            route.name,
            route.title,
            route.path!,
            null, [], false
        ));
    });

    //Manage parent route changes
    routerStateStore.$subscribe((mutation, state) => {
        if (state.currentRoute === null) {
            return;
        }

        if (router.currentRoute.value.path !== state.currentRoute.path && state.currentRoute.path.split('/')[2] === appId) {
            router.push(state.currentRoute.path);
        }
    });

    router.afterEach((to) => {
        routerStateStore.setRoute(to);
    });

    initializeVueAppPlugins(app);
    app.use(router);
    return app;

    function parseRoutes(routes: Route[], parent?: Route) {
        for (const route of routes) {
            if (!('path' in route)) {
                route.path = route.name;
            }
            route.localPath = route.path;

            if (parent) {
                route.name = parent.name + '.' + route.name;
            } else {
                route.path = '/:tenantId/' + appId + (route.path![0] === '/' ? '' : '/') + route.path;
            }
            route.children && parseRoutes(route.children, route);
        }
    }

}

