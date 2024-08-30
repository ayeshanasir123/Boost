<template>
  <template v-for="(item, index) in items" :key="index">
    <template v-if="!item.modelKey && !item.htmlContent">
      <component
        :is="resolveComponent(item.component)"
        v-bind="item.props"
        :ref="item.refName"
        @dragover.prevent="allowDrop"
        @drop="handleDrop($event, item)"
        :class="showComponentInfo ? `lq-border-dashed-${item.component}` : ''"
      >
        <div
          class="component-info"
          v-if="
            showComponentInfo &&
            (item.component === 'VContainer' ||
              item.component === 'VRow' ||
              item.component === 'VCol' ||
              item.component === 'VCard')
          "
        >
          {{ item.name }}
        </div>

        <template v-if="item.component === 'DynamicTabs'">
          <DynamicTabs
            :tabs="item.children"
            :entity="entity"
            :showComponentInfo="showComponentInfo"
          />
        </template>

        <template v-else-if="item.component === 'DynamicCard'">
          <DynamicCard
            v-bind="item.props"
            :items="item.children"
            :entity="entity"
            :showComponentInfo="showComponentInfo"
          />
        </template>

        <template v-else-if="item.children && item.children.length">
          <!-- Loop over each child in item.children and render a RenderComponent for each -->
          <RenderComponent
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :items="[childItem]"
            :entity="entity"
            :showComponentInfo="showComponentInfo"
          />
        </template>
      </component>
    </template>
    <template v-else-if="item.component === 'DynamicRadiobuttons'">
      <DynamicRadiobuttons
        :items="item.children"
        :modelKey="item.modelKey"
        :entity="entity"
        :showComponentInfo="showComponentInfo"
      />
    </template>
    <template v-else-if="item.modelKey">
      <component
        :is="resolveComponent(item.component)"
        v-bind="item.props"
        :ref="item.refName"
        @dragover.prevent="allowDrop"
        @drop="handleDrop($event, item)"
        v-model="entity[item.modelKey]"
      >
      </component>
    </template>
    <template v-else-if="item.htmlContent">
      <component :is="resolveComponent(item.component)">
        {{ item.htmlContent }}
      </component>
    </template>
  </template>
</template>

<script setup>
import {
  VContainer,
  VBtn,
  VRow,
  VCol,
  VCard,
  VTabs,
  VTab,
  VWindow,
  VWindowItem,
  VExpansionPanel,
  VExpansionPanels,
  VTextField as VTextfield,
  VTextarea,
  VSelect
} from 'vuetify/components'
import DynamicTabs from './DynamicTabs.vue'
import DynamicCard from './DynamicCard.vue'
import DynamicRadiobuttons from './DynamicRadiobuttons.vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  items: Array,
  entity: Object,
  showComponentInfo: Boolean
})

const entity = props.entity

// Helper to resolve component names to actual Vuetify components
function resolveComponent(componentName) {
  switch (componentName) {
    case 'VContainer':
      return VContainer
    case 'VTabs':
      return VTabs
    case 'VTab':
      return VTab
    case 'VExpansionPanel':
      return VExpansionPanel
    case 'VExpansionPanels':
      return VExpansionPanels
    case 'VWindow':
      return VWindow
    case 'VWindowItem':
      return VWindowItem
    case 'VRow':
      return VRow
    case 'VCol':
      return VCol
    case 'VCard':
      return VCard
    case 'VTextfield':
      return VTextfield
    case 'VBtn':
      return VBtn
    case 'VSelect':
      return VSelect
    case 'VTextarea':
      return VTextarea
    case 'h2':
      return 'h2'
    default:
      return 'span' // Default to a div if no match found
  }
}

const allowDrop = (event) => {
  event.preventDefault()
}

const handleDrop = (event, targetItem) => {
  const toolData = event.dataTransfer.getData('application/tool')
  const tool = JSON.parse(toolData)

  // Define the new component based on the dropped data
  const newComponent = {
    name: tool.name, // You might want to generate a unique name here
    component: tool.component,
    props: {}, // Set any default props here
    children: [],
    modelKey: undefined,
    input: tool.input,
    refName: `${tool.name}-${uuidv4()}` // Generate a unique ref name
  }

  // Add the new component to the target item's children
  if (!targetItem.children) {
    targetItem.children = []
  }
  targetItem.children.push(newComponent)

  // Emit an event to update the parent state if necessary
  // This will depend on your state management strategy

  event.stopPropagation()
}
</script>

<style scoped>
.lq-border-dashed-VContainer {
  position: relative;
  padding-top: 30px;
  outline: 1px dashed;
  min-height: 100px;
}

.lq-border-dashed-VRow {
  position: relative;
  padding-top: 18px;
  outline: 1px dashed;
  min-height: 100px;
}

.lq-border-dashed-VCol {
  position: relative;
  padding-top: 30px;
  outline: 1px dashed;
  min-height: 100px;
}

.render-component {
  border: 1px solid #ddd;
  /* Visual cue for drop zones */
  margin: 5px;
  padding: 10px;
}

.component-info {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 10px;
  z-index: 10;
}

.component-info:nth-child(2) {
  left: calc(0px + 25px);
}

.component-info:nth-child(3) {
  left: calc(0px + 50px);
}

.component-info:nth-child(4) {
  left: calc(0px + 75px);
}

.selected-node {
  border-color: green;
}

/* Using deep selectors to ensure the styles apply inside Vuetify components */
:deep(<inner-selector >) .v-row,
:deep(<inner-selector >) .v-col,
:deep(<inner-selector >) .v-container {
  min-height: 50px;
  /* Ensures elements are at least 50px in height */
  padding: 15px;
  /* Adds padding inside the elements */
  outline: 1px dashed lightgrey;
  /* Sets a light grey dashed border */
  transition: border-color 0.3s;
  /* Smooth transition for border color change */
}

/* Hover effect for drag and drop indication */
:deep(<inner-selector >) .v-row:hover,
:deep(<inner-selector >) .v-col:hover,
:deep(<inner-selector >) .v-container:hover {
  border-color: blue;
  /* Change border color on hover */
}
</style>
