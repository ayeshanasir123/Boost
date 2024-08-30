<script setup lang="ts">

import { ref, reactive, watch } from 'vue';
import { useItemStore, type Item } from '@boost/repository';
import { LqRow, LqSelect, LqTextInput, LqButtons } from '../../index';

const itemStore = useItemStore();

defineExpose({ save });

const item = ref({} as Partial<Item>);

function save() {
    return itemStore.createItem(item.value);
}

</script>
<template>
    <lq-column>
        <lq-text-input required label="SKU" v-model="item.SKU" />
        <lq-text-input required label="Name" v-model="item.name" />
        <lq-text-input required label="Price" v-model="item.price" />
        <lq-text-input label="GTIN" v-model="item.GTIN" />
    </lq-column>
</template>
