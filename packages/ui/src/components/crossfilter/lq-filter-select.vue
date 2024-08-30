<script setup lang="ts" generic="T">

import { computed } from 'vue';
import LqSelect from '../select/lq-select.vue';
import { useSelectWidget } from '../select/select-widget';
import { useFilterWidget } from './filter-widget';

const props = defineProps<{
  widget: ReturnType<typeof useFilterWidget<T>>
}>();

const select = useSelectWidget(props.widget, { noSort: true });

const value = computed({
  get() {
    return props.widget.filter[0] || null;
  },
  set(val) {
    props.widget.filter.length = 0;
    props.widget.filter.push(...val ? [val] : []);
  }
});

</script>
<template>
  <lq-select :items="select.sortedItems" v-model="value" />
</template>