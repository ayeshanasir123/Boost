export const routes = [
    {
        path: '/home',
        name: 'DocumentHome',
        component: () => import('./views/home.vue')
    },
    {
        path: '/',
        name: 'DocumentList', 
        component: () => import('./views/document-list/index.vue')
    },
    {
        path: '/:documentId',
        name: 'DocumentView',
        component: () => import('./views/document-view/index.vue')
    },
];