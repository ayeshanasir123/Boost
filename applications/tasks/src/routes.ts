import { beforeEnter as beforeEnterTaskList } from './views/task-list/before-enter';

export const routes = [
    {
        title: 'Home',
        name: 'home',
        component: () => import('./views/home.vue')
    },
    {
        title: 'Board',
        name: 'board',
        component: () => import('./views/task-board/index.vue'),
        topMenu: true,
    },
    {
        title: 'Focus',
        name: 'focus',
        component: () => import('./views/focus/index.vue'),
        topMenu: true,
    },

    {
        title: 'Inbox',
        name: 'inbox',
        component: () => import('./views/inbox/index.vue'),
        topMenu: true,
    },
    {
        title: 'Task list',
        path: '/',
        name: 'tasks',
        component: () => import('./views/task-list/index.vue'),
        topMenu: true,
        children: [{
            path: 'task/:id',
            name: 'task',
        }],
        beforeEnter: beforeEnterTaskList
    }
];