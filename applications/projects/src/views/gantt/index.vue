<script setup lang="ts">

import {lqBryntumGantt} from "@boost/ui";

const useGanttConfig = () => {
  return {
    columns: [{ type: "name", width: 160 }],
    startDate: new Date(2022, 0, 1),
    endDate: new Date(2022, 0, 10),
  };
};

const useProjectConfig = () => {
  return {
    autoSetConstraints: true,
    startDate: new Date(2022, 0, 1),
  };
};

const tasks = [
            {
                id       : 1,
                name     : 'Write docs',
                expanded : true,
                children : [
                    { id : 6, name : 'Proof-read docs', startDate : '2022-01-02', endDate : '2022-01-09' },
                    { id : 3, name : 'Release docs', startDate : '2022-01-09', endDate : '2022-01-10' }
                ]
            }
        ];
 const dependencies = [
            { fromTask : 6, toTask : 3 }
        ];

</script>

<template>
  <div>
    <lq-bryntum-gantt 
    :ganttConfig="useGanttConfig()"
    :projectConfig="useProjectConfig()"
    :tasks="tasks"
    :dependencies="dependencies"
    />
  </div>
</template>

<style >
  
</style>