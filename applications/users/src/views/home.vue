<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { routes } from '../router';

const generatePath = (path: string): string => {
    // Replace placeholders with actual values if needed
    return path.replace(':tenantId', 'yourTenantId').replace(':documentId', 'new');
};
</script>

<template>
    <main class="main">
        <h2>Tasks</h2>
        <ul>
            <li v-for="route in routes" :key="route.name">
                <router-link :to="generatePath(route.path)">
                    {{ route.name }}
                </router-link>
            </li>
        </ul>
    </main>
</template>