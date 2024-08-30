import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SomeView',
      component: () => import('../views/SomeView.vue'),
    }
  ]
})

export default router
