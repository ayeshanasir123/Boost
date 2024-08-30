export const routes = [
    {
      path: '/home',
      name: 'OrganizationHome',
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
      path: '/items',
      name: 'item-list',
      title: "Items",
      component: () => import('./views/item-catalogue/index.vue'),
      topMenu: true
    },
    {
      path: '/organizations',
      name: 'OrganizationsList',
      component: () => import('./views/organization-list/index.vue'),
    },
    {
      path: '/organizations/:organizationUUID',
      name: 'OrganizationView',
      component: () => import('./views/organization-view/index.vue'),
    },
    {
      path: '/persons',
      name: 'PersonsList',
      component: () => import('./views/person-list/index.vue'),
    },
    {
      path: '/persons/:personUUID',
      name: 'PersonView',
      component: () => import('./views/person-view/index.vue'),
    },
];