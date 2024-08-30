<script lang="ts">
import { type Project, createModel } from '@boost/repository';
import { reactive, ref, onMounted, onUnmounted, watch } from 'vue';

export const project = createModel<Project>();
</script>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useOrganizationStore } from "@boost/repository";
import { useProjectStore } from "@boost/repository";
import { useI18n } from "vue-i18n";
import { type Project } from "@boost/repository";

const props = defineProps<{
  projectUUID: Project["UUID"];
}>();

const projectStore = useProjectStore();

const route = useRoute();
const loadingError = ref("");
const { t } = useI18n();
const pageTitle = ref("");

const categories = ref(['Standard','Fastpris']);

// Function to load data
async function loadData(projectUUID: string) {
  const fetchedItem = await projectStore.getProjectByUUID(projectUUID);
  //console.log(fetchedItem);
  if (fetchedItem) {
    project.set(fetchedItem);
  } else {
    // Handle the case where organization is not found
  }
}

const saveProject = async () => {
  const savedProject = await projectStore.save(project);
  project.set(savedProject);
  return ["project-list", { projectUUID: project.UUID }];
};

// On mounted, load data for the first time
onMounted(() => {
  if (props.projectUUID === "new") {
    pageTitle.value = t("New Project");
    project.set({ name: "", customerUUID: null, categoryUUID: null, identifier: "", prefix: "", generateIdentifier: true });
  } else {
    try {
      loadData(props.projectUUID as string);
    } catch (e) {
      loadingError.value = (e as Error).message;
    }
    pageTitle.value = t("Edit Project");
  }
});

watch(
  () => [project?.customer, project?.accountingCustomer],
  ([newCustomer, newAccountingCustomer]) => {
   
    if (newCustomer && 'organizationId' in newCustomer) {
      project.customerUUID = newCustomer.organizationId;
    }
    if (newAccountingCustomer && 'organizationId' in newAccountingCustomer) {
      project.accountingCustomerUUID = newAccountingCustomer.organizationId;
    }

  }
);
</script>

<template>
  <lq-error :error="loadingError" />
  <lq-page
    v-if="project"
    :title="pageTitle"
    cancel="project-list"
    :save="saveProject"
  >
    <lq-line class="pt-5">
      <lq-select width="150"
            v-model="project.categoryUUID"
            :items="categories"
            :label="t('Type')" />   
            <lq-text-input
            v-model="project.name"
            :label="t('Project Name')"
            required />
      <lq-person-select
            v-model="project!.projectManagerUUID"
            :label="t('Project Manager')" />
    </lq-line>
    <lq-line class="pt-3">
      <lq-text-input
        width="150px"
            v-model="project.identifier"
            :label="t('Project Code')"
            :disabled="project.isPersisted"
            v-if="!project.generateIdentifier"
            />
            <lq-text-input
          width="100px"
            v-model="project.prefix"
            :label="t('Prefix')"
            :disabled="project.isPersisted"
            required />
            <lq-party-select
            :label="t('Customer')"
            role="customer"
            required
            v-model="project!.customer" />      
        <lq-person-select
            v-model="project!.mainContactUUID"
            :label="t('Contact Person')" />

    </lq-line>
    <lq-line v-if="!project.isPersisted" class="pt-5">
      <lq-checkbox label="Generate Project Code" v-model="project.generateIdentifier" />
    </lq-line>
    <lq-route-tabs v-if="project?.isPersisted" class="pt-5 mb-5" parent="project-view" />
  </lq-page>
</template>
