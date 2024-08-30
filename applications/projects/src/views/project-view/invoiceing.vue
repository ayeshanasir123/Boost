<script setup lang="ts">
import { project } from './index.vue'
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <lq-line>
      <lq-party-select
            :label="t('Accounting Customer')"
            role="customer"
            v-model="project!.accountingCustomer" />     
      <lq-person-select
            v-model="project.theirReferenceUUID"
            label="Their reference" />

    </lq-line>
    <lq-line>
              <lq-text-input  
          v-model="project.invoiceReference"
          :label="t('Invoice Reference')"
           />
    <lq-person-select
          v-model="project.ourReferenceUUID"
          :label="t('Our Reference')" />

    </lq-line>
    <lq-line>
      <lq-textarea 
      :label="t('Invoice Instructions')" 
        v-model="project.invoiceInstructions">
      </lq-textarea>
    </lq-line>    
</template>