<template>
    <v-card v-bind="$attrs">
        <v-card-text :class="{ 'lq-border-dashed': showComponentInfo }">
            <div class="component-info" v-if="showComponentInfo">Card Window</div>
            <template v-if="items && items.length">
                <!-- Loop over each child in item.children and render a RenderComponent for each -->
                <RenderComponent :items="items" :entity="entity" :showComponentInfo="showComponentInfo" />
            </template>

        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import RenderComponent from './RenderComponent.vue';
import { VCard, VCardTitle, VCardText, VTabs, VTab, VWindow, VWindowItem } from 'vuetify/components';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
    items: Array,
    entity: Object,
    showComponentInfo: Boolean
});

const tabs = ref(props.tabs);
const currentTab = ref(null);

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
    outline: 1px dashed;
}
</style>