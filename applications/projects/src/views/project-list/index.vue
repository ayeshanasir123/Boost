<script setup lang="ts">
import {RouterLink} from 'vue-router';
import ProjectGrid from './project-grid.vue'
</script>

<template>
<lq-page
    :title="$t('Projects')"
    :add-title="$t('New Project')"
    :add="['project-view', { projectUUID: 'new' }]">
    <div class="grid-container">
        <ProjectGrid />
    </div>
</lq-page>
</template>

<style scoped>
.grid-container {
    margin-top:30px;
    height: calc(100vh - 200px);
}
</style>