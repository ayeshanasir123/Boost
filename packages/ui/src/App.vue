<script setup>
import Header from './components/header.vue';
import { RouterView } from 'vue-router'
</script>

<template>
<v-app>
  <Header />
  <v-main>
    <RouterView />
  </v-main>
</v-app>
</template>

<style scoped>
</style>
