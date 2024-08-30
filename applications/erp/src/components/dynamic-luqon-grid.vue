<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import type { GridConfigItem } from "../types/grid-config";

const props = defineProps<{
  gridConfig: GridConfigItem[],
  rowTemplate: any,
}>();

const modelValue = defineModel<object[]>();

const order = ref({} as any);
const gridRows = ref([] as any);

const selectedAutocompleteRowIndex = ref(0);
const selectedGridRowIndex = ref(-1);

const searchTerm = ref("");

const gridTableForData = ref(null);

const dataArrayToPass = ref([]);

const searchPopup = ref(false);
const popupData = ref({});
const inputRefs = ref<{ [key: string]: { [key: string]: HTMLInputElement } }>(
  {}
);
const position = ref({ top: 0, left: 0 });

let popupDataColumns = ref([] as Column[]);

interface Column {
  text: string;
  field: string;
}

let popupDataData = ref([] as Item[]);

interface Item {
  name: string;
}

const handleSelectOption = (index, selectedData) => {
  handleClick(selectedData.data[index], selectedData);
  hideAllAutocompletes();
};

const insertGridRow = (index, row) => {
  console.log(row);
  let newOrderlineObject = Object.assign({}, props.rowTemplate);
  let newLineItemObject = Object.assign({}, props.rowTemplate.lineItem);

  newOrderlineObject.lineItem = newLineItemObject;
  gridRows.value.splice(index, 0, Object.assign({}, newOrderlineObject));
};

const deleteGridRow = async (index, row) => {
  gridRows.value[index].deleted = true;
  if (activeRowCount.value < 3) {
    addGridRow(1);
  }
  await deleteApi(row);
};
const deleteApi = async (row) => {
  try {
    const response = await axios.delete(
      props.baseUrl +
      "/PortalAPI/rest/v2/" +
      "agreements/" +
      row.lineItem.agreementId +
      "/articleprices/" +
      row.lineItem.id
    );
    console.log(response);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
    } else {
      console.error("Error fetching data:", error);
    }
  }
};

const activeRowCount = computed(() => {
  return gridRows.value.filter((row) => !row.deleted).length;
});

const activeRows = computed(() => {
  return gridRows.value.filter((row) => !row.deleted);
});

const addGridRow = (num = 1) => {
  for (let c = 1; c <= num; c++) {
    let newOrderlineObject = Object.assign({}, props.rowTemplate);
    let newLineItemObject = Object.assign({}, props.rowTemplate.lineItem);
    newOrderlineObject.lineItem = newLineItemObject;
    gridRows.value.push(Object.assign({}, newOrderlineObject));
  }
};

const handleArrowNavigation = (event, totalLength) => {
  console.log(event);
  console.log(totalLength);
  if (event.key === "ArrowUp" && selectedAutocompleteRowIndex.value > 0) {
    selectedAutocompleteRowIndex.value -= 1;
    scrollTableToIndex(selectedAutocompleteRowIndex.value);
  } else if (
    event.key === "ArrowDown" &&
    selectedAutocompleteRowIndex.value < totalLength - 1
  ) {
    selectedAutocompleteRowIndex.value += 1;
    scrollTableToIndex(selectedAutocompleteRowIndex.value);
  }
};

const scrollTableToIndex = (index) => {
  const rowElement = document.querySelector(
    `#autocompleteArticle .table tr:nth-child(${index + 1})`
  );
  if (rowElement) {
    rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const handleFocus = (event, index) => {
  selectedGridRowIndex.value = index;

  // Add focused class to current td
  const currentTd = event.target.parentElement;
  currentTd.classList.add("td-focused");

  // Add bottom border to the td directly above (if it exists)
  const previousRow = currentTd.parentElement.previousElementSibling;
  if (previousRow) {
    const tdAbove = previousRow.children[currentTd.cellIndex];
    tdAbove.classList.add("bottom-border");
  } else {
    if (currentTd.parentElement.rowIndex === 1) {
      const headers =
        currentTd.parentElement.parentElement.previousElementSibling.getElementsByTagName(
          "th"
        );
      if (headers.length > currentTd.cellIndex) {
        headers[currentTd.cellIndex].classList.add("bottom-border");
      }
    }
  }

  // Add right border to the td directly to the left (if it's not the first td)
  if (currentTd.cellIndex > 0) {
    const tdToLeft = currentTd.previousElementSibling;
    tdToLeft.classList.add("right-border");
  }
};

const handleBlur = () => {
  clearFocusedStyles();
};

const clearFocusedStyles = () => {
  // Remove any existing 'td-focused' classes
  const focusedTds = document.querySelectorAll(".td-focused");
  focusedTds.forEach((td) => td.classList.remove("td-focused"));

  // Remove any existing 'bottom-border' classes from th
  const bottomBorders = document.querySelectorAll("th.bottom-border");
  bottomBorders.forEach((th) => th.classList.remove("bottom-border"));

  // Remove any existing 'right-border' classes from td
  const rightBorders = document.querySelectorAll("td.right-border");
  rightBorders.forEach((td) => td.classList.remove("right-border"));
};

const handleKeyPress = (event, index, row) => {
  //console.log(inputRefs.value[index]['sku']);
  console.log(row);
  console.log(index);
  if (event.key === "Enter") {
    //handleEnterKey(index, row);
  } else if (event.key === "Tab") {
    //handleEnterKey(index, row);
  }
};

const setInputRef = (rowIndex, columnName) => {
  //console.log(rowIndex)
  //console.log(columnName)
  // console.log(inputRefs.value)
  return (el) => {
    const commonInput = el;
    if (!inputRefs.value[rowIndex]) {
      inputRefs.value[rowIndex] = {};
    }
    inputRefs.value[rowIndex][columnName] = commonInput;
  };
};

const focusOnInput = (rowIndex, columnName) => {
  const input = inputRefs.value[rowIndex]?.[columnName];
  console.log(rowIndex);

  if (input) {
    input.focus();
  }
};

onMounted(async () => {
  if (!order.value?.id) {
    addGridRow(3);
    //order.value = customerOrderStore.fetchEmptyCustomerOrder();
  } else {
    gridRows.value = order.value.orderLines;
  }

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

function handleClick(item, data) {
  data.modelValue = item;
}

const getColumnSpan = (currentIndex, total) => {
  if (total.field === currentIndex.field) {
    return 2;
  }
};

const retrievedItem = {
  item: 'articles'
};
const popupColumns = [
  {
    text: "Art.Nr",
    field: "SKU",
  },
  {
    text: "Benämning",
    field: "name",
  },
  {
    text: "À-Pris",
    field: "price",
  },
]
const endPoint = {
  endpoint: '/PortalAPI/rest/v2/' + retrievedItem.item + '?name=',
  objectname: retrievedItem.item,
};

const dynamicNameForPopupRef = ref();
dynamicNameForPopupRef.value = (endPoint as any).objectname + "AutocompleteConfig";

const responseItem = ref<ArticlePrices[]>([]);
const selectedResponse = ref([]);


function newAbortSignal(timeoutMs) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
}

const handleEntry = async (event, row, colConf) => {
  console.log(row);
  console.log(colConf);
  /*
  if (row.lineItem.SKU.length > 1) {
    searchTerm.value = row.lineItem.SKU;
    const rect = event.target.getBoundingClientRect();
    const topPosition = rect.top;
    const leftPosition = rect.left;
    position.value = {
      top: topPosition + 40,
      left: leftPosition,
    };
    try {
      const response = await axios.get(
        props.baseUrl + (props.endPoint as any).endpoint + searchTerm.value,
        {
          signal: newAbortSignal(5000),
          //cancelToken: cancelToken.token, // Attach the cancel token to the request
        }
      );
      responseItem.value = response.data[(props.endPoint as any).objectname];

      const fetchedData = await fetchData();

      popupData.value = fetchedData[dynamicNameForPopupRef.value];
      popupDataColumns = (popupData.value as any).columns;
      popupDataData = (popupData.value as any).data;
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
    responseItem.value = [];
    searchPopup.value = false;
  }*/
};

const fetchData = async () => {
  return {
    [dynamicNameForPopupRef.value]: {
      modelValue: selectedResponse,
      data: responseItem.value,
      columns: props.popupColumns,
    },
  };
};
const emits = defineEmits(["parentSend"]);
watch(selectedResponse, (newSelected, oldSelected) => {
  if (newSelected !== oldSelected) {
    console.log(gridRows.value[selectedGridRowIndex.value].lineItem);
    console.log(newSelected);

    gridRows.value[selectedGridRowIndex.value].lineItem.price = (
      newSelected as any
    ).price;

    gridRows.value[selectedGridRowIndex.value].lineItem.articleID = (
      newSelected as any
    ).articleId;


    gridRows.value[selectedGridRowIndex.value].lineItem.sku = (
      newSelected as any
    ).SKU;

    gridRows.value[selectedGridRowIndex.value].lineItem.name = (
      newSelected as any
    ).name;



    focusOnInput(selectedGridRowIndex.value, "percentage");

    dataArrayToPass.value = gridRows.value[selectedGridRowIndex.value].lineItem;
    emits("parentSend", dataArrayToPass.value);
  }
});

const updateValue = () => {
  dataArrayToPass.value = gridRows.value[selectedGridRowIndex.value].lineItem;
  (dataArrayToPass.value as any).percentage = parseFloat(
    (dataArrayToPass.value as any).percentage
  );
  (dataArrayToPass.value as any).minQty = parseFloat((dataArrayToPass.value as any).minQty);
  (dataArrayToPass.value as any).maxQty = parseFloat((dataArrayToPass.value as any).maxQty);
  emits("parentSend", dataArrayToPass.value);
};
</script>

<template>
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

                  <th style="
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
                  <td v-for="(column, colIndex) in popupDataColumns" :colspan="getColumnSpan(
          column,
          popupDataColumns[popupDataColumns.length - 1]
        )
          " @click="handleClick(item, popupData)" style="width: 150px" :class="column.field" :key="`${index}-${colIndex}`">
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

  <table class="table table-bordered gs-0 mb-0 fw-bold text-black-700 mycl gridTableForData"
    style="background-color: white">
    <thead>
      <tr class="fs-7 fw-bold text-black-700 text-uppercase">
        <th class="text-left text-black" v-for="(th, index) in gridConfig" :key="index">
          {{ (th as any).title }}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody id="tablestyle" ref="gridTableForData">
      <tr v-for="(row, index) in activeRows" :key="index">
        <template v-for="(colConf, colIndex) in gridConfig" :key="`${index}-${colIndex}`">
        <td class="p-0 gridColumn td-input-container">
          <input class="gridInput" @input="handleEntry($event, row, colConf)" @keydown.down.prevent="
          handleArrowNavigation($event, popupDataData.length)
          " @keydown.enter.prevent="
          handleSelectOption(selectedAutocompleteRowIndex, popupData)
          " @keydown.tab.prevent="
          handleSelectOption(selectedAutocompleteRowIndex, popupData)
          " @keydown.up.prevent="
          handleArrowNavigation($event, popupDataData.length)
          " type="text" :ref="setInputRef(index, 'sku')" @focus="handleFocus($event, index)" @blur="handleBlur" />          
        </td>
        </template>
          <!--

        </td>
        <td class="p-0 gridColumn td-input-container">
          <input class="gridInput" @keyup.enter.prevent="handleKeyPress($event, index, row)"
            @keyup.tab.prevent="handleKeyPress($event, index, row)" v-model="row.lineItem.name" type="text"
            :ref="setInputRef(index, 'name')" @focus="handleFocus($event, index)" @blur="handleBlur" />
        </td>
        <td class="p-0 gridColumn td-input-container">
          <input class="gridInput qty" type="text" v-model="row.lineItem.price"
            @keyup.enter.prevent="handleKeyPress($event, index, row)"
            @keyup.tab.prevent="handleKeyPress($event, index, row)" :ref="setInputRef(index, 'regularPrice')"
            @focus="handleFocus($event, index)" @blur="handleBlur" />
        </td>
        <td class="p-0 gridColumn td-input-container">
          <input class="gridInput" v-model="row.lineItem.discountedPrice" type="text"
            @keyup.enter="handleKeyPress($event, index, row)" @keyup.tab="handleKeyPress($event, index, row)"
            :ref="setInputRef(index, 'discountedPrice')" @focus="handleFocus($event, index)" @blur="handleBlur" />
        </td>

        <td class="p-0 gridColumn td-input-container">
          <input class="gridInput" type="text" v-model="row.lineItem.percentage"
            @keyup.enter="handleKeyPress($event, index, row)" @keyup.tab="handleKeyPress($event, index, row)"
            :ref="setInputRef(index, 'percentage')" @focus="handleFocus($event, index)" @blur="handleBlur"
            @input="updateValue" />
        </td>
        <td class="p-0 gridColumn td-input-container">
          <select class="gridInput" v-model="row.lineItem.priceType" :ref="setInputRef(index, 'pricetype')">
            <option>Select Option</option>
            <option>FIXED_PRICE</option>
            <option>PERCENTAGE_ON_REGULAR_PRICE</option>
            <option>PERCENTAGE_ON_DISCOUNTED_PRICE</option>
          </select>
        </td>
        <td class="p-0 gridColumn td-input-container">
          <input class="gridInput" type="text" v-model="row.lineItem.minQty"
            @keyup.enter="handleKeyPress($event, index, row)" @keyup.tab="handleKeyPress($event, index, row)"
            :ref="setInputRef(index, 'minQty')" @focus="handleFocus($event, index)" @blur="handleBlur"
            @input="updateValue" />
        </td>

        <td class="p-0 gridColumn td-input-container">
          <input class="gridInput accountingCost" type="text" v-model="row.lineItem.maxQty" @keydown.down.prevent="
          handleArrowNavigation($event, popupDataData.length)
          " @keydown.enter.prevent="
          handleSelectOption(selectedAutocompleteRowIndex, popupData)
          " @keydown.tab.prevent="
          handleSelectOption(selectedAutocompleteRowIndex, popupData)
          " @keydown.up.prevent="
          handleArrowNavigation($event, popupDataData.length)
          " @keyup.enter="handleKeyPress($event, index, row)" @keyup.tab="handleKeyPress($event, index, row)"
            :ref="setInputRef(index, 'maxQty')" @focus="handleFocus($event, index)" @blur="handleBlur"
            @input="updateValue" />
        </td>
        <td class="p-0 gridColumn td-input-container">
          <input class="gridInput accountingCost" type="date" v-model="row.lineItem.validFrom" @keydown.down.prevent="
          handleArrowNavigation($event, popupDataData.length)
          " @keydown.enter.prevent="
          handleSelectOption(selectedAutocompleteRowIndex, popupData)
          " @keydown.tab.prevent="
          handleSelectOption(selectedAutocompleteRowIndex, popupData)
          " @keydown.up.prevent="
          handleArrowNavigation($event, popupDataData.length)
          " @keyup.enter="handleKeyPress($event, index, row)" @keyup.tab="handleKeyPress($event, index, row)"
            :ref="setInputRef(index, 'validFrom')" @focus="handleFocus($event, index)" @blur="handleBlur"
            @input="updateValue" />
        </td>-->

        <td class="p-0 gridColumn td-input-container">
          <span class="material-symbols-outlined cursor-pointer ml-2 gridIcon"
            @click="insertGridRow(index, row)">arrow_top_left</span>
          <span class="material-symbols-outlined cursor-pointer ml-2 gridIcon"
            @click="deleteGridRow(index, row)">delete</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
#app {
  height: unset;
}

.gridColumn {
    height: 32px !important;
    padding-top:0px !important;
    padding-bottom:0px !important;
    padding-left:0px !important;
    padding-right:0px !important;    
}

.gridInput {
    color: black;
    border: 0;
    height: 35px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    font-size: 12px;
    border: none !important;
    outline: none !important;
}
</style>
