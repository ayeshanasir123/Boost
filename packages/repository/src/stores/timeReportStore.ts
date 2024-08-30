import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { boostApi } from "@boost/shared";
import { useProfileStore } from "./profileStore";
import { usePersonStore } from "./personStore";
import { useSessionStore } from "./sessionStore";
import type { TimTimeReport } from "../models/Tim";
import type { Person } from "../models/Person";
import { startOfWeek, endOfWeek, format, getISOWeek, parseISO, addWeeks, subWeeks } from "date-fns";

export const useTimeReportStore = defineStore("TimTimeReport", () => {
    const timTimeReportList = ref([] as TimTimeReport[]);
    const activePerson = ref<Person | null>(null);
    
    const profileStore = useProfileStore();
    const personStore = usePersonStore();
    const sessionStore = useSessionStore();

    // Initial fromDate set to the start of the current week
    const fromDate = ref(format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd'));

    // toDate computed based on fromDate
    const toDate = computed(() =>
        format(endOfWeek(parseISO(fromDate.value), { weekStartsOn: 1 }), 'yyyy-MM-dd')
    );

    // currentWeek computed based on fromDate
    const currentWeek = computed(() => getISOWeek(parseISO(fromDate.value)));

    interface TimeReportResponse {
        totalCount: number;
        timereports: TimTimeReport[];
    }

    function getTimeReports() {
        return timTimeReportList.value;
    }

    function setData(timeReports: TimTimeReport[]) {
        timTimeReportList.value = timeReports;
    }

    async function fetchData() {
        try {
            activePerson.value = profileStore.person;

            const params = {
                personUUID: activePerson.value?.personId,
                fromDate: fromDate.value,
                toDate: toDate.value
            };
            const data = await boostApi.get("/reports", { params }) as TimeReportResponse;
            setData(data.timereports);
        } catch (error) {
            console.error('Error fetching time reports:', error);
        }
    }

    async function createTimeReport(timeReport: TimTimeReport) {
        try {
            const data = await boostApi.post("/reports", timeReport);
            return data;
        } catch (error) {
            console.error('Error during time report creation:', error);
        }
    }

    async function getTimeReportByUUID(UUID: string) {
        let timeReport = timTimeReportList.value.find((TimTimeReport: TimTimeReport) => TimTimeReport.id === UUID);

        if (!timeReport) {
            try {
                timeReport = await boostApi.get("/reports/" + UUID);
            } catch (error) {
                console.error('Error fetching time report by UUID:', error);
            }
        }
        return timeReport;
    }

    // Method to set fromDate
    function setFromDate(date: string) {
        fromDate.value = date;
    }

    // Method to navigate to the previous week
    function previousWeek() {
        fromDate.value = format(subWeeks(parseISO(fromDate.value), 1), 'yyyy-MM-dd');
    }

    // Method to navigate to the next week
    function nextWeek() {
        fromDate.value = format(addWeeks(parseISO(fromDate.value), 1), 'yyyy-MM-dd');
    }

    // Method to set personUUID and fetch data for that person
    async function setPerson(uuid: string) {
        activePerson.value = await personStore.getPersonByUUID(uuid);
        fetchData();
    }

    // Watch fromDate and fetch data whenever it changes
    watch(fromDate, () => {
        fetchData();
    });

    // Watch profileStore.person and set activePerson when it is set
    watch(() => profileStore.person, (newPerson) => {
        if (newPerson) {
            activePerson.value = newPerson;
            fetchData();
        }
    }, { immediate: true });

    return {
        currentWeek,
        timTimeReportList,
        activePerson,
        fromDate,
        toDate,
        getTimeReports,
        getTimeReportByUUID,
        setData,
        createTimeReport,
        setFromDate,  // Expose the method to set fromDate
        previousWeek, // Expose the method to navigate to the previous week
        nextWeek,     // Expose the method to navigate to the next week
        setPerson, // Expose the method to set personUUID and fetch data
        fetchData,
    };
});
