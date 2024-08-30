import { routes } from "./routes";
import { createVueApp } from "@boost/ui";

const app = createVueApp({
  id: "workorders",
  routes,
});

app.mount("#app");
