<script setup lang="ts">
import { BryntumGrid } from "@bryntum/grid-vue-3-thin";
import { Store } from "@bryntum/core-thin";
import { useSalesOrderStore } from "@boost/repository";
//import { useRouter, useRoute } from "vue-router";
import { onMounted, onActivated, ref, reactive } from "vue";
import { salesOrderGridConfig } from "./sales-order-grid.js";
import '@bryntum/grid-thin/grid.material.css';
import '@bryntum/grid-thin/grid.stockholm.css';

const salesOrderStore = useSalesOrderStore();

const store = new Store({
  syncDataOnLoad: true,
  data: salesOrderStore.orderList,
});

/**
 * subscribe function for MCQT
 * */
useSalesOrderStore.$subscribe(() => {
  store.data = salesOrderStore.orderList;
});

//const emit = defineEmits(['navigationEvent']);

const grid = ref(<any>{});
const gridConfig = reactive(salesOrderGridConfig());

// const router = useRouter();
// const route = useRoute();

onActivated(() => {
  //store.data = organizationStore.organizationList;
});

onMounted(() => {
  const gridInstance = grid.value.instance.value;

  //Removed EVENT from function
  gridInstance.on("cellClick", () => {
    //organizationStore.setActive(event.record.data.organizationId);
    //router.push(`/${route.params.tenantId}/erp/organizations/${event.record.data.organizationId}`);
    //emit('navigationEvent', event.record.data.organizationId);
  });
});
</script>

<template>
  <bryntum-grid ref="grid" :store="store" v-bind="gridConfig" />
</template>
