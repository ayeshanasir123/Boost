// initializeStores.ts
import { createPinia, type Pinia } from 'pinia';
import { useSessionStore } from '../stores/sessionStore';
import { useProfileStore } from '../stores/profileStore';
import { useOrganizationStore } from '../stores/organizationStore';
import { usePersonStore } from '../stores/personStore';
import { useProjectStore } from '../stores/projectStore';
import type { WhoAmIResponse } from '../models/Person';
import type { OrganizationsResponse } from '../models/Organization';
import { boostApi } from '@boost/shared';

export const pinia: Pinia = createPinia();

export async function initializeStores() {
  // Register the stores
  const sessionStore = useSessionStore(pinia);
  const profileStore = useProfileStore(pinia);
  profileStore.setTenantId(window.boostConfig.tenantId);
  const organizationStore = useOrganizationStore(pinia);
  const personStore = usePersonStore(pinia);
  const projectStore = useProjectStore(pinia);

  const endpoints = [
    `/whoami`,
    `/organizations?limit=9999`
  ];
  pinia
  sessionStore.addLogEntry("Starting up");
  sessionStore.addLogEntry("Loading base entities from API to local store...");

  const [profileResponse, organizationsResponse] = await Promise.all([
    boostApi.get<WhoAmIResponse>(endpoints[0]), // Ensure endpoint ordering matches expected types
    boostApi.get<OrganizationsResponse>(endpoints[1])
  ])

  // Assume responses are already unwrapped and validated
  profileStore.setPerson(profileResponse.person);
  profileStore.setOrganization(profileResponse.organization);
  organizationStore.setData(organizationsResponse.organizations);

  sessionStore.addLogEntry("Base entities loaded.");
  sessionStore.setInitialized();

  return pinia;
}
