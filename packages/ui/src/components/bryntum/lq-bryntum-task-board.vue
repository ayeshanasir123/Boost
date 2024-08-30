<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import {
  BryntumTaskBoard,
  BryntumTaskBoardProjectModel,
} from "@bryntum/taskboard-vue-3-thin";
import type { TaskModelConfig } from "@bryntum/taskboard-thin";

const props = defineProps<{
  config:{
    project?: {
      tasksData?: TaskModelConfig[];
    };
  };
}>();
const taskBoardConfig = reactive(props.config);
const tasks = ref();
const taskboard = ref();
const project = ref();

tasks.value = taskBoardConfig.project?.tasksData;

onMounted(() => {
  taskboard.value.instance.value.project = project.value.instance.value;
});
</script>

<template>
  <div>
    <bryntum-task-board-project-model ref="project" :tasks="tasks" />
    <bryntum-task-board ref="taskboard" v-bind="taskBoardConfig" />
  </div>
</template>
<style lang="css">
@import '@bryntum/core-thin/core.stockholm.css';
@import '@bryntum/taskboard-thin/taskboard.stockholm.css';

</style>