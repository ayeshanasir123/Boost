<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { LqTextInput, LqSelect, LqRow, LqCol, LqGoogleMap } from '../../index';
import type { Address } from '@boost/repository';

const addressTypes = [{ id: "INVOICE", title: "Fakturaadress" }, { id: "DELIVERY", title: "Leveransadress" }, { id: "VISIT", title: "Besöksadress" }];

defineProps<{
    address: Address,
    type?: Address['type']
}>();

function save() {

}

</script>
<template>
    <div class="container">
        <lq-line>
            <lq-line column>
                <lq-select :disabled="type" label="Type" :items="addressTypes" v-model="address.type" />
                <lq-text-input label="Name" v-model="address.name" />
                <lq-text-input label="Address Line 1" v-model="address.addressLine1" />
                <lq-text-input label="Address Line 2" v-model="address.addressLine2" />
                <lq-text-input label="Address Line 3" v-model="address.addressLine3" />
                <lq-text-input label="Postcode" v-model="address.postcode" />
                <lq-text-input label="City" v-model="address.city" />
                <lq-text-input label="Country" v-model="address.country" />
            </lq-line>
            <lq-line column>
                <lq-text-input label="Plus Code" v-model="address.plusCode" />
                <lq-google-map style="width: 100%; height: 100%;" />
            </lq-line>
            <lq-line column>
                <lq-text-input label="Phone" v-model="address.phone" />
                <lq-text-input label="Buyer Reference" v-model="address.buyerReference" />
                <lq-text-input label="Invoice Reference" v-model="address.invoiceReference" />
                <lq-text-input label="GLN" v-model="address.GLN" />

                <!-- <v-checkbox v-model="organizationEdit.orderToInvoiceMergeOrders" :true-value="1" :false-value="0"
                label="Generera egen faktura för denna leveransadress"></v-checkbox> -->

                <!-- <v-btn @click="save" variant="tonal">Spara adress</v-btn> -->
            </lq-line>
        </lq-line>
    </div>
</template>

<style scoped lang="scss">
.container {
    max-height: 100%;
}
</style>