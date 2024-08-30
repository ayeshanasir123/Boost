<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useProfileStore } from '@boost/repository';
import { routes } from '../routes';

const profileStore = useProfileStore();
const tenantId = profileStore.getTenantId();

const generatePath = (path: string): string => {
    // Replace placeholders with actual values if needed
    return path.replace(':tenantId', tenantId).replace(':salesOrderUUID', 'new');
};
</script>

<template>
    <main class="main">
        <div>
            <h2>Sales</h2>
            <ul>
                <li v-for="route in routes" :key="route.name">
                    <router-link :to="generatePath(route.path)">
                        {{ route.title }}
                    </router-link>
                </li>
            </ul>
        </div>
    </main>
</template>

