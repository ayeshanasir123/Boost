<script setup lang="ts">
import { BryntumGrid } from '@bryntum/grid-vue-3-thin';
import { Store } from '@bryntum/core-thin';
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';
import { useAccountStore } from '@boost/repository';
import { accounts, useGridConfig } from './chart-grid'; // Ensure this path is correct
import { useI18n } from 'vue-i18n';

import "@bryntum/core-thin/core.material.css";
import "@bryntum/grid-thin/grid.material.css";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const accountStore = useAccountStore();

const store = new Store({
  syncDataOnLoad: true,
  data: accounts
});

const emit = defineEmits(['navigationEvent']);
const grid = ref<any>({});
const gridConfig = reactive(useGridConfig());
const account = ref<any[]>([]);

onMounted(() => {
  loadData();
  const gridInstance = grid.value.instance.value;
  gridInstance.on('cellClick', (event) => {
    console.log(event.record.data);
    router.push('/' + route.params.tenantId + '/accounting/items/' + event.record.data.defaultProjectUUID);
  
    emit('navigationEvent', event.record.data.defaultProjectUUID);
    
  });

});

// onMounted(() => {
//   const gridInstance = grid.value.instance.value;
//   gridInstance.on('cellClick', (event) => {
//     console.log(event.record.data);
    
//     // Correctly push the route with state data
//     router.push({
//       path: '/' + route.params.tenantId + '/accounting/items/' + event.record.data.defaultProjectUUID,
//     });

//     // Emit the navigation event with the data
//     emit('navigationEvent', event.record.data);
//   });
// });
  // adjustGridHeight(); // Call function to adjust grid height initially
  // window.addEventListener('resize', adjustGridHeight); // Adjust height on window resize
// });
const loadData = async () => {
  // try {
    // Fetch fiscal year data
    account.value = await accountStore.fetchAccount();
    console.log("test data " );
    console.log( account.value);
   
};
// const emit = defineEmits(['navigationEvent']);
const adjustGridHeight = () => {
  const gridElement = document.getElementById('bryntum-grid');
  if (gridElement) {
    const rect = gridElement.getBoundingClientRect();
    gridElement.style.height = `${window.innerHeight - rect.top}px`; // Adjust height based on available viewport space
  }
};

</script>

<template>
 

    <bryntum-grid
      ref="grid"
      id="bryntum-grid"
      :store="store"
      v-bind="gridConfig"
    />

</template>

