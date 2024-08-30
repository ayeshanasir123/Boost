// Importing Vue composition API and Pinia
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { boostApi } from '@boost/shared';
import { useI18n } from 'vue-i18n';

interface SearchArea {
  id: string;
  title: string;
}

export const useSearchStore = defineStore('search', () => {
  const { t } = useI18n();

  const defaultSearchArea = ref<SearchArea>({ id: 'ALL', title: t('Everywhere') });

  const searchAreas = ref<SearchArea[]>([defaultSearchArea.value]);
  const selectedSearchArea = ref<string>(defaultSearchArea.value.id);
  const searchQuery = ref<string>('');
  const searchResults = ref<any[]>([]);

  const setSelectedSearchArea = (id: string) => {
    selectedSearchArea.value = id;
  };

  const addSearchArea = (area: SearchArea) => {
    searchAreas.value.push(area);
    searchAreas.value.sort((a, b) => a.title.localeCompare(b.title));
  };

  const performSearch = async () => {
    try {
      
      const response :any = await boostApi.search({
        query: searchQuery.value,
        area: selectedSearchArea.value
      });
      searchResults.value = response.data;
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  return {
    searchAreas,
    selectedSearchArea,
    searchQuery,
    searchResults,
    setSelectedSearchArea,
    addSearchArea,
    performSearch
  };
});
