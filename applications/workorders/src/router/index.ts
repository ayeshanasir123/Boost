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
        path: '/:tenantId/workorders/home',
        name: 'WorkordersHome',
        component: () => import('../views/home.vue')
    },
    {
        path: '/:tenantId/workorders/time',
        name: 'TimeReport',
        component: () => import('../views/time-report/index.vue')
    },
    {
        path: '/:tenantId/workorders/map',
        name: 'WorkorderMap',
        component: () => import('../views/workorder-map/index.vue')
    },
    {
        path: '/:tenantId/workorders',
        name: 'WorkorderList',
        component: () => import('../views/workorder-list/index.vue')
    },
    {
        path: '/:tenantId/workorders/:workorderUUID',
        name: 'WorkorderView',
        component: () => import('../views/workorder-view/index.vue')
    },
    {
        path: '/:tenantId/workorders/transtema',
        name: 'WorkorderListTranstema',
        component: () => import('../views/workorder-list-transtema/index.vue')
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