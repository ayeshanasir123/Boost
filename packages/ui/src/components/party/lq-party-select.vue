<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import { useOrganizationStore, type Organization, type Person } from '@boost/repository';
import { LqAutocomplete, LqModal, type AutocompleteConfig } from '../../index';
import { Customer } from './lq-party';

defineOptions({
    inheritAttrs: false
});

type Role = 'customer';// | 'supplier';
const model = defineModel<Partial<Customer>>();

const addOpen = ref(false);
const newParty = ref({} as Organization | Person);

const props = defineProps<{
    role: Role
}>();

const organizationStore = useOrganizationStore();

const roles: Record<Role, Omit<AutocompleteConfig, 'value'>> = {
    customer: {
        header: ['Identifier', 'Name'],
        async search(search: string) {
            const items = await organizationStore.search(search) as Customer[];
            items.forEach(item => Object.setPrototypeOf(item, Customer.prototype));
            return computed(() => items.map(customer => Object.assign([
                customer.identifier, customer.customerName
            ], { customer })));
        }
    }
}

const config: AutocompleteConfig = {
    header: roles[props.role].header,
    value: {
        get: () => {
            if (!model.value) return '';
            const { name, firstname, lastname } = model.value;
            const customer = { name, firstname, lastname };
            customer && Object.setPrototypeOf(customer, Customer.prototype);
            return (customer as Customer)?.customerName;
        },
        set: row => model.value = row.customer
    },
    search: roles[props.role].search
};

</script>

<template>
    <lq-autocomplete :config :="$attrs" @add-button-click="newParty = {} as Organization | Person, addOpen = true"
        :add-button="'Add new customer'" />
    <lq-modal @saved="(party: Customer) => model = party"
        v-model:open="addOpen"
        title="Add new customer"
        :content="() => import('./lq-party-add.vue')" />
</template>