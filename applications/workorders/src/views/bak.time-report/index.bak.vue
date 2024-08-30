<script lang="ts">
import { type TimWorkOrder, createModel  } from '@boost/repository';
import { reactive, ref, onMounted, onUnmounted } from 'vue';
export const workOrder = createModel<TimWorkOrder>();
</script>

<script setup lang="ts">
import TimeReport from "./time-report.vue";
import WeekView from "./week-view.vue";
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
</script>

<template>
    <h2>{{ $t('Time Reports') }}</h2>
    <time-report />
    <week-view style="margin-top:32px" />
</template>

<style>
</style>
