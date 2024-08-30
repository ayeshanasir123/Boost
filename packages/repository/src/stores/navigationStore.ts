import { defineStore } from "pinia";
import { ref } from "vue";
import { MenuItem } from "../models/MenuItem";

export const useNavigationStore = defineStore("navigation", () => {
    const mainMenu = ref<MenuItem[]>([]);
    const topbarNav = ref<MenuItem[]>([]);
    const footerNav = ref<MenuItem[]>([]);

    function addMainMenuOption(menuItem: MenuItem) {
        mainMenu.value.push(menuItem);
    }

    function clearMainMenu(menuItem: MenuItem) {
    mainMenu.value = [];
    }

    function addTopbarNavOption(menuItem: MenuItem) {
    topbarNav.value.push(menuItem);
    }

    function clearTopbarNav() {
        topbarNav.value = [];
    }

    function addFooterNavOption(menuItem: MenuItem) {
        footerNav.value.push(menuItem);
    }

    function clearFooterNav(menuItem: MenuItem) {
        footerNav.value = [];
    }

    return {
        mainMenu,
        topbarNav,
        footerNav,
        addMainMenuOption,
        clearMainMenu,
        addTopbarNavOption,
        clearTopbarNav,
        addFooterNavOption,
        clearFooterNav
    };
});
