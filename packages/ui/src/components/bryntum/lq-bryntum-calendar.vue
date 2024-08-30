<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import {
  BryntumCalendar,
  BryntumCalendarProjectModel,
} from "@bryntum/calendar-vue-3-thin";
import type { CalendarConfig } from "@bryntum/calendar-thin";
import type {
  ResourceModelConfig,
  EventModelConfig,
} from "@bryntum/scheduler-thin";
type ProjectConfig = {};

const props = defineProps<{
  resources: ResourceModelConfig;
  events: EventModelConfig;
  calendarConfig: CalendarConfig;
  projectConfig: ProjectConfig;
}>();

const calendar = ref();
const project = ref();

const calendarConfig = reactive(props.calendarConfig);
const projectConfig = reactive(props.projectConfig);

const resources = ref();
const events = ref();
resources.value = props.resources;
events.value = props.events;

onMounted(() => {
  calendar.value.instance.value.project = project.value.instance.value;
});
</script>

<template>
  <div class="no-scroll-calendar">
    <bryntum-calendar-project-model
      ref="project"
      v-bind="projectConfig"
      :resources="resources"
      :events="events"
    />
    <bryntum-calendar ref="calendar" v-bind="calendarConfig" />
  </div>
</template>

<style lang="css">
@import "@bryntum/core-thin/core.stockholm.css";
@import "@bryntum/grid-thin/grid.stockholm.css";
@import "@bryntum/scheduler-thin/scheduler.stockholm.css";
@import "@bryntum/calendar-thin/calendar.stockholm.css";

.no-scroll-calendar {
  overflow: hidden;
  height: calc(100vh - 100px);
}
</style>
