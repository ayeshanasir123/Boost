<script setup lang="ts">
import { reactive } from 'vue';
import { ref } from 'vue';
import { BryntumTaskBoard } from '@bryntum/taskboard-vue-3-thin';
import { useTaskBoardConfig } from './task-board-config';

const taskBoardRef = ref(null);
const projectRef = ref(null);
const taskboardConfig = reactive(useTaskBoardConfig());

</script>

<template>
    
    <bryntum-task-board
        v-bind="taskboardConfig"
    />
</template>

<style>
@import "@bryntum/core-thin/core.stockholm.css";
@import "@bryntum/taskboard-thin/taskboard.stockholm.css";
</style>
