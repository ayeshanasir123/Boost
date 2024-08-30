<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { BryntumGrid } from "@bryntum/grid-vue-3-thin";
import type { GridConfig, ColumnConfig } from "@bryntum/grid-thin";
const grid = ref();

const data = ref();

const props = defineProps<{
  gridConfig: GridConfig;
  dynamicData: [];
}>();

data.value = props.dynamicData;
const gridConfig = reactive(props.gridConfig);
</script>

<template>
  <div class="no-scroll-grid">
    <bryntum-grid ref="grid" v-bind="gridConfig" :data="data" />
  </div>
</template>
<style></style>