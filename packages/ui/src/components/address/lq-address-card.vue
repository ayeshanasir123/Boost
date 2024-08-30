<script setup lang="ts">
import { computed } from 'vue';
import type { Address } from '@boost/repository';

const props = defineProps<{
    address?: Address
}>();

const join = (...args: (string | null | undefined)[]) => args.filter(Boolean).join(', ');

const rows = computed(() => {
    const { address } = props;
    if (!address) return null;
    return [
        address.name,
        join(address.addressLine1, address.addressLine2, address.addressLine3),
        join(address.postcode, address.city),
        join(address.country)
    ];
});

</script>
<template>
    <v-card elevation="0" v-if="address" style="padding:16px" class="address-card">
        <div v-for="row in rows">
            {{ row }}
        </div>
    </v-card>
</template>

<style scoped> 
.address-card {
    border: 1px solid #e0e0e0;
    font-size:14px;
}
</style>