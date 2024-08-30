<script setup lang="ts">

import { onMounted, ref, computed, watch, onBeforeMount } from "vue";
import { useTaskStore } from "@boost/repository";
import { type TableConfig } from '@boost/ui';

const store = useTaskStore();

interface TaskFilter {
    status?: string;
    assignedUUID?: string | null;
    projectUUID?: string | null;
}

const taskFilter = ref<TaskFilter>({status: null, assignedUUID: null, projectUUID: null});
const editOpen = ref(false);
const taskId = ref('new');
const assignedUUID = ref(null);
const projectUUID = ref(null);

const config: TableConfig = {
    header: ['ID', 'Title', 'Status', /*'Planned week', */'Planned start', 'Planned end', /*'Actual start', 'Actual end', 'Due date', */'Assigned to', /*'Team',*/ 'Responsible','Project', 'Priority'],
    data: computed(() => store.getTasksByFilter(taskFilter).value.map(task => Object.assign([
        task.prefix + '-' + task.number,
        task.title, //JSON.stringify(Object.entries(task).reduce((r, [k, v]) => (v && (r[k] = v), r), {})),
        task.status,
        //task.plannedWeek,
        task.plannedStart,
        task.plannedEnd,
        //task.actualStart,
        //task.actualEnd,
        //task.dueDate,
        task.assigned?.firstname && task.assigned?.lastname 
            ? task.assigned.firstname + ' ' + task.assigned.lastname 
            : '',
        //task.assignments,
        task.responsible?.firstname && task.responsible?.lastname 
            ? task.responsible.firstname + ' ' + task.responsible.lastname 
            : '',
        task.project?.name,
        task.weight,
        // hidden
    ], { task })).sortBy('-task.createdAt'))
};

watch([projectUUID, assignedUUID], ([newProjectUUID, newAssignedUUID]) => {
    taskFilter.value.projectUUID = newProjectUUID;
    taskFilter.value.assignedUUID = newAssignedUUID;
}, { immediate: true });

const clearFilter = () => {
    projectUUID.value = null;
    assignedUUID.value = null;
};

</script>

<template>
    <lq-page title="Todo" add-title="New task"
        :add="() => (taskId = 'new', editOpen = true)">
        <template #headerbar>
        </template>
        <lq-line class="mt-3">
            <lq-project-select
                label="Project"
                showAll                
                v-model="projectUUID" />

                <lq-person-select
            v-model="assignedUUID"
            label="Assigned to" />   

            <lq-button @click="clearFilter" class="mt-6">Clear filter</lq-button>

            </lq-line>         
        <lq-table readonly :config class="mt-5"
            @row-activate="(row: any) => (taskId = row.task.UUID, editOpen = true)" />
    </lq-page>
    <lq-async :component="() => import('../task/index.vue')" :on="editOpen" v-model:open="editOpen" :taskId />
</template>

<style scoped lang="scss"></style>
