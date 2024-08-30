<script setup>
import { defineProps, ref } from 'vue'
import {
  VContainer,
  VRow,
  VCol,
  VCard,
  VCardTitle,
  VCardText,
  VTextField,
  VSelect,
  VBtn,
  VSpacer
} from 'vuetify/components'

const props = defineProps({
  selectedNode: Object
})

const emit = defineEmits(['addTab', 'addRadiobutton', 'addArrayItem'])

// Static configuration, doesn't need to be inside ref if it doesn't change
const componentConfigurations = {
  DynamicCard: {
    canHaveChildren: true,
    props: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'class', label: 'Class', type: 'text' },
      {
        name: 'elevation',
        label: 'Elevation',
        type: 'select',
        options: [
          'undefined',
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24'
        ]
      },
      { name: 'raised', label: 'Raised', type: 'select', options: ['undefined', 'true', 'false'] },
      {
        name: 'variant',
        label: 'Variant',
        type: 'select',
        options: ['undefined', 'outlined', 'tonal']
      },
      { name: 'tile', label: 'Tile', type: 'select', options: ['undefined', 'true', 'false'] },
      { name: 'width', label: 'Width', type: 'text' }
    ]
  },
  VTextfield: {
    canHaveChildren: false,
    updateEvent: 'input',
    hasModelField: true,
    props: [
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'clearable', label: 'Clearable', type: 'checkbox' },
      { name: 'hint', label: 'Hint', type: 'text' },
      { name: 'class', label: 'Class', type: 'text' },
      { name: 'variant', label: 'Variant', type: 'select', options: ['outlined', 'underlined'] }
    ]
  },
  VBtn: {
    canHaveChildren: false,
    hasModelField: true,
    props: [
      {
        name: 'color',
        label: 'Color',
        type: 'select',
        options: ['primary', 'success', 'warning', 'error', 'info']
      },
      {
        name: 'variant',
        label: 'Variant',
        type: 'select',
        options: ['flat', 'elevated', 'tonal', 'outlined', 'plain', 'elevated']
      }
    ],
    hasHTMLContent: true,
    htmlContent: ''
  },
  VTextarea: {
    canHaveChildren: false,
    hasModelField: true,
    props: [
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'clearable', label: 'Clearable', type: 'checkbox' },
      { name: 'hint', label: 'Hint', type: 'text' },
      { name: 'class', label: 'Class', type: 'text' },
      {
        name: 'variant',
        label: 'Variant',
        type: 'select',
        options: ['', 'solo', 'solo-filled', 'solo-inverted', 'outlined', 'underlined']
      }
    ]
  },
  VSelect: {
    canHaveChildren: false,
    hasModelField: true,
    props: [
      { name: 'label', label: 'Label', type: 'text' },
      { name: 'items', label: 'Items', type: 'array' },
      { name: 'clearable', label: 'Clearable', type: 'checkbox' },
      { name: 'hint', label: 'Hint', type: 'text' },
      { name: 'class', label: 'Class', type: 'text' },
      {
        name: 'variant',
        label: 'Variant',
        type: 'select',
        options: ['', 'solo', 'solo-filled', 'solo-inverted', 'outlined', 'underlined']
      }
    ]
  },
  DynamicRadiobuttons: {
    canHaveChildren: false,
    hasModelField: true,
    props: [
      { name: 'class', label: 'Class', type: 'text' },
      {
        name: 'variant',
        label: 'Variant',
        type: 'select',
        options: ['', 'solo', 'solo-filled', 'solo-inverted', 'outlined', 'underlined']
      }
    ]
  },
  VRow: {
    canHaveChildren: false,
    hasModelField: false,
    props: [{ name: 'class', label: 'Class', type: 'text' }]
  },
  VCol: {
    canHaveChildren: false,
    hasModelField: false,
    props: [
      {
        name: 'cols',
        label: 'Columns',
        type: 'select',
        options: [
          'undefined',
          'auto',
          '12',
          '11',
          '10',
          '9',
          '8',
          '7',
          '6',
          '5',
          '4',
          '3',
          '2',
          '1'
        ]
      },
      { name: 'class', label: 'Class', type: 'text' }
    ]
  },
  VContainer: {
    canHaveChildren: false,
    hasModelField: false,
    props: [{ name: 'class', label: 'Class', type: 'text' }]
  },
  h2: {
    canHaveChildren: false,
    hasModelField: false,
    hasHTMLContent: true,
    htmlContent: ''
  }
}

const newTitle = ref('')
const newValue = ref('')

const addNewTab = () => {
  emit('addTab', {
    title: newTitle.value.trim(),
    name: 'Tab',
    children: []
  })
  newTitle.value = ''
}

const addNewRadiobutton = () => {
  emit('addRadiobutton', {
    title: newTitle.value.trim(),
    value: newValue.value.trim(),
    name: 'Radiobutton',
    children: []
  })
  newTitle.value = ''
  newValue.value = ''
}

const addArrayItem = () => {
  emit('addArrayItem', {
    title: newTitle.value.trim(),
    value: newValue.value.trim()
  })
  newTitle.value = ''
  newValue.value = ''
}
</script>

// Template to use the configurations
<template>
  <v-card v-if="selectedNode && selectedNode.name == 'Tab'">
    <v-card-title>{{ selectedNode.name }}</v-card-title>
    <v-text-field label="Tab Title" v-model="selectedNode.title"></v-text-field>
  </v-card>
  <v-card v-if="selectedNode && selectedNode.props">
    <v-card-title>{{ selectedNode.name }}</v-card-title>
    <v-card-text>
      <template v-if="selectedNode.component == 'DynamicTabs'">
        <v-text-field label="Tab Title" v-model="newTitle"></v-text-field>
        <v-btn @click="addNewTab()">Add Tab</v-btn>
      </template>
      <template v-if="componentConfigurations[selectedNode.component]?.hasModelField">
        <v-text-field label="Model field" v-model="selectedNode.modelKey"></v-text-field>
        <template v-if="selectedNode.component == 'DynamicRadiobuttons' && selectedNode.modelKey">
          <v-text-field label="Title" v-model="newTitle"></v-text-field>
          <v-text-field label="Value" v-model="newValue"></v-text-field>
          <v-btn @click="addNewRadiobutton()">Add Radiobutton</v-btn>
        </template>
      </template>
      <template v-if="componentConfigurations[selectedNode.component]?.hasHTMLContent">
        <v-text-field label="HTML Content" v-model="selectedNode.htmlContent"></v-text-field>
      </template>
      <template
        v-for="propConfig in componentConfigurations[selectedNode.component]?.props"
        :key="propConfig.key"
      >
        <template v-if="propConfig.type === 'text'">
          <v-text-field
            :label="propConfig.label"
            v-model="selectedNode.props[propConfig.name]"
          ></v-text-field>
        </template>
        <template v-else-if="propConfig.type === 'array'">
          <v-text-field label="Title" v-model="newTitle"></v-text-field>
          <v-text-field label="Value" v-model="newValue"></v-text-field>
          <v-btn @click="addArrayItem()">Add item</v-btn>
        </template>
        <template v-else-if="propConfig.type === 'select'">
          <v-select
            :label="propConfig.label"
            :items="propConfig.options"
            v-model="selectedNode.props[propConfig.name]"
          ></v-select>
        </template>
      </template>
    </v-card-text>
  </v-card>
</template>
