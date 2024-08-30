import { type Ref, ref, computed } from "vue";
import { defineStore } from "pinia";
import { type FiscalYear } from '../models/accounting';
import { boostApi } from "@boost/shared";

export const useFiscalYearStore = defineStore('FiscalYear', () => {
    const FiscalList = ref<FiscalYear[]>([])
   
    interface FiscalResponse {
        fiscalYears: FiscalYear[]
    }

   

    // async function fetchFiscalYear() {
    //     try {
    //         const response = await boostApi.get('/accounting/fiscal-years') as FiscalResponse;
    //         FiscalList.value = response.FiscalList;
    //         return response.FiscalList; // Ensure this returns the expected data
    //     } catch (error) {
    //         console.error('Error fetching flow diagrams:', error);
    //         throw error; // Propagate the error for handling in the calling function
    //     }
    // }

    async function fetchFiscalYear() {
        try {
            const response = await boostApi.get('/accounting/fiscal-years') as FiscalResponse;
            
            // Assuming FiscalResponse has a fiscalYears property as shown in your example
            const fiscalYears = response.fiscalYears;

            console.log(fiscalYears);
    
            // Set the data to the store or any other state management you are using
            FiscalList.value = fiscalYears;
    
            // Return the fiscal years list
            return fiscalYears;
        } catch (error) {
            console.error('Error fetching fiscal years:', error);
            throw error; // Propagate the error for handling in the calling function
        }
    }

    async function save(fiscalYears: FiscalYear) {
        if (fiscalYears.UUID == undefined) {
            return await createFiscalYear(fiscalYears);
        } else {
            return await updateFiscalYear(fiscalYears);
        }
    }
    async function createFiscalYear(fiscalYears: FiscalYear) {
        const fiscalResponse = await boostApi.post('/accounting/fiscal-years', fiscalYears) as FiscalYear;
        FiscalList.value.push(fiscalResponse);
        return fiscalResponse; // Return data to the caller
    }
    async function updateFiscalYear(updatedFiscalYear: FiscalYear) {
        const projectResponse = await boostApi.put(`/accounting/fiscal-years/${updatedFiscalYear.UUID}`, updatedFiscalYear) as FiscalYear;

        const existingProject = FiscalList.value.find(
            (FiscalYear: FiscalYear) => FiscalYear.UUID === updatedFiscalYear.UUID
        ) as FiscalYear;

        let exists = true;

        if (existingProject != undefined) {
            Object.assign(existingProject, projectResponse as FiscalYear);
        } else {
            exists = false;
        }

        if (!exists) {
            FiscalList.value.push(projectResponse)
        }

        return projectResponse; // Return data to the caller

    }
    async function getAccountByFiscalYearUUID(fiscalYearUUID: string) {
        console.log(FiscalList);
        let item = FiscalList.value.find((FiscalYear: FiscalYear) => FiscalYear.UUID === fiscalYearUUID) as FiscalYear;
console.log("test")
        console.log(item);
        let exists = true;
        if (item == undefined) {
            exists = false;
        }
        if (!exists || item.isPartial === undefined || item.isPartial || 1 == 1) {
            const data = await boostApi.get(`/accounting/fiscal-years/${fiscalYearUUID}`) as FiscalYear;
            data.isPartial = false;
            if (!exists) {
                FiscalList.value.push(item);
            } else {
                Object.assign(item, data);
            }
        }
        return (item);
    }
    // async function getAccountByFiscalYearUUID(fiscalYearUUID: string) {
      
    //     try {
    //         const data = await boostApi.get(`/accounting/fiscal-years/${fiscalYearUUID}`) as FiscalYear;
    //         return data;
    //     } catch (error) {
    //         console.error('Error while fetching orders:', error);
    //     }
    // }
    fetchFiscalYear();
    return {
        FiscalList,
        save,
        fetchFiscalYear,
        getAccountByFiscalYearUUID
      }
})
export type FiscalYearStore = ReturnType<typeof useFiscalYearStore>;