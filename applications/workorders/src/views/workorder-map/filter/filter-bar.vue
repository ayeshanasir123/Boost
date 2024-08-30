<script setup lang="ts">

import { onMounted, reactive } from 'vue';
import { useFilter } from '@boost/ui';
import FilterCustomer from './filter-customer.vue';
import FilterCategory from './filter-category.vue';
import FilterStatus from './filter-status.vue';
import FilterAsignee from './filter-asignee.vue';

const filter = useFilter();

const session = {};//self.getStateVar('filter', {});

const filters = {}
const filterValue = reactive(session);

onMounted(() => {
  Object.values(filters).forEach(f => filter.trigger('filterRequest', f.name, session[f.name] || 'default', 'silent'));
  filter.trigger('filter', null);
  filter.trigger('filterInit', filterValue);
  filter.trigger('reload');
});

</script>
<template>
  <div class="filter-bar">
    <v-row>
      <v-col cols="3">
        <filter-customer />
      </v-col>
      <v-col cols="3">
        <filter-category />
      </v-col>
      <v-col cols="3">
        <filter-status />
      </v-col>
      <v-col cols="3">
        <filter-asignee />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
.filter-bar {
  .v-row {
    position: absolute;
    height: 32px;
    z-index: 1;
    top: 10px;
    left: 192px;
    right: 64px;
    background: transparent;
  }

  :deep(.v-field) {
    background-color: rgba(255, 255, 255, .8);

    &.v-field--focused {
      background-color: white;
    }
  }
}
</style>
