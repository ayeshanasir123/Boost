import { defineStore } from 'pinia'
import type { DynamicObject } from '@/types/DynamicObject'

export const useDynamicObjectStore = defineStore('dynamicObjectStore', {
  // State: Initialized with an empty array
  state: () => ({
    objects: [] as DynamicObject[]
  }),

  // Actions: Methods to manipulate the state
  actions: {
    addEntity(object: DynamicObject) {
      const index = this.objects.findIndex((e) => e.id === object.id)
      if (index !== -1) {
        // Update existing object
        this.objects[index] = object
      } else {
        // Add new object if not found
        this.objects.push(object)
      }
    },

    getEntity(id: string): DynamicObject | undefined {
      return this.objects.find((obj) => obj.id === id)
    },

    getEntityField(id: string, fieldName: string): any | undefined {
      const object = this.objects.find((obj) => obj.id === id)
      if (object) {
        return object[fieldName]
      } else {
        return undefined
      }
    },

    updateEntityField(id: string, fieldName: string, value: any) {
      console.log('dynamicStore: updateEntityField', id, fieldName, value)
      const object = this.objects.find((obj) => obj.id === id)
      if (object) {
        object[fieldName] = value
      }
    }
  },

  // Getters: Computed properties for the store
  getters: {
    objectCount: (state) => state.objects.length
  }
})
