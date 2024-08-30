<script setup lang="ts">
import { useOrganizationStore } from '@boost/repository';
import { useRouter } from 'vue-router';
import { ref, inject, computed, watch } from 'vue';
import type { Organization } from '@boost/repository';
import type { Address } from '@boost/repository';
import { googleApiKey } from '../../lib/config.js';
import { GoogleMap } from 'vue3-google-map'

//Your location
const center = { lat: 59.40989085951935, lng: 24.643809184746956 }
//Your Google API key
const key = googleApiKey;

const axios: any = inject('axios');

const props = defineProps<{
  organization: Organization;
}>();

const organizationStore = useOrganizationStore();

const organizationEdit = ref<Organization>((<Organization>Object.assign({}, props.organization)));

if (organizationEdit.value?.taxCode == null)
  organizationEdit.value.taxCode = "SE";

let organizationName = organizationEdit.value.name;

const tab = ref("general");

const dialog = ref(false);

const address = ref<Address>({
  addressId: '',
  organizationId: '',
  personId: '',
  type: 'INVOICE',
  name: '',
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  postcode: '',
  city: '',
  countrySubentity: '',
  country: '',
  phone: '',
  buyerReference: '',
  invoiceReference: '',
  GLN: '',
  plusCode: '',
  googleData: '',
  isDefault: false,
  createdAt: null,
  createdById: '',
  updatedAt: null,
});

const router = useRouter();

const selectedRoles = ref(organizationEdit.value.roles); // Bitmask representation of selected roles

const addressTypes = [{ value: "INVOICE", title: "Fakturaadress" }, { value: "DELIVERY", title: "Leveransadress" }, { value: "VISIT", title: "Besöksadress" }]

const Role = {
  CUSTOMER: 1,   // ... 0000 0001
  SUPPLIER: 2,   // ... 0000 0010
  LEAD: 4,   // ... 0000 0100
  PROSPECT: 8,   // ... 0000 1000
  COMPETITOR: 16,  // ... 0001 0000
  PARTNER: 32,  // ... 0010 0000
  DISTRIBUTOR: 64,  // ... 0100 0000
  RESELLER: 128  // ... 1000 0000
};

const relationshipOptions = ref([{ "role": Role.CUSTOMER, "title": "Customer" },
{ "role": Role.SUPPLIER, "title": "Supplier" },
{ "role": Role.LEAD, "title": "Lead" },
{ "role": Role.PROSPECT, "title": "Prospect" },
{ "role": Role.COMPETITOR, "title": "Competitor" },
{ "role": Role.PARTNER, "title": "Partner" },
{ "role": Role.DISTRIBUTOR, "title": "Distributor" },
{ "role": Role.RESELLER, "title": "Reseller" }]);

const selectedRolesArray = computed({
  get: () => relationshipOptions.value.filter(option => (selectedRoles.value & option.role) === option.role).map(option => option.role),
  set: (newValues) => {
    selectedRoles.value = newValues.reduce((acc, role) => acc | role, 0);
  }
});

function handleRoleChange() {
  organizationEdit.value.roles = selectedRoles.value;
  console.log(organizationEdit.value.roles);
  // This space is available if you want to handle some side effects or additional logic when a role is toggled.
}

function updateOrganization() {
  organizationName = organizationEdit.value.name;
  organizationStore.update(organizationEdit.value);
  dialog.value = false;
}
const apiBase = import.meta.env.VITE_API_ENDPOINT;

function deleteOrganization() {
  //TODO: User should have to confirm delete of organzation
  axios
    .delete(apiBase + "/organizations/" + organizationEdit.value.organizationId)
    .then((response) => {
      organizationStore.deleteOrganization(response.data);
      router.push('/organizations');
    });
}

async function addSaveAddress() {
  try {
    const response = await axios.post(apiBase + "/organizations/" + organizationEdit.value.organizationId + "/address", address.value);

    if (response.status === 200) {
      props.organization.addresses.push(response.data);

      address.value = {
        addressId: '',
        organizationId: '',
        personId: '',
        type: 'INVOICE',
        name: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        postcode: '',
        city: '',
        countrySubentity: '',
        country: '',
        phone: '',
        buyerReference: '',
        invoiceReference: '',
        GLN: '',
        plusCode: '',
        googleData: '',
        isDefault: false,
        createdAt: null,
        createdById: '',
        updatedAt: null,
      };

    } else {
      alert('Some error occured');
    }
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error during address creation:', error);
    alert('Error occurred');
    return null;  // or throw the error
  }
}

watch(() => props.organization, (newOrg: Organization) => {
  organizationEdit.value = <Organization>Object.assign({}, newOrg);
});

</script>

<template>
  <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-top-transition">
    <template v-slot:activator="{ props }">
      <v-btn variant="tonal" color="teal-accent-4" v-bind="props">
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Inställningar för {{ organizationName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn variant="text" @click="updateOrganization">
            Spara
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-tabs height="60" v-model="tab" color="light-blue-darken-3" align-tabs="start">
        <v-tab value="generalinfo">Grundinformation</v-tab>
        <v-tab value="misc">Adresser</v-tab>
        <v-tab value="invoicesettings" v-if="selectedRolesArray.includes(Role.CUSTOMER)">Order & Fakturering</v-tab>
        <v-tab value="invoiceinfo" v-if="selectedRolesArray.includes(Role.CUSTOMER)">Rutiner</v-tab>
        <v-tab value="suppliersettings">Leverantör</v-tab>
        <v-tab value="categories">Relationer</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="generalinfo">
          <v-container fluid>
            <v-row>
              <v-col sm="4">
                <v-text-field label="Kundnummer" v-model="organizationEdit.identifier" variant="outlined"></v-text-field>
                <v-text-field label="Namn" v-model="organizationEdit.name" variant="outlined"></v-text-field>
                <v-text-field label="Registrerat bolagsnamn" v-model="organizationEdit.partyLegalRegistrationName"
                  variant="outlined" hint="Juridiskt namn om angivet namn skiljer sig från det."></v-text-field>
              </v-col>
              <v-col sm="4">
                <v-text-field label="Organisationsnummer" v-model="organizationEdit.partyLegalCompanyId"
                  variant="outlined"></v-text-field>
                <v-text-field label="Momsregistreringsnummer" v-model="organizationEdit.vatNumber"
                  variant="outlined"></v-text-field>
                <v-select v-model="organizationEdit.countryCode" label="Land"
                  :items="[{ title: 'Sverige', value: 'SE' }, { title: 'Danmark', value: 'DK' }]"
                  variant="outlined"></v-select>
                <v-select v-model="organizationEdit.currencyCode" label="Valuta" :items="['SEK', 'DKK', 'EUR', 'CHF']"
                  variant="outlined"></v-select>
              </v-col>
              <v-col sm="4">
                <v-text-field label="E-postadress" v-model="organizationEdit.email" variant="outlined"></v-text-field>
                <v-text-field label="Telefon" v-model="organizationEdit.phone" variant="outlined"></v-text-field>
                <v-text-field label="Webbadress" v-model="organizationEdit.web" variant="outlined"></v-text-field>
                <v-select v-model="organizationEdit.languageCode" label="Standardspråk"
                  :items="[{ title: 'Svenska', value: 'sv_SE' }, { title: 'Engelska', value: 'en_US' }]"
                  variant="outlined"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea label="Notering" v-model="organizationEdit.notes"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-switch :value="organizationEdit.active" :true-value="1" :false-value="0"
                  v-model="organizationEdit.active" color="success" label="Aktiv"></v-switch>
                <v-btn @click="deleteOrganization" variant="tonal" v-if="!organizationEdit.active">Radera</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
        <v-window-item value="invoicesettings">
          <v-container fluid>
            <v-row>
              <v-col sm="3">
                <v-select v-model="organizationEdit.paymentTermsUUID" label="Betalningsvillkor" :items="['30', '10', '0']"
                  variant="outlined"></v-select>
                <v-select v-model="organizationEdit.deliveryTermsUUID" label="Leveransvillkor"
                  :items="['Fritt kund', 'Fritt vårt lager']" variant="outlined"></v-select>
                <v-select v-model="organizationEdit.deliveryMethodUUID" label="Leveranssätt" :items="['Hämtas', 'Lämnas']"
                  variant="outlined"></v-select>
                <v-text-field label="Rabatt (%)" v-model="organizationEdit.invoiceDiscountPercentage"
                  variant="outlined"></v-text-field>

                <v-text-field label="Fakturatext" v-model="organizationEdit.invoiceNote"
                  variant="outlined"></v-text-field>

              </v-col>
              <v-col sm="3">
                <v-select v-model="organizationEdit.invoiceFrequency" label="Faktureringsintervall"
                  :items="[{ title: 'Löpande', value: 0 }, { title: 'Månadsvis', value: 1 }, { title: 'Årsvis', value: 2 }]"
                  variant="outlined"></v-select>
                <v-text-field label="Fakturaavgift" v-model="organizationEdit.invoiceFee"
                  variant="outlined"></v-text-field>
                <v-text-field label="Leveransavgift" v-model="organizationEdit.deliveryFee"
                  variant="outlined"></v-text-field>
                <v-select v-model="organizationEdit.taxCode" label="Momstyp"
                  :items="['SE', 'SEOMV', 'EU', 'EUOMV', 'EXPORT']" variant="outlined"></v-select>
                <v-text-field label="accountingCustomerPartyUUID" v-model="organizationEdit.accountingCustomerPartyUUID"
                  variant="outlined"></v-text-field>

              </v-col>
              <v-col sm="3">
                <v-select v-model="organizationEdit.defaultPricelistUUID" clearable label="Standardprislista"
                  :items="['Svenska', 'Engelska']" variant="outlined"></v-select>
                <v-select v-model="organizationEdit.defaultAgreementUUID" clearable label="Standardavtal"
                  :items="['Svenska', 'Engelska']" variant="outlined"></v-select>
                <v-card title="Konvertering från order till faktura">
                  <v-card-text>
                    <v-select v-model="organizationEdit.orderToInvoiceMergeRows" label="Fakturarader"
                      :items="[{ id: 0, title: 'Specificerade' }, { id: 1, title: 'Sammanfattade' }]" item-value="id"
                      item-text="title" variant="outlined"></v-select>
                    <v-checkbox v-model="organizationEdit.orderToInvoiceMergeOrders" :true-value="1" :false-value="0"
                      label="Samfakturering"></v-checkbox>
                    <v-checkbox v-model="organizationEdit.orderToInvoiceAddDeliveryFee" :true-value="1" :false-value="0"
                      label="Anta leveranskostnad om ej känt"
                      messages="Denna funktion gör så att det automatiskt kommer med en leveransavgift per leveransdatum om det inte är känt hur leveransen gått till"></v-checkbox>
                  </v-card-text>
                </v-card>

              </v-col>
              <v-col sm="3">
                <v-text-field label="Faktura ref1" v-model="organizationEdit.invoiceBuyerReference"
                  variant="outlined"></v-text-field>
                <v-text-field label="Faktura ref2" v-model="organizationEdit.invoiceAccountingCost"
                  variant="outlined"></v-text-field>
                <v-text-field label="E-post PDF-faktura" v-model="organizationEdit.invoiceEmail"
                  variant="outlined"></v-text-field>
                <v-text-field label="PDF-faktura kopia" v-model="organizationEdit.invoiceEmailCC"
                  variant="outlined"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
        <v-window-item value="suppliersettings">
          <v-container fluid>
            <v-row>
              <v-col>
                a
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>
        <v-window-item value="categories">
          <v-container fluid>
            <v-row justify="start">
              <v-col>
                <v-checkbox v-for="option in relationshipOptions" :key="option.role" :label="option.title"
                  v-model="selectedRolesArray" :value="option.role" @input="handleRoleChange"></v-checkbox>

              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <v-window-item value="invoiceinfo">
          <v-container fluid>

            <v-row>
              <v-col>
                <v-textarea label="Orderrutiner" v-model="organizationEdit.orderInfotext"></v-textarea>
                <v-checkbox v-model="organizationEdit.orderInfoPopup" :true-value="1" :false-value="0"
                  label="Popup vid orderläggning"></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea label="Faktureringsrutiner" v-model="organizationEdit.invoiceInfotext"></v-textarea>
                <v-checkbox v-model="organizationEdit.invoiceInfoPopup" :true-value="1" :false-value="0"
                  label="Popup vid fakturering"></v-checkbox>
              </v-col>
            </v-row>

          </v-container>
        </v-window-item>

        <v-window-item value="misc">
          <v-container fluid>
            <v-row>
              <v-col sm="4">
                <v-select label="Type" :items="addressTypes" v-model="address.type" variant="outlined"></v-select>
                <v-text-field label="Name" v-model="address.name" variant="outlined"></v-text-field>
                <v-text-field label="Address Line 1" v-model="address.addressLine1" variant="outlined"></v-text-field>
                <v-text-field label="Address Line 2" v-model="address.addressLine2" variant="outlined"></v-text-field>
                <v-text-field label="Address Line 3" v-model="address.addressLine3" variant="outlined"></v-text-field>
                <v-row>
                  <v-col sm="4">
                    <v-text-field label="Postcode" v-model="address.postcode" variant="outlined"></v-text-field>
                  </v-col>
                  <v-col sm="8">
                    <v-text-field label="City" v-model="address.city" variant="outlined"></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field label="Country" v-model="address.country" variant="outlined"></v-text-field>
              </v-col>
              <v-col sm="4">
                <v-text-field label="Plus Code" v-model="address.plusCode" variant="outlined"></v-text-field>
                <GoogleMap :api-key="key" style="width: 100%; height: 318px" :center="center" :zoom="15" />
              </v-col>
              <v-col sm="4">
                <v-text-field label="Phone" v-model="address.phone" variant="outlined"></v-text-field>
                <v-text-field label="Buyer Reference" v-model="address.buyerReference" variant="outlined"></v-text-field>
                <v-text-field label="Invoice Reference" v-model="address.invoiceReference"
                  variant="outlined"></v-text-field>
                <v-text-field label="GLN" v-model="address.GLN" variant="outlined"></v-text-field>
                <v-checkbox v-model="organizationEdit.orderToInvoiceMergeOrders" :true-value="1" :false-value="0"
                      label="Generera egen faktura för denna leveransadress"></v-checkbox>

                <v-btn @click="addSaveAddress" variant="tonal">Spara adress</v-btn>
              </v-col>
            </v-row>

            <v-table>
              <thead>
                <tr>
                  <th class="text-left">
                    Type
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Address
                  </th>
                  <th class="text-left">
                    Ref 1
                  </th>
                  <th class="text-left">
                    Ref 2
                  </th>
                  <th class="text-left">
                    Default
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="address in props.organization.addresses" :key="address.addressId">
                  <td>
                    <v-btn variant="tonal">Editera</v-btn>
                    </td>
                  <td>{{ address.type }}</td>
                  <td>{{ address.name }}</td>
                  <td>
                    <div v-if="address.addressLine1">{{ address.addressLine1 }}</div>
                    <div v-if="address.addressLine2">{{ address.addressLine2 }}</div>
                    <div v-if="address.addressLine3">{{ address.addressLine3 }}</div>
                    <div v-if="address.postcode || address.city">{{ address.postcode }} {{ address.city }}</div>
                    <div v-if="address.country">{{ address.country }}</div>
                  </td>
                  <td>
                    {{ address.buyerReference }}
                  </td>
                  <td>
                    {{ address.invoiceReference }}
                  </td>
                  <td><v-radio value="one"></v-radio></td>
                  <td>
                    <v-btn variant="tonal">Ta bort</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>

          </v-container>
        </v-window-item>
      </v-window>

    </v-card>

  </v-dialog>
</template>