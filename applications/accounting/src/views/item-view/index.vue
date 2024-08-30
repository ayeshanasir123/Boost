<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useOrganizationStore } from '@boost/repository';
import { useItemStore } from '@boost/repository';
import { type Organization } from '@boost/repository'
import { type Item } from '@boost/repository'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
    itemUUID: Item['defaultProjectUUID']
  
  
}>();

const organizationStore = useOrganizationStore();
const itemStore = useItemStore();

const route = useRoute();
//const router = useRouter();

const item = ref<Item | undefined>();
const loadingError = ref('');
const { t } = useI18n();
const pageTitle = ref('');



const saveItem = async () => {
    item.value = await itemStore.save(item.value);
    return ['item-view', { itemUUID: item.value.UUID }];
};

// On mounted, load data for the first time
onMounted(() => {
  if (props.itemUUID === 'new') {
    pageTitle.value = t('New Item');
    item.value = {name: ''}
  } else {
    pageTitle.value = t('edit Item');
    item.value = {name: ''}
  //   try {
  //     loadData(props.itemUUID as string);
  //   } catch (e) {
  //       loadingError.value = (e as Error).message;
  //   }
  //   pageTitle.value = t('Item');
  }
});

// Watch for changes in the route params and reload data
watch(() => item.value, (newItem) => {
  if (newItem) {
    if (route.params.itemUUID === 'new') {
      pageTitle.value = t('New Item');
    } else {
      pageTitle.value = t('Edit Item') + ' ' + newItem.name;
    }
  }
});
</script>

<template>
    <lq-error :error="loadingError" />
    <lq-page
        v-if="item"
        :title="pageTitle"
        cancel="ChartOfAccounts"
        :save="saveItem">
      
        {{ item }}
      
    </lq-page>
</template>