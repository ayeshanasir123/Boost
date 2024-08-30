<script lang="ts">
import { type FiscalYear, createModel } from '@boost/repository';
import { reactive, ref, onMounted, onUnmounted, watch } from 'vue';

export const fiscalYears = createModel<FiscalYear>();
</script>

<script setup lang="ts">
import { useRoute } from "vue-router";
import {useFiscalYearStore } from "@boost/repository";

import { useI18n } from "vue-i18n";
// import { type FiscalYear } from "@boost/repository";

const props = defineProps<{
  fiscalYearUUID: FiscalYear["fiscalYearUUID"];  // Ensure this matches
}>();
// const organizationStore = useOrganizationStore();
const fiscalYearStore = useFiscalYearStore();
const route = useRoute();
const loadingError = ref("");
const { t } = useI18n();
const pageTitle = ref("");

const statuses = ref(['Yes', 'No']); // Example statuses




async function loadData(fiscalYearUUID: string) {
  console.log(fiscalYearUUID);
  try {
    const fetchedItem = await fiscalYearStore.getAccountByFiscalYearUUID(fiscalYearUUID);
    if (fetchedItem) {
      // fiscalYears.set(fetchedItem);
      // Map the fetched data to the fiscalYears model
      fiscalYears.set({
        fiscalYearUUID : fetchedItem.UUID,
        organization: { organizationId: fetchedItem.organizationUUID }, // Set the organization with UUID
        status: fetchedItem.locked === 1 ? 'Yes' : 'No',  // Convert locked field to status
        startdate: new Date(fetchedItem.startDate),  // Convert date strings to Date objects
        enddate: new Date(fetchedItem.endDate),
      });
    } else {
      console.error("Fiscal year not found for UUID:", fiscalYearUUID);
    }
  } catch (error) {
    console.error("Error fetching fiscal year data:", error);
  }
}

const saveProject = async () => {

  // Extract the organizationUUID from the organization object
  const organizationUUID = fiscalYears.organization?.organizationId;

  // Set the organizationUUID in the fiscalYears model
  if (organizationUUID) {
    fiscalYears.set({organizationUUID: organizationUUID,
      locked: fiscalYears.status === 'Yes' ? 1 : 0,
    startDate: fiscalYears.startdate,
    endDate: fiscalYears.enddate,
    UUID : fiscalYears.fiscalYearUUID
     });
  }
  console.log(fiscalYears);

  console.log(fiscalYears);

  // Save the fiscal year data
  const savedProject = await fiscalYearStore.save(fiscalYears);

  console.log("done");

  // Update the fiscalYears model with the saved data
  fiscalYears.set(savedProject);

  // Return to the "Settings" page
  return ["Settings", { fiscalYearUUID: fiscalYears.fiscalYearUUID }];
};



// On mounted, load data for the first time
onMounted(() => {

if (props.fiscalYearUUID === "new") {
    pageTitle.value = t("New FiscalYear");
    fiscalYears.set({ locked: 0, organizationUUID: null, startDate: new Date(), endDate: new Date() });
  } else {
    try {
      loadData(props.fiscalYearUUID as string);
    } catch (e) {
      loadingError.value = (e as Error).message;
    }
    pageTitle.value = t("Edit FiscalYear");
    
  }
});

</script>


<template>
  <lq-error :error="loadingError" />
  <lq-page
    v-if="fiscalYears"
    :title="pageTitle"
    cancel="Settings"
    :save="saveProject"
  >
    <lq-line class="pt-7">
      <lq-party-select
        :label="t('Organization')"
        role="customer"
        required
        v-model="fiscalYears.organization"  
      />
    </lq-line>

    <lq-line>
      <lq-select width="150" :items="statuses" label="Locked" v-model="fiscalYears.status" />
      <lq-datepicker width="350" label="Start Date" v-model="fiscalYears.startdate" />
      <lq-datepicker width="350" label="End Date" v-model="fiscalYears.enddate" />
    </lq-line>
  </lq-page>
</template>
