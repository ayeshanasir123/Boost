<script setup lang="ts">
import {RouterLink} from 'vue-router';
import OrganizationsGrid from './organizations-grid.vue'
</script>

<template>
<lq-fill-page>
    <div class="top-bar-header d-flex">
            <div class="me-auto">
                <h2>{{ $t('Organizations') }}</h2>
            </div>
            <div class="pr-3">
                <v-btn
                    class="btn-font"
                    color="green"
                    @click="navigateToCreateSalesOrder"><span class="material-symbols-outlined">add</span>{{
                        $t('New Organization') }}</v-btn>
            </div>
    </div>   
    <div class="main">
        <OrganizationsGrid />
    </div>
</lq-fill-page>
</template>

<style scoped lang="scss">
.top-bar-header {
    height: 64px;
    background: #f7f9fb;
    padding: 14px;
    border-bottom: 1px solid #dcdcdc;
}
</style>