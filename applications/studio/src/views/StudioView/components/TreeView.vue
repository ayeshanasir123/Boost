<template>
    <ul class="treeview">
        <li v-for="(node, index) in items" :key="index">
            <div @click="selectNode(node)" class="node">
                {{ node.name }}
                <v-icon class="delete-icon" @click.stop="confirmDelete(node, index)">mdi-delete</v-icon>
            </div>
            <!-- Add an event listener for deleteNode from child TreeViews -->
            <TreeView v-if="node.children && node.children.length" :items="node.children" @selectNode="selectNode"
                @deleteNode="forwardDelete" />
        </li>
    </ul>
</template>

<script setup>
import { VIcon } from 'vuetify/components';

const props = defineProps({
    items: Array,
    selectedNode: Object
});

const emits = defineEmits(['selectNode', 'deleteNode']);

const selectNode = (node) => {
    emits('selectNode', node);
};

const confirmDelete = (node, index) => {
    if (confirm(`Are you sure you want to delete ${node.name}?`)) {
        emits('deleteNode', node, index);
    }
};

const isSelected = (node) => {
    return selectedNode.value && node.name === selectedNode.value.name; // Check if the node is selected
};

// Forward the delete event from child components
const forwardDelete = (node, index) => {
    emits('deleteNode', node, index);
};
</script>

<style scoped>
.treeview {
    list-style-type: none;
    padding-left: 0; /* Remove padding from all <ul> elements */
}

.treeview > li:first-child { /* Targets only the first <li> of any .treeview */
    padding-left: 0;
}

.treeview ul { /* Ensures that nested <ul> elements have padding */
    padding-left: 10px;
}

.node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    cursor: pointer;
}

.node:hover {
    background-color: #e9ecef;
}

.delete-icon {
    cursor: pointer;
}
</style>
