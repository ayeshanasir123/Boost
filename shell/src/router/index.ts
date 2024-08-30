import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue';
import AppLoader from '../app-loader.vue';
import HtmlLoader from '../html-loader.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:tenantId/html',
      name: 'html',
      component: HtmlLoader
    },
    {
      path: '/:tenantId/',
      name: 'tenanthome',
      component: HomeView
    },
    {
      path: '/:tenantId/:pathMatch(flow.*)*',
      name: 'flow',
      component: () => Promise.resolve(AppLoader)
    },
    {
      path: '/:tenantId/:pathMatch(erp.*)*',
      name: 'erp',
      component: () => Promise.resolve(AppLoader)
    },
    {
      path: '/:tenantId/:pathMatch(doc.*)*',
      name: 'doc',
      component: () => Promise.resolve(AppLoader)
    },
    {
      path: '/:tenantId/:pathMatch(accounting.*)*',
      name: 'acc',
      component: () => Promise.resolve(AppLoader)
    },
    {
      path: '/:tenantId/:pathMatch(finance.*)*',
      name: 'finance',
      component: () => Promise.resolve(AppLoader)
    },
    {
      path: '/:tenantId/:pathMatch(pim.*)*',
      name: 'pim',
      component: () => Promise.resolve(AppLoader)
    },
    {
      path: '/:tenantId/:pathMatch(tasks.*)*',
      name: 'tasks',
      component: () => Promise.resolve(AppLoader)
    },
    {
      path: '/:tenantId/:pathMatch(workorders.*)*',
      name: 'workorders',
      component: () => Promise.resolve(AppLoader)
    },    
    {
      path: '/:tenantId/:pathMatch(projects.*)*',
      name: 'projects',
      component: () => Promise.resolve(AppLoader)
    },   
    {
      path: '/:tenantId/:pathMatch(sales.*)*',
      name: 'sales',
      component: () => Promise.resolve(AppLoader)
    },
    {
      path: '/:tenantId/:pathMatch(calendar.*)*',
      name: 'calendar',
      component: () => Promise.resolve(AppLoader)
    }   
  ]
})

export default router