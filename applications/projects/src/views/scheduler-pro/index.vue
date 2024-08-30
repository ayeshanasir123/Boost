<script setup lang="ts">
import { lqBryntumSchedulerpro } from "@boost/ui";
import { projectData } from "./AppData";

const useSchedulerProConfig = () => {
  return {
    startDate: "2022-03-23",
    endDate: "2022-03-24",
    viewPreset: "hourAndDay",
    forceFit: true,
    columns: [
      {
        type: "resourceInfo",
        text: "Name",
        field: "name",
        showEventCount: false,
        width: 150,
      },
    ],
  };
};
</script>

<template>
  <div>
    <lq-bryntum-schedulerpro
    :projectData="projectData"
    :schedulerProConfig="useSchedulerProConfig()"
    />
  </div>
</template>

<style scoped lang="css"></style>
