<script setup lang="ts">
import { ref, watch, computed, nextTick } from "vue";

import SideMenu from "./side-menu.vue";
import Search from "./search.vue";

import { useRoute, useRouter } from "vue-router";
import { Menu, ProfileCircle } from '@iconoir/vue';
//import { onMounted, onActivated } from "vue";
import { useProfileStore } from '@boost/repository';
import { useNavigationStore } from "@boost/repository";
import { useRouterStateStore } from '@boost/repository';
import { MenuItem } from '@boost/repository';

import { useI18n } from 'vue-i18n'
import type { Organization } from '@boost/repository';
import type { Person } from '@boost/repository';
//import CreateCustomer from "./CreateCustomer.vue";

//const axios: any = inject("axios");

const { t } = useI18n();

const profileStore = useProfileStore();
const navigationStore = useNavigationStore();

const menuItems = computed(() => navigationStore.topbarNav);

const imageSource = "/assets/img/qeepinglogo.svg";

const drawer = ref(false);

const route = useRoute();
const router = useRouter();

const currentUrl = window.location.pathname;

const lastEntityId = ref<string | null>(null);

interface MenuButton {
    icon: string;
    label: string;
    active: boolean;
    route: string;
    addEntityId: boolean;
}

const buttons = ref<MenuButton[]>([
]);
if (currentUrl === '/todo') {
    buttons.value = [
        {
            icon: "view_list",
            label: "todo",
            active: false,
            route: "todo",
            addEntityId: false,
        },
        {
            icon: "calendar_today",
            label: "Calendar",
            active: false,
            route: "calendar",
            addEntityId: false,
        }
    ]
}

function navigate(btn: MenuItem) {

    const path = btn.route!.replace(':tenantId', (route.params as any).tenantId);
    
    if (currentUrl === '/todo') {
        router.push(path);
    } else {
        menuItems.value.forEach((b) => {
            b.active = false;
        });
        btn.active = true;

        if (btn.addEntityId) {
            if (lastEntityId.value != undefined)
                router.push(path);
        } else {
            router.push(path);
        }
    }
}


//If menu item is clicked always close the drawer 
const handleClickEvent = (event: string) => {
    drawer.value = false;
};

</script>

<template>
    <div class="topbar">
        <button @click="drawer = !drawer" class="header-button pr-10">
            <div class="material-symbols-outlined">menu</div>
            <div class="button-text">{{ profileStore.organization?.name }}</div>
        </button>

        <!-- Button with Icon and Label for the List -->
        <template v-for="btn in menuItems">
            <v-btn style="background-color: transparent;"
                variant="flat"
                class="d-flex qpn-toolbar-btn"
                :class="{ 'qpn-toolbar-btn-active': btn.active }"
                @click="navigate(btn)">
                <div>{{ btn.title }}</div>
            </v-btn>
        </template>


        <!-- Spacer to push the right-half to the right -->
        <v-spacer></v-spacer>

        <!-- Right aligned content -->
        <div class="topbar-area pr-5">
            <search></search>
        </div>

        <div class="topbar-area hideonmob pt-1">
            {{ profileStore.person?.firstname }}
            {{ profileStore.person?.lastname }}
        </div>

        <div class="topbar-area-last">
            <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="tonal" color="white" elevation="0">
                        <span class="material-symbols-outlined" style="color:black;">account_circle</span>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item href="/?logout">
                        <v-list-item-title>{{ t('ui.logout') }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>

    <v-navigation-drawer v-model="drawer" temporary width="450">
        <SideMenu @clickEvent="handleClickEvent" />
    </v-navigation-drawer>
</template>

<style scoped>
.topbar {
  height:48px;
  display: flex;
}

.topbar-area {
  margin-top:10px;
  font-size:14px;
}

.topbar-area-last {
  margin-top:5px;
  margin-right:10px;
}

.header-button {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  justify-content: flex-start; /* Align content to the left */
}

.header-button .material-symbols-outlined {
  font-size: 24px; /* Adjust the size as necessary */
  line-height: 48px; /* Ensure the icon is vertically centered */
}

.header-button .button-text {
  padding-top: 2px;
  font-size:14px;
  line-height: 48px; /* Ensure the icon is vertically centered */
}

.header-button div {
  padding-left: 15px; /* Ensure there's padding between the icon and the text */
  line-height: 48px; /* Vertically center the text */
}
</style>