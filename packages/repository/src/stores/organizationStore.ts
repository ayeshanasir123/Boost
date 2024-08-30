import { ref, inject } from 'vue'
import { defineStore } from 'pinia'
import type { Organization, Address, Person } from '../index'
import { boostApi } from "@boost/shared";

export const useOrganizationStore = defineStore('organization', () => {
    const organizationList = ref<Organization[]>([])
    const tenantId = ref<string | null>(null)

    interface OrganizationResponse {
        organizations: Organization[]
    }

    async function getAddresses(organizationUUID: string) {
        return await boostApi.get<Address[]>(
            '/organizations/' + organizationUUID + '/addresses'
        );
    }

    async function createAddress(organizationUUID: string, address: Address) {
        return await boostApi.post<Address>(
            '/organizations/' + organizationUUID + '/addresses',
            address
        );
    }

    async function updateAddress(organizationUUID: string, address: Address) {
        return await boostApi.put<Address>(
            '/organizations/' + organizationUUID + '/addresses' + address.addressId,
            address
        );
    }

    function setData(organizations: Organization[]) {
        organizationList.value = organizations
    }

    function queryOrganizations(activeStatus: boolean | null, role?: number | null | undefined) {
        return organizationList.value.filter((organization) => {
            if (role === undefined) role = null

            // Check active status if specified
            const isActiveMatch = activeStatus === null || organization.active == activeStatus

            // Check role if specified
            const isRoleMatch = role === null || (organization.roles & role) !== 0

            return isActiveMatch && isRoleMatch
        })
    }

    async function search(searchTerm: string): Promise<(Organization | Person)[]> {
        return organizationList.value.filter((organization: Organization) => {
            return organization.active && organization.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

    function createOrganization(organization: Partial<Organization>) {
        return boostApi.post<Organization>('/organizations', organization);
    }

    function updateFromPlain(updatedOrganization: Organization) {
        let organization = organizationList.value.find(
            (organization) => organization.organizationId === updatedOrganization.organizationId
        )
        if (organization) {
            Object.assign(organization, updatedOrganization)
        } else {
            organizationList.value.push(updatedOrganization)
        }
    }

    async function update(updatedOrganization: Organization) {
        return await boostApi.put<Organization>('/organizations/' + updatedOrganization.organizationId,
            updatedOrganization);
    }

    async function preloadData(organizationUUID: string) {
        return await getOrganizationByUUID(organizationUUID)
    }

    async function getOrganizationByUUID(id: string) {
        
        let organization = organizationList.value.find(org => org.organizationId === id);

        console.log(organization);
        const fullOrganization = await boostApi.get(`/organizations/${id}`) as Organization;

        if (!organization) {
            organizationList.value.push(fullOrganization)
        } else {
            Object.assign(organization, fullOrganization);
        }

        return organization;
    }

    function deleteOrganization(organizationUUID: string) {
        console.log(organizationUUID)
        /*
            for (let i=0; i <= organizationList.value.length; i++) {
              if (organizationList.value[i].organizationId == organizationUUID) {
                organizationList.splice(i,1);
                break;
              }
            }*/
    }

    //getData();

    return {
        organizationList,
        createOrganization,
        setData,
        deleteOrganization,
        getOrganizationByUUID,
        update,
        updateFromPlain,
        search,
        preloadData,
        queryOrganizations,
        getAddresses,
        createAddress,
        updateAddress,
    }
})