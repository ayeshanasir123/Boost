import { ref, inject } from "vue";
import { defineStore } from "pinia";
//import {$mqtt} from 'vue-paho-mqtt';
import type CustomerOrder from "@/model/CustomerOrder";

export const useCustomerOrderStore = defineStore("customerOrder", () => {
  const orderList = ref([] as CustomerOrder[]);
  const axios: any = inject("axios");

  /**
   *
   * Geting data from the api
   *
   * */

  async function fetchData(customerId: string) {

    await axios
      .get(
        "https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/organizations/" +
          customerId +
          "/orders"
      )
      .then((orderResponse) => {
        orderList.value = orderResponse.data.orders;
      });
  }

  async function fetchEmptyCustomerOrder<CustomerOrder>() {
    const response = await axios.get("https://api-s01.dev.qeeping.net/PortalAPI/rest/v2/cim/orders/emptyObject");

    if (response.status === 200) {
      return response.data as CustomerOrder;
    }
  }

  return {
    orderList,
    fetchEmptyCustomerOrder,
    fetchData,
  };
});
