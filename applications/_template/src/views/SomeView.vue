<script setup lang="ts">
import SomeComponent from './SomeView/components/SomeComponent.vue';

const fooBar = "Just some value.";

</script>

<template>
  <div>
    <h2>Template</h2>

    <SomeComponent />
    {{ fooBar }}
  </div>
</template>