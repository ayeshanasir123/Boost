<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core';
import { ref, watch } from 'vue';

const props = defineProps<{
  id: string;
  label: string;
  sourcePosition: Position;
  targetPosition: Position;
  selected: boolean;
  nodes: any[];
}>();

const emit = defineEmits(['add-node']);

const isSelected = ref(props.selected);

watch(() => props.selected, (newValue) => {
  isSelected.value = newValue;
});



function handleAddNode(direction: string) {
  emit('add-node', { direction, id: props.id });
  isSelected.value = false;
}
</script>

<template>
  <div :class="['custom-node', { selected: isSelected }]">
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="80" viewBox="0 0 150 80">
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
        {{ label }}
      </text>
    </svg>
    
    <Handle type="source" :position="Position.Top" :id="`${props.id}-top`" style="opacity: 0" />
    <Handle type="source" :position="Position.Right" :id="`${props.id}-right`" style="opacity: 0" />
    <Handle type="source" :position="Position.Bottom" :id="`${props.id}-bottom`" style="opacity: 0" />
    <Handle type="source" :position="Position.Left" :id="`${props.id}-left`" style="opacity: 0" />

    <div v-if="isSelected" class="add-node-button top" @click.stop="handleAddNode('top')">+</div>
    <div v-if="isSelected" class="add-node-button right" @click.stop="handleAddNode('right')">+</div>
    <div v-if="isSelected" class="add-node-button bottom" @click.stop="handleAddNode('bottom')">+</div>
    <div v-if="isSelected" class="add-node-button left" @click.stop="handleAddNode('left')">+</div>
  </div>
</template>

<style scoped>
.custom-node {
  position: relative;
  width: 150px;
  height: 80px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  text-align: center;
}

.custom-node svg {
  width: 100%;
  height: 100%;
}

Handle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
  position: absolute;
}

.add-node-button {
  position: absolute;
  width: 20px;
  height: 20px;
  background: blue;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.custom-node.selected {
  border-color: #1c1c1d;
}

.add-node-button.top { top: -10px; left: 50%; transform: translateX(-50%); }
.add-node-button.right { right: -10px; top: 50%; transform: translateY(-50%); }
.add-node-button.bottom { bottom: -10px; left: 50%; transform: translateX(-50%); }
.add-node-button.left { left: -10px; top: 50%; transform: translateY(-50%); }
</style>
