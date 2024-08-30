<script setup lang="ts">
import { useExpose } from '@boost/ui';
const props = defineProps<{
    expose: Record<string, any>
}>();
useExpose({ exposeToParent: props.expose });
</script>
<template></template>