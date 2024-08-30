import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'SomeView',
        component: () => import('../views/SomeView.vue'),
    },
];

export function createNewRouter() {
    return createRouter({
        history: createWebHistory(),
        routes,
    });
}