<script lang="ts" setup>
function onDragStart(event: DragEvent, nodeType: string) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}
</script>

<template>
  <aside>
    <h2>Nodes</h2>
    <hr/>
    <div class="vue-flow__node-input" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'input')">
      Input Node
    </div>
    <div class="vue-flow__node-default" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'default')">
      Default Node
    </div>
    <div class="vue-flow__node-output" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'output')">
      Output Node
    </div>
    <div class="vue-flow__node-default" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'custom')">
      Custom Node
    </div>
    <div class="vue-flow__node-default" :draggable="true" @dragstart="(event: DragEvent) => onDragStart(event, 'special')">
      Special Node
    </div>
  </aside>
</template>