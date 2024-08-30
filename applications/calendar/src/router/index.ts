import { createRouter, createWebHistory } from 'vue-router'

const localRoutes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home.vue')
    },
];

export const routes = [
  
    {
        path: '/:tenantId/calendar/home',
        name: 'CalendarHome',
        component: () => import('../views/home.vue')
    },
    {
        path: '/:tenantId/calendar',
        name: 'Calendar',
        component: () => import('../views/calendar/index.vue')
    },
   
];

export function createNewRouter(inShell: boolean) {
    if (!inShell) {
        routes.push(...localRoutes);
    }

    return createRouter({
        history: createWebHistory(),
        routes,
    });
}