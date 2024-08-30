<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useWorkOrderStore } from "@boost/repository";
import type { TimWorkOrder } from "@boost/repository";
import type { Address } from "@boost/repository";
import type { TimWorkorderCategory } from "@boost/repository";
import Dropzone from "./dropzone.vue";

//START GOOGLE MAPS
//import { googleApiKey } from '../config.js';
//import { GoogleMap } from 'vue3-google-map'

//const mapRef = ref<typeof google.maps>();

//const center = { lat: 59.40989085951935, lng: 24.643809184746956 }
//const key = googleApiKey;
//const location = ref(null);

/*
function handleSelectAddress(selectedValue) {
  console.log(selectedValue);
}*/

// function autocompleteAddress() {
//   console.log('autocompleteAddress');
// }
//const searchResults = ref([]);
//let service: google.maps.places.AutocompleteService | null = null;

//const displaySuggestions = (predictions, status) => {
/*const displaySuggestions = (predictions) => {
  console.log(predictions[0].getPlace());
  searchResults.value = predictions.map(prediction => prediction);
};*/

// function searchInput(val: string) {
//   console.log(val);
// }

// Watcher for location changes
/*
watch(addressSearch, (newValue) => {
  if (newValue) {
    service?.getPlacePredictions({
      input: newValue,
      types: ["address"],
      region: "se",
      language: "sv",
      locationBias: "IP_BIAS",
    }, displaySuggestions);
  }
});

watch(() => mapRef.value?.ready, (ready) => {
  if (!ready) return
  loadAutocompleteService();
});

const loadAutocompleteService = () => {
  service = new mapRef.value.api.places.AutocompleteService();

  let test = new mapRef.value.api.places.PlaceAutocompleteElement();
  console.log(test);
};*/
//END GOOGLE MAPS

const WorkOrderDataStore = useWorkOrderStore();
const createWorkOrderDialog = ref(false);
const closeCreateWorkOrderDialog = () => {
  createWorkOrderDialog.value = false;
};
function openCreateWorkOrderDialog() {
  createWorkOrderDialog.value = true;
}

defineExpose({
  openCreateWorkOrderDialog,
});

const newWorkOrder = ref<TimWorkOrder>({
  subject: "",
  body: "",
  status: "NEW",
  jsonData: {
    customer: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      ssn: "",
      propertyDesignation: "",
    },
    reference: "",
  },
});

const address = ref<Address>({
  addressId: null,
  organizationId: null,
  personId: null,
  type: "VISIT",
  name: "",
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  postcode: "",
  city: "",
  countrySubentity: "",
  country: "",
  phone: "",
  buyerReference: "",
  invoiceReference: "",
  GLN: "",
  plusCode: "",
  googleData: "",
  isDefault: false,
  createdAt: null,
  createdById: "",
  updatedAt: null,
});

const categories = ref<TimWorkorderCategory[]>([
  { categoryId: "1", name: "Felanmälan" },
  { categoryId: "2", name: "Service" },
  { categoryId: "3", name: "Installation" },
  { categoryId: "4", name: "Övrigt" },
]);
const customers = ref<TimWorkOrder[]>([
  { customerId: "1", customer: "Evify" },
  { customerId: "2", customer: "Ahlsell" },
  { customerId: "3", customer: "ChargePoint" },
  { customerId: "4", customer: "OKQ8" },
  { customerId: "5", customer: "Xpeng" },
  { customerId: "6", customer: "Skårebo Energi AB" },
  { customerId: "7", customer: "NP - Privat 48" },
]);

onMounted(() => {});

async function createWorkOrder() {
  newWorkOrder.value.addressEntity = address.value;
  try {
    const WorkOrderResponse = await WorkOrderDataStore.createWorkOrder(
      newWorkOrder.value
    );
    if (WorkOrderResponse.status === "NEW") {
      closeCreateWorkOrderDialog();
    }
  } catch (error) {
    console.error("Error during Work Order creation:", error);
    return null;
  }
}
</script>

<template>
  <v-dialog
    v-model="createWorkOrderDialog"
    fullscreen
    :scrim="true"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeCreateWorkOrderDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Skapa ny arbetsorder</v-toolbar-title>
      </v-toolbar>
      <v-container class="pa-10" fluid>
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="6"
                ><v-select
                  v-model="newWorkOrder.categoryId"
                  variant="outlined"
                  :items="categories"
                  item-title="name"
                  item-value="categoryId"
                  label="Välj typ"
                ></v-select>
                <v-autocomplete
                  v-model="newWorkOrder.customerId"
                  label="Kund"
                  item-title="customer"
                  item-value="customerId"
                  variant="outlined"
                  :items="customers"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col>
                <v-text-field
                  v-model="newWorkOrder.customerWorkOrderRef"
                  variant="underlined"
                  label="Kundens ordernummer"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="newWorkOrder.jsonData.reference"
                  variant="underlined"
                  label="Referens"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col cols="12">
                <v-text-field
                  v-model="newWorkOrder.subject"
                  variant="underlined"
                  label="Installationen avser"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="newWorkOrder.body"
                  variant="outlined"
                  ref="identifier"
                  label="Arbetsbeskrivning / information"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <Dropzone paramName="thefile" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <strong>Slutkund / installationsplats</strong>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col cols="4">
                <v-text-field
                  v-model="newWorkOrder.jsonData.customer.firstName"
                  variant="underlined"
                  label="Förnamn"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="newWorkOrder.jsonData.customer.lastName"
                  variant="underlined"
                  label="Efternamn"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="newWorkOrder.jsonData.customer.ssn"
                  variant="underlined"
                  label="Personnummer"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col cols="4">
                <v-text-field
                  v-model="newWorkOrder.jsonData.customer.phone"
                  variant="underlined"
                  label="Telefon"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="newWorkOrder.jsonData.customer.email"
                  variant="underlined"
                  label="E-post"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col cols="4">
                <v-text-field
                  v-model="address.addressLine1"
                  variant="underlined"
                  label="Address 1"
                ></v-text-field>
                <v-text-field
                  v-model="address.addressLine2"
                  variant="underlined"
                  label="Address 2"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="newWorkOrder.jsonData.customer.propertyDesignation"
                  variant="underlined"
                  label="Fastighetsbetäckning"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col cols="2">
                <v-text-field
                  v-model="address.postcode"
                  variant="underlined"
                  label="Postnummer"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="address.city"
                  variant="underlined"
                  label="Ort"
                ></v-text-field>
              </v-col>
            </v-row>
            <!--<v-row class="mt-0">
              <v-col cols="12">
                <v-autocomplete v-model="location" v-model:search="addressSearch" label="Plats (adress)"
                  @change="handleSelectAddress" :items="searchResults" variant="outlined"></v-autocomplete>
              </v-col>
            </v-row>-->
          </v-col>
        </v-row>
        <v-row class="mt-0"
          ><v-col
            ><v-btn @click="createWorkOrder" variant="tonal"
              >Skapa</v-btn
            ></v-col
          ></v-row
        >
      </v-container>
    </v-card>
  </v-dialog>
</template>
