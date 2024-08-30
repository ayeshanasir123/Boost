<!-- <script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
<RouterLink to="/tenantId/erp/organizations">Organizations</RouterLink><br/>
<RouterLink to="/tenantId/erp/sales">Sales Dashboard</RouterLink><br/>
<RouterLink to="/tenantId/erp/sales/salesorders">Sales Orders</RouterLink>
</template> -->

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useProfileStore } from '@boost/repository';
import { routes } from '../routes';

const profileStore = useProfileStore();
const tenantId = profileStore.getTenantId();

const generatePath = (path: string): string => {
    // Replace placeholders with actual values if needed
    return path.replace(':tenantId', tenantId).replace(':itemUUID', 'new');
};
</script>

<template>
    <main class="main">
        <div>
            <h2>FLOW</h2>
            <ul>
                <li v-for="route in routes" :key="route.name">
                    <router-link :to="generatePath(route.path)">
                        {{ route.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </main>
</template>

