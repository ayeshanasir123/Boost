<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FlowDiagram } from '@boost/repository'
import { useFlowDiagramStore } from '@boost/repository'

const flowDiagramStore = useFlowDiagramStore()

// Reactive computed property to automatically update when the store changes
const flowDiagrams = computed<FlowDiagram[]>(() => flowDiagramStore.flowDiagrams)

const route = useRoute()
const router = useRouter()

const createNewDiagram = () => {
  const tenantId = route.params.tenantId
  router.push(`/${tenantId}/flow/new`)
}

const openDiagram = (id: string) => {
  console.log(id)
  const tenantId = route.params.tenantId
  router.push(`/${tenantId}/flow/${id}`) // Assuming `id` is the UUID
}
//   const openDiagram = (id: string) => {
//     const tenantId = route.params.tenantId;
//     router.push(`/${tenantId}/mindmap/flowchart/${id}`);
//   };

// Format date to 'MMM DD, YYYY'
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

// Function to get relative time
const timeAgo = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 }
  ]

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count > 0) {
      return `Edited ${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }

  return 'Edited just now' // Fallback for very recent edits
}
onMounted(() => {
  //getData();
  //console.log(flowDiagrams.value);
})
</script>

<template>
  <div class="flow-diagram-list">
    <div class="new-diagram" @click="createNewDiagram">
      <div class="plus-icon">+</div>
      <div>New whiteboard</div>
    </div>
    <div
      v-for="diagram in flowDiagrams"
      :key="diagram.id"
      class="diagram-item"
      @click="openDiagram(diagram.UUID)"
    >
      <h3>{{ diagram.title }}</h3>
      <p>Created {{ formatDate(diagram.createdAt) }}</p>
      <!-- <p> {{ timeAgo(diagram.updatedAt) }}</p> -->
    </div>
  </div>
</template>

<style>
@import '../../components/dnd.css';
.flow-diagram-list {
  display: flex;
  flex-wrap: wrap;
}

.new-diagram,
.diagram-item {
  width: 200px;
  height: 150px;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.new-diagram {
  border: 2px dashed #ccc;
}

.plus-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}
</style>
