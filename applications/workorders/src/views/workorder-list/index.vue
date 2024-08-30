<script setup lang="ts">
import { RouterLink } from "vue-router";
import WorkOrderGrid from "./work-order-grid.vue";
</script>

<template>
  <lq-page
    :title="$t('Work Order')"
    :add-title="$t('New Work Order')"
    :add="['workorder-view', { workorderUUID: 'new' }]"
  >
    <div class="grid-container">
      <WorkOrderGrid />
    </div>
  </lq-page>
</template>

<style scoped>
.grid-container {
  margin-top: 30px;
  height: calc(100vh - 200px);
}
</style>
