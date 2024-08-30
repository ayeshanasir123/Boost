<script setup lang="ts">
import { useFilterWidget, LqFilterSelect } from '@boost/ui';
import { WorkOrder } from '../order';

const widget = useFilterWidget<WorkOrder>('customer', ({ endcustomer, endcustomerId }) => {
  return [[endcustomerId ?? 'null', endcustomer ?? 'Not set']];
});

</script>
<template>
  <lq-filter-select :widget label="Client" />
</template>