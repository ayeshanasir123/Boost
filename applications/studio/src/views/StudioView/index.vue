<script setup lang="ts">
import { ref, nextTick } from 'vue'
import {
  VContainer,
  VBtn,
  VRow,
  VCol,
  VCard,
  VCardTitle,
  VCardText,
  VSelect,
  VSwitch,
  VTabs,
  VTab,
  VApp,
  VWindow,
  VWindowItem,
  VTextField
} from 'vuetify/components'
import TreeView from './components/TreeView.vue'
import RenderComponent from './components/RenderComponent.vue'
import StudioToolbar from './components/StudioToolbar.vue'
import StudioComponentConfig from './components/StudioComponentConfig.vue'
import { v4 as uuidv4 } from 'uuid'
// import { Person } from 'boost-shared/model/Person'
import { useDynamicObjectStore } from '@/stores/dynamicObjectStore'

interface ComponentItem {
  name: string
  component: string
  props?: Record<string, any>
  children?: ComponentItem[]
}

const saveEntity = () => {
  console.log('Saving entity:', personEntity.value)

  if (selectedEntity.value === 'Person') {
    entityStore.save('person', personEntity.value)
  } else {
    entityStore.save('organization', personEntity.value)
  }
}

const personEntity = ref<Person>({
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com'
})

const showComponentInfo = ref(true)
const tab = ref('tab1')
const selectedNode = ref<ComponentItem | null>(null)
const layout = ref<ComponentItem[]>([
  {
    name: 'Container',
    refName: `Container-${uuidv4()}`,
    component: 'VContainer',
    children: []
  }
])

const selectedEntity = ref('')
const entities = ['Organization', 'Person']

const selectedViewType = ref('')
const viewTypes = ['View', 'Create', 'Edit']
const dynamicRender = ref(true)

const handleAddTab = (newTab) => {
  console.log('Adding tab:', newTab)
  selectedNode.value.children.push(newTab)
}

const handleAddRadiobutton = (newRadiobutton) => {
  console.log('Adding radiobutton:', newRadiobutton)
  selectedNode.value.children.push(newRadiobutton)
}

const handleAddArrayItem = (newArrayItem) => {
  console.log('Adding array item:', newArrayItem)
  if (selectedNode.value.props['items']) {
    selectedNode.value.props['items'].push(newArrayItem)
  } else {
    selectedNode.value.props['items'] = [newArrayItem]
  }
}

const handleSelectNode = (node) => {
  selectedNode.value = node
  tab.value = 'tab2' // Switch to Config tab
}

// This function now listens for the deleteNode event
const handleDeleteNode = (node) => {
  deleteNode(layout.value, node)
  console.log('Deleting node:', node)
}

const deleteNode = (items, targetNode) => {
  const index = items.findIndex((item) => item === targetNode)
  if (index !== -1) {
    items.splice(index, 1)
  } else {
    items.forEach((item) => {
      if (item.children) {
        deleteNode(item.children, targetNode)
      }
    })
  }
}

const refreshComponents = async () => {
  // Here, we'll remove MyComponent
  dynamicRender.value = false

  // Then, wait for the change to get flushed to the DOM
  await nextTick()

  // Add MyComponent back in
  dynamicRender.value = true

  console.log('Components refreshed')
}
</script>

<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="2">
          <h1>BOOST Studio</h1>
        </v-col>
        <v-col>
          <StudioToolbar />
          Example object: {{ personEntity }}
        </v-col>
      </v-row>
      <v-row>
        <v-col class="px-0 mx-0" style="max-width: 300px">
          <v-row>
            <v-col>
              <v-switch
                v-model="showComponentInfo"
                color="success"
                :label="`Show Layout Info: ${showComponentInfo ? 'Enabled' : 'Disabled'}`"
              ></v-switch>
            </v-col>
            <v-btn @click="refreshComponents">Refresh</v-btn>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="selectedEntity"
                :items="entities"
                label="Select Entity"
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="selectedViewType"
                :items="viewTypes"
                label="Select Type"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <!-- Left Column with fixed width and tabs -->
            <v-col>
              <v-tabs vertical v-model="tab">
                <v-tab value="tab1">Structure</v-tab>
                <v-tab value="tab2">Config</v-tab>
              </v-tabs>

              <v-window v-model="tab">
                <v-window-item value="tab1">
                  <TreeView
                    :items="layout"
                    @selectNode="handleSelectNode"
                    @deleteNode="handleDeleteNode"
                  />
                </v-window-item>
                <v-window-item value="tab2">
                  <StudioComponentConfig
                    :selectedNode="selectedNode"
                    @addTab="handleAddTab"
                    @addArrayItem="handleAddArrayItem"
                    @entityChange="handleEntityChange"
                    @addRadiobutton="handleAddRadiobutton"
                  />
                </v-window-item>
              </v-window>
            </v-col>
          </v-row>
        </v-col>
        <!-- Right Column with flexible width -->
        <v-col class="boost">
          <div class="dynamic-components">
            <RenderComponent
              :items="layout"
              v-if="dynamicRender"
              :entity="personEntity"
              :showComponentInfo="showComponentInfo"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="saveEntity">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style>
.dynamic-components {
  min-height: 500px;
  outline: 1px dashed grey;
}

.boost {
  background-color: rgb(247, 249, 251);
}
</style>
