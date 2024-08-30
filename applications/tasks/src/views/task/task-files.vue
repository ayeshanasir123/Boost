<script setup lang="ts">
import { task } from './index.vue';
</script>
<template>
    <lq-files :files="task.attachments" :entity-id="task.UUID" entity-type="task" />
</template>