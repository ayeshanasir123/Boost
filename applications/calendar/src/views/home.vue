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
        <div>
            <h2>Calendar</h2>
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

<!--<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
<RouterLink to="/tenantId/accounting/chart-of-accounts">Chart of Accounts</RouterLink><br/>
<RouterLink to="/tenantId/accounting/bank-transactions">Bank Transaction</RouterLink><br/>
<RouterLink to="/tenantId/accounting/asset-management">Asset Management</RouterLink><br/>
<RouterLink to="/tenantId/accounting/fics">FICS</RouterLink><br/>
<RouterLink to="/tenantId/accounting/journal-entry">Journal Entry</RouterLink><br/>
<RouterLink to="/tenantId/accounting/ledger">Ledger</RouterLink><br/>
<RouterLink to="/tenantId/accounting/settings">Settings</RouterLink><br/>
</template>-->