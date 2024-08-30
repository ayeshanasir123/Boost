<script setup lang="ts">
import { onMounted, ref, reactive, computed } from "vue";
import { Store } from "@bryntum/core-thin";
import { BryntumGrid } from "@bryntum/grid-vue-3-thin";
import { useGridConfig } from "./task-grid.js";
import { useTaskStore } from "@boost/repository";
import { usePersonStore } from "@boost/repository";

//import { Task } from "@/model/Tod";
//import Person from "@/model/Person";
//import { TaskStatus } from "@/model/Tod";
//import { DateHelper, AjaxStore, Tooltip } from "@bryntum/core-thin";
import "@bryntum/grid-thin/grid.stockholm.css";
import "@bryntum/core-thin/core.material.css";
import TaskCreateDialog from "../../components/tod/task-create-dialog.vue";

const taskStore = useTaskStore();
const personStore = usePersonStore();
const editTask = () => {
  TaskCreateDialog.editTask();
};

//const team = ref<Person>([]);

const store = new Store({
  data: taskStore.taskList,
});

taskStore.$subscribe(() => {
  store.data = taskStore.taskList;
});

// Load tasks
taskStore.loadTasks();

const emit = defineEmits(["navigationEvent"]);

//const createTaskOpen = ref(false);

const assignablePersons = computed(() =>
  personStore.assignableAndSortedPersonList()
);

//console.log(assignablePersons.value);

// const taskCategories = ref([
//   { name: "Development", UUID: "c3948f6f-a191-491e-8a1a-16b6344a7443" },
//   { name: "Design", UUID: "f809e4f2-f395-45d8-ab15-817854fbedb8" },
// ]);

// const task = ref<Task>(taskStore.getEmptyTask());
// const startDateMenu = ref(false);
// const isValid = ref(true);

const grid = ref(<any>{});
const gridConfig = reactive(useGridConfig());

// function addTaskDialog() {
//   createTaskOpen.value = true;
// }

// function createTask() {
//   //task.value.UUID = generateUUID();
//   console.log(task.value);
//   taskStore.createTask(task.value);
//   createTaskOpen.value = false;
//   task.value = taskStore.getEmptyTask();
// }

//function saveTask(newTask: Task) {}

// function generateUUID() {
//   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
//     (
//       c ^
//       (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
//     ).toString(16)
//   );
// }

onMounted(() => {});
</script>

<template>
  <!--<v-btn @click="addTaskDialog">Skapa uppgift</v-btn>--->
  <TaskCreateDialog />
  <bryntum-grid ref="grid" :store="store" v-bind="gridConfig" />
</template>

<style>
:root {
  --green: #4caf50;
  --light-blue: #29b9f7;
  --blue: #3f51b5;
  --gray: #aaa;
  --yellow: #f57c00;
  --icon-background-fade: #ffffffc0;
  --avatar-size: 2.5em;
}

.b-theme-classic-dark {
  --icon-background-fade: #000000aa;
}

.b-grid-cell,
.b-grid-header.b-depth-0 {
  padding: 0 1em;
}

/* No special background on checkbox column */
.b-grid-cell.b-checkbox-selection {
  background: none;
}

.b-percent-bar-cell .b-percent-bar-outer {
  border-radius: 0.5em;
  overflow: hidden;
  height: 0.7em;
}
.b-percent-bar-cell .b-percent-bar-outer .b-percent-bar {
  background-color: var(--light-blue);
}

div[data-column="cost"] {
  justify-content: space-between;
  /* The up/down arrow next to cost amount */
}
div[data-column="cost"] .change-indicator {
  margin-inline-end: 0.5em;
}
div[data-column="cost"] .change-indicator.b-fa-caret-up {
  color: red;
}
div[data-column="cost"] .change-indicator.b-fa-caret-down {
  color: var(--green);
}

/* Member images */
.avatar-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  column-gap: 0.3em;
}

.avatar {
  height: var(--avatar-size);
  width: var(--avatar-size);
}
.avatar:before {
  width: var(--avatar-size);
  height: var(--avatar-size);
  background: var(--background);
  background-size: contain;
  position: absolute;
  border-radius: 50%;
  content: "";
}

.badge {
  border-radius: 1em;
  padding: 0.4em 0.8em;
  color: #fff;
  text-align: center;
  min-width: 6em;
}

.b-completed {
  opacity: 0.5;
}

.b-grid-cell[data-column="title"] {
  display: grid;
  grid-template-columns: auto 1fr;
  align-content: center;
  column-gap: 0.6em;
}
.b-grid-cell[data-column="title"] .location {
  font-size: 0.8em;
  opacity: 0.8;
  grid-column: 2;
}
.b-grid-cell[data-column="title"] .category-icon {
  font-size: 1.2em;
  grid-row: 1/3;
  margin-inline-end: 0.3em;
  background: currentColor
    linear-gradient(var(--icon-background-fade), var(--icon-background-fade));
  border-radius: 50%;
  width: 2em;
  height: 2em;
  align-items: center;
  display: flex;
  justify-content: center;
}
.b-grid-cell[data-column="title"] .category-icon.b-fa-pencil-ruler {
  color: var(--gray);
}
.b-grid-cell[data-column="title"] .category-icon.b-fa-paint-roller {
  color: var(--green);
}
.b-grid-cell[data-column="title"] .category-icon.b-fa-fan {
  color: var(--blue);
}
.b-grid-cell[data-column="title"] .category-icon.b-fa-fire {
  color: var(--light-blue);
}
.b-grid-cell[data-column="title"] .category-icon.b-fa-broom {
  color: #795548;
}
.b-grid-cell[data-column="title"] .category-icon.b-fa-bolt {
  color: var(--yellow);
}
.b-grid-cell[data-column="title"] .category-icon.b-fa-elevator {
  color: #555;
}
.b-grid-header,
.b-numberfield .b-fieldtrigger,
.b-textareafield .b-fieldtrigger,
.b-textfield .b-fieldtrigger {
  color: #000 !important;
}
/*# sourceMappingURL=app.css.map */

.b-field-inner {
  padding: 5px;
  background-color: #fff;
  border: 1px solid #d0d1d2;
}
.b-grid-headers.b-grid-headers-normal.b-widget-scroller.b-resize-monitored.b-hide-scroll.b-has-flex {
  background: #f3f4f5;
}
.b-textfield .b-fieldtrigger {
  color: #b0b1b2 !important;
}
.b-numberfield,
.b-textareafield,
.b-textfield {
  width: unset !important;
}</style
>../stores/taskStore
