<script setup lang="ts">
import { useFilterWidget, LqFilterSelect } from '@boost/ui';
import { WorkOrder } from '../order';

const widget = useFilterWidget<WorkOrder>('status', ({ status }) => {
  return [[status ?? 'null', status ?? 'Not set']];
});

</script>
<template>
  <lq-filter-select :widget label="Status" />
</template>