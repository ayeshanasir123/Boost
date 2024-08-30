<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';
import type { AutocompleteConfig } from '@boost/ui';
import { type TimWorkOrder, type TimActivity, useWorkOrderStore, useActivityStore, useTimeReportStore } from "@boost/repository";

const workOrderStore = useWorkOrderStore();
const activityStore = useActivityStore();
const TimeReportStore = useTimeReportStore();

const { t } = useI18n();
const startDate = ref<Date>();
const activityDynamicField = ref("");

const workorderAutocomplete: AutocompleteConfig = {
    header: ['Subject', 'Number', 'Assigned', 'Address', 'Responsible', 'Customer', 'Project'],
    async search(what) {
        const orders = await workOrderStore.search(what);
        return computed(() => {
            return orders.map(order => Object.assign([order.subject, order.nr, order.assigned, order.address, order.responsible, order.customer, order.project], { order }));
        });
    },
    value: {
        get: () => aOrderValue.value?.nr?.toString() ?? '',
        set: row => aOrderValue.value = row.order
    }
};

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
            'project': aOrderValue.value.projectId,
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
    const response = await TimeReportStore.AddTimeReport(data, aOrderValue.value.id);
    if (response) {
        reportSaved.value = true;
    }

}
// import type {GridConfig} from '@boost/ui';
// const items = reactive<(string | number)[]>([]);
//     const config: GridConfig = {
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
//e9eaec
</script>

<template>
    <lq-line style="margin-top:16px">
        <lq-column class="border-right">
                <lq-autocomplete required :config="workorderAutocomplete" label="Work order" placeholder="Search for workorder" />
                <v-list v-if="aOrderValue" class="qpnborder" style="width: 300px">
                    <v-list-item>
                        <v-list-item-subtitle>{{ $t('Subject') }}</v-list-item-subtitle>
                        <v-list-item-title>{{ aOrderValue.subject }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-subtitle>{{ $t('Customer') }}</v-list-item-subtitle>
                        <v-list-item-title>{{ aOrderValue.customer }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="aOrderValue.project">
                        <v-list-item-subtitle>{{ $t('Project') }}</v-list-item-subtitle>
                        <v-list-item-title>{{ aOrderValue.project }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="aOrderValue.address">
                        <v-list-item-subtitle>{{ $t('Address') }}</v-list-item-subtitle>
                        <v-list-item-title v-html="aOrderValue.address"></v-list-item-title>
                    </v-list-item>
                </v-list>
        </lq-column>
        <template v-if="aOrderValue">
            <lq-column class="border-right">
                <lq-line>
                    <lq-datepicker label="Work Date" v-model="startDate" />
                    <lq-autocomplete required :config="activityConfig"
                        label="Aktivitet" />
                </lq-line>
                <lq-line style="margin-bottom:8px">
                    <lq-text-input label="Arbetad tid" width="124"/>
                    <lq-text-input label="Tid att fakturera" width="124"/>
                </lq-line>
                <lq-line>
                    <lq-button-switch :items="['Ja', 'Nej']" label="Använde UE" />
                    <lq-button-switch :items="{ Ensam: 'Ja', tillsammans: 'Nej' }" label="Ensam" />
                </lq-line>
                <lq-line>
                    <lq-textarea v-model="comment" rows="4" label="Anteckning"
                        placeholder="Fyll i eventuella anteckningar här" />
                </lq-line>
            </lq-column>
            <lq-column style="min-width: 470px">
                <h3 class="mb-0">Quick Select</h3>
                <div style="width:100%; height:150px; background-color: bisque;">&nbsp;</div>
                <h3 class="mb-0">Material</h3>
                <div style="width:100%; height:150px; background-color: bisque;">&nbsp;</div>
            </lq-column>
        </template>
    </lq-line>
</template>
