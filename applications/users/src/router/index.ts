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
        path: '/:tenantId/tasks/home',
        name: 'TaskHome',
        component: () => import('../views/home.vue')
    },
    {
        path: '/:tenantId/tasks/task-board',
        name: 'TaskBoard',
        component: () => import('../views/task-board/index.vue')
    },
    {
        path: '/:tenantId/tasks/task-board',
        name: 'TaskBoard',
        component: () => import('../views/task-board/index.vue')
    },
  
    {
        path: '/:tenantId/tasks/focus',
        name: 'Focus',
        component: () => import('../views/focus/index.vue')
    },
   
    {
        path: '/:tenantId/tasks/inbox',
        name: 'Inbox',
        component: () => import('../views/inbox/index.vue')
    }, {
        path: '/:tenantId/tasks/task-list',
        name: 'Tasklist',
        component: () => import('../views/task-list/index.vue')
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