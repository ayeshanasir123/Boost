//import '@boost/ui/dist/style.css';

import { createApp } from 'vue'
import { initializePlugins } from './plugins/initializePlugins';

import { useRouterStateStore } from '@boost/repository';
import { useNavigationStore } from '@boost/repository';
import { MenuItem } from '@boost/repository';

import App from './app.vue';
import MessageDialog from './components/message-dialog.vue';
import router from './router'

const app = createApp(App)
try {
  
  initializePlugins(app);

  app.use(router)

  const routerStateStore = useRouterStateStore();
  const navigationStore = useNavigationStore();

  navigationStore.addMainMenuOption(new MenuItem('a', 'Accounting', '/accounting/home', null, []));
  navigationStore.addMainMenuOption(new MenuItem('b', 'Calendar', '/calendar/home', null, []));
  navigationStore.addMainMenuOption(new MenuItem('c', 'Document Center', '/doc/home', null, []));
  navigationStore.addMainMenuOption(new MenuItem('d', 'ERP', '/erp/home', null, []));
  navigationStore.addMainMenuOption(new MenuItem('e', 'Finance', '/finance/home', null, []));
  navigationStore.addMainMenuOption(new MenuItem('f', 'Flow', '/flow', null, []));
  navigationStore.addMainMenuOption(new MenuItem('g', 'PIM', '/pim/home', null, []));
  navigationStore.addMainMenuOption(new MenuItem('h', 'Projects', '/projects/home', null, []));
  navigationStore.addMainMenuOption(new MenuItem('i', 'Sales', '/sales/home', null, []));
  navigationStore.addMainMenuOption(new MenuItem('i', 'Tasks', '/tasks/home', null, []));
  navigationStore.addMainMenuOption(new MenuItem('i', 'Workorders', '/workorders/home', null, []));
  navigationStore.addMainMenuOption(new MenuItem('i', 'Test', '/html', null, []));
  router.afterEach((to) => {
    routerStateStore.setRoute(to);
  });

  app.mount('#app')

} catch (e: any) {
  const app = createApp(MessageDialog, { title: 'Shell loading is failed', message: e.message, class: 'error', debugInfo: e });
  app.mount('#app');
}
