<template>
    <v-tabs v-model="currentTab">
        <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
            {{ tab.title }}
        </v-tab>
    </v-tabs>

    <v-window v-model="currentTab">
        <v-window-item :class="{ 'lq-border-dashed': showComponentInfo }"
            style="min-height: 100px; padding-bottom: 20px;" v-for="tab in tabs" :key="tab.value" :value="tab.value"
            @dragover.prevent="allowDrop" @drop="handleDrop($event, tab)">
            <div class="component-info" v-if="showComponentInfo">Tab Window</div>

            <RenderComponent :items="tab.children" :showComponentInfo="showComponentInfo" :entity="entity" />
        </v-window-item>
    </v-window>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import RenderComponent from './RenderComponent.vue';
import { VCard, VTabs, VTab, VCardText, VWindow, VWindowItem } from 'vuetify/components';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
    tabs: Array,
    entity: Object,
    showComponentInfo: Boolean
});

const tabs = ref(props.tabs);
const currentTab = ref(null);

function addTab(title) {
    const newValue = `tab-${tabs.value.length + 1}`;
    tabs.value.push({ title, name: `Tab ${title}`, value: newValue, children: [] });
    currentTab.value = newValue;
}

function removeTab(tabValue) {
    const index = tabs.value.findIndex(tab => tab.value === tabValue);
    if (index !== -1) {
        tabs.value.splice(index, 1);
        currentTab.value = tabs.value.length ? tabs.value[0].value : null;
    }
}

const allowDrop = (event) => {
    event.preventDefault();
};

const handleDrop = (event, targetItem) => {
    const toolData = event.dataTransfer.getData('application/tool');
    const tool = JSON.parse(toolData);

    // Define the new component based on the dropped data
    const newComponent = {
        name: tool.name, // You might want to generate a unique name here
        component: tool.component,
        props: {}, // Set any default props here
        children: [],
        refName: `${tool.name}-${uuidv4()}` // Generate a unique ref name
    };

    // Add the new component to the target item's children
    if (!targetItem.children) {
        targetItem.children = [];
    }
    targetItem.children.push(newComponent);

    // Emit an event to update the parent state if necessary
    // This will depend on your state management strategy

    event.stopPropagation();
};
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
    border: 1px dashed;
}
</style>