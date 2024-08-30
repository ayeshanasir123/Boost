<script lang="ts">
import { computed, ref, watchEffect, reactive, onMounted, toRef, watch } from "vue";
import { type Task, TaskStatus, useTaskStore, createModel } from "@boost/repository";
export const task = createModel<Task>();
export const store = useTaskStore();
</script>

<script setup lang="ts">
import TaskEditTask from './task-edit-task.vue';

const props = defineProps<{
    taskId: string
}>();

async function load() {
    if (props.taskId === 'new') {
        task.set({
            subTasks: [], attachments: [], status: TaskStatus.NEW
        });
    } else {
        task.set(await store.get(props.taskId));
        task.subTasks ??= [];
        task.attachments ??= [];
    }
}


const tabs = {
    task: ['Task', TaskEditTask],
    subtasks: ['Sub tasks', () => import('./task-subtasks.vue')],
    files: ['Attachments', () => import('./task-files.vue')],
    git: ['Git Commits', () => import('./task-files.vue')],
};

</script>

<template>
    <lq-modal
        fixed-width
        :title="task.UUID ? 'Edit task ' + task.prefix + '-' + task.number : 'New task'"
        :load
        :save="() => store.save(task)"
        :tabs>
    </lq-modal>
</template>
