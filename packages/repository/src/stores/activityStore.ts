import { ref } from "vue";
import { defineStore } from "pinia";
import type { TimActivity } from "../models/Tim";
import { boostApi } from "@boost/shared";

export const useActivityStore = defineStore("TimActivity", () => {
    const timWorkorderActivityList = ref<TimActivity[]>([]);

    async function fetchData() {
        try {
            const data = await boostApi.get("/activities") as TimActivity[];
            timWorkorderActivityList.value = data;
        } catch (error) {
            console.error('Error during fetching activities:', error);
        }
    }

    // Fetch data on store initialization
    fetchData();

    function search(searchTerm: string): TimActivity[] {
        return timWorkorderActivityList.value.filter(activity =>
            activity.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return {
        timWorkorderActivityList,
        search
    };
});