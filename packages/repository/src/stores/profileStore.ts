// Importing Vue composition API and Pinia
import { ref } from 'vue'
import { defineStore } from 'pinia'

// Importing models
import type { Person } from '../models/Person'
import type { Organization } from '../models/Organization'

// Defining the store with type inference
export const useProfileStore = defineStore('profile', () => {
  const person = ref<Person | null>(null)
  const organization = ref<Organization | null>(null)
  const tenantId = ref<string>('')
  const bus = ref<string | null>(null)

  function setPerson(personObj: Person) {
    person.value = personObj
  }

  function setOrganization(organizationObj: Organization) {
    organization.value = organizationObj;
  }

  function setTenantId(id: string) {
    tenantId.value = id
  }

  function getTenantId() {
    return tenantId.value
  }

  function getBus() {
    return bus.value
  }

  function setBus() {
    const rand = Math.random()
    bus.value = rand.toString()
  }

  return {
    person,
    organization,
    setPerson,
    setOrganization,
    setTenantId,
    getTenantId,
    getBus,
    setBus
  }
})