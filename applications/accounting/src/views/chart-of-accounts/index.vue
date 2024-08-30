<script setup lang="ts">
import {RouterLink} from 'vue-router';
import ChartGrid from './charts-grid.vue'
</script>

<template>

    <lq-page
    :title="$t('Chart of Accounts')"
    :add-title="$t('New Item')"
    :add="['chart-view', { UUID: 'new' }]">
    
    <div class="grid-container">
    <ChartGrid />
</div>
</lq-page>
</template>
<style scoped>
.grid-container {
    margin-top:30px;
    height: calc(100vh - 200px);
}
</style>