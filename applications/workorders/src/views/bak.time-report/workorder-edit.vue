<script setup lang="ts">
import { workOrder } from './index.vue';
</script>
<template>
    <lq-line column style="max-width: 648px">
        <lq-line>
            <lq-datepicker required label="Date" v-model="startDate" />
            <lq-autocomplete required :config="activityConfig"
                label="Aktivitet" />
        </lq-line>
        <lq-line>
            <lq-hour-input required label="Arbetad tid" />
            <lq-hour-input required label="Tid att fakturera" />
        </lq-line>
        <lq-line column>
            <lq-button-switch :items="['Ja', 'Nej']" label="Använde UE" />
            <lq-button-switch :items="{ Ensam: 'Ja', tillsammans: 'Nej' }" label="Ensam" />
            <lq-button-switch :items="{ Ensam: 'Ja', tillsammans: 'Nej' }" label="Handlat material" />
            <lq-button-switch :items="{ Ensam: 'Ja', tillsammans: 'Nej' }"
                label="Material från eget lager" />
        </lq-line>
        <lq-textarea style="width: 100%" v-model="comment" rows="4" label="Anteckning"
            placeholder="Fyll i eventuella anteckningar här" />
    </lq-line>
</template>