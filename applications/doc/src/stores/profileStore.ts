import {ref, inject} from "vue";
import {defineStore} from "pinia";
import type Person from '@/model/Person';

export const useProfileStore = defineStore('profile', () => {

    const person = ref<Person>();

    const axios: any = inject('axios');

    async function getData() {
        await axios
            .get("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/whoami")
            .then((personResponse: any) => {
                person.value = personResponse.data.person;
        });
    }

    getData();

    return {
        person,
        useProfileStore
    };
});