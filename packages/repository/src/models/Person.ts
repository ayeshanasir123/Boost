import type { Organization } from './Organization';

export type Person = {
  roles: number
  customerNumber: number
  personId: string
  foreignId: string | null
  identifier: string | null
  firstname: string | null
  lastname: string | null
  personalIdentityNumber: string | null
  email: string | null
  phone: string | null
  mobilePhone: string | null
  pictureId: string | null
  timeId: string | null
  assignable: number
  createdAt: Date
  createdById: string | null
  updatedAt: Date | null
  updatedById: string | null
  deletedAt: string | null
  deletedById: string | null
  gridVersion: boolean | null
}

export interface WhoAmIResponse {
  person: Person;
  organization: Organization;
}

export interface PersonResponse {
  person: Person;
}

export interface PersonsResponse {
  person: Person[];
}