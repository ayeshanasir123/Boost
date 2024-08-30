<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

import { BryntumSchedulerPro } from "@bryntum/schedulerpro-vue-3-thin";
import type {
  SchedulerConfig,
  EventModelConfig,
  ResourceModelConfig,
  AssignmentModelConfig,
  DependenciesConfig,
} from "@bryntum/scheduler-thin";

const props = defineProps<{
  schedulerProConfig: SchedulerConfig;
  projectData: {
  events: EventModelConfig;
  resources: ResourceModelConfig;
  assignments: AssignmentModelConfig;
  dependencies: DependenciesConfig;
  };
}
>();


const schedulerProConfig = reactive(props.schedulerProConfig);
const assignments = ref(props.projectData.assignments);
const dependencies = ref(props.projectData.dependencies);
const resources = ref(props.projectData.resources);
const events = ref(props.projectData.events);
</script>

<template>
  <div>
    <div class="no-scroll-scheduler-pro">
      <bryntum-scheduler-pro
        :assignments="assignments"
        :dependencies="dependencies"
        :resources="resources"
        :events="events"
        v-bind="schedulerProConfig"
      />
    </div>
  </div>
</template>
<style>
@import '@bryntum/core-thin/core.stockholm.css';
@import '@bryntum/grid-thin/grid.stockholm.css';
@import '@bryntum/scheduler-thin/scheduler.stockholm.css';
@import '@bryntum/schedulerpro-thin/schedulerpro.stockholm.css';

.no-scroll-scheduler-pro {
  overflow: hidden;
  height: calc(100vh - 100px);
}
</style>
