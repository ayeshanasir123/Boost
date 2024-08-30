<script lang="ts">
import { type SalesOrder, createModel } from '@boost/repository';
import { reactive, ref, onMounted, onUnmounted, watch } from 'vue';
import Totals from './totals.vue';
export const salesOrder = createModel<SalesOrder>();
</script>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSalesOrderStore } from '@boost/repository';

const props = defineProps<{
    salesOrderUUID: SalesOrder['UUID']
}>();

const salesOrderStore = useSalesOrderStore();
const { t } = useI18n();
const pageTitle = ref('');
const directPrintInvoice = ref(false);
const deliveryMethods = ['Delivery', 'Pickup'];

const saveSalesOrder = async () => {
    const savedSalesOrder = await salesOrderStore.saveSalesOrder(salesOrder);
    salesOrder.set(savedSalesOrder);
    return ['sales-order.items', { salesOrderUUID: savedSalesOrder.UUID }];
};
const loadingError = ref('');
onMounted(async () => {
    if (props.salesOrderUUID === 'new') {
        pageTitle.value = t('New Sales Order');
        salesOrder.set({ orderLines: [], issueDateTime: new Date() });
    } else {
        try {
            salesOrder.set(await salesOrderStore.getSalesOrderByUUID(props.salesOrderUUID));
        } catch (e) {
            loadingError.value = (e as Error).message;
        }
        pageTitle.value = t('Edit Sales Order') + ' ' + salesOrder.orderNumber;
    }
});

watch(() => salesOrder.customer, (newCustomer) => {
    if (newCustomer && 'organizationId' in newCustomer) {
        salesOrder.customerUUID = newCustomer.organizationId;
    }
});

onUnmounted(() => salesOrder.clear());
</script>

<template>
    <lq-error :error="loadingError" />
    <lq-page
        v-if="salesOrder.loaded"
        :title="pageTitle"
        cancel="sales-orders"
        :save="salesOrder.customer && saveSalesOrder">
        <lq-toolbar></lq-toolbar>

        <lq-card class="pt-0 pl-0" style="background: none">
            <lq-line>
                <lq-party-select autofocus required :label="t('Customer')" role="customer"
                    v-model="salesOrder.customer" />
                <lq-datepicker required label="Order date" v-model="salesOrder.issueDateTime" />
                <lq-datepicker label="Delivery date" v-model="salesOrder.requestedDeliveryPeriodStartDate" />
                <lq-select width="200" label="Delivery method" :items="deliveryMethods"
                    v-model="salesOrder.deliveryTermsId" />
            </lq-line>
        </lq-card>
        <lq-route-tabs class="mb-5" parent="sales-order" />
        <lq-line style="margin-top:16px;place-content: space-between;">
            <lq-card style="background: none" class="pl-0">
                <lq-column>
                    <lq-checkbox label="Print invoice" class="pb-5" v-model="directPrintInvoice" />
                    <lq-textarea width="400" v-model="salesOrder.note"
                        label="Order Notes"
                        rows="2" />
                </lq-column>

                <!-- <lq-textarea width="400"
            label="Shipment Notes"
            rows="2"/> -->

            </lq-card>
            <totals />
        </lq-line>
    </lq-page>
</template>