<script setup lang="ts">
import { salesOrder } from './index.vue';
</script>

<template>
    <lq-line>
        <lq-text-input label="Order reference" v-model="salesOrder.orderDocumentReferenceId" />
        <lq-text-input label="Project reference" v-model="salesOrder.projectReferenceId" />
        <lq-text-input label="Customer reference" v-model="salesOrder.customerReference" />
    </lq-line>
    <lq-line>
        <lq-address-select type="INVOICE" required show-card label="Bill to"
            :organization-id="salesOrder.customer?.organizationId"
            v-model="salesOrder.billingAddressUUID" />
        <lq-address-select type="DELIVERY" required show-card label="Ship to"
            :organization-id="salesOrder.customer?.organizationId"
            v-model="salesOrder.deliveryAddressUUID" />
    </lq-line>
</template>