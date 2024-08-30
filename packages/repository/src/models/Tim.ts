import type { Organization } from './Organization'
import type { Address } from './Address'

export type TimWorkOrder = {
  addressEntity?: Address | null
  address?: string
  addressId?: string | null
  assigned?: string
  assignedAt?: Date | null
  assignedId?: string | null
  assignedOrganizationId?: string[] | null
  assignableOrganizations?: Organization[] | null
  ata?: number
  body?: string
  categoryId?: string | null
  commentLastAddedAt?: Date | null
  createdAt?: Date
  createdById?: string | null
  customer?: string | null
  customerId?: string | null
  customerWorkOrderRef?: string
  dueAt?: Date | null
  elsak?: number
  endcustomer?: string | null
  endcustomerId?: string | null
  id?: string
  invoiceStatus?: any
  metaData?: string | null
  nr?: number
  officeId?: string | null
  plannedAt?: Date | null
  priority?: any
  project?: string | null
  projectId?: string | null
  responsible?: string | null
  responsibleId?: string | null
  shortdesc?: string | null
  status?: string
  subCategoryUUID?: string | null
  subject?: string
  suggestedartnr?: string | null
  timeReported?: number
  updatedAt?: Date | null
  updatedById?: string | null
  attachments?: TimWorkOrderFile[] | null
  comments?: TimWorkOrderComment | null
  timereports?: TimTimeReport | null
  articles?: TimWorkOrderArticles | null
  jsonData?: any | null
}

export interface TimWorkorderCategory {
  categoryId: string
  name: string
}

export interface TimTimeReport {
  activityID: string
  address: string
  approved: number
  comment: string
  commentChange: string
  commentForCustomer: string | null
  customerID: string | null
  dtReported: Date | null
  dtWorked: Date
  id: string
  invoice: number
  invoiceID: string | null
  price: number | null
  projectID: string | null
  showOnReport: number
  sortorder: number
  tags: string | null
  time: number
  timeDeb: number
  used_ue?: number
  userID: string
  verification_id: string | null
  worked_alone?: number
  workOrderID: string | null
}

export interface TimActivity {
  abbr?: string
  affectsWorkTimeReduction?: number
  allowFutureReporting?: number
  approvedInternal: number
  compEffectFactor?: number
  defaultPrice: number
  hogianumberk: number
  hogianumbert: number
  id: string
  in_use?: number
  invoice: number
  name: string
  showInAndroid: number
  showon: number
  SKU: string | null
  sortOrder: number
  tempPrice?: number
  type?: string
  typeName: string
}

export interface TimWorkOrderAssignable {
  id: string
  organizationId: string | null
  personId: string | null
}

export interface TimWorkOrderComment {
  comment: string
  commentID: string
  createdAt?: Date
  createdBy: string
  deletedAt: Date | null
  deletedById: string | null
  workOrderID: string
}

export interface TimWorkorderStatus {
  comment?: any
  description: string
  id: string
  requestDate?: number
  sortOrder: number
  system?: number
}

export interface TimWorkOrderFile {
  clientfilename: string
  created_at: Date
  created_by_id: number
  deleted_at: Date
  document_id: string
  document_page_id: string
  file_id: string
  location: string
  serverfilename: string
  updated_at: Date
}

export default interface TimWorkOrderArticles {
  articleId: string
  comment: string | null
  createdAt?: Date
  createdById: string
  id: string
  name: string
  qty?: number
  sortOrder?: number
  timereportId: string | null
  workorderId: string
}
