<script setup lang="ts">
import { WorkOrder } from '../order';
import { useFilterWidget, LqFilterSelect } from '@boost/ui';

const widget = useFilterWidget<WorkOrder>('asignee', ({ assignedOrganization }) => {
  return [[assignedOrganization?.organizationId ?? 'null', assignedOrganization?.name ?? 'Not set']];
});

</script>
<template>
  <lq-filter-select :widget label="Assigned to" />
</template>