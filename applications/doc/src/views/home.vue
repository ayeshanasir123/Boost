<script setup lang="ts">
import {ref} from 'vue';
import { RouterLink } from 'vue-router';
import { routes } from '../routes';
import { JsonForms } from '@jsonforms/vue';
import { vuetifyRenderers } from '@jsonforms/vue-vuetify';

const schema = {
  "properties": {
    "firstname": {
      "type": "string"
    },
    "lastname": {
      "type": "string"
    }
  }
};

const uischema = {
  "type": "HorizontalLayout",
  "elements": [
    {
      "type": "Control",
      "label": "Firstname",
      "scope": "#/properties/firstname"
    },
    {
      "type": "Control",
      "label": "Lastname",
      "scope": "#/properties/lastname"
    }
  ]
};

const data = {
  "firstname": "Ottgar"
};

let myFormData = data;

const onChange = (data: any) => {
    myFormData = data;
    console.log(myFormData);
};

const renderers = [
  ...vuetifyRenderers,
  // here you can add custom renderers
];


const generatePath = (path: string): string => {
    // Replace placeholders with actual values if needed
    return path.replace(':tenantId', 'yourTenantId').replace(':documentId', 'new');
};
</script>

<template>
    <main class="main">
        <h2>Document Center</h2>

        <json-forms
            :data="data"
            :schema="schema"
            :uischema="uischema"
            :renderers="renderers"
            @change="onChange"
        />                
                
        <ul>
            <li v-for="route in routes" :key="route.name">
                <router-link :to="generatePath(route.path)">
                    {{ route.name }}
                </router-link>
            </li>
        </ul>
    </main>
</template>

<style scoped>
</style>