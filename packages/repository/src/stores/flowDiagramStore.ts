import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { FlowDiagram } from '../models/FlowDiagram'
import { boostApi } from "@boost/shared";

interface FlowDiagramsResponse {
  flowDiagrams: FlowDiagram[]
}

export const useFlowDiagramStore = defineStore('flowdiagram', () => {
  const flowDiagrams = ref<FlowDiagram[]>([])

  // async function getFlowDiagrams() {
  //   const response = await boostApi.get('/flowdiagrams') as FlowDiagramsResponse;
  //   flowDiagrams.value = response.flowDiagrams;
  //   return flowDiagrams.value;
  //   // return response.flowDiagrams;
  // } 
  function getFlowDiagrams() {
    return flowDiagrams.value;
  }

  async function fetchFlowDiagrams() {
    try {
        const response = await boostApi.get('/flowdiagrams') as FlowDiagramsResponse;
        flowDiagrams.value = response.flowDiagrams;
        return response.flowDiagrams; // Ensure this returns the expected data
    } catch (error) {
        console.error('Error fetching flow diagrams:', error);
        throw error; // Propagate the error for handling in the calling function
    }
}
 

  async function getFlowDiagramByUUID(flowDiagramUUID: string) {
    const response = await boostApi.get('/flowdiagrams/' + flowDiagramUUID) as FlowDiagram;
    return response;
  }  

  async function saveFlowDiagram(flowDiagram: FlowDiagram) {
    const response = flowDiagram.UUID 
      ? await boostApi.put('/flowdiagrams/' + flowDiagram.UUID, flowDiagram) 
      : await boostApi.post('/flowdiagrams', flowDiagram);
    
    return response as FlowDiagram;
  }

  async function deleteFlowDiagram(flowDiagramUUID: string) {
    const response = await boostApi.delete('/flowdiagrams/' + flowDiagramUUID) as FlowDiagram;
    return response;
  }  

  fetchFlowDiagrams();

  return {
    flowDiagrams,
    getFlowDiagrams,
    getFlowDiagramByUUID,
    saveFlowDiagram,
    deleteFlowDiagram
  }
})

// Type inference for use within components
export type FlowDiagramStore = ReturnType<typeof useFlowDiagramStore>;