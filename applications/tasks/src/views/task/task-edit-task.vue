<script setup lang="ts">

import { task, store } from './index.vue';

</script>
<template>
    <lq-line>
        <lq-text-input width="100%"
            v-model="task.title"
            label="What needs to be done"
            required />
    </lq-line>
    <lq-line>
        <lq-select width="150" :items="store.statuses" label="Status" v-model="task.status" />
        <lq-datepicker
            label="Planned start"
            v-model="task.plannedStart" />
        <lq-datepicker
            label="Planned end"
            v-model="task.plannedEnd" />
        <lq-select width="150"
            v-model="task.categoryUUID"
            :items="store.categories"
            label="Category" />
    </lq-line>
    <lq-line>
        <lq-party-select
            label="Customer"
            role="customer"
            v-model="task!.customer" />
        <lq-project-select
            label="Project"
            :organizationId="task!.customer?.organizationId"
            v-model="task!.projectUUID" />
    </lq-line>
    <lq-line>
        <lq-person-select
            v-model="task.assignedUUID"
            label="Assigned to" />
        <lq-person-select
            v-model="task.responsibleUUID"
            label="Responsible" />
    </lq-line>
    <lq-line>
        <lq-text-editor width="100%" rows="15"
            v-model:html="task.description"
            :delta="task.descriptionDelta"
            @update:delta="val => task.descriptionDelta = val"
            label="Description" />
    </lq-line>
</template>