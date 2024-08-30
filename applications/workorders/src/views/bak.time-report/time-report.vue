<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';

import { type TimWorkOrder, type TimActivity, useActivityStore, useTimeReportStore } from "@boost/repository";
import type {AutocompleteConfig} from '@boost/ui';
import {workOrder} from './index.vue';
import WorkorderSelect from './workorder-select.vue';
import WorkorderEdit from './workorder-edit.vue';


const activityStore = useActivityStore();
const TimeReportStore = useTimeReportStore();

const { t } = useI18n();
const startDate = ref<Date>();
const activityDynamicField = ref("");

const activityConfig: AutocompleteConfig = {
    header: ['Name', 'SKU'],
    async search(what) {
        const activities = activityStore.search(what);
        return computed(() => {
            return activities.map(activity => Object.assign([activity.name, activity.SKU], { activity }));
        });
    },
    value: {
        get: () => activityValue.value?.name ?? '',
        set: row => activityValue.value = row.activity
    }
};

const aOrderValue = ref<TimWorkOrder>();
const activityValue = ref<TimActivity>();

const comment = ref("");
const reportSaved = ref(false);

const handleSaveTimeReport = async () => {

    const startingDate = startDate.value;
    const formattedDate = startingDate.toLocaleDateString('sv');

    let data = [
        {
            'project': workOrder.projectId,
            'activity': activityValue.value.id,
            'date': formattedDate,
            'comment': comment.value,
            'time': 1.4,
            'time_deb': 2.5,
            'worked_alone': false,
            'used_ue': true,
            'comment_change': "",
            'comment_for_customer': "",
        }
    ];
    const response = await TimeReportStore.AddTimeReport(data, workOrder.id);
    if (response) {
        reportSaved.value = true;
    }

}
// import type {TableConfig} from '@boost/ui';
// const items = reactive<(string | number)[]>([]);
//     const config: TableConfig = {
//     header: ['SKU', 'Title', 'Quantity', 'Unit', 'Price', 'Total'],
//     data: computed(() => items.map(item=> ({
//         sku: toRef(item, 'SKU'),
//         name: toRef(!, 'name'),
//         quantity: toRef(line.lineItem!, 'quantity'),
//     }))),
//     tabstops: 'sku quantity',
//     addRow(idx) {
//         salesOrder.orderLines!.splice(idx, 0, structuredClone(orderLineTemplate));
//     },
//     deleteRow(idx) {
//         salesOrder.orderLines!.splice(idx, 1);
//     }
// };

</script>

<template>
    <lq-line style="gap: 24px">
        <workorder-select />
        <template v-if="workOrder.loaded">
            <workorder-edit/>
            <lq-line column>
                <div>TEST</div>
            </lq-line>
            <!-- <lq-col sm="4">
                <lq-multi-select v-model:value="item">
                    <lq-item-select label="Items" v-model="item" />
                </lq-multi-select>
            </lq-col> -->
        </template>
    </lq-line>
</template>

<style scoped lang="scss">
</style>
