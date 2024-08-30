<script setup lang="ts">
import { lqBryntumTaskBoard } from "@boost/ui";
import { useTaskBoardConfig } from "./task-board-config";

const config = useTaskBoardConfig();

</script>

<template>
  <div>
    <lq-bryntum-task-board :config="config" />
  </div>
</template>

<style scoped lang="css"></style>
