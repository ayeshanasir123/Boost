<script setup lang="ts">
import { BryntumGrid } from '@bryntum/grid-vue-3-thin';
import { Store } from '@bryntum/core-thin';
import { useItemStore } from "@boost/repository";
import { useRouter, useRoute } from 'vue-router';
import { onMounted, onActivated, ref, reactive } from 'vue';
import { useGridConfig } from "./item-grid-config";
import { useI18n } from 'vue-i18n'

import "@bryntum/core-thin/core.material.css";
import "@bryntum/grid-thin/grid.material.css";

const { t } = useI18n();

const itemStore = useItemStore();
const store = new Store({
  syncDataOnLoad: true,
  data: itemStore.itemList
});

/**
 * subscribe function for MCQT
 * */
itemStore.$subscribe(() => {
  store.data = itemStore.itemList;
})

const emit = defineEmits(['navigationEvent']);

const grid = ref(<any>{});
const gridConfig = reactive(useGridConfig());

const router = useRouter()
const route = useRoute()

onActivated(() => {
  //store.data = organizationStore.organizationList;
});

onMounted(() => {
  const gridInstance = grid.value.instance.value;
  gridInstance.on('cellClick', (event) => {
    router.push('/' + route.params.tenantId + '/erp/items/' + event.record.data.UUID);
    emit('navigationEvent', event.record.data.UUID);
  });

});

</script>

<template>
    <bryntum-grid
        ref="grid"
        :store="store"
        v-bind="gridConfig"
    />
</template>
