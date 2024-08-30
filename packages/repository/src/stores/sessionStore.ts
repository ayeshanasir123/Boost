import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const initialized = ref<boolean>(false)
  const startupLog = ref<string[]>([])

  function setInitialized() {
    initialized.value = true
  }

  function getInitialized() {
    return initialized.value
  }

  function addLogEntry(entry: string) {
    startupLog.value.push(entry)
  }

  function clearLog() {
    startupLog.value = []
  }

  function getStartupLog() {
    return startupLog.value.join('\n')
  }
  //getData();

  return {
    addLogEntry,
    clearLog,
    getStartupLog,
    setInitialized,
    getInitialized
  }
})

// Type inference for use within components
export type SessionStore = ReturnType<typeof useSessionStore>;