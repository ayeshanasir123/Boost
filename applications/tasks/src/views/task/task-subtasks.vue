<script setup lang="ts">
import { toRef, computed } from 'vue';
import type { TableConfig } from '@boost/ui';
import { task } from './index.vue';
const config: TableConfig = {
    header: ['Task', 'Assigned person', ['End date', 'date']],
    data: computed(() => task.subTasks!.map(task => ({
        title: toRef(task, 'title'),
        personId: toRef(task, 'assignedPersonUUID'),
        endDate: toRef(task, 'plannedEnd'),
        personName: toRef(task, 'assignedPersonName'),
    }))),
    tabstops: 'title personName endDate',
    raw: task.subTasks
};
</script>
<template>
    <lq-table :config>
        <template #cell:personId.model="{ row, table, ...attrs }">
            <lq-person-select required :="attrs"
                @select-value="({ item: { id, title } }) => table.assign(row, { personId: id, personName: title })" />
        </template>
    </lq-table>
</template>