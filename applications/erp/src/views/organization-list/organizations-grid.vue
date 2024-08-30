<script setup lang="ts">
import { BryntumGrid } from '@bryntum/grid-vue-3-thin';
import { Store } from '@bryntum/core-thin';
import { useOrganizationStore } from "@boost/repository";
import { useRouter, useRoute } from 'vue-router';
import { onMounted, onActivated, ref, reactive } from 'vue';
import { useGridConfig } from "./organization-grid";
import { useI18n } from 'vue-i18n'

import "@bryntum/core-thin/core.material.css";
import "@bryntum/grid-thin/grid.material.css";

const { t } = useI18n();

const organizationStore = useOrganizationStore();
const store = new Store({
  syncDataOnLoad: true,
  data: organizationStore.organizationList
});

/**
 * subscribe function for MCQT
 * */
organizationStore.$subscribe(() => {
  store.data = organizationStore.organizationList;
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
    router.push('/' + route.params.tenantId + '/erp/organizations/' + event.record.data.organizationId);
    emit('navigationEvent', event.record.data.organizationId);
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
