<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSearchStore } from '../../stores/searchStore';
import { defineShortcuts } from '@boost/shared';

const searchStore = useSearchStore();

const dialog = ref(false);
const searchQuery = ref('');

const openDialog = () => {
  console.log('Opening dialog');
  dialog.value = true;
  document.addEventListener('keydown', handleKeydown);
};


const closeDialog = () => {
  console.log('Closing dialog');
  dialog.value = false;
  document.removeEventListener('keydown', handleKeydown);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeDialog();
  }
};

const performSearch = () => {
  console.log('Performing search for:', searchQuery.value);
  closeDialog();
};

const selectItem = (item: { title: string }) => {
  searchStore.searchQuery = item.title;
  performSearch();
};

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

defineShortcuts({
  // 'ctrl_k': openDialog
  ctrl_k: () => dialog.value = !dialog.value
});
</script>

<template>
  <button class="search-button px-3 btn-font" @click="openDialog">
    <span class="material-symbols-outlined">search</span>
    <div class="px-1">{{ $t('Search') }}</div>
    <span class="py-0 px-2 ms-2 border rounded text-disabled text-caption">Ctrl+K</span>
  </button>

  <v-dialog v-model="dialog" :persistent="false" max-width="600px" content-class="top-dialog">
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <v-text-field
            variant="plain"
            v-model="searchStore.searchQuery"
            placeholder="Looking for..."
            prepend-inner-icon="mdi-magnify"
            append-outer-icon="mdi-close"
            @click:append-outer="searchStore.searchQuery = ''"      
            autofocus      
        ></v-text-field>
        <v-btn variant="plain" @click="dialog = false" density="comfortable" class="border rounded text-disabled text-caption">ESC</v-btn>
      </v-card-title>
      <v-card-text>
        <v-select
            variant="outlined"
            v-model="searchStore.selectedSearchArea"
            :items="searchStore.searchAreas.map(area => ({ title: area.title, value: area.id }))"
            :label="$t('Where to search')"
        ></v-select>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-for="(result, index) in searchStore.searchResults"
            :key="index"
            @click="selectItem(result)"
          >
              <v-list-item-title>{{ result.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.top-dialog {
    top:70px !important;
}

.search-button {
  height: 28px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border: none;
  background: none;
  cursor: pointer;
  justify-content: flex-start; /* Align content to the left */
}

.search-button .material-symbols-outlined {
  font-size: 24px; /* Adjust the size as necessary */
  line-height: 28px; /* Ensure the icon is vertically centered */
}

.search-button .button-text {
  padding-top: 2px;
  line-height: 28px; /* Ensure the icon is vertically centered */
}

.search-button div {
  padding-left: 15px; /* Ensure there's padding between the icon and the text */
  line-height: 28px; /* Vertically center the text */
}
</style>
