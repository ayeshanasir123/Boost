<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSalesOrderStore, useOrganizationStore } from '@boost/repository';
import type { Organization, SalesOrder } from '@boost/repository';
import SalesOrderItems from './sales-order-items.vue';

import { LqTextInput, LqSelect, LqDatepicker, LqPartySelect, type AutocompleteConfig } from '@boost/ui';

const route = useRoute();
const salesOrderStore = useSalesOrderStore();
const organizationStore = useOrganizationStore();

const { t } = useI18n();

//Page constants
const orderPageTabs = ref('rows');
const pageTitle = ref('');

const deliveryMethods = ['Delivery', 'Pickup'];

//Sales order UUID from route
const salesOrderUUID = route.params.salesOrderUUID as string;

//Sales order object that will be used in the view
const salesOrder = ref<SalesOrder>();

//Handle new or existing sales order
if (salesOrderUUID === 'new') {
  pageTitle.value = t('New sales order');
  //An empty sales order object, we always get this so that we can get a template for new order lines
  const emptyObject = ref<SalesOrder>();
  emptyObject.value = await salesOrderStore.getEmptyObject();
  salesOrder.value = Object.assign({}, emptyObject.value);
  salesOrder.value.orderLines = [];
} else {
  salesOrder.value = await salesOrderStore.getSalesOrderByUUID(salesOrderUUID);
  pageTitle.value = t('Edit sales order') + ' ' + salesOrder.value?.orderNumber;
}

</script>

<template>
  <h2>{{ pageTitle }}</h2>
  <v-container fluid v-if="salesOrder">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <lq-party-select required label="Customer" role="customer" v-model="salesOrder!.customer" />
          </v-col>
          <v-col cols="2">
            <lq-datepicker required label="Issue Date" v-model="salesOrder.issueDateTime" />
          </v-col>
          <v-col cols="2">
            <lq-datepicker label="Delivery Date" v-model="salesOrder.requestedDeliveryPeriodStartDate" />
          </v-col>
          <v-col cols="2">
            <lq-select
              label="Delivery Method"
              :items="deliveryMethods"
              v-model="salesOrder.deliveryTermsId" />
          </v-col>
          <v-col cols="2">
            <lq-text-input required
              label="Reference" />
          </v-col>
        </v-row>
        <v-tabs v-model="orderPageTabs">
          <v-tab value="rows">Rows</v-tab>
          <v-tab value="customerDetails">Customer details</v-tab>
          <v-tab value="orderDetails">Order details</v-tab>
          <v-tab value="customerOrderHistory">Customer order history</v-tab>
          <v-tab value="log">Log</v-tab>
        </v-tabs>
        <v-tabs-window v-model="orderPageTabs">
          <v-tabs-window-item value="rows">
            <sales-order-items v-model="salesOrder" />
          </v-tabs-window-item>
          <v-tabs-window-item value="customerDetails">
            Customer Details
          </v-tabs-window-item>
          <v-tabs-window-item value="orderDetails">
            Order Details
          </v-tabs-window-item>
          <v-tabs-window-item value="customerOrderHistory">
            Order History
          </v-tabs-window-item>
          <v-tabs-window-item value="log">
            Log
          </v-tabs-window-item>
        </v-tabs-window>

        <v-row class="mt-5">
          <v-col cols="6">
            <v-textarea
              outlined
              label="Order Comments"
              rows="2"
              auto-grow></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-switch
              label="Direct Print Invoice"></v-switch>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col cols="6">
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col class="d-flex justify-end" cols="6">{{ $t('TaxExclusiveAmount') }}</v-col>
                  <v-col cols="6" class="text-end">0 kr</v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-end" cols="6">{{ $t('TaxAmount') }}</v-col>
                  <v-col cols="6" class="text-end">0 kr</v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-end" cols="6">{{ $t('PayableRoundingAmount') }}</v-col>
                  <v-col cols="6" class="text-end">0 kr</v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-end" cols="6">{{ $t('PrepaidAmount') }}</v-col>
                  <v-col cols="6" class="text-end">0 kr</v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-end" cols="6"><strong>{{ $t('PayableAmount') }}</strong></v-col>
                  <v-col cols="6" class="text-end"><strong>0 kr</strong></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>