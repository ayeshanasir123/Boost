<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import {useRoute} from 'vue-router'
import {useOrganizationStore} from '@boost/repository';
import {useSalesOrderStore} from '@boost/repository';
import SalesOrderGrid from './sales-order-grid.vue'
import OrganizationsEditDialog from './organizations-edit-dialog.vue'
import type { Organization } from '@boost/repository'

const organizationStore = useOrganizationStore();
const salesOrderStore = useSalesOrderStore();

const tab = ref("one");
const valid = ref(false);

const route = useRoute();
//const router = useRouter();

const organization = ref<Organization | undefined>();

// Function to load data
async function loadData(orgId: string) {
  try {
    const fetchedOrganization = await organizationStore.getOrganizationByUUID(orgId);
    if (fetchedOrganization) {
      organization.value = fetchedOrganization;
      await salesOrderStore.fetchData(orgId);
    } else {
      // Handle the case where organization is not found
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle error appropriately
  }
}

// On mounted, load data for the first time
onMounted(() => {
  loadData(route.params.organizationUUID as string);
});

// Watch for changes in the route params and reload data
watch(() => route.params.organizationUUID, (newOrgId) => {
  if (newOrgId) {
    loadData(newOrgId as string);
  }
});
</script>


<template>

  <v-container fluid class="mt-0 pa-0" style="height:500px;">
    <h2>{{ organization?.name }}</h2>
    <v-row class="mb-0" height="100%">
      <v-col
          cols="12"
          md="3"
      >
        <v-card
            rounded="lg"
            min-height="268"
            class="pa-5 cardshadow"
            elevation="0"
        >
          <v-chip class="qpnchip">Customer</v-chip>

          <v-divider class="my-3 mt-4"></v-divider>

          <v-list lines="one">
            <v-list-item class="pl-0 pr-0"
                         v-if="organization?.partyLegalRegistrationName"
                         :title="organization?.partyLegalRegistrationName"
                         subtitle="Registrerat namn"
            ></v-list-item>
            <v-list-item class="mt-2 pl-0 pr-0"
                         v-if="organization?.partyLegalCompanyId"
                         :title="organization?.partyLegalCompanyId"
                         subtitle="Organisationsnummer"
            ></v-list-item>
            <v-list-item class="mt-2 pl-0 pr-0"
                         v-if="organization?.email"
                         :title="organization?.email"
                         subtitle="E-mail"
            ></v-list-item>
            <v-list-item class="mt-2 pl-0 pr-0"
                         v-if="organization?.phone"
                         :title="organization?.phone"
                         subtitle="Telefon"
            ></v-list-item>

          </v-list>

          <v-form v-model="valid">

          </v-form>
          <v-card-actions class="mt-2 pl-0 pr-0">

            <OrganizationsEditDialog v-if="organization" :organization=organization></OrganizationsEditDialog>

          </v-card-actions>

        </v-card>
      </v-col>
      <v-col
          cols="12"
          md="9"
          height="100%"
      >
        <v-tabs
            v-model="tab"
            height="60"
            class="mb-3"
            color="light-blue-darken-3"
        >
          <v-tab class="qpntabbtn" value="info">Grunduppgifter</v-tab>
          <v-tab class="qpntabbtn" value="customerorders">Order</v-tab>
          <v-tab class="qpntabbtn" value="customerinvoices">Fakturor</v-tab>
          <v-tab class="qpntabbtn" value="agreements">Avtal</v-tab>
          <v-tab class="qpntabbtn" value="pricelists">Prislistor</v-tab>
        </v-tabs>
        <v-sheet
            rounded="lg"
            min-height="268"
            elevation="0"
            class="cardshadow"
            height="100%"
        >
          <v-window v-model="tab">
            <v-window-item value="info" class="tabfullheightcard">
              <v-card title="Contacts" class="ma-5">
                <v-card-text>
                  This is content
                </v-card-text>
              </v-card>

            </v-window-item>

            <v-window-item value="customerorders" class="tabfullheightcard">
              <SalesOrderGrid></SalesOrderGrid>
            </v-window-item>

            <v-window-item value="customerinvoices" class="tabfullheightcard">
              One
            </v-window-item>

            <v-window-item value="agreements" class="tabfullheightcard">
              Two
            </v-window-item>

            <v-window-item value="pricelists" class="tabfullheightcard">
              Three
            </v-window-item>
          </v-window>
        </v-sheet>

      </v-col>

    </v-row>
  </v-container>
</template>