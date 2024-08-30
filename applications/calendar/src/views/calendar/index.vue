<script setup lang="ts">
import {lqBryntumCalendar} from "@boost/ui";

const events =[
  {
    id: 1,
    name: "Meeting",
    startDate: "2022-01-01T10:00:00",
    endDate: "2022-01-01T11:00:00",
    resourceId: 1,
  },
  {
    id: 2,
    name: "Adnan Test",
    startDate: "2021-12-31T10:00:00",
    endDate: "2021-12-31T11:00:00",
    resourceId: 1,
  },
];

const  resources = [
  {
    id: 1,
    name: "Default Calendar",
    eventColor: "green",
  },
];


const useCalendarConfig = () => {
  return {
    date: "2022-01-01",
  };
};

const useProjectConfig = () => {
  return {};
};


</script>

<template>
    <div>
        <lq-bryntum-calendar
         :resources="resources" 
         :events="events" 
         :calendarConfig="useCalendarConfig()"
         :projectConfig="useProjectConfig()"
         />
    </div>
</template>

<style scoped lang="css">
    
</style>

