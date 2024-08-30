<script setup lang="ts">
import { BoostHeader } from '@boost/ui'
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <BoostHeader />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
