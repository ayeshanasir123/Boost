import { createApp } from 'vue';

import { install as recaptcha } from "vue3-recaptcha-v2";

import 'flag-icons/css/flag-icons.min.css';
import 'v-phone-input/dist/v-phone-input.css';
import { createVPhoneInput } from 'v-phone-input';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue';

const app = createApp(App);

app.use(recaptcha, {
    //sitekey: "6LdsfvkpAAAAAAB-etq8iTuDokVWnH_LubGKsB0A",
    sitekey: "6LcYWP0pAAAAABjbpAe28d1fkrEfKaXubu3LQsRg",
    cnDomains: false
  });


const vPhoneInput = createVPhoneInput({
    countryIconMode: 'svg',
  });  
app.use(vPhoneInput);
  
const vuetify = createVuetify({
    components,
    directives,
  });
app.use(vuetify);

app.mount('#app');
