import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:tenantId/studio',
            name: 'StudioView',
            component: () => import('../views/StudioView/index.vue'),
        },
    ]
})

export default router
