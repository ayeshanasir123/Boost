<template>
  <v-row>
    <v-col cols="2">
      <v-select
        v-model="selectedToolbar"
        :items="toolbarOptions"
        label="Choose Toolbar"
        item-title="name"
        item-value="value"
        dense
        outlined
        @update:modelValue="updateTools"
      ></v-select>
    </v-col>
    <v-col cols="10">
      <div class="toolbar">
        <!-- Tools are displayed based on selected toolbar -->
        <v-card
          v-for="(tool, index) in tools"
          :key="index"
          class="tool"
          draggable="true"
          @dragstart="handleDragStart(tool, $event)"
        >
          {{ tool.name }}
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'
import DynamicTabs from './DynamicTabs.vue'
import {
  VBtn,
  VCard,
  VCol,
  VRow,
  VSelect,
  VContainer,
  VTabs,
  VTab,
  VExpansionPanels,
  VExpansionPanel,
  VWindow,
  VWindowItem,
  VRadio,
  VCheckbox,
  VSlider,
  VFileInput,
  VTextField as VTextfield,
  VTextarea
} from 'vuetify/components'

const toolbarOptions = ref([
  { name: 'Structure', value: 'structure' },
  { name: 'Form', value: 'form' },
  { name: 'Informative', value: 'informative' }
])

const selectedToolbar = ref('structure')

const allTools = {
  structure: [
    { name: 'Container', component: 'VContainer' },
    { name: 'Tabs', component: 'DynamicTabs' },
    { name: 'Expansion Panels', component: 'VExpansionPanels' },
    { name: 'Expansion Panel', component: 'VExpansionPanel' },
    { name: 'Window', component: 'VWindow' },
    { name: 'Window Item', component: 'VWindowItem' },
    { name: 'Row', component: 'VRow' },
    { name: 'Column', component: 'VCol' },
    { name: 'Card', component: 'DynamicCard' }
  ],
  form: [
    { name: 'Textfield', component: 'VTextfield', updateEvent: 'input' },
    { name: 'Textarea', component: 'VTextarea', updateEvent: 'input' },
    { name: 'Select', component: 'VSelect', updateEvent: 'change' },
    { name: 'Radiobuttons', component: 'DynamicRadiobuttons', updateEvent: 'change' },
    { name: 'Checkbox', component: 'VCheckbox', updateEvent: 'change' },
    { name: 'Slider', component: 'VSlider', updateEvent: 'change' },
    { name: 'Fileinput', component: 'VFileInput', updateEvent: 'change' },
    { name: 'Button', component: 'VBtn', updateEvent: 'change' }
  ],
  informative: [{ name: 'h2', component: 'h2', updateEvent: 'input' }]
}

const tools = ref([...allTools.structure]) // Default to structure tools

function updateTools() {
  console.log('Selected toolbar:', selectedToolbar.value)
  tools.value = allTools[selectedToolbar.value]
}

// Method to handle the drag start event
function handleDragStart(tool, event) {
  // Use the tool object to pass the component's information
  event.dataTransfer.setData('application/tool', JSON.stringify(tool))
}
</script>

<style scoped>
.toolbar {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  background-color: #f0f0f0;
  padding: 10px 0;
}

.tool {
  user-select: none;
  cursor: grab;
  margin: 0 10px;
  padding: 10px;
}

.tool:active {
  cursor: grabbing;
}
</style>
