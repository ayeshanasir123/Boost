import { ref } from 'vue';
import { defineStore } from 'pinia';

// Define the store using the same format
export const useRouterStateStore = defineStore('routerState', () => {
  const currentRoute = ref<any>(null);

  function setRoute(route: any) {
    currentRoute.value = route;
  }

  function getRoute(): any {
    return currentRoute.value;
  }

  return {
    currentRoute,
    setRoute,
    getRoute,
  };
});

// Type inference for use within components
