import {ref,inject} from "vue";
import {defineStore} from "pinia";
import {$mqtt} from 'vue-paho-mqtt';
import type Person from '@/model/Person';
import type Organization from "@/model/Organization";
const organizationList = ref([] as Organization[]);

export const usePersonStore = defineStore('person', () => {
    const personList = ref([] as Person[]);
    const tenantId = ref(null);

    const axios: any = inject('axios');

    /**
     *
     * Getting data from the api
     *
     * */

    async function getData() {
        await axios
            .get("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/persons")
            .then((personResponse) => {
                personList.value = personResponse.data.persons;
            });
    }

    function updateFromPlain(updatedOrganization: Organization) {
        let organization = organizationList.value.find(organization => organization.organizationId === updatedOrganization.organizationId);
        if (organization != undefined) {
            Object.assign(organization, updatedOrganization);
        } else {
            organizationList.value.push(updatedOrganization);
        }
    }

    function update(updatedOrganization: Organization) {
        axios
            .put("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/persons/" + updatedOrganization.organizationId, updatedOrganization)
            .then((organizationResponse: any) => {
                if (organizationResponse.status == 200) {
                    let organization = organizationList.value.find(organization => organization.organizationId === updatedOrganization.organizationId);
                    if (organization != undefined) {
                        Object.assign(organization, updatedOrganization);
                        const mqttMessage = {
                            clientId: $mqtt.clientId(),
                            entityType: "organization",
                            entity: updatedOrganization
                        };
                        $mqtt.publish('/entity', JSON.stringify(mqttMessage), 'Fnr');
                    } else {
                        organizationList.value.push(updatedOrganization);
                    }
                }
            });
    }

    function setTenantId(id) {
        console.log(id);
        tenantId.value = id;
    }

    function getPersonByUUID(organizationUUID: string) {
        let person: Person | undefined;
        person = personList.value.find((Person: Person) => Person.personId === organizationUUID);
        let gridVersion = person?.gridVersion;

        if (typeof person == undefined && gridVersion == undefined || gridVersion ) {
            axios
                .get("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/persons/"+organizationUUID)
                .then((response:any) => {
                    console.log(response);
                });
        }

        return (person);
    }

    function deleteOrganization(organizationUUID: string) {
        console.log(organizationUUID);
        /*
        for (let i=0; i <= organizationList.value.length; i++) {
          if (organizationList.value[i].organizationId == organizationUUID) {
            organizationList.splice(i,1);
            break;
          }
        }*/

    }

    getData();

    return {
        personList,
        deleteOrganization,
        getPersonByUUID,
        update,
        updateFromPlain,
        setTenantId
    };
});