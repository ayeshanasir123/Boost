<script setup lang="ts">
import { GoogleMap } from 'vue3-google-map';
const key = "AIzaSyAqUuEM7OtMmKNnZ-dJtiN0kqZfoicCOT4";

const center = { lat: 59.40989085951935, lng: 24.643809184746956 }

</script>
<template>
    <GoogleMap :api-key="key" :center :zoom="15" />
</template>