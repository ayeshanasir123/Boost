<script setup lang="ts">
import { computed, ref, useAttrs, reactive, onMounted, watch, nextTick } from 'vue';
import { LqTableSelect, LqProjectCard, LqModal, type TableSelectConfig } from '@boost/ui';
//import LqProjectEdit from './lq-project-edit.vue';
import { useProjectStore, type Project } from '@boost/repository';

interface ProjectFilter {
    customerUUID?: string | null;
}

const projectFilter = ref<ProjectFilter>({customerUUID: null});

const $attrs = useAttrs();
const store = useProjectStore();

const projects = computed({
  get() {
    return store.getProjectsByFilter(projectFilter).value;
  }
});

console.log("Project selector");

const addOpen = ref(false);

const props = defineProps<{
    organizationId?: string | null | undefined;
    showAll?: boolean;
}>();

console.log(props.showAll);
console.log(props.organizationId);

const loading = ref(false);

const model = defineModel<Project['UUID'] | null | undefined>({ required: true });
const project = ref<Project>();

const newProject = ref({} as Project);

//watch(() => props.organizationId, updateProjects, { immediate: true });

watch(() => props.organizationId, (newVal) => {
    projectFilter.value.customerUUID = newVal;
}, { immediate: true });

const config: TableSelectConfig<Project> = {
    getRow: project => Object.assign([
        project.identifier,
        project.name,
    ], { item: { id: project.UUID, title: project.name } })
};

async function saveProject() {
    const project = await store.createProject(props.organizationId!, newProject.value);
    model.value = project.projectId;
    addOpen.value = false;
}

</script>
<template>
    <div>
        <lq-table-select :disabled="!showAll && props.organizationId == null" :="$attrs" :loading :config :items="projects" v-model="model"
            @add-button-click="newProject = {} as Project, addOpen = true"
            :add-button="!!organizationId && 'Add new project'" />
    </div>
    <lq-modal v-model:open="addOpen" title="Add new project" :save="saveProject">
        <!-- <lq-project-edit :project="newProject"/> -->
    </lq-modal>
</template>