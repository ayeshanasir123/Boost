<template>
  <main class="main">
    <div class="list-container">
      <ul>
        <li v-for="route in routes" :key="route.name">
          <router-link :to="generatePath(route.path)">
            {{ route.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="grid-container">
      <v-card>
        <v-card-title>Fiscal Years</v-card-title>
        <v-card-text>
          <bryntum-grid
            ref="grid"
            :store="store"
            v-bind="gridConfig"
            @cellClick="onCellClick"
          />
        </v-card-text>
      </v-card>
    </div>


  </main>
</template>

<script setup lang="ts">
import { BryntumGrid } from '@bryntum/grid-vue-3-thin';
import { RouterLink } from 'vue-router';
import { useOrganizationStore, useProfileStore, useFiscalYearStore } from '@boost/repository';
import { Store } from '@bryntum/core-thin';
import { routes } from '../../routes';

import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, reactive, watch } from 'vue';
import { useGridConfig } from './fiscal-grid'; // Adjusted import path
import { useI18n } from 'vue-i18n';
import "@bryntum/core-thin/core.material.css";
import "@bryntum/grid-thin/grid.material.css";


const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const organizationStore = useOrganizationStore();
const profileStore = useProfileStore();
const tenantId = profileStore.getTenantId();
const fiscalYearStore = useFiscalYearStore();

const generatePath = (path: string): string => {
  return path.replace(':tenantId', tenantId).replace(':documentId', 'new');
};

const store = new Store({
  syncDataOnLoad: true,
  data: [],
});

const grid = ref<any>({});
const gridConfig = reactive(useGridConfig());
const selectedFiscalYear = ref<any>(null);
const dialog = ref(false);
const organizaData = ref<any[]>([]); // Initialize as an empty array
const fiscalYears = ref<any[]>([]);

// Fetch fiscal years and update store when data is ready
const fetchAndMapData = async () => {
  try {
    // Fetch fiscal year data
    fiscalYears.value = await fiscalYearStore.fetchFiscalYear();
    console.log("test data " );
    console.log( fiscalYears.value);
    console.log( organizaData.value);

    // Ensure organizaData has data before mapping
    if (!organizaData.value.length) {
      console.warn('No organization data available for mapping');
      return;
    }
  

    // Map organization names to fiscal year data
    const mappedFiscalYears = mapOrganizationNames(fiscalYears.value, organizaData.value);
console.log(mappedFiscalYears);
    // Update store data
    store.data = mappedFiscalYears;
    console.log('Grid store data:', store.data);
  } catch (error) {
    console.error('Error fetching fiscal years:', error);
  }
};
const emit = defineEmits(['navigationEvent']);


// Watch for changes in organizationData

watch(() => organizationStore.organizationList, (newVal) => {
  organizaData.value = newVal;
  console.log('Updated Organization Data:', organizaData.value);
  fetchAndMapData();
}, { immediate: true });
// watch(organizaData, (newData) => {
  
//   if (fiscalYears.value.length) {
//     fetchAndMapData(); // Call the function to map data when organizaData changes
//   }
// }, { immediate: true });

// Fetch initial data on mount
onMounted(async () => {
  const gridInstance = grid.value.instance.value;
  gridInstance.on('cellClick', (event) => {
    router.push('/' + route.params.tenantId + '/accounting/' + event.record.data.UUID);
    emit('navigationEvent', event.record.data.UUID);
  });
 
});

// Mapping function
const mapOrganizationNames = (fiscalYearData: any[], organizationData: any[]) => {
  return fiscalYearData.map((fy: any) => {
    // console.log('Fiscal Year:', fy); // Log each fiscal year record
    // console.log('Organization Data:', organizationData); // Log organization data



    const foundOrganization = organizationData.find(org => {
  const uuidMatch = String(org.UUID).trim().toLowerCase() === String(fy.organizationUUID).trim().toLowerCase();
  
  return uuidMatch;
});
   


    return {
      ...fy,
      organizationName: foundOrganization ? foundOrganization.name : 'Unknown'
    };
  });
};


const editRecord = (record: any) => {
  // console.log(record.data);
  selectedFiscalYear.value = { ...record.data };
  // console.log(selectedFiscalYear.value);
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const saveEdit = () => {
  // console.log('Saving edited fiscal year:', selectedFiscalYear.value);
  dialog.value = false;
};

const onCellClick = ({ column, record }: any) => {
  console.log("test");
  if (column.field === 'edit') {
    console.log("edit");
    editRecord(record);
  }
};
</script>

<style scoped>
.main {
  display: flex;
  margin-left: 20px;
}

.list-container {
  margin-right: 50px;
}

.grid-container {
  flex: 1;
  margin-top: 50px;
}

.v-card {
  width: 100%;
  height: 300px;
}

.v-card .v-card-text {
  line-height: 1.425;
  height: 90%;
  overflow: auto;
}

.v-card[data-v-a687ebc6] {
  width: 50%;
}
</style>
