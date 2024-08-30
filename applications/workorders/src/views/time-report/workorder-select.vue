<script setup lang="ts">

import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';

import type { AutocompleteConfig } from '@boost/ui';
import { useWorkOrderStore } from '@boost/repository';
const workOrderStore = useWorkOrderStore();

import { workOrder } from './index.vue';

const workorderAutocomplete: AutocompleteConfig = {
    header: ['Subject', 'Number', 'Assigned', 'Address', 'Responsible', 'Customer', 'Project'],
    async search(what) {
        const orders = await workOrderStore.search(what);
        return computed(() => {
            return orders.map(order => Object.assign([order.subject, order.nr, order.assigned, order.address, order.responsible, order.customer, order.project], { order }));
        });
    },
    value: {
        get: () => workOrder.subject ?? '',
        set: row => workOrder.clear(row.order)
    }
}
</script>
<template>
    <lq-line column style="width:324px" class="border-right">
        <lq-autocomplete required :config="workorderAutocomplete" label="Work Order" />
        <v-list v-if="workOrder.loaded" style="width:300px;overflow:auto">
            <v-list-item>
                <v-list-item-subtitle>Kund</v-list-item-subtitle>
                <v-list-item-title>{{ workOrder.subject }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-subtitle>Projektnamn</v-list-item-subtitle>
                <v-list-item-title>{{ workOrder.project }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-subtitle>Address</v-list-item-subtitle>
                <v-list-item-title v-html="workOrder.body"></v-list-item-title>
            </v-list-item>
        </v-list>
    </lq-line>
</template>