import { createRouter, createWebHistory } from 'vue-router'

const localRoutes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home.vue')
    },
];

const routes = [
  
    {
        path: '/:tenantId/pim/products',
        name: 'ProductList',
        component: () => import('../views/product-list/index.vue')
    },
   
    {
        path: '/:tenantId/pim/products/:productUUID',
        name: 'ProductView',
        component: () => import('../views/product-view/index.vue')
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