<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onMounted, onUnmounted } from "vue";

import axios from 'axios';

const { label, modelValue, placeholder, popupConfig } = defineProps([
  "label",
  "modelValue",
  "placeholder",
  "popupConfig"
]);

const emit = defineEmits({
  'update:modelValue': null,
  "sendDataBack": null
});

const textfield = ref(modelValue);

watch(modelValue, (newValue) => {
  textfield.value = newValue;
});

watch(textfield, (newValue) => {
  emit("update:modelValue", newValue);
});

const selectedAutocompleteRowIndex = ref(0);

const searchPopup = ref(false);
const responseItem = ref('');
const plusIcon = popupConfig.plusIcon;
const popupData = ref({});

const position = ref({ top: 0, left: 0 });

const popupDataColumns = ref([] as Column[]);

interface Column {
  text: string;
  field: string;
}

const popupDataData = ref([] as Item[]);

interface Item {
  name: string;
}



onMounted(async () => {
  const bodyClickListener = () => {
    hideAllAutocompletes();
  };
  document.body.addEventListener("click", bodyClickListener);

  onUnmounted(() => {
    document.body.removeEventListener("click", bodyClickListener);
  });
});

function hideAllAutocompletes() {
  searchPopup.value = false;
}


const getColumnSpan = (currentIndex, total) => {
  if (total.field === currentIndex.field) {
    return 2;
  }
};

const getClasses = () => {
  let classString = popupConfig.classes;
  return classString
};

const handleSearch = async (event) => {

  if (textfield.value.length > 1) {
    const rect = event.target.getBoundingClientRect();
    const topPosition = rect.top;
    const leftPosition = rect.left;
    position.value = {
      top: topPosition + 58,
      left: leftPosition,
    };
    try {
      responseItem.value = await (popupConfig.store.search(textfield.value as string));
      const fetchedData = await fetchData();
      popupData.value = '';
      popupData.value = fetchedData[popupConfig.responseObjectArray];
      popupDataColumns.value = (popupData.value as any).columns;
      popupDataData.value = (popupData.value as any).data;
      searchPopup.value = true;
      selectedAutocompleteRowIndex.value = 0;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.error("Error fetching data:", error);
      }
    }
  } else {
    emit("sendDataBack", '0');
    responseItem.value = '';
    searchPopup.value = false;
  }
};
const selectedValue = ref([]);

function handleClick(item, data) {
  console.log(data);
  data.modelValue = item
  searchPopup.value = false;
}

const fetchData = async () => {
  return {
    [popupConfig.responseObjectArray]: {
      modelValue: selectedValue,
      data: responseItem.value,
      columns: popupConfig.popupColumns,
    },
  };
};



watch(selectedValue, (newSelected, oldSelected) => {
  if (newSelected !== oldSelected) {
    textfield.value = (newSelected as any)[popupConfig.fieldToWrite];
    emit("sendDataBack", newSelected);
  }
});


const handleArrowNavigation = (event, totalLength) => {
  if (event.key === 'ArrowUp' && selectedAutocompleteRowIndex.value > 0) {
    selectedAutocompleteRowIndex.value -= 1;
    scrollTableToIndex(selectedAutocompleteRowIndex.value);
  } else if (event.key === 'ArrowDown' && selectedAutocompleteRowIndex.value < totalLength - 1) {
    selectedAutocompleteRowIndex.value += 1;
    scrollTableToIndex(selectedAutocompleteRowIndex.value);
  }
}

const scrollTableToIndex = (index) => {
  const rowElement = document.querySelector(`#autocompleteArticle .table tr:nth-child(${index + 1})`);
  if (rowElement) {
    rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

const handleKeyPress = () => {
  handleClick((popupData.value as any).data[selectedAutocompleteRowIndex.value], popupData.value)
};

</script>

<style></style>

<template>
  <v-text-field variant="outlined" :label="label" @input="handleSearch($event)"
    @keydown.up.prevent="handleArrowNavigation($event, popupDataData.length)"
    @keydown.down.prevent="handleArrowNavigation($event, popupDataData.length)" @keyup.enter="handleKeyPress()"
    v-model="textfield" :placeholder="placeholder" :class="getClasses()"></v-text-field>

  <Teleport to="body">
    <transition name="slide-up">
      <div class="wrapper-popups">
        <div v-if="searchPopup">
          <div class="autocompletepopup" id="autocompleteArticle"
            :style="{ top: `${position.top}px`, left: `${position.left}px` }">
            <table class="table table-bordered mb-0">
              <thead class="first-row">
                <tr class="">
                  <th v-for="column in popupDataColumns" :key="column.text" style="width: 150px" :class="column.field">
                    {{ column.text }}
                  </th>

                  <th v-if="plusIcon" style="
                            background-color: rgb(71, 190, 125);
                            width: 40px;
                            color: white;
                            font-size: 14px;
                            font-weight: 700;
                        " class="text-center">
                    +
                  </th>
                </tr>
              </thead>
              <tbody class="first-body-row">
                <tr v-for="(item, index) in popupDataData" :key="index" :class="{
    'selected-row ': index === selectedAutocompleteRowIndex,
  }">
                  <td v-for="column in popupDataColumns" :colspan="getColumnSpan(
    column,
    popupDataColumns[popupDataColumns.length - 1]
  )
    " @click="handleClick(item, popupData)" style="width: 150px" :class="column.field">
                    {{ item[column.field] }}



                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>

</template>
<style>
.first-body-row tr td:last-child {
  width: 173px !important;
}

.selected-row td {
  background: #d5d5d5cc !important
}

.cursor-pointer {
  cursor: pointer;
}

.first-body-row tr td:last-child {
  width: 175px !important;
}

.selected-row {
  background: #fff;
}
</style>