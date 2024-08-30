import path from "path";

export const routes = [
  {
    path: "/home",
    name: "home",
    title: "Workorders",
    component: () => import("./views/home.vue"),
  },

  {
    path: "/time",
    name: "TimeReport",
    title: "TimeReport",
    component: () => import("./views/time-report/index.vue"),
  },
  {
    path: "/map",
    name: "WorkorderMap",
    title: "WorkorderMap",
    component: () => import("./views/workorder-map/index.vue"),
  },
  {
    path: "/",
    name: "workorder-list",
    title: "WorkorderList",
    component: () => import("./views/workorder-list/index.vue"),
  },
  {
    path: "/:workorderUUID",
    name: "workorder-view",
    title: "WorkorderView",
    component: () => import("./views/workorder-view/index.vue"),
    props: to => ({ workorderUUID: to.params.workorderUUID })
  },
  {
    path: "/transtema",
    name: "WorkorderListTranstema",
    title: "WorkorderListTranstema",
    component: () => import("./views/workorder-list-transtema/index.vue"),
  },
];
