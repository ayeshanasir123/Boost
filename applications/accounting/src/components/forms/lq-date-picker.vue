<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from "vue";

const { label, color, locale } = defineProps({
  label: String,
  color: String,
  locale: {
    type: String,
    default: "en",
  },
});

const modelValue = defineModel<Date | string>();

const isMenuOpen = ref(false);
const selectedDate = ref<Date | string>();

const formattedDate = computed(() => {
  return selectedDate.value
    ? selectedDate.value.toLocaleDateString(locale)
    : "";
});

watch(modelValue, (newDate) => {
  selectedDate.value = newDate;
});

watch(selectedDate, (newDate) => {
  modelValue.value = newDate;
  isMenuOpen.value = false;
});
</script>

<style scoped>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}
.v-picker-title {
  padding: 0 !important;
}
</style>

<template>
  <v-menu v-model="isMenuOpen" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-text-field
        :label="label"
        :model-value="formattedDate"
        readonly
        v-bind="props"
        variant="outlined"
        hide-details
      >
      <v-icon>
        <span class="material-symbols-outlined">
          calendar_month
        </span>
      </v-icon>
      </v-text-field>
    </template>
    <v-date-picker v-model="selectedDate" hide-actions title="" :color="color">
      <template v-slot:header></template>
    </v-date-picker>
  </v-menu>
</template>
