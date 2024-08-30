to
<script setup lang="ts">
import { ref, computed, toRef } from 'vue';

import type { AutocompleteConfig, TableConfig } from '@boost/ui';
import type { SalesOrder, SalesOrderLine } from '@boost/repository';

import { useItemStore } from '@boost/repository';

const { value: salesOrder } = defineModel<SalesOrder>({ required: true });

//Order line template to be used when adding new order lines
//const orderLineTemplate: SalesOrderLine = { UUID: "", note: "", lineItem: { id: 0, itemUUID: "", quantity: 0, quantityUnitCode: "", lineExtensionAmount: 0, itemPriceAmountIncludesVat: 0, itemClassifiedTaxCategoryCode: "", itemClassifiedTaxCategoryPercent: 0, itemClassifiedTaxCategoryTaxSchemeId: "", itemSellersItemIdentificationId: "", itemName: "", itemDescription: "", itemPriceAmount: 0, itemPriceAmountCurrencyCode: "" } };
const orderLineTemplate: SalesOrderLine = { lineItem: {} };

const itemStore = useItemStore();
const autocomplete: AutocompleteConfig = {
  header: ['SKU', 'Name', 'Price'],
  async search(search: string) {
    const items = await itemStore.search(search);
    return computed(() => items.map(item => ({ sku: item.SKU, name: item.name, price: item.price, unit: item.unit })));
  }
}

const multiply = (a?: number, b?: number) => {
  if (!a || !b) return null;
  return a * b;
};

const config: TableConfig = {
  header: ['SKU', 'Title', 'Quantity', 'Unit', 'Price', 'Total'],
  data: computed(() => salesOrder.orderLines!.map(line => ({
    sku: toRef(line.lineItem!, 'itemSellersItemIdentificationId'),
    name: toRef(line.lineItem!, 'itemName'),
    quantity: toRef(line.lineItem!, 'quantity'),
    unit: toRef(line.lineItem!, 'quantityUnitCode'),
    price: toRef(line.lineItem!, 'itemPriceAmount'),
    total: computed(() => multiply(line.lineItem?.quantity, line.lineItem?.itemPriceAmount)?.toFixed(2))
  }))),
  tabstops: 'sku quantity',
  addRow(idx) {
    salesOrder.orderLines!.splice(idx, 0, structuredClone(orderLineTemplate));
  },
  deleteRow(idx) {
    salesOrder.orderLines!.splice(idx, 1);
  }
};

</script>
<template>
  <!-- <div>{{ salesOrder.orderLines?.map(order => order.lineItem?.itemPriceAmount) }}</div> -->
  <lq-table :config :debug="true">
    <template #cell[0]="{ row, table, ...attrs }">
      <lq-autocomplete :="attrs" :config="autocomplete"
        @select-value="data => table.assign(row, data)" />
    </template>
  </lq-table>
</template>