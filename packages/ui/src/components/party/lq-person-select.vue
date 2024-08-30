<script setup lang="ts">
import { LqSelect } from '../../index';
import { usePersonStore } from '@boost/repository';
const persons = usePersonStore().assignableAndSortedPersonList();
</script>
<template>
    <lq-select
        :items="persons.map(item => ({ id: item.personId, title: `${item.firstname} ${item.lastname}`.trim() }))" />
</template>