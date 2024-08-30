// Assuming the interfaces are in a file named `types.ts`
import { defineStore } from 'pinia';
import { type Layout } from '../types/Layout';
import { type ComponentItem } from '../types/ComponentItem';

export const useLayoutStore = defineStore('layoutStore', {
  // State: Use the Layout array in the state
  state: () => ({
    layouts: [] as Layout[],
  }),

  // Actions: Methods to manipulate the state
  actions: {
    addLayout(layout: Layout) {
      const existingIndex = this.layouts.findIndex(l => l.id === layout.id);
      if (existingIndex === -1) {
        this.layouts.push(layout);
      } else {
        // Optionally update or reject based on business logic
        console.warn('Layout with the same ID already exists.');
      }
    },

    getLayoutById(id: string) {
      return this.layouts.find(l => l.id === id);
    },

    updateLayout(id: string, newLayoutData: Partial<Layout>) {
      const layoutIndex = this.layouts.findIndex(l => l.id === id);
      if (layoutIndex !== -1) {
        this.layouts[layoutIndex] = { ...this.layouts[layoutIndex], ...newLayoutData };
      }
    },

    removeLayout(id: string) {
      this.layouts = this.layouts.filter(l => l.id !== id);
    }
  },

  // Getters: Computed properties for the store
  getters: {
    allLayouts: (state) => state.layouts,
  },
});
