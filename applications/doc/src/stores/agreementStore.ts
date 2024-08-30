import { ref, inject } from "vue";
import { defineStore } from "pinia";
import type Agreement from "@/model/Agreement";



const agreementList = ref([] as Agreement[]);
const singleAgreement = ref([] as Agreement[]);

export const useAgreementStore = defineStore('agreement', () => {
    const axios: any = inject('axios');

    /**
     *
     * Getting data from the api
     *
     * */

    async function getData() {
        await axios
            .get("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/agreements")
            .then((Response) => {
                agreementList.value = Response.data.agreements;
            });
    }

    function updateFromPlain(updatedAgreement) {
        console.log(updatedAgreement);
    }

    async function update(data: any, agreementId: string) {

        const response = await axios.put('https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/' + 'agreements/' + agreementId, data);
        return response.data;
    }

    function setTenantId(id) {
        console.log(id);
    }

    async function getAgreementByID(id: string) {
        let agreement;

        //agreement = agreementList.value.find((agreement) => agreement.id === id);

        if (typeof agreement === "undefined") {
            await axios
                .get("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/agreements/" + id)
                .then((response: any) => {
                    singleAgreement.value = response.data;

                });

            return singleAgreement.value;
        }

        return (agreement);
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



    async function apiCall(savePost, agreementId) {

        if (savePost.validFrom != null) {
            try {
                delete savePost.SKU;
                delete savePost.priceType;
                return await axios.post('https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/' + 'agreements/' + agreementId + '/articleprices', savePost);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }


    getData();

    return {
        apiCall,
        getData,
        agreementList,
        deleteOrganization,
        getAgreementByID,
        update,
        updateFromPlain,
        setTenantId,
    };
});