<script setup lang="ts">

import type { TableConfig } from '@boost/ui';
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';
import { salesOrder } from './index.vue';

const round = (n?: number) => n ? Math.round((n + Number.EPSILON) * 100) / 100 : 0;
const multiply = (a?: number, b?: number) => {
    if (!a || !b) return 0;
    return a * b;
};

const items = computed(() => {
    return salesOrder.orderLines!.map(line => ({
        ...line,
        lineExtensionAmount: round(multiply(line.quantity, line.itemPriceAmount)) ?? 0,
    })).filter(item => item.lineExtensionAmount);
});

const totals = computed(() => {

    const totals = {
        lineExtensionAmount: 0,
        allowanceTotalAmount: 0,
        chargeTotalAmount: 0,
        taxExclusiveAmount: 0,
        taxInclusiveAmount: 0,
        taxTotalTaxAmount: 0,
        prepaidAmount: 0,
        payableRoundingAmount: 0,
        payableAmount: 0,
    }

    items.value.forEach(item => {
        let taxMultiplierDivider = ((item.itemClassifiedTaxCategoryPercent ?? 0) / 100) + 1;
        //UBL (cac:OrderLine/cac:LineItem/cbc:LineExtensionAmount)
        totals.lineExtensionAmount += item.lineExtensionAmount;
        totals.taxTotalTaxAmount += (item.totalTaxAmount ?? 0);
    });

    /*

    if (item?.itemPriceAllowanceChargeChargeIndicator && item.itemPriceAllowanceChargeAmount != undefined) {
            //UBL (cac:AllowanceCharge[ChargeIndicator='false']/cbc:Amount)
            totals.chargeTotalAmount += item.itemPriceAllowanceChargeAmount;
        } else if (!item?.itemPriceAllowanceChargeChargeIndicator && item.itemPriceAllowanceChargeAmount != undefined) {
            //UBL (cac:AllowanceCharge[ChargeIndicator='true']/cbc:Amount)
            totals.allowanceTotalAmount += item.itemPriceAllowanceChargeAmount;
        }*/

        //UBL cac:AnticipatedMonetaryTotal/cbc:LineExtensionAmount – cac:AnticipatedMonetaryTotal/cbc:AllowanceTotalAmount + cac:AnticipatedMonetaryTotal/cbc:ChargeTotalAmount
        totals.taxExclusiveAmount += totals.lineExtensionAmount;

        //UBL cac:AnticipatedMonetaryTotal/cbc:TaxExclusiveAmount + cac:TaxTotal/cbc:TaxAmount
        totals.taxInclusiveAmount = totals.taxExclusiveAmount + totals.taxTotalTaxAmount;    

        totals.payableAmount = Math.round(totals.taxInclusiveAmount);

        totals.payableRoundingAmount = round(totals.payableAmount - totals.taxInclusiveAmount);

    return totals;
});

const config: TableConfig = {
    data: computed(() => {
        const { value } = totals;
        return [
            ['Line Extension Amount', value.lineExtensionAmount],
            ['Allowance Total Amount', value.allowanceTotalAmount],
            ['Charge Total Amount', value.chargeTotalAmount],
            ['Tax Exclusive Amount', value.taxExclusiveAmount],
            ['Tax Amount', value.taxTotalTaxAmount],
            ['Tax Inclusive Amount', value.taxInclusiveAmount],
            ['Payable rounding amount', value.payableRoundingAmount],
            ['Prepaid Amount', value.prepaidAmount],
            ['Payable Amount', value.payableAmount]
        ];
    })
}
</script>

<template>
    <lq-card style="min-width:400px" class="py-6">
        <lq-table :config readonly />
    </lq-card>
</template>