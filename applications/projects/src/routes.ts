export const routes = [
  {
    path: "/home",
    name: "ProjectHome",
    title: "ProjectHome",
    component: () => import("./views/home.vue"),
  },
  {
    path: "/activity",
    name: "ActivityList",
    title: "ActivityList",
    component: () => import("./views/activity-list/index.vue"),
  },
  {
    path: "/gantt",
    name: "Gantt",
    title: "Gantt",
    component: () => import("./views/gantt/index.vue"),
  },
  {
    path: "/",
    name: "project-list",
    title: "Projects",
    component: () => import("./views/project-list/index.vue"),
    topMenu: true    
  },
  {
    path: "/:projectUUID",
    name: "project-view",
    title: "Create/View Project",
    component: () => import("./views/project-view/index.vue"),
    props: to => ({ projectUUID: to.params.projectUUID }),
    children: [
      {
        title: "Planning",
        name: 'planning',
        component: () => import('./views/project-view/planning.vue'),
    },
    {
        title: "Invoicing",
        name: 'invoiceing',
        component: () => import('./views/project-view/invoiceing.vue'),
    }
    ]
    
  },
  {
    path: "/scheduler",
    name: "Scheduler",
    title: "Scheduler",
    component: () => import("./views/scheduler/index.vue"),
  },
  {
    path: "/scheduler-pro",
    name: "SchedulerPro",
    title: "SchedulerPro",
    component: () => import("./views/scheduler-pro/index.vue"),
  },
  {
    path: "/time-report",
    name: "TimeReport",
    title: "TimeReport",
    component: () => import("./views/time-report/index.vue"),
  },
];
