import { ref, inject, markRaw } from "vue";
import { defineStore } from "pinia";
//import {$mqtt} from 'vue-paho-mqtt';
import type { TimWorkOrder } from "../models/Tim";
import { boostApi } from "@boost/shared";


export const useWorkOrderStore = defineStore("workOrder", () => {
    const workOrderList = ref<TimWorkOrder[]>([]);
    const loading = ref(true);
    const loadingError = ref();

    function getWorkOrderByUUID(organizationUUID: string) {
        /*timWorkOrderListDirect.value = timWorkOrderList.value.find((TimWorkOrder: TimWorkOrder) => TimWorkOrder.id === organizationUUID);
        if (timWorkOrderListDirect.value == undefined && timWorkOrderListDirect.value?.gridVersion == undefined) {
        }
    
        return timWorkOrderListDirect.value;*/
    }

    async function createWorkOrder(dataPosted: TimWorkOrder) {

        try {
            const data = await boostApi.post("/workorders/", dataPosted);
            return data;
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error during Work Order creation:', error);
            return null;  // or throw the error

        }
    }
    function setData(workOrders: TimWorkOrder[]) {
        workOrderList.value = workOrders;
    }

    async function search(searchTerm: string) {
        let data = {
            "field": "nrSubjectBody",
            "value": searchTerm
        };
        return (await boostApi.post<{ workorders: TimWorkOrder[] }>("/workorders/search/query", data)).workorders;
    }

    queueMicrotask(async () => {
        try {
            workOrderList.value = (await boostApi.get<{ workorders: TimWorkOrder[] }>("/workorders?assignedCurrentUser=0&limit=20000")).workorders.filter(order => order.endcustomerId);
            loading.value = false;
        } catch (e) {
            loadingError.value = e;
        }
    });

    return {
        loading,
        loadingError,
        workOrderList,
        createWorkOrder,
        getWorkOrderByUUID,
        setData,
        search
    };

});

