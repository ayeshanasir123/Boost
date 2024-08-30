<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { Store } from "@bryntum/core-thin";
//import { useGridConfig } from "@/lib/TaskGrid.js";
import {useOrganizationStore} from "@/stores/organizationStore";
import { useTaskStore } from "@/stores/taskStore";
import { usePersonStore } from "@/stores/personStore";
import { Task } from "@/model/Tod";
import LqDatePicker from "../forms/LqDatePicker.vue";
import Dropzone from "../Dropzone.vue";
//import Person from "@/model/Person";

const taskStore = useTaskStore();
const personStore = usePersonStore();
const isActive = ref(false);



export function editTask (task: Task) {
  isActive.value = true;
}
//const openTask = taskStore.openEditTask;

const task = ref<Task>(taskStore.getEmptyTask());
const newSubTask = ref<Task>(taskStore.getEmptyTask());
const subTasks = ref<Task[]>([]);

const taskType = ref('c3948f6f-a191-491e-8a1a-16b6344a7443');

const organizationStore = useOrganizationStore();

function formatDate(value : any) {
  const date = new Date(value);
      const shortDateString = new Intl.DateTimeFormat('sv-SE', {dateStyle: 'short'}).format(date);
      return shortDateString;
  }



const addSubtask = async () => {
  if (newSubTask.value.assignedPersonUUID == null) return "";
  const result = await personStore.getPersonByUUID(newSubTask.value.assignedPersonUUID);
  if ('firstname' in result && 'lastname' in result) {
    newSubTask.value.assignedPersonName = `${result.firstname ?? ''} ${result.lastname ?? ''}`.trim();
    subTasks.value.push(newSubTask.value);
    newSubTask.value = taskStore.getEmptyTask();
  } else {
    console.error('Failed to retrieve person:', result.message);
  }
};


function removeSubTask(subIndex: number) {
    subTasks.value.splice(subIndex, 1);
}

const store = new Store({
  data: taskStore.taskList,
});

taskStore.$subscribe(() => {
  store.data = taskStore.taskList;
});

const emit = defineEmits(["navigationEvent"]);

const assignablePersons = computed(() =>
  personStore.assignableAndSortedPersonList()
);

const customers = computed(() =>
    organizationStore.queryOrganizations(true, 1)
);

console.log(customers);

// function getPersonNameByUUID(assignedUUID : any): string {
//   const person = assignablePersons.value.find(
//     (p: Person) => p.personId === assignedUUID
//   );
//   return person ? `${person.firstname} ${person.lastname}` : "Name not found";
// }

const taskCategories = ref([
  { name: "Support", UUID: "f809e4f2-f395-45d8-ab15-817854fbedb8" },
  { name: "Sälj", UUID: "f809e4f2-f395-45d8-ab15-817854fbedb8" },
  { name: "Utveckling", UUID: "c3948f6f-a191-491e-8a1a-16b6344a7443" },
  { name: "Ekonomi", UUID: "f809e4f2-f395-45d8-ab15-817854fbedb8" }
]);

/*
const taskCategories = ref([
  { name: "Kundtjänst", UUID: "c3948f6f-a191-491e-8a1a-16b6344a7443" },
  { name: "Sälj", UUID: "f809e4f2-f395-45d8-ab15-817854fbedb8" },
  { name: "IT", UUID: "f809e4f2-f395-45d8-ab15-817854fbedb8" },
  { name: "Ekonomi", UUID: "f809e4f2-f395-45d8-ab15-817854fbedb8" }
]);
*/

const taskTypes = ref([
  { name: "Enkel uppgift", UUID: "c3948f6f-a191-491e-8a1a-16b6344a7443" },
  { name: "Flerstegsraket", UUID: "f809e4f2-f395-45d8-ab15-817854fbedb8" },
]);

//const grid = ref(<any>{});
//const gridConfig = reactive(useGridConfig());

// function addTaskDialog() {
//   createTaskOpen.value = true;
// }

function createTask() {
  isActive.value = false;
  task.value.subTasks?.push(...subTasks.value);
  taskStore.createTask(task.value);
  task.value = taskStore.getEmptyTask();
  subTasks.value = [];
  newSubTask.value = taskStore.getEmptyTask();
}

//function saveTask(newTask: Task) {}



onMounted(() => {});
</script>

<template>
  <v-dialog max-width="800px" v-model="isActive" scrollable>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="Skapa Uppgift"
        variant="flat"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-title class="pl-6 pt-3 popup-header"><h2>Skapa uppgift</h2></v-title>
        <v-card-text style="height:80vh;">
          <v-row>
            {{ openTask }}
            <v-col cols="12" md="12" class="pb-0 mt-5">
              <v-select
                v-model="taskType"
                :items="taskTypes"
                item-title="name"
                item-value="UUID"
                label="Typ"
                required
                variant="outlined"
              ></v-select>
              <v-text-field
                v-model="task.title"
                label="Skriv vad som skall uppnås"
                required
                clearable
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" md="6" class="pb-0">
              <v-select
                v-model="task.categoryUUID"
                :items="taskCategories"
                item-title="name"
                item-value="UUID"
                label="Kategori"
                requiredf
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="6" md="6" class="pb-0">
              <v-select
                v-model="task.customerPartyUUID"
                :items="customers"
                item-title="name"
                item-value="UUID"
                label="Kund"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="6" class="pb-0">
              <v-select
                v-model="task.assignedPersonUUID"
                :items="assignablePersons"
                :item-title="(item) => `${item.firstname} ${item.lastname}`"
                :item-value="(item) => `${item.personId}`"
                label="Tilldelad"
                required
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="6" md="6" class="pb-0">
              <v-select
                v-model="task.responsiblePersonUUID"
                :items="assignablePersons"
                :item-title="(item) => `${item.firstname} ${item.lastname}`"
                :item-value="(item) => `${item.personId}`"
                label="Ansvarig"
                required
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" md="6">
              <lq-date-picker
                label="Planerat klar datum"
                v-model="task.plannedEndDate"
                color="primary"
                locale="sv"
              ></lq-date-picker
            ></v-col>
            <v-col cols="6" md="6">
              <lq-date-picker
                label="Deadline"
                v-model="task.dueDate"
                color="primary"
                locale="sv"
              ></lq-date-picker
            ></v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="pb-0">
              <v-textarea
                v-model="task.description"
                label="Beskrivning"
                variant="outlined"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row v-if="taskType == 'f809e4f2-f395-45d8-ab15-817854fbedb8'">
            <v-col>
              <h3>Lägg till delmoment</h3>
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="newSubTask.title"
                    label="Skriv vad som skall göras"
                    required
                    variant="outlined"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" class="pb-0">
                  <lq-date-picker
                    label="Planerat klar datum"
                    v-model="newSubTask.plannedEndDate"
                    color="primary"
                    locale="sv"
                  ></lq-date-picker>
                </v-col>
                <v-col cols="6" class="pb-0">
                  <v-select
                    v-model="newSubTask.assignedPersonUUID"
                    :items="assignablePersons"
                    :item-title="(item) => `${item.firstname} ${item.lastname}`"
                    :item-value="(item) => `${item.personId}`"
                    label="Tilldelad"
                    required
                    variant="outlined"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="text-right pt-0 pb-8">
                  <v-btn color="primary" @click="addSubtask">Skapa</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="pt-0 pb-8">
                  <h3>Delmoment</h3>

                  <v-card v-for="(tasks, subIndex) in subTasks" :key="subIndex">
                    <v-card-title>
                      <v-row>
                        <v-col col="6">
                          {{ tasks.assignedPersonName }}
                        </v-col>
                        <v-col col="6">
                          <v-btn
                            @click="removeSubTask(subIndex)"
                            variant="plain"
                          >
                            <span
                              size="small"
                              class="material-symbols-outlined"
                            >
                              edit
                            </span>
                            <span
                              size="small"
                              class="material-symbols-outlined"
                            >
                              delete
                            </span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-title>
                    <v-card-subtitle>
                      Planerat klar datum:
                      {{ formatDate(tasks.plannedEndDate) }}
                    </v-card-subtitle>
                    <v-card-text>
                      {{ tasks.title }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" class="mb-5">
              <Dropzone paramName="thefile" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="popup-footer">
          <v-spacer></v-spacer>

          <v-btn
            variant="outlined"
            color="white"
            class="px-5 mr-3 btn-cancel"
            text="Avbryt"
            @click="isActive.value = false"
          ></v-btn>
          <v-btn
            variant="flat"
            class="mr-5 px-5"
            color="green"
            text="Spara"
            @click="createTask"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
