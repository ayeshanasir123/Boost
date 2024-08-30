<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
<RouterLink to="/tenantId/pim/products">Produt list</RouterLink><br/>
<RouterLink to="/tenantId/pim/products/:productUUID">Product View</RouterLink>
</template>