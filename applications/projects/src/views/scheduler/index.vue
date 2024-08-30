<script setup lang="ts">
//import { lqBryntumScheduler } from "@boost/ui";

const useSchedulerConfig = () => {
  return {
    columns: [{ text: "Name", field: "name", width: 160 }],
    startDate: new Date(2022, 0, 1),
    endDate: new Date(2022, 0, 10),
  };
};

const useProjectConfig = () => {
  return {};
};

const resources = [
  { id: 1, name: "Dan Stevenson" },
  { id: 2, name: "Talisha Babin" },
];

const events = [
  { resourceId: 1, startDate: "2022-01-01", endDate: "2022-01-10" },
  { resourceId: 2, startDate: "2022-01-02", endDate: "2022-01-09" },
];
const assignments = [
  { event: 1, resource: 1 },
  { event: 2, resource: 2 },
];

const dependencies = [{ fromEvent: 1, toEvent: 2 }];
</script>

<template>
  <div>
    <lq-page
      :title="$t('Scheduler')"
      :add-title="$t('New Schedule')"
      :add="['project', { projectUUID: 'new' }]"
    >
      <div class="grid-container">
        <lq-bryntum-scheduler
          :schedulerConfig="useSchedulerConfig()"
          :projectConfig="useProjectConfig()"
          :events="events"
          :resources="resources"
          :assignments="assignments"
          :dependencies="dependencies"
        />
      </div>
    </lq-page>
  </div>
</template>

<style scoped lang="css"></style>
