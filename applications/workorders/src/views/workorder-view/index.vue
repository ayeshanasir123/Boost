<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useOrganizationStore } from "@boost/repository";
import { useWorkOrderStore } from "@boost/repository";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  workorderUUID: string;
}>();

const workOrderStore = useWorkOrderStore();

const route = useRoute();
//const router = useRouter();

const workOrder = ref();
const loadingError = ref("");
const { t } = useI18n();
const pageTitle = ref("");

// Function to load data
async function loadData(workorderUUID: string) {
  const fetchedItem = workOrderStore.getWorkOrderByUUID(
    workorderUUID as string
  );
  if (fetchedItem) {
    workOrder.value = fetchedItem;
  } else {
    // Handle the case where organization is not found
  }
}

const saveItem = async () => {
  workOrder.value = await workOrderStore.createWorkOrder(workOrder.value);
  return ["project-list", { workorderUUID: workOrder.value.UUID }];
};

// On mounted, load data for the first time
onMounted(() => {
  console.log(props.workorderUUID);
  if (props.workorderUUID === "new") {
    pageTitle.value = t("New WorkOrder");
    workOrder.value = { name: "" };
  } else {
    try {
      loadData(props.workorderUUID as string);
    } catch (e) {
      loadingError.value = (e as Error).message;
    }
    pageTitle.value = t("WorkOrder");
  }
});

//Watch for changes in the route params and reload data
watch(
  () => workOrder.value,
  (newItem) => {
    if (newItem) {
      if (route.params.workorderUUID === "new") {
        pageTitle.value = t("New Project");
      } else {
        pageTitle.value = t("Edit ") + " " + newItem.name;
      }
    }
  }
);
</script>

<template>
  <lq-error :error="loadingError" />
  <lq-page
    v-if="workOrder"
    :title="pageTitle"
    cancel="workorder-list"
    :save="saveItem"
  >
    {{ workOrder }}
  </lq-page>
</template>
