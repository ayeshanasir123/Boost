export const routes = [
    {
      path: '/home',
      name: 'Home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/items/:itemUUID',
      title: "Create/View sales order",
      name: 'item-view',
      component: () => import('./views/item-view/index.vue'),
      props: to => ({ itemUUID: to.params.itemUUID })
      },  
    {
      path: '/asset-management',
      // title: "Create/View sales order",
      name: 'AssetManagement',
      component: () => import('./views/asset-management/index.vue')
      }, 
      {
        path: '/bank-transactions',
        name: 'BankTransactions',
        component: () => import('./views/bank-transactions/index.vue')
    },
    {
        path: '/chart-of-accounts',
        name: 'ChartOfAccounts',
        component: () => import('./views/chart-of-accounts/index.vue')
    },
    {
        path: '/accounting/fics',
        name: 'FICS',
        component: () => import('./views/fics/index.vue')
    },
    {
        path: '/journal-entry',
        name: 'JournalEntry',
        component: () => import('./views/journal-entry/index.vue')
    },
    {
        path: '/ledger',
        name: 'Ledger',
        component: () => import('./views/ledger/index.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('./views/settings/index.vue')
    },   
    // {
    //     path: "/:FiscalYearUUID",
    //     name: "fiscal-view",
    //     title: "Create/View Project",
    //     component: () => import("./views/fiscal-view/index.vue"),
    //     props: to => ({ FiscalYearUUID: to.params.FiscalYearUUID }),
        
    //   },
    {
      path: "/:fiscalYearUUID",
      name: "fiscal-view",
      title: "Create/View Project",
      component: () => import("./views/fiscal-view/index.vue"),
      props: to => ({ fiscalYearUUID: to.params.fiscalYearUUID }),
    }
    
];