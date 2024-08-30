<script setup lang="ts">
import { computed, ref, useAttrs, reactive, onMounted, watch, nextTick } from 'vue';
import { LqTableSelect, LqAddressCard, LqModal , type TableSelectConfig} from '@boost/ui';
import LqAddressEdit from './lq-address-edit.vue';
import { useOrganizationStore, type Address } from '@boost/repository';

const $attrs = useAttrs();
const store = useOrganizationStore();
const addresses = reactive<Address[]>([]);
const addOpen = ref(false);

const props = defineProps<{
    organizationId: string | null;
    type: Address['type'];
    showCard?: boolean;
}>();

const loading = ref(false);

const model = defineModel<Address['addressId'] | null | undefined>({ required: true });
const address = ref<Address>();

const newAddress = ref({} as Address);

watch(() => props.organizationId, updateAddresses, { immediate: true });


if (props.showCard) {
    watch([model, addresses], ([id]) => address.value = addresses.find(address => address.addressId === id), { deep: true });
}

const join = (...args: (string | null | undefined)[]) => args.filter(Boolean).join(', ');

const config: TableSelectConfig<Address> = {
    header: ['Name', 'Address', 'City', 'Country'],
    getRow: address => Object.assign([
        address.name,
        join(address.addressLine1, address.addressLine2, address.addressLine3),
        join(address.postcode, address.city),
        join(address.country)
    ], { item: { id: address.addressId, title: address.name } })
};

async function updateAddresses(id: string | null) {

    loading.value = true;
    addresses.length = 0;
    try {
        if (id) {
            const organization = await store.getOrganizationByUUID(id);
            addresses.push(...organization.addresses.filter(address => address.type === props.type));
            if (model.value && !new Set(addresses.map(address => address.addressId)).has(model.value)) {
                model.value = null;
                await nextTick();
            }
            if ('required' in $attrs && !model.value && addresses.length) {
                model.value = (addresses.find(address => address.isDefault) ?? addresses[0]).addressId;
            }
        } else {
            model.value = null;
        }
    } catch (_) {

    }
    loading.value = false;

}

async function saveAddress() {
    const address = await store.createAddress(props.organizationId!, newAddress.value);
    await updateAddresses(props.organizationId);
    model.value = address.addressId;
    addOpen.value = false;
}

</script>
<template>
    <div>
        <lq-table-select :disabled="!organizationId" :="$attrs" :loading :config :items="addresses" v-model="model"
            @add-button-click="newAddress = { type: props.type } as Address, addOpen = true"
            :add-button="!!organizationId && 'Add new address'" />
        <lq-address-card v-if="showCard" :address style="margin-top:16px" />
    </div>
    <lq-modal v-model:open="addOpen" title="Add new address" :save="saveAddress">
        <lq-address-edit :address="newAddress" :type />
    </lq-modal>
</template>