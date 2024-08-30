import { ref, inject } from 'vue'
import { defineStore } from 'pinia'
import type { Person } from '../models/Person'
import { boostApi } from '@boost/shared'

export interface PersonClass extends Person { };
export class PersonClass implements PersonClass  {
    get title() {
        return ((this.firstname ?? '') + ' ' + (this.lastname ?? '')).trim();
    }
}

export const usePersonStore = defineStore('person', () => {
    const personList = ref([] as Person[])
    const tenantId = ref<string | null>(null)

    interface PersonResponse {
        persons: Person[]
    }
    async function getData() {
        const personResponse = await boostApi.get(`/persons`) as PersonResponse;
        personList.value = personResponse.persons;
    }

    function create(payload: Partial<Person>) {
        return boostApi.post<Person>(`/persons`, payload);
    }

    function updateFromPlain(updatedPerson: Person) {
        let person = personList.value.find((person) => person.personId === updatedPerson.personId)
        if (person != undefined) {
            Object.assign(person, updatedPerson)
        } else {
            personList.value.push(updatedPerson)
        }
    }

    function assignableAndSortedPersonList() {
        return personList.value
            .filter((person) => person.assignable === 1)
            .sort((a, b) => (a.firstname || '').localeCompare(b.firstname || ''))
    }

    async function update(updatedPerson: Person) {
        try {
            const personResponse = await boostApi.get(
                `/persons/${updatedPerson.personId}`
            )
        } catch (error) {
            console.error('Error fetching person data:', error)
            // Handle the error appropriately
        }
    }

    function setTenantId(id: string | null) {
        console.log(id)
        tenantId.value = id
    }

    async function getPersonByUUID(personUUID: string) {
        let person = personList.value.find((Person: Person) => Person.personId === personUUID) as Person

        if (person == undefined || person == null) {
            try {
                const person = await boostApi.get(`/persons/${personUUID}`) as Person;
            } catch (error) {
                console.error('Error fetching person data:', error)
                // Handle the error appropriately
            }
        }

        return person
    }

    function deletePerson(personUUID: string) {
        console.log(personUUID)
        /*
            for (let i=0; i <= organizationList.value.length; i++) {
              if (organizationList.value[i].organizationId == organizationUUID) {
                organizationList.splice(i,1);
                break;
              }
            }*/
    }

    getData()

    return {
        personList,
        deletePerson,
        getPersonByUUID,
        create,
        update,
        updateFromPlain,
        setTenantId,
        assignableAndSortedPersonList
    }
})
