<script setup lang="ts">
import { BryntumGrid } from "@bryntum/grid-vue-3-thin";
import { Store } from "@bryntum/core-thin";
import { useWorkOrderStore } from "@boost/repository";
import { useRouter, useRoute } from "vue-router";
import {
  onMounted,
  onActivated,
  ref,
  reactive,
  onBeforeUnmount,
  watch,
  computed,
  watchEffect,
} from "vue";

import {
  useGridConfig,
  shouldOpenPopup,
  clickedData,
  shouldOpenAssignedPopup,
} from "./workorder-grid";

import { useI18n } from "vue-i18n";

import "@bryntum/core-thin/core.material.css";
import "@bryntum/grid-thin/grid.material.css";

const { t } = useI18n();

const WorkOrderStore = useWorkOrderStore();

const store = new Store({
  syncDataOnLoad: true,
  data: WorkOrderStore.workOrderList,
});

/**
 * subscribe function for MCQT
 * */
WorkOrderStore.$subscribe(() => {
  store.data = WorkOrderStore.workOrderList;
});

const emit = defineEmits(["navigationEvent"]);

const grid = ref(<any>{});
const gridConfig = reactive(useGridConfig());

const router = useRouter();
const route = useRoute();

onActivated(() => {
  //store.data = organizationStore.organizationList;
});

onMounted(() => {
  const gridInstance = grid.value.instance.value;
  gridInstance.on("cellClick", (event) => {
    if (event.target.classList.contains("eyeviewbtn")) {
      router.push("/erp/workorder/" + event.record.data.id);
    } else if (
      event.column.data.field == "assignedPersonId" ||
      event.column.data.field == "assignedOrganizationId"
    ) {
      quickEdit.value = true;
    }
  });
});

const quickEdit = ref<boolean>(false);
const quickEditWorkOrder = ref<TimWorkorder | null>(null);
const assignableOrganizations = ref<Organization[]>([]);
const assignablePersons = ref<Person[]>([]);

const PopupValue = ref(false);
const PopupAssignedValue = ref(false);
watch(shouldOpenPopup, (newValue) => {
  PopupValue.value = newValue;
});

watch(shouldOpenAssignedPopup, (newValue) => {
  PopupAssignedValue.value = newValue;
});

watch(clickedData, (newValue) => {
  quickEdit.value = true;
  clickedData.value = "";
  //quickEditWorkOrder.value = newValue;
});

const sendEmail = () => {
  console.log("api will send email");
};
const closeModal = () => {
  shouldOpenPopup.value = false;
};

const closeAssignedModal = () => {
  shouldOpenAssignedPopup.value = false;
};

onBeforeUnmount(() => {
  // removeSaveButton();
  document.removeEventListener("click", clickOutsideHandler);
});

const modalRef = ref(null as HTMLElement | null);
const clickOutsideHandler = (event) => {
  if (PopupValue.value) {
    const isClickInsideModal = modalRef.value?.contains(event.target);
    const isMailBtnClick = event.target.classList.contains("mailbtn");
    if (!isClickInsideModal && !isMailBtnClick) {
      closeModal();
    }
  }
};

const features = ref({
  cellEdit: {
    triggerEvent: "cellclick",
  },
  // Add other features as needed
})

const rawData = ref(WorkOrderStore.workOrderList);

const updateColumns = () => {
  const statuses = new Set(rawData.value.map((item) => item.status));
  const statusColumn = gridConfig.columns.find((col) => col.field === "status");
  if (statusColumn) {
    const statusItems = Array.from(statuses);
    statusColumn.filterable.filterField.items = statusItems;
    statusColumn.editor.items = statusItems;
  }

};

watch(
  () => WorkOrderStore.workOrderList, // Watch the workOrderList directly
  (newWorkOrderList) => {
    if (newWorkOrderList.length > 0) {
      rawData.value = newWorkOrderList;
      updateColumns();
    }
    store.data = newWorkOrderList;
  },
  { immediate: true, deep: true } // Immediate ensures it runs once immediately, deep tracks nested changes
);
updateColumns();
</script>

<template>
  <div v-if="PopupValue">
    <div ref="modalRef" id="emailModal" class="modal">
      <span class="close-btn" @click="closeModal">&times;</span>
      <h2>Email Information</h2>
      <form>
        <label for="recipient">Recipient Email:</label>
        <input type="email" id="recipient" name="recipient" required />

        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required />

        <label for="body">Email Body:</label>
        <textarea id="body" name="body" rows="4" required></textarea>

        <button type="button" @click="sendEmail">Send Email</button>
      </form>
    </div>
  </div>

  <v-dialog width="auto" v-model="quickEdit">
    <v-card title="Quick Edit">
      <v-card-text>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <v-form>
          <v-select
            v-model="selectedOrganization"
            :items="assignableOrganizations"
            item-text="name"
            item-value="id"
            label="Select Organization"
            return-object
          ></v-select>

          <v-select
            v-model="selectedPerson"
            :items="assignablePersons"
            item-text="name"
            item-value="id"
            label="Select Person"
            return-object
          ></v-select>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close Dialog" @click="quickEdit = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <lq-page
    :title="$t('Work Orders')"
    :add-title="$t('New Work Order')"
    :add="['work-order', { workOrderUUID: 'new' }]"
  >
    <div class="grid-container">
      <bryntum-grid
        ref="grid"
        :store="store"
        v-bind="gridConfig"
        :features="features"
      />
    </div>
  </lq-page>
</template>

<style scoped>
.grid-container {
  margin-top: 30px;
  height: calc(100vh - 200px);
}

.email-popup {
  background: #ffc700;
  color: #fff;
  padding: 5px;
  margin: 5px;
  border-radius: 0px !important;
}

.visabtn {
  background: #009ef7;
  color: #fff;
  padding: 5px;
  margin: 5px;
  border-radius: 0px !important;
}

.visabtn:hover {
  color: #ffffffed;
}

/* Styles for the modal */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  border-radius: 10px;
}

/* Styles for the overlay */
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Styles for the close button */
.close-btn {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

/* Additional styling for form elements */
label {
  display: block;
  margin-bottom: 8px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

#emailModal button {
  background-color: #009ef7;
  color: white !important;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#emailModal input,
#emailModal textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.adjust-label {
  display: block;
  margin-bottom: 15px;
  border: 1px solid;
  border-radius: 2px;
  padding: 10px;
}
.grid-target
  .b-filter-bar-compact
  .b-filter-bar-field
  .b-fieldtrigger.b-icon-calendar {
  display: unset;
}
</style>
