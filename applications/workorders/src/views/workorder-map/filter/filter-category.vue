<script setup lang="ts">
import { useFilterWidget, LqFilterSelect } from '@boost/ui';
import {type TimWorkorderCategory} from '@boost/repository';
import { WorkOrder } from '../order';

const workOrderCategories: TimWorkorderCategory[] = [
  {
    categoryId: "86620dc9-3911-11ef-b6fc-00505696181e",
    name: "Installation"
  },
  {
    categoryId: "866217c4-3911-11ef-b6fc-00505696181e",
    name: "Service"
  }
];

const widget = useFilterWidget<WorkOrder>('category', ({ categoryId }) => {
  return [[categoryId ?? 'null', workOrderCategories.find(category => category.categoryId === categoryId)?.name ?? 'Not set']];
});

</script>
<template>
  <lq-filter-select :widget label="Category" />
</template>