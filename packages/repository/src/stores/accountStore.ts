import { type Ref, ref, computed } from "vue";
import { defineStore } from "pinia";
import { type Account } from '../models/accounting';
import { boostApi } from "@boost/shared";

export const useAccountStore = defineStore('Account', () => {
    const AccountList = ref<Account[]>([])
   
    interface AccountResponse {
        Accounts: Account[]
    }
    async function fetchAccount() {
        try {
            const response = await boostApi.get('/accounting/accounts') as AccountResponse;
            
            // Assuming FiscalResponse has a Accounts property as shown in your example
            const Accounts = response.Accounts;

            console.log(Accounts);
    
            // Set the data to the store or any other state management you are using
            AccountList.value = Accounts;
    
            // Return the fiscal years list
            return Accounts;
        } catch (error) {
            console.error('Error fetching Accounts:', error);
            throw error; // Propagate the error for handling in the calling function
        }
    }

    fetchAccount();
    return {
        AccountList,
        
        fetchAccount,
     
      }
})
export type AccountStore = ReturnType<typeof useAccountStore>;