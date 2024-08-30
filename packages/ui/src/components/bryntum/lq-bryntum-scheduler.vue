<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

import {
  BryntumSchedulerProjectModel,
  BryntumScheduler,
} from "@bryntum/scheduler-vue-3-thin";

import type {
  SchedulerConfig,
  EventModelConfig,
  ResourceModelConfig,
  AssignmentModelConfig,
  DependenciesConfig,
} from "@bryntum/scheduler-thin";

type ProjectConfig = {};

const props = defineProps<{
  schedulerConfig: SchedulerConfig;
  projectConfig: ProjectConfig;
  events: EventModelConfig;
  resources: ResourceModelConfig;
  assignments: AssignmentModelConfig;
  dependencies: DependenciesConfig;
}>();

const scheduler = ref();
const project = ref();

const schedulerConfig = reactive(props.schedulerConfig);
const projectConfig = reactive(props.projectConfig);

const resources = ref();
const events = ref();
const assignments = ref();
const dependencies = ref();

resources.value = props.resources;

events.value = props.events;
assignments.value = props.assignments;

dependencies.value = props.dependencies;

onMounted(() => {
  scheduler.value.instance.value.project = project.value.instance.value;
});
</script>

<template>
  <div>
    <div class="no-scroll-scheduler">
      <bryntum-scheduler-project-model
        ref="project"
        v-bind="projectConfig"
        :resources="resources"
        :events="events"
        :assignments="assignments"
        :dependencies="dependencies"
      />
      <bryntum-scheduler ref="scheduler" v-bind="schedulerConfig" />
    </div>
  </div>
</template>
<style>
@import '@bryntum/core-thin/core.stockholm.css';
@import '@bryntum/grid-thin/grid.stockholm.css';
@import '@bryntum/scheduler-thin/scheduler.stockholm.css';

.no-scroll-scheduler {
  overflow: hidden;
  height: calc(100vh - 100px);
}
</style>
