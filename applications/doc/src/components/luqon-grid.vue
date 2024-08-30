<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed, watch} from 'vue';
import axios from 'axios';
import {useCustomerOrderStore} from "../stores/customerOrderStore";


import type Article from '../model/Article';

const customerOrderStore = useCustomerOrderStore();

const orderLineTemplate = {
  // createdById: "",
  // deleted: false,
  // itemUUID: null,
  // lineItemUUID: "",
  lineItem: {
    //   id: 0,
    //   itemUUID: "",
    //   quantity: "",
    //   quantityUnitCode: "",
    //   lineExtensionAmount: "",
    //   itemPriceAmountIncludesVat: "",
    //   itemClassifiedTaxCategoryCode: "",
    //   itemClassifiedTaxCategoryPercent: "",
    //   itemClassifiedTaxCategoryTaxSchemeId: "",
    //   itemSellersItemIdentificationId: "",
    //   itemName: "",
    //   itemDescription: "",
    //   itemPriceAmount: "",
    //   itemPriceAmountCurrencyCode: ""
  },
  // orderUUID: null,
  // uuid: "",
  // note: ""
};

const order = ref({} as any);
const gridRows = ref([] as any);


const selectedAutocompleteRowIndex = ref(0);
const selectedGridRowIndex = ref(-1);


const searchTerm = ref('');



const gridTableForData = ref(null);

const selectedArticle = ref([]);
const allArticle = ref<Article[]>([]);
const selectedRE = ref([]);
const allRE = ref<ItemsRe[]>([]);
const searchPopup = ref(false);

const popupData = ref({});

const inputRefs = ref<{ [key: string]: { [key: string]: HTMLInputElement } }>({});

const baseUrl = "https://api-s01.dev.qeeping.net";

const position = ref({top: 0, left: 0});


let popupDataColumns = ref([] as Column[]);

interface Column {
  text: string;
  field: string;
}

let popupDataData = ref([] as Item[]);

interface Item {
  name: string;
  // other properties as needed
}


const handleAccountingCost = async (event) => {
  const rect = event.target.getBoundingClientRect();
  const topPosition = rect.top;
  const leftPosition = rect.left;
  position.value = {
    top: topPosition + 40,
    left: leftPosition,
  };
  try {
    const fetchedData = await fetchData();
    popupData.value = fetchedData.REautocompleteConfig
    searchPopup.value = true;
    selectedAutocompleteRowIndex.value = 0;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

};


const handleSearch = async (event, row) => {
  if (row.lineItem.itemSellersItemIdentificationId.length > 1) {
    searchTerm.value = row.lineItem.itemSellersItemIdentificationId;
    const rect = event.target.getBoundingClientRect();
    const topPosition = rect.top;
    const leftPosition = rect.left;
    position.value = {
      top: topPosition + 40,
      left: leftPosition,
    };
    try {
      const response = await axios.get(baseUrl + '/PortalAPI/rest/v2/articles?name=' + searchTerm.value);
      allArticle.value = response.data.articles;

      const fetchedData = await fetchData();
      popupData.value = fetchedData.articleAutocompleteConfig
      popupDataColumns = (popupData.value as any).columns
      popupDataData = (popupData.value as any).data
      searchPopup.value = true;
      selectedAutocompleteRowIndex.value = 0;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } else {
    allArticle.value = [];
    searchPopup.value = false;
  }
}

interface ItemsRe {
  id: string;
  name: string;
}

allRE.value = [
  {
    "id": "123",
    "name": "SStock Purchase",
  },
  {
    "id": "234",
    "name": "Adnane",
  },
  {
    "id": "456",
    "name": "Ali",
  },
];

const fetchData = async () => {
  return {
    articleAutocompleteConfig: {
      modelValue: selectedArticle,
      data: allArticle.value,
      columns: [
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
          type: "number",
          field: "price",
        },
      ],
    },
    REautocompleteConfig: {
      modelValue: selectedRE,
      data: allRE.value,
      columns: [
        {
          text: "Result Unit",
          field: "id",
        },
        {
          text: "name",
          field: "name",
        },
      ],
    },
  };
};


const handleSelectOption = (index, selectedData) => {
  handleClick(selectedData.data[index], selectedData)
  hideAllAutocompletes();
};

// const handleQty = () => {
//   typedValue.value = rows.value[rowElement.value]['typedValue'];
//   price.value = rows.value[rowElement.value]['price'];
//   amount.value = String(typedValue.value * price.value);
//   rows.value[rowElement.value]['amounts'] = amount.value;
//   typedValue.value = '';
// };

const insertGridRow = (index, row) => {
  /*
  let maxitemId = 0;
  for (let i=0; i < gridRows.value.length; i++) {
    if (gridRows[i].itemId > maxitemId)
      maxitemId = gridRows[i].item;
  }
  maxitemId = maxitemId+5;*/
  console.log(row);
  let newOrderlineObject = Object.assign({}, orderLineTemplate);
  let newLineItemObject = Object.assign({}, orderLineTemplate.lineItem);
  //newOrderlineObject.itemId = maxitemId;
  newOrderlineObject.lineItem = newLineItemObject;
  gridRows.value.splice(index, 0, Object.assign({}, newOrderlineObject));
};

const deleteGridRow = (index, row) => {
  //gridRows[index].deletedAt = new Date().toJSON();
  gridRows.value[index].deleted = true;

  if (activeRowCount.value < 3) {
    addGridRow(1);
  }
  console.log(row);
};

const activeRowCount = computed(() => {
  return gridRows.value.filter(row => !row.deleted).length;
});

const activeRows = computed(() => {
  return gridRows.value.filter(row => !row.deleted);
});

const addGridRow = (num = 1) => {
  /*
  let maxitemId = 0;
  for (let i=0; i < gridRows.value.length; i++) {
    if (gridRows[i].itemId > maxitemId)
      maxitemId = gridRows[i].itemId;
  }*/
  for (let c = 1; c <= num; c++) {
    //maxitemId = maxitemId+5;

    let newOrderlineObject = Object.assign({}, orderLineTemplate);
    let newLineItemObject = Object.assign({}, orderLineTemplate.lineItem);
    //newOrderlineObject.itemId = maxitemId;
    newOrderlineObject.lineItem = newLineItemObject;
    gridRows.value.push(Object.assign({}, newOrderlineObject));
  }
};

const handleArrowNavigation = (event, totalLength) => {
  console.log(event);
  console.log(totalLength);
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
    rowElement.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
};

const handleFocus = (event, index) => {
  console.log(index);
  selectedGridRowIndex.value = index;

  // Add focused class to current td
  const currentTd = event.target.parentElement;
  currentTd.classList.add('td-focused');

  // Add bottom border to the td directly above (if it exists)
  const previousRow = currentTd.parentElement.previousElementSibling;
  if (previousRow) {
    const tdAbove = previousRow.children[currentTd.cellIndex];
    tdAbove.classList.add('bottom-border');
  } else {
    if (currentTd.parentElement.rowIndex === 1) {
      const headers = currentTd.parentElement.parentElement.previousElementSibling.getElementsByTagName('th');
      if (headers.length > currentTd.cellIndex) {
        headers[currentTd.cellIndex].classList.add('bottom-border');
      }
    }
  }

  // Add right border to the td directly to the left (if it's not the first td)
  if (currentTd.cellIndex > 0) {
    const tdToLeft = currentTd.previousElementSibling;
    tdToLeft.classList.add('right-border');
  }
};

const handleBlur = () => {

  clearFocusedStyles();
};

const clearFocusedStyles = () => {
  // Remove any existing 'td-focused' classes
  const focusedTds = document.querySelectorAll('.td-focused');
  focusedTds.forEach(td => td.classList.remove('td-focused'));

  // Remove any existing 'bottom-border' classes from th
  const bottomBorders = document.querySelectorAll('th.bottom-border');
  bottomBorders.forEach(th => th.classList.remove('bottom-border'));

  // Remove any existing 'right-border' classes from td
  const rightBorders = document.querySelectorAll('td.right-border');
  rightBorders.forEach(td => td.classList.remove('right-border'));
};

// const handleEnterKey = (index, row) => {
//   console.log(row);
//   console.log(qty);
//   console.log(searchPopup.value);
//   if (row.typedValue == "") {
//     qty.value[index].focus();
//   } else if (row.price == null) {
//     pricing.value[index].focus();
//   } else if (row.vat == null) {
//     vat.value[index].focus();
//   } else {
//     sku.value[index + 1].focus();
//   }
// };

const handleKeyPress = (event, index, row) => {
  //console.log(inputRefs.value[index]['sku']);
  console.log(row);
  console.log(index);
  if (event.key === 'Enter') {
    //handleEnterKey(index, row);
  } else if (event.key === 'Tab') {
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
    order.value = customerOrderStore.fetchEmptyCustomerOrder();
  } else {
    gridRows.value = order.value.orderLines;
  }

  const bodyClickListener = () => {

    hideAllAutocompletes();
  }
  document.body.addEventListener('click', bodyClickListener);

  onUnmounted(() => {
    document.body.removeEventListener('click', bodyClickListener);
  });

});

function hideAllAutocompletes() {
  searchPopup.value = false;
}

function handleClick(item, data) {

  data.modelValue = item
  console.log(data)
  console.log(item)
}

const getColumnSpan = (currentIndex, total) => {
  if (total.field === currentIndex.field) {
    return 2;
  }
}

watch(selectedArticle, (newSelectedArticle, oldSelectedArticle) => {

  if (newSelectedArticle !== oldSelectedArticle) {
    gridRows.value[selectedGridRowIndex.value].lineItem.itemUUID = (newSelectedArticle as any).articleId;
    gridRows.value[selectedGridRowIndex.value].lineItem.itemSellersItemIdentificationId = (newSelectedArticle as any).SKU;
    gridRows.value[selectedGridRowIndex.value].lineItem.itemName = (newSelectedArticle as any).name;
    gridRows.value[selectedGridRowIndex.value].lineItem.itemDescription = (newSelectedArticle as any).description;
    gridRows.value[selectedGridRowIndex.value].lineItem.itemClassifiedTaxCategoryPercent = (newSelectedArticle as any).vat;
    gridRows.value[selectedGridRowIndex.value].lineItem.itemPriceAmountIncludesVat = (newSelectedArticle as any).includesVat;
    gridRows.value[selectedGridRowIndex.value].lineItem.itemClassifiedTaxCategoryCode = "S";
    gridRows.value[selectedGridRowIndex.value].lineItem.itemPriceAmount = (Math.round((newSelectedArticle as any).price * 100) / 100).toFixed(2);

    if ((newSelectedArticle as any).saleUnit.length)
      gridRows.value[selectedGridRowIndex.value].lineItem.quantityUnitCode = (newSelectedArticle as any).saleUnit;

    focusOnInput(selectedGridRowIndex.value, 'quantity');
    selectedGridRowIndex.value = -1;
  }
});

watch(selectedRE, (newSelectedRE, oldSelectedRE) => {
  if (newSelectedRE !== oldSelectedRE) {
    gridRows.value[selectedGridRowIndex.value].lineItem.accountingCost = (newSelectedRE as any).name;
  }
});


</script>

<style scoped>

</style>

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
                <th v-for="column in popupDataColumns" :key="column.text" style="width: 150px;" :class="column.field">
                  {{ column.text }}

                </th>

                <th style="background-color: rgb(71, 190, 125); width: 40px; color: white; font-size: 14px; font-weight: 700;"
                    class="text-center">+
                </th>
              </tr>
              </thead>
              <tbody class="first-body-row">
              <tr v-for="(item, index) in popupDataData"
                  :key="index"
                  :class="{ 'selected-row ': index === selectedAutocompleteRowIndex }"

              >

                <td
                    v-for="column in popupDataColumns"
                    :colspan="getColumnSpan(column , popupDataColumns[popupDataColumns.length - 1])"
                    @click="handleClick(item,popupData)"
                    style="width: 150px;"
                    :class="column.field"
                >
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
         style="background-color: white;">
    <thead>
    <tr class="fs-7 fw-bold text-black-700 text-uppercase">
      <th class="min-w-150px w-150px text-left text-black">Art.Nr</th>
      <th class="min-w-300px text-black">Benämning</th>
      <th class="min-w-100px w-100px text-black">Antal</th>
      <th class="min-w-50px w-50px text-black">Enhet</th>
      <th class="min-w-150px w-150px text-black">À-Pris</th>
      <th class="min-w-50px w-50px text-black">M</th>
      <th class="min-w-50px w-50px text-black">R</th>
      <th class="min-w-200px w-200px text-black">Summa</th>
      <th class="min-w-150px w-150px text-black">RE</th>
      <th class="min-w-150px w-150px text-black">Proj</th>
      <th class="min-w-50px w-50px text-black">Konto</th>
      <th class="min-w-50px w-50px text-black">Moms</th>
      <th class="min-w-100px w-100px"></th>
    </tr>
    </thead>
    <tbody id="tablestyle" ref="gridTableForData">
    <tr v-for="(row, index) in activeRows" :key="index">
      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput"
               @input="handleSearch($event,row)"
               v-model="row.lineItem.itemSellersItemIdentificationId"
               @keydown.down.prevent="handleArrowNavigation($event , popupDataData.length)"
               @keydown.enter.prevent="handleSelectOption(selectedAutocompleteRowIndex , popupData)"
               @keydown.tab.prevent="handleSelectOption(selectedAutocompleteRowIndex , popupData)"
               @keydown.up.prevent="handleArrowNavigation($event , popupDataData.length)"
               type="text"
               :ref="setInputRef(index, 'sku')"
               @focus="handleFocus($event, index)"
               @blur="handleBlur"
        />
      </td>
      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput"
               @keyup.enter.prevent="handleKeyPress($event, index,row)"
               @keyup.tab.prevent="handleKeyPress($event, index,row)"
               v-model="row.lineItem.itemName"
               type="text"
               :ref="setInputRef(index, 'name')"
               @focus="handleFocus($event, index)"
               @blur="handleBlur"
        />
      </td>
      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput qty"
               type="text" v-model="row['lineItem.quantity']"
               @keyup.enter.prevent="handleKeyPress($event, index,row)"
               @keyup.tab.prevent="handleKeyPress($event, index,row)"
               :ref="setInputRef(index, 'quantity')"
               @focus="handleFocus($event, index)"
               @blur="handleBlur"
        />
      </td>
      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput"
               v-model="row.lineItem.quantityUnitCode"
               type="text"
               @keyup.enter="handleKeyPress($event, index,row)"
               @keyup.tab="handleKeyPress($event, index,row)"
               :ref="setInputRef(index, 'quantityUnitCode')"
               @focus="handleFocus($event, index)"
               @blur="handleBlur"
        />
      </td>

      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput"
               type="text" v-model="row.lineItem.itemPriceAmount"
               @keyup.enter="handleKeyPress($event, index,row)"
               @keyup.tab="handleKeyPress($event, index,row)"
               :ref="setInputRef(index, 'itemPriceAmount')"
               @focus="handleFocus($event, index)"
               @blur="handleBlur"
        />

      </td>
      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput"
               type="text" v-model="row.lineItem.margin"
               @keyup.enter="handleKeyPress($event, index,row)"
               @keyup.tab="handleKeyPress($event, index,row)"
               :ref="setInputRef(index, 'margin')"
               @focus="handleFocus($event, index)"
               @blur="handleBlur"
        />
      </td>
      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput"
               type="text"  v-model="row.lineItem.discount"
               @keyup.enter="handleKeyPress($event, index,row)"
               @keyup.tab="handleKeyPress($event, index,row)"
               :ref="setInputRef(index, 'discount')"
               @focus="handleFocus($event, index)"
               @blur="handleBlur"
        />
      </td>
      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput"
               type="text"
               v-model="row.lineItem.lineExtensionAmount" disabled
        />
      </td>
      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput accountingCost"
               @input="handleAccountingCost($event)"
               type="text" v-model="row.lineItem.accountingCost"
               @keydown.down.prevent="handleArrowNavigation($event , popupDataData.length)"
               @keydown.enter.prevent="handleSelectOption(selectedAutocompleteRowIndex , popupData)"
               @keydown.tab.prevent="handleSelectOption(selectedAutocompleteRowIndex , popupData)"
               @keydown.up.prevent="handleArrowNavigation($event , popupDataData.length)"
               @keyup.enter="handleKeyPress($event, index,row)"
               @keyup.tab="handleKeyPress($event, index,row)"
               :ref="setInputRef(index, 'accountingCost')"
               @focus="handleFocus($event, index)"
               @blur="handleBlur"
        />
      </td>
      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput"
               type="text" v-model="row.lineItem.project"
               @keyup.enter="handleKeyPress($event, index,row)"
               @keyup.tab="handleKeyPress($event, index,row)"
               :ref="setInputRef(index, 'project')"
               @focus="handleFocus($event, index)"
               @blur="handleBlur"
        />
      </td>
      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput"
               type="text" v-model="row.lineItem.accountNo"
               @keyup.enter="handleKeyPress($event, index,row)"
               @keyup.tab="handleKeyPress($event, index,row)"
               :ref="setInputRef(index, 'accountNo')"
               @focus="handleFocus($event, index)"
               @blur="handleBlur"
        />
      </td>

      <td class="p-0 gridColumn td-input-container">
        <input class="gridInput"
               type="text" v-model="row.lineItem.itemClassifiedTaxCategoryPercent"
               @keyup.enter="handleKeyPress($event, index,row)"
               @keyup.tab="handleKeyPress($event, index,row)"
               :ref="setInputRef(index, 'itemClassified1TaxCategoryPercent')"
               @focus="handleFocus($event, index)"
               @blur="handleBlur"
        />
      </td>

      <td class="p-0 gridColumn td-input-container">
        <span class="material-symbols-outlined cursor-pointer ml-2 gridIcon" @click="insertGridRow(index, row)">arrow_top_left</span>
        <span class="material-symbols-outlined cursor-pointer ml-2 gridIcon"
              @click="deleteGridRow(index, row)">delete</span>
      </td>
    </tr>


    </tbody>
  </table>
</template>