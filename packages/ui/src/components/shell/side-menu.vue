<script setup lang="ts">
import { ref, computed } from "vue";
import { useProfileStore } from "@boost/repository";
import { useNavigationStore } from "@boost/repository";
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['clickEvent']);

const { t } = useI18n();
const navigationStore = useNavigationStore();
const profileStore = useProfileStore();
const tenantId = ref(profileStore.getTenantId());

const handleClick = () => {
  emits('clickEvent');
};

const menuItems = computed(() => navigationStore.mainMenu);

</script>

<template>
<v-container>
    <v-row>
      <v-col cols="12">
<!--
  <v-sheet class="d-flex" elevation="0">
    <v-sheet class="flex-1-0 mt-2 pt-2 ml-2 pl-2" elevation="0">
      <ul>
        <li class="menu-head mb-5">
          <a :href="`/${tenantId}/cim/orders`"><b>Ordrar</b></a>
        </li>

        <li class="menu-head mb-5" v-for="item in menuItemsTop" :key="item.id">
          <router-link :to="item.route">
            <b>{{ item.title }}</b>
          </router-link>
          <ul v-if="item.children && item.children.length > 0" class="mb-5">
            <li
              class="child-menu-item"
              v-for="child_item in item.children as MenuItem[]"
              :key="child_item.id"
            >
              <router-link :to="child_item.route">
                {{ child_item.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </v-sheet>
    <v-sheet class="flex-1-0 mt-2 pt-2 ml-2 pl-2" elevation="0">
      <ul>
        <li class="menu-head mb-5" v-for="item in menuItemsTopR" :key="item.id">
          <router-link :to="item.route">
            <b>{{ item.title }}</b>
          </router-link>
          <ul v-if="item.children && item.children.length > 0" class="mb-5">
            <li
              class="child-menu-item"
              v-for="child_item in item.children as MenuItem[]"
              :key="child_item.id"
            >
              <router-link :to="child_item.route">
                {{ child_item.title }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </v-sheet>
  </v-sheet>
  <v-divider></v-divider>-->
  <v-sheet class="d-flex" elevation="0">
    <v-sheet class="flex-1-0 ma-2 pa-2" elevation="0">
      <ul>
        <template v-for="item in menuItems">
        <li class="menu-head mb-5" v-if="item.id != null" :key="item.id">
          <router-link :to="`/${tenantId}${item.route}`" @click.native="handleClick">
            <b>{{ item.title }}</b>
          </router-link>
          <ul v-if="item.children && item.children.length > 0" class="mb-5">
            <template v-for="child_item in item.children">
            <li
              class="child-menu-item"              
              v-if="child_item.id != null"
              :key="child_item.id"
            >
              <router-link :to="`/${tenantId}${child_item.route}`" @click.native="handleClick">
                {{ child_item.title }}
              </router-link>
            </li>
            </template>
          </ul>
        </li>
        </template>
      </ul>
    </v-sheet>   
  </v-sheet>
  <v-divider></v-divider>
  </v-col>
  </v-row>
  <v-row align="end">
    <v-col cols="12">
      <select v-model="$i18n.locale" class="language-select" @change="handleClick">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ t(locale) }}</option>
      </select>      
    </v-col>
  </v-row>
</v-container>
</template>

<style scoped>
</style>
