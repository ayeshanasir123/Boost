<script setup lang="ts">
import { BryntumGrid } from '@bryntum/grid-vue-3-thin'
import { Store } from '@bryntum/core-thin'
import { useSalesOrderStore } from '@boost/repository'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, onActivated, ref, reactive } from 'vue'
import { salesOrderGridConfig } from './sales-order-grid.js'

import '@bryntum/core-thin/core.material.css'
import '@bryntum/grid-thin/grid.material.css'

const router = useRouter()
const route = useRoute()

const salesOrderStore = useSalesOrderStore()

const store = new Store({
  syncDataOnLoad: true,
  data: salesOrderStore.orderList
})

/**
 * subscribe function for MCQT
 * */
salesOrderStore.$subscribe(() => {
  store.data = salesOrderStore.orderList
})

//const emit = defineEmits(['navigationEvent']);

const grid = ref(<any>{})
const gridConfig = reactive(salesOrderGridConfig())

// const router = useRouter();
// const route = useRoute();

onActivated(() => {
  //store.data = organizationStore.organizationList;
})

onMounted(() => {
  const gridInstance = grid.value.instance.value

  //Removed EVENT from function
  gridInstance.on('cellClick', (event) => {
    console.log('cellClick')
    //organizationStore.setActive(event.record.data.organizationId);
    router.push(`/${route.params.tenantId}/erp/sales/salesorders/${event.record.data.id}`)
    //emit('navigationEvent', event.record.data.organizationId);
  })
})
</script>

<template>
  <main class="main">
    <h2>Sales Orders</h2>
    <RouterLink to="/tenantId/erp/sales/salesorders/new">Create Sales Order</RouterLink>
    <div class="main-no-scroll main-scroll">
      <bryntum-grid ref="grid" :store="store" v-bind="gridConfig" />
    </div>
  </main>
</template>

<style scoped>
.main-no-scroll {
  height: 100vh;
}

.bryntum-grid-height {
  height: calc(100vh - 64px);
  padding-bottom: 100px;
}
</style>
