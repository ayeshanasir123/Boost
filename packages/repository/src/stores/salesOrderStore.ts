import { ref, inject } from 'vue'
import { defineStore } from 'pinia'
//import {$mqtt} from 'vue-paho-mqtt';
import { type SalesOrder } from '../models/SalesOrder'
import { type Customer } from '../models/Customer'
import { boostApi } from '@boost/shared'
import { useOrganizationStore } from './organizationStore'

export const useSalesOrderStore = defineStore('salesOrder', () => {
    const orderList = ref<SalesOrder[]>([]);
    const emptySalesOrder = ref<SalesOrder | null>(null);

    const organizationStore = useOrganizationStore();

     type SalesOrderResponse = {
            totalCount: number,
        pages: number,
        currentPage: number,
        limit: number,
        offset: number,
        checksum?: string,
        salesOrders: SalesOrder[]
    }

    async function saveSalesOrder(salesOrder: SalesOrder) {
        if (salesOrder.UUID == undefined) {
            return await createSalesOrder(salesOrder);
        } else {
            return await updateSalesOrder(salesOrder);
        }
    }

    async function createSalesOrder(salesOrder: SalesOrder) {
        const newSalesOrder = await boostApi.post('/sales-orders/', salesOrder) as SalesOrder;
        console.log(newSalesOrder);
        //orderList.value.push(newSalesOrder);
        return newSalesOrder; // Return data to the caller
    }

    async function updateSalesOrder(updatedSalesOrder: SalesOrder) {
        const salesOrderResponse = await boostApi.put(`/sales-orders/${updatedSalesOrder.UUID}`, updatedSalesOrder) as SalesOrder;

        const existingSalesOrder = orderList.value.find(
            (SalesOrder: SalesOrder) => SalesOrder.UUID === updatedSalesOrder.UUID
        ) as SalesOrder;

        let exists = true;

        if (existingSalesOrder != undefined) {
            Object.assign(existingSalesOrder, salesOrderResponse as SalesOrder);
        } else {
            exists = false;
        }

        if (!exists) {
            orderList.value.push(salesOrderResponse)
        }

        return salesOrderResponse; // Return data to the caller

    }

    async function getSalesOrderByUUID(salesOrderUUID: string): Promise<SalesOrder | undefined> {
        let localSalesOrder = orderList.value.find(
            (salesOrder: SalesOrder) => salesOrder.UUID === salesOrderUUID
        );
    
        // Fetch from API if localSalesOrder is undefined, isPartial is true, or isPartial is undefined
        if (!localSalesOrder || localSalesOrder.isPartial === true || localSalesOrder.isPartial === undefined) {
            let salesOrder = await boostApi.get(`/sales-orders/${salesOrderUUID}`) as SalesOrder;
            salesOrder.isPartial = false;
            
            if (salesOrder.status === 'DRAFT' && salesOrder.customerUUID) {
                salesOrder.customer = await organizationStore.getOrganizationByUUID(salesOrder.customerUUID) as Customer;
            }
    
            // If a localSalesOrder was found, update it with the fetched data
            if (localSalesOrder) {
                Object.assign(localSalesOrder, salesOrder);
            } else {
                // Otherwise, add the fetched salesOrder to the local list (if that's the desired behavior)
                orderList.value.push(salesOrder);
            }
    
            return salesOrder;
        }
    
        // If no fetching was necessary, return the localSalesOrder
        return localSalesOrder;
    }

    async function getEmptyObject() {
        if (emptySalesOrder.value == null || emptySalesOrder.value == undefined) {
            const salesOrderResponse = await boostApi.get(`/sales-orders/emptyObject`) as SalesOrder;

            emptySalesOrder.value = salesOrderResponse as SalesOrder;
        }
        return emptySalesOrder.value;
    }

    async function fetchData() {
        try {
            const data = await boostApi.get('/sales-orders/?status=DRAFT') as SalesOrderResponse;
            orderList.value = data.salesOrders;
        } catch (error) {
            // Handle any errors that occur during the request
            console.error('Error while fetching orders:', error);
        }
    }

    async function getOrdersByCustomerUUID(customerUUID: string) {
        try {
            const data = await boostApi.get('/sales-orders/?customerUUID=' + customerUUID) as SalesOrderResponse;
            return data;
        } catch (error) {
            console.error('Error while fetching orders:', error);
        }
    }

    //Initialize the store with draft orders
    fetchData();

    return {
        orderList,
        fetchData,
        saveSalesOrder,
        getSalesOrderByUUID,
        getEmptyObject,
        getOrdersByCustomerUUID
    }
})
