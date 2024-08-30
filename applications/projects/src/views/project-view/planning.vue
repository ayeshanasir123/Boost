<script setup lang="ts">
import { project } from './index.vue'
</script>

<template>
    <lq-line>
      <lq-datepicker
            label="Planned Start"
            v-model="project.projectedStart" />
      <lq-datepicker
            label="Planned End"
            v-model="project.projectedEnd" />
      <lq-datepicker
            label="Actual Start"
            v-model="project.actualStart" />
      <lq-datepicker
            label="Actual End"
            v-model="project.actualEnd" />
    </lq-line>    
</template>