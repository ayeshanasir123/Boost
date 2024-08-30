export const routes = [
    {
        path: '/home',
        name: 'home',
        title: 'Flow',
        component: () => import('./views/home.vue')
    },
    {
        path: '/',
        name: 'flowchart-list',
        title: 'Whiteboards',
        component: () => import('./views/flow-chart-list/index.vue'),
        topMenu: true
    },
    { 
        path: '/:id',  
        name: 'flowchart-view',
        title: 'Flowchart View',
        component: () => import('./views/flow-chart/index.vue')
    },
  ];