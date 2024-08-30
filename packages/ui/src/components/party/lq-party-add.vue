<script setup lang="ts">

import { ref, reactive, watch } from 'vue';
import { useOrganizationStore, usePersonStore, type Organization, type Person } from '@boost/repository';
import { LqTextInput, useExpose } from '@boost/ui';
import { Customer } from './lq-party';
import LqParent from './lq-parent';

const organizationStore = useOrganizationStore();
const personStore = usePersonStore();

const customerType = ref('organization');
const name = ref('');
const lastname = ref('');
const number = ref('');
const group = ref('');
const customers = reactive<Customer[]>([]);

useExpose({ save });

watch([name, customerType], async ([val]) => {
    customers.length = 0;
    let found: Customer[];
    if (customerType.value === 'organization') {
        found = (await organizationStore.search(val)).slice(0, 5) as Customer[];
    } else {
        found = (personStore.personList as any as Customer[])
            .filter(person => (person.firstname + ' ' + person.lastname).toLowerCase().includes(val.toLowerCase()))
            .slice(0, 5);
    }
    let count = found.length;
    while (count <= 5) {
        found[count] = {} as Customer;
        count++;
    }
    found.forEach(customer => Object.setPrototypeOf(customer, Customer.prototype));
    customers.push(...found);
}, { immediate: true });

function save() {

    const payload: Partial<Organization | Person> = {
        roles: 1,
        identifier: number.value,
        customerGroupUUID: group.value
    };

    if (customerType.value === 'person') {
        Object.assign(payload, {
            firstname: name.value,
            lastname: lastname.value,
        });

        return personStore.create(payload as Person);

    } else {
        Object.assign(payload, {
            name: name.value
        });

        return organizationStore.createOrganization(payload as Organization);
    }
}

</script>
<template>
    <lq-parent v-model:tab="customerType"
        :tabs="{ organization: 'Organization', person: 'Person' }" />
    <lq-line>
        <lq-text-input autofocus required :label="customerType === 'organization' ? 'Company name' : 'First name'"
            v-model="name" />
        <lq-text-input required v-if="customerType === 'person'" label="Last name" v-model="lastname" />

    </lq-line>
    <lq-line>
        <lq-text-input v-model="number"
            label="Own customer number" placeholder="Will be generated automatically if not entered" />
        <lq-text-input label="Customer group" v-model="group" />
    </lq-line>
    <div style="margin-top:16px">
        <label>Existing customers</label>
        <table class="found-customers">
            <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Invoiced by</th>
            </tr>
            <tr v-for="customer in customers">
                <td style="width: 100px;white-space: nowrap;"><span>{{ customer.identifier }} </span></td>
                <td>{{ customer.customerName }}</td>
                <td>{{ customer.accountingCustomerPartyName }}</td>
            </tr>
        </table>
    </div>
</template>

<style scoped lang="scss">
.found-customers {
    td > span {
        display: inline-block;
        min-height: 1em;
    }
}
</style>