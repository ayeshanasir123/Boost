<script setup lang="ts">
import {RouterLink} from 'vue-router';
import ItemGrid from './item-grid.vue'
</script>

<template>
<lq-page
    :title="$t('Items')"
    :add-title="$t('New Item')"
    :add="['item-view', { itemUUID: 'new' }]">
    <div class="grid-container">
        <ItemGrid />
    </div>
</lq-page>
</template>

<style scoped>
.grid-container {
    margin-top:30px;
    height: calc(100vh - 200px);
}
</style>