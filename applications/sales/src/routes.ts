import path from 'path';
import { beforeEnter as beforeEnterSalesOrderView } from './views/sales-order-view/before-enter';

export const routes = [
    {
        path: '/home',
        name: 'home',
        title: 'Sales',
        component: () => import('./views/home.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        title: 'Dashboard',
        component: () => import('./views/dashboard/index.vue'),
        topMenu: true
    },
    {
        path: '/sales-orders',
        name: 'sales-orders',
        title: 'Sales orders',
        component: () => import('./views/sales-order-list/index.vue'),
        topMenu: true
    },
    {
        path: '/sales-orders/:salesOrderUUID',
        title: "Create/View sales order",
        name: 'sales-order',
        component: () => import('./views/sales-order-view/index.vue'),
        props: route => ({ salesOrderUUID: route.params.salesOrderUUID }),
        beforeEnter: beforeEnterSalesOrderView,
        children: [
            {
                title: 'Order Header',
                name: 'header',
                component: () => import('./views/sales-order-view/header.vue'),
            },
            {
                title: 'Line Items',
                name: 'items',
                component: () => import('./views/sales-order-view/items.vue'),
            },
            // {
            //     path: 'details',
            //     title: 'Order details',
            //     name: 'sales-order.details',
            //     component: () => import('./views/sales-order-view/details.vue'),
            // },
            // {
            //     path: 'relationships',
            //     title: 'Relationships',
            //     name: 'sales-order.relationships',
            //     component: () => import('./views/sales-order-view/relationships.vue'),
            // }, 
            // {
            //     path: 'payments',
            //     title: 'Payments',
            //     name: 'sales-order.payments',
            //     component: () => import('./views/sales-order-view/payments.vue'),
            // }, 
            // {
            //     path: 'shipments',
            //     title: 'Shipments',
            //     name: 'sales-order.shipments',
            //     component: () => import('./views/sales-order-view/shipments.vue'),
            // },
            // {
            //     path: 'log',
            //     title: 'Log',
            //     name: 'sales-order.log',
            //     component: () => import('./views/sales-order-view/log.vue'),
            // },
            // {
            //     path: 'history',
            //     title: 'Customer order history',
            //     name: 'sales-order.history',
            //     component: () => import('./views/sales-order-view/history.vue'),
            // },
        ]
    }
];

// export function createNewRouter(inShell: boolean) {
//     if (!inShell) {
//         routes.push(...localRoutes);
//     }

//     return createRouter({
//         history: createWebHistory(),
//         routes,
//     });
// }