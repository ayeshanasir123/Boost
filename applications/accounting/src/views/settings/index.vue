

<script setup lang="ts">
import {RouterLink} from 'vue-router';
import { onMounted, ref, computed, watch, onBeforeMount } from "vue";
import FiscalGrid from './fiscals-grid.vue'
const taskId = ref('new');
const editOpen = ref(false);
</script>

<template>
<!-- <main class="main">
    <FiscalGrid />
</main>
</template> -->
<lq-page
    :title="$t('Settings')"
    add-title="New FiscalYear"
    :add="['fiscal-view', { fiscalYearUUID: 'new' }]">
    
    
    <div class="grid-container">
        <FiscalGrid />
    </div>
</lq-page>
</template>

<style scoped>
.grid-container {
    margin-top:30px;
    height: calc(100vh - 200px);
}
</style>