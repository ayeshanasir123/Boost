import { ref, inject } from "vue";
import { defineStore } from "pinia";
import { $mqtt } from 'vue-paho-mqtt';
import type Organization from '@/model/Organization';

export const useOrganizationStore = defineStore('organization', () => {
    const organizationList = ref([] as Organization[]);
    const tenantId = ref(null);

    const axios: any = inject('axios');

    /**
     *
     * Geting data from the api
     *
     * */

    async function getData() {
        await axios
            .get("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/organizations?limit=9999")
            .then((organizationResponse) => {
                organizationList.value = organizationResponse.data.organizations;
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
            .put("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/organizations/" + updatedOrganization.organizationId, updatedOrganization)
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

    function getOrganizationByUUID(organizationUUID: string) {
        let organization = organizationList.value.find((Organization: Organization) => Organization.organizationId === organizationUUID);

        console.log(organization?.gridVersion);

        if (organization != undefined && organization?.gridVersion == undefined) {
            axios
                .get("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/organizations/" + organizationUUID)
                .then((response: any) => {
                    //Object.assign(organization, response.data);

                    console.log(organization);
                    console.log(response);
                    //organizationList.value = response.data.organizations;
                });
        }

        return (organization);
    }


    async function fetchOrganizationByName(name: string) {
        const names = await axios.get('https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/' + 'organizations?name=' + name);
        return names.data.organizations;
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
        organizationList,
        fetchOrganizationByName,
        deleteOrganization,
        getOrganizationByUUID,
        update,
        updateFromPlain,
        setTenantId
    };
});