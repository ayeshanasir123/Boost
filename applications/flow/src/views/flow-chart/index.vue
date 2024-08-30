<script lang="ts" setup>
import { Background } from '@vue-flow/background'
import { useRoute, useRouter } from 'vue-router'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { VueFlow, useVueFlow, Position } from '@vue-flow/core'
import { watch, ref, onMounted, reactive } from 'vue'

import CustomNode from './custom-node.vue'
import Sidebar from './side-bar.vue'

import type { FlowDiagram } from '@boost/repository'
import { useFlowDiagramStore } from '@boost/repository'

let id = 0
let flag = false
function getId() {
  return `dndnode_${id++}`
}

const route = useRoute()
const router = useRouter()
const flowDiagramStore = useFlowDiagramStore()
const diagram = reactive<any>({})
const isLoading = ref<boolean>(false)
const selectedNodeId = ref<string | null>(null)
const editingNodeId = ref<string | null>(null)
const editNodeId = ref<Boolean>(false)
const nodeNameInput = ref<string>('')
const pageTitle = ref('')

const flowDiagram: FlowDiagram = reactive<FlowDiagram>({
  title: 'New Flow Diagram',
  nodes: [],
  edges: []
})

const { onConnect, addEdges, addNodes, project } = useVueFlow({
  nodes: flowDiagram.nodes,
  edges: flowDiagram.edges
})

function onDragOver(event: DragEvent) {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const wrapper = ref<HTMLElement | null>(null)

onConnect((connection) => {
  if (connection.source && connection.target) {
    addEdges({
      id: getId(),
      source: connection.source,
      target: connection.target,
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle
    })
  }
})

const saveFlowDiagram = async () => {
  try {
    const savedDiagram = await flowDiagramStore.saveFlowDiagram(flowDiagram)

    const tenantId = route.params.tenantId

    console.log('Saved flow diagrams:', savedDiagram)
    router.push(`/${tenantId}/flow`)
  } catch (error) {
    console.error('Error saving flow diagram:', error)
  }
}

function onDrop(event: DragEvent) {
  const type = event.dataTransfer?.getData('application/vueflow')
  if (!type || !wrapper.value) return

  const flowbounds = wrapper.value.getBoundingClientRect()
  const position = project({
    x: event.clientX - flowbounds.left,
    y: event.clientY - flowbounds.top
  })

  const label = prompt('Please enter a label for the node:', `${type} node`)

  addNodes({
    id: getId(),
    type,
    position,
    label: label || `${type} node`
  })
}

const handleAddNode = ({ direction, id }: { direction: string; id: string }) => {
  const parent = flowDiagram.nodes.find((node: any) => node.id === id)

  console.log(parent)

  if (!parent) return
  selectedNodeId.value = null

  const position = { x: parent.position.x, y: parent.position.y }
  let newNodeDirection = ''
  const directionOffsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  flowDiagram.nodes.forEach((node: any) => {
    if (node.parentId === parent.id) {
      switch (direction) {
        case 'top':
          directionOffsets.top += 140 // Increment offset for top
          break
        case 'right':
          directionOffsets.right += 200 // Increment offset for right
          break
        case 'bottom':
          directionOffsets.bottom += 140 // Increment offset for bottom
          break
        case 'left':
          directionOffsets.left += 200 // Increment offset for left
          break
      }
    }
  })

  console.log(directionOffsets)

  flag = !flag
  const operator = !flag ? '-' : '+' // Use '+' for addition and '-' for subtraction

  // Adjust the new node's position based on the direction and offset
  switch (direction) {
    case 'top':
      if (operator === '+') {
        position.x += 100 + directionOffsets.top
      } else if (operator === '-') {
        position.x -= 100 + directionOffsets.top
      }
      position.y -= 140
      newNodeDirection = 'bottom'
      break
    case 'right':
      if (operator === '+') {
        position.y += 100 + directionOffsets.right
      } else if (operator === '-') {
        position.y -= 100 + directionOffsets.right
      }
      position.x += 200
      newNodeDirection = 'left'
      break
    case 'bottom':
      if (operator === '+') {
        position.x += 100 + directionOffsets.bottom
      } else if (operator === '-') {
        position.x -= 100 + directionOffsets.bottom
      }
      position.y += 150
      newNodeDirection = 'top'
      break
    case 'left':
      if (operator === '+') {
        position.y += 100 + directionOffsets.left
      } else if (operator === '-') {
        position.y -= 100 + directionOffsets.left
      }
      position.x -= 200
      newNodeDirection = 'right'
      break
  }
  console.log(position)

  const label = prompt('Please enter a label for the new node:', 'New Node')
  if (label) {
    const newNode = {
      id: getId(),
      type: 'custom',
      position,
      label: label || `New Node`,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      parentId: parent.id
    }

    addNodes(newNode)

    // Optionally, add an edge connecting the parent to the new node
    addEdges({
      id: getId(),
      source: parent.id,
      target: newNode.id,
      sourceHandle: parent.id + '-' + direction,
      targetHandle: newNode.id + '-' + newNodeDirection
    })
  }
}

function handleClickNode(nodeId: string) {
  if (selectedNodeId.value === nodeId) {
    editingNodeId.value = nodeId
    editNodeId.value = true
    handleUpdateNodeLabel()
  } else {
    selectedNodeId.value = nodeId
    editingNodeId.value = null
  }

  const node = flowDiagram.nodes.find((node: any) => node.id === nodeId)
  if (node) {
    nodeNameInput.value = node.label
  }
}

function handleUpdateNodeLabel() {
  const newLabel = prompt('Please enter a label for the node:', 'New Node')
  const node = flowDiagram.nodes.find((node: any) => node.id === editingNodeId.value)

  if (node && newLabel !== null) {
    node.label = newLabel
    nodeNameInput.value = newLabel
    editingNodeId.value = null
  }
}

function handleDeleteNode(nodeId: string) {
  flowDiagram.nodes = flowDiagram.nodes.filter((node: any) => node.id !== nodeId)
  flowDiagram.edges = flowDiagram.edges.filter(
    (edge: any) => edge.source !== nodeId && edge.target !== nodeId
  )
  selectedNodeId.value = null
}

const fetchDiagram = async () => {
  isLoading.value = true
  try {
    const uuid = route.params.id
    const response = await flowDiagramStore.getFlowDiagramByUUID(uuid)
    diagram.value = response
    flowDiagram.UUID = uuid
    flowDiagram.title = response.title
    flowDiagram.nodes = response.nodes
    flowDiagram.edges = response.edges
    id = flowDiagram.nodes.length
  } catch (error) {
    console.error('Error fetching diagram:', error)
    diagram.value = {
      title: 'Error',
      description: 'Diagram not found or an error occurred.',
      nodes: []
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (route.params.id !== 'new') {
    fetchDiagram()
  } else {
    const title = prompt('Please enter a title for your flowboard')
    if (title) {
      flowDiagram.title = title
    } else {
      const tenantId = route.params.tenantId
      router.push(`/${tenantId}/flow`)
    }
  }
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' && selectedNodeId.value) {
      handleDeleteNode(selectedNodeId.value)
    }
  })
})

watch(
  () => flowDiagram.title,
  (newTitle) => {
    pageTitle.value = flowDiagram.title
    console.log(pageTitle.value)
  }
)
</script>
<template>
  <lq-page :title="pageTitle" :save="saveFlowDiagram">
    <div class="dndflow" @drop="onDrop" @dragover="onDragOver" ref="wrapper">
      <div v-if="isLoading" class="loader">Loading...</div>
      <template v-else>
        <Sidebar />
        <VueFlow v-model:nodes="flowDiagram.nodes" v-model:edges="flowDiagram.edges">
          <template #node-custom="customNodeProps">
            <CustomNode
              v-bind="customNodeProps"
              :nodes="flowDiagram.nodes"
              :selected="customNodeProps.id === selectedNodeId"
              @click="handleClickNode(customNodeProps.id)"
              @add-node="handleAddNode"
              @delete-node="handleDeleteNode"
            />
          </template>

          <Background pattern-color="#aaa" :gap="8" />
          <MiniMap />
          <Controls />
        </VueFlow>
      </template>
    </div>
  </lq-page>
</template>
<style>
@import '../../components/dnd.css';
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

.diagram-detail {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
