<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  BryntumGantt,
  BryntumGanttProjectModel,
} from "@bryntum/gantt-vue-3-thin";

import type { GanttConfig , TaskModelConfig } from '@bryntum/gantt-thin';
import type {DependencyModelConfig } from '@bryntum/scheduler-thin';
type ProjectConfig = {};

const props = defineProps<{
  tasks: TaskModelConfig[];
  dependencies: DependencyModelConfig[];
  ganttConfig: GanttConfig;
  projectConfig: ProjectConfig;
}>();

const gantt = ref();
const project = ref();

const ganttConfig = reactive(props.ganttConfig);
const projectConfig = reactive(props.projectConfig);

const tasks = ref();
const dependencies = ref();

tasks.value = props.tasks;
dependencies.value = props.dependencies;

onMounted(() => {
    gantt.value.instance.value.project = project.value.instance.value;
});
</script>

<template>
    <div class="no-scroll-gantt">
     <bryntum-gantt-project-model
            ref="project"
            v-bind="projectConfig"
            :tasks="tasks"
            :dependencies="dependencies"
        />

        <bryntum-gantt
            ref="gantt"
            v-bind="ganttConfig"
        />
    </div>
</template>

<style>
@import '@bryntum/core-thin/core.stockholm.css';
@import '@bryntum/grid-thin/grid.stockholm.css';
@import '@bryntum/scheduler-thin/scheduler.stockholm.css';
@import '@bryntum/schedulerpro-thin/schedulerpro.stockholm.css';
@import '@bryntum/gantt-thin/gantt.stockholm.css';

.no-scroll-gantt {
    overflow: hidden;
    height: calc(100vh - 100px);
}
</style>
