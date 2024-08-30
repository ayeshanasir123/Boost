<script setup lang="ts">
import { type Ref } from 'vue';
import LqInput from './lq-input';
import LqCommonInput from './lq-common-input.vue';
defineProps<{
    label?: string,
    required?: boolean,
    ref?: Ref<any>
}>();

const model = defineModel<string | null>();

</script>
<template>
    <lq-input :required :label v-model="model" width="300">
        <lq-common-input :ref />
    </lq-input>
</template>