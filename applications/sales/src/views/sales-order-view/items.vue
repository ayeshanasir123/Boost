<script setup lang="ts">
import { ref, computed, toRef, inject } from 'vue';
import type { TableConfig } from '@boost/ui';
import type { SalesOrder, SalesOrderLine, SalesOrderLineItem, Item } from '@boost/repository';

import { salesOrder } from './index.vue';

const round = (n?: number) => n ? Math.round((n + Number.EPSILON) * 100) / 100 : 0;
const multiply = (a?: number, b?: number) => {
    if (!a || !b) return null;
    return a * b;
};

const config: TableConfig = {
    header: ['#', 'Title', 'Quantity', 'Unit', 'Price', 'Total', 'VAT%', 'VAT', 'Total incl. VAT'],
    data: computed(() => salesOrder.orderLines!.map(line => {
        const lineExtensionAmount = multiply(line.quantity, line.itemPriceAmount);
        const lineExtensionAmountRounded = lineExtensionAmount != null ? round(lineExtensionAmount) : 0;
        //const taxDivider = (((line.lineItem?.itemClassifiedTaxCategoryPercent ?? 0) / 100) + 1);
        const taxMultiplier = ((line.itemClassifiedTaxCategoryPercent ?? 0) / 100);
        const totalTaxAmount = multiply(lineExtensionAmountRounded, taxMultiplier);
        const totalTaxAmountRounded = totalTaxAmount != null ? round(totalTaxAmount) : 0;

        // Assign totalTaxAmountRounded to totalTaxAmount property
        const totalTaxAmountRef = toRef(line, 'totalTaxAmount');
        totalTaxAmountRef.value = totalTaxAmountRounded;

        return {
            identifier: toRef(line, 'itemSellersItemIdentificationId'),
            name: toRef(line, 'itemName'),
            quantity: toRef(line, 'quantity'),
            unit: toRef(line, 'quantityUnitCode'),
            price: toRef(line, 'itemPriceAmount'),
            lineExtensionAmount: lineExtensionAmountRounded,
            itemClassifiedTaxCategoryPercent: toRef(line, 'itemClassifiedTaxCategoryPercent'),
            totalTaxAmount: line.totalTaxAmount,
            taxInclusiveLineExtensionAmount: round(lineExtensionAmountRounded + totalTaxAmountRounded),
            // hidden
            id: toRef(line, 'itemUUID'),
            vat: toRef(line, 'itemClassifiedTaxCategoryPercent')
        }
    })),

    tabstops: 'sku quantity',
    raw: salesOrder.orderLines!,
    newRow: () => ({})
};

</script>
<template>
    <!-- <div>{{ salesOrder.orderLines?.map(order => order.lineItem?.itemPriceAmount) }}</div> -->
    <lq-table :config :debug="true">
        <template #cell[0]="{ row, table, ...attrs }">
            <lq-item-select required free-text :="attrs" @select-value="data => table.assign(row, data)" />
        </template>
    </lq-table>
</template>