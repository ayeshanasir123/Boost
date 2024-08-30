<template>
  <v-radio-group v-model="entity[modelKey]">
    <v-radio v-for="(item, index) in items" :key="index" :label="item.title" :value="item.value" />
  </v-radio-group>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { VRadio, VRadioGroup } from 'vuetify/components'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  modelKey: String,
  items: Array,
  entity: Object,
  showComponentInfo: Boolean
})

const entity = props.entity
const modelKey = props.modelKey
</script>

<style scoped>
.render-component {
  border: 1px solid #ddd;
  /* Visual cue for drop zones */
  margin: 5px;
  padding: 10px;
}

.component-info {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 10px;
  z-index: 10;
}

.lq-border-dashed {
  outline: 1px dashed;
}
</style>
