<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue';

import { LqPartySelect } from '@boost/ui';

import LuqonGrid from "../../../components/luqon-grid.vue";
const invoiceNumber = "ABC159";
const doc = reactive({
  supplier: {
    name: "This is the supplier selected"
  }
});
const invoiceOcr = "ABC159";
const invoiceDate = "23-06-20";
const invoiceDueDate = "23-06-20";
const amountWithVAT = 2000;
const invoiceVAT = "259,20";
const selectedItem = null;
const isChecked = false;
const items = ["Option 1", "Option 2", "Option 3"];

const activeTab = ref('details');

</script>

<template>

  <v-tabs
    v-model="activeTab"
    height="60"
    class="my-3 mx-5"
    color="light-blue-darken-3">
    <v-tab class="qpntabbtn" value="details">Fakturauppgifter</v-tab>
    <v-tab class="qpntabbtn" value="log">Kommentarer</v-tab>
  </v-tabs>

  <v-window v-model="activeTab">
    <v-window-item value="details">
      <v-card class="pa-5 cardshadow">
        <v-row class="row-suplier">
          <v-col cols="6">
            <lq-party-select
              role="customer"
              label="Supplier"
              v-model="doc.supplier"
              class="suplier-page-text" />
          </v-col>
          <v-col cols="6">
            <!-- Empty space (6-column offset) -->
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Invoice Number"
              variant="outlined"
              persistent-placeholder
              v-model="invoiceNumber"
              class="suplier-page-text" />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="OCR"
              variant="outlined"
              persistent-placeholder
              v-model="invoiceOcr"
              class="suplier-page-text" />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Invoice Date"
              variant="outlined"
              persistent-placeholder
              v-model="invoiceDate"
              class="suplier-page-text" />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Due Date"
              variant="outlined"
              persistent-placeholder
              v-model="invoiceDueDate"
              class="suplier-page-text" />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Amount Including VAT"
              variant="outlined"
              persistent-placeholder
              v-model="amountWithVAT"
              class="suplier-page-text" />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="VAT"
              variant="outlined"
              persistent-placeholder
              v-model="invoiceVAT"
              class="suplier-page-text" />
          </v-col>
          <v-col cols="6">

            <v-select
              :items="items"
              density="compact"
              label="Select person for approval"
              variant="outlined"
              clearable
              class="document-type b-white"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">


            <v-checkbox label="Approve directly"></v-checkbox>

          </v-col>
        </v-row>
        <v-row>
          <div id="gridLuqon">
            <LuqonGrid />
          </div>
        </v-row>
      </v-card>
    </v-window-item>
    <v-window-item value="log">
      <v-card class="pa-5 cardshadow">
        Two
      </v-card>
    </v-window-item>
  </v-window>


</template>

<style>
.tab-buttons {
  display: flex;
}
.tab-content {
  margin-top: 15px;
}
.tab-buttons span {
  display: inline-block;
  width: 150px;
  text-align: center;
  padding: 15px 0px;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  margin: 14px 0px;
}
.tab-buttons span.active{
  border-bottom: 1px solid #56A5EB;
}
.wrapper-suplier-form {
  max-width: 95%;
  margin: 0 auto;
}
.v-field--variant-outlined .v-field__outline__start, .v-field--variant-outlined .v-field__outline__notch::before, .v-field--variant-outlined .v-field__outline__notch::after, .v-field--variant-outlined .v-field__outline__end {

  border-color: #ccc !important;
}

.v-text-field input {
  color: #757575;

}
</style>