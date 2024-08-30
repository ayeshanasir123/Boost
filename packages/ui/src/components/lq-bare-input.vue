<script setup lang="ts">

import LqInput from './lq-input';

const props = defineProps<{
  value?: string | number | null
  label?: string;
  required?: boolean;
}>();

</script>
<template>
  <lq-input :="props">
    <input>
  </lq-input>
</template>