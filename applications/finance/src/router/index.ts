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
        path: '/:tenantId/finance/home',
        name: 'FinanceHome',
        component: () => import('../views/home.vue')
    },
    {
        path: '/:tenantId/finance/expenses',
        name: 'Expenses',
        component: () => import('../views/expenses/index.vue')
    },
    {
        path: '/:tenantId/finance/payment-collection',
        name: 'PaymentCollection',
        component: () => import('../views/payment-collection/index.vue')
    },
    {
        path: '/:tenantId/finance/payment-processing',
        name: 'PaymentProcessing',
        component: () => import('../views/payment-processing/index.vue')
    },
    {
        path: '/:tenantId/finance/sales-invoices',
        name: 'SalesInvoiceList',
        component: () => import('../views/sales-invoice-list/index.vue')
    },
    {
        path: '/:tenantId/finance/sales-invoices/:salesInvoiceUUID',
        name: 'SalesInvoiceView',
        component: () => import('../views/sales-invoice-view/index.vue')
    },
    {
        path: '/:tenantId/finance/settings',
        name: 'Settings',
        component: () => import('../views/settings/index.vue')
    },
    {
        path: '/:tenantId/finance/supplier-invoices',
        name: 'SupplierInvoiceList',
        component: () => import('../views/supplier-invoice-list/index.vue')
    },
    {
        path: '/:tenantId/finance/supplier-invoices/:supplierInvoiceUUID',
        name: 'SupplierInvoiceView',
        component: () => import('../views/supplier-invoice-view/index.vue')
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