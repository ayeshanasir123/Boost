<script setup lang="ts">
import AddTimeReport from "./add-time-report.vue";
import WeekView from "./week-view.vue";
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
</script>

<template>
    <lq-page
        :title="$t('Tidrapportering')"
        :add-title="$t('New order')"
        :add="['sales-order', { salesOrderUUID: 'new' }]">
        <add-time-report />
        <week-view />
    </lq-page>
</template>
