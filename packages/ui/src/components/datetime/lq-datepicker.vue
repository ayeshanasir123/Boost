<script setup lang="ts">

import { ref, computed, watch } from "vue";
import LqInput from '../lq-input';
import LqDropdown from '../lq-dropdown.vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import LqCommonInput from '../lq-common-input.vue';

const props = defineProps<{
    label?: string,
    color?: string,
    required?: boolean,
    locale?: string,
    value?: Date
}>();

const emit = defineEmits<{
    'select-value': [date: Date]
}>();

const $picker = ref<InstanceType<typeof Datepicker>>();
const model = defineModel<Date>();
const isOpen = ref(false);
const formattedDate = ref(formatDate(model.value));
const errorFormat = ref(false);
const $input = ref<HTMLInputElement>();

watch(formattedDate, date => {
    if (!date?.trim()) {
        errorFormat.value = false;
        model.value = undefined;
        return;
    }
    const [_, year, month, day] = date?.match(/^(\d{4})-?(\d{2})-?(\d{2})$/)?.map(m => +m) ?? [];
    if (year && month > 0 && month < 13) {
        if (model.value) {
            const dt = new Date(model.value);
            dt.setFullYear(year);
            dt.setMonth(month - 1);
            dt.setDate(day);
            model.value = dt;
        } else {
            model.value = new Date(year, month - 1, day);
        }
        errorFormat.value = false;
    } else {
        errorFormat.value = true;
    }
});

function formatDate(date?: Date) {
    return date?.toLocaleDateString('sv-SE') ?? ''
}

function onBlur() {
    if (errorFormat.value) {
        formattedDate.value = formatDate(model.value);
        errorFormat.value = false;
    }
}

watch(model, (newDate) => {
    model.value = newDate;
    formattedDate.value = formatDate(model.value);
    isOpen.value = false;
});

function onSelectValue(e: Date) {
    emit('select-value', e);
    const input = $input.value!.nextElementSibling!.querySelector('input')!;
    input.focus();
    input.dispatchEvent(new Event('select-value'));
}

</script>

<template>
    <lq-dropdown v-model:open="isOpen">
        <template #activator="props">
            <lq-input ref="$input" :required :label v-model="formattedDate" :="$attrs" placeholder="YYYY-MM-DD"
                width="124">
                <lq-common-input
                    :class="{ 'error-format': errorFormat }"
                    @blur="onBlur"
                    :="props" />
            </lq-input>
        </template>
        <datepicker ref="$picker" v-model="model" multi-calendars="true" inline auto-apply :enable-time-picker="false"
            @date-update="onSelectValue" />
    </lq-dropdown>
</template>