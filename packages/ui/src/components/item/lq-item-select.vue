<script setup lang="ts">
import { computed, ref, useAttrs, getCurrentInstance, reactive, onMounted, watch, nextTick } from 'vue';
import { LqAutocomplete, type AutocompleteConfig, LqAddressCard, LqModal } from '../../index';
import LqItemAdd from './lq-item-add.vue';
import { useItemStore, type Item } from '@boost/repository';

const $attrs = useAttrs();
const addOpen = ref(false);

const self = getCurrentInstance();

// const model = defineModel<Item['SKU'] | null | undefined>({ required: true });
// const item = ref<Item>();

const itemStore = useItemStore();
const config: AutocompleteConfig = {
    header: ['SKU', 'Name', 'Price'],
    async search(search: string) {
        const items = await itemStore.search(search);
        return computed(() =>  
            items.map(item => ({ 
                identifier: item.identifier, 
                name: item.name, 
                price: item.priceData.price, 
                unit: item.dimensions.measurementUnitCode , 
                id: item.UUID, 
                vat: item.priceData.vat
            }
        )));
    }
}

const $autocomplete = ref<InstanceType<typeof LqAutocomplete>>();
const $addItem = ref<InstanceType<typeof LqItemAdd>>();

async function saveItem() {
    const item = await $addItem.value!.save();
    self?.emit('select-value', { sku: item.SKU, name: item.name, price: item.price, unit: item.unit });
    addOpen.value = false;
}

</script>
<template>
    <lq-autocomplete ref="$autocomplete" :="$attrs" :config
        @add-button-click="addOpen = true"
        :add-button="'Add new item'" />
    <lq-modal v-model:open="addOpen" title="Add new item" :save="saveItem">
        <lq-item-add ref="$addItem"/>
    </lq-modal>
</template>