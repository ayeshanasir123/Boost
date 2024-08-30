import { ref } from "vue";
import { defineStore } from "pinia";

export const useStateStore  = defineStore('state', () => {
  const breadcrumbList = ref([] as Breadcrumb[]);

  return { breadcrumbList };
});

type Breadcrumb = {
    title: string,
    disabled: boolean,
    href: string
}
