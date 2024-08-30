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
        get: () => aOrderValue.value?.subject ?? '',
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
    <v-row>
        <lq-col md="4" lg="3" class="border-right">
            <lq-row>
                <lq-autocomplete required :config="workorderAutocomplete" label="Work Order" />
                <v-list v-if="aOrderValue">
                    <v-list-item>
                        <v-list-item-subtitle>Kund</v-list-item-subtitle>
                        <v-list-item-title>{{ aOrderValue.subject }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-subtitle>Projektnamn</v-list-item-subtitle>
                        <v-list-item-title>{{ aOrderValue.project }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-subtitle>Address</v-list-item-subtitle>
                        <v-list-item-title v-html="aOrderValue.body"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </lq-row>
        </lq-col>
        <template v-if="aOrderValue">
            <lq-col md="8" lg="5">
                <lq-row sm="6">
                    <lq-datepicker label="Startdatum" v-model="startDate" />
                    <lq-autocomplete required :config="activityConfig"
                        label="Aktivitet" />
                </lq-row>
                <lq-row sm="6">
                    <lq-text-input label="Arbetad tid" />
                    <lq-text-input label="Tid att fakturera" />
                </lq-row>
                <lq-row sm="6">
                    <lq-button-switch :items="['Ja', 'Nej']" label="Använde UE" />
                    <lq-button-switch :items="{ Ensam: 'Ja', tillsammans: 'Nej' }" label="Ensam" />
                </lq-row>
                <lq-row>
                    <lq-textarea v-model="comment" rows="4" label="Anteckning"
                        placeholder="Fyll i eventuella anteckningar här" />
                </lq-row>
            </lq-col>
            <!-- <lq-col sm="4">
                <lq-multi-select v-model:value="item">
                    <lq-item-select label="Items" v-model="item" />
                </lq-multi-select>
            </lq-col> -->
        </template>
    </v-row>
</template>
