<script setup lang="ts">
import { BryntumGrid } from '@bryntum/grid-vue-3-thin';
import { Store } from '@bryntum/core-thin';
import { useSalesOrderStore } from "@boost/repository";
import { onMounted, onActivated, ref, reactive } from "vue";
import { salesOrderGridConfig } from "./sales-order-grid.js";

import "@bryntum/core-thin/core.material.css";
import "@bryntum/grid-thin/grid.material.css";

const salesOrderStore = useSalesOrderStore();

const store = new Store({
    syncDataOnLoad: true,
    data: salesOrderStore.orderList,
});

/**
 * subscribe function for MCQT
 * */
salesOrderStore.$subscribe(() => {
    store.data = salesOrderStore.orderList;
});


const grid = ref(<any>{});
const gridConfig = reactive(salesOrderGridConfig());

onActivated(() => {
    //store.data = organizationStore.organizationList;
});

</script>

<template>
    <lq-page
        :title="$t('Sales Orders')"
        :add-title="$t('New order')"
        :add="['sales-order', { salesOrderUUID: 'new' }]">
        <div class="grid-container">
            <bryntum-grid ref="grid" @cell-click="(e: any) => $router.push({name: 'sales-order', params: {salesOrderUUID: e.record.data.UUID}})" :store="store" v-bind="gridConfig" />
        </div>

</lq-page>
</template>

<style scoped>
.grid-container {
    margin-top:30px;
    height: calc(100vh - 200px);
}
</style>