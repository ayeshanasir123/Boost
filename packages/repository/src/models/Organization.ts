import type { Address } from './Address'

export type Organization = {
  partyLegalCompanyId: string
  partyTaxSchemeTaxId: string
  active: boolean
  organizationNumber: string
  bg: string
  partyIdentificationSchemeId: string
  phone: string
  GLN: string
  partyLegalCompanySchemeId: string
  SWIFT: string
  email: string
  web: string
  organizationId: string
  endpointId: string
  notes: string
  defaultPaymentTypeId: string
  partyLegalCompanyLegalForm: string
  partyLegalRegistrationName: string
  partyTaxSchemeId: string
  foreignId: string
  deletedAt: Date
  identifier: string
  defaultProjectId: string
  ourCustomerNo: string
  createdById: string
  bankAccount: string
  ourInvoiceReferenceId: string
  deletedById: string
  endpointSchemeId: string
  partyTaxSchemeVatId: string
  IBAN: string
  updatedAt: Date
  updatedById: string
  name: string
  currencyCode: string
  vatNumber: string
  defaultCostCenterId: string
  masterDb: string
  languageCode: string
  countryCode: string
  roles: Role
  pg: string
  partyIdentificationId: string
  createdAt: Date
  theirInvoiceReferenceId: string
  paymentTermsUUID: string
  deliveryTermsUUID: string
  deliveryMethodUUID: string
  invoiceDiscountPercentage: number
  invoiceFrequency: InvoiceFrequency
  invoiceFee: number
  deliveryFee: number
  taxCode: string
  defaultPricelistUUID: string
  defaultAgreementUUID: string
  orderToInvoiceMergeOrders: boolean
  orderToInvoiceMergeRows: boolean
  orderToInvoiceAddDeliveryFee: boolean
  invoiceBuyerReference: string
  invoiceAccountingCost: string
  invoiceNote: string
  invoiceEmail: string
  invoiceEmailCC: string
  orderInfotext: string
  orderInfoPopup: boolean
  invoiceInfotext: string
  invoiceInfoPopup: boolean
  addresses: Address[]
  gridVersion: boolean
  accountingCustomerPartyUUID: string
}

export enum InvoiceFrequency {
  ONGOING = 'ONGOING',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}

export enum Role {
  CUSTOMER = 1, // ... 0000 0001
  SUPPLIER = 2, // ... 0000 0010
  LEAD = 4, // ... 0000 0100
  PROSPECT = 8, // ... 0000 1000
  COMPETITOR = 16, // ... 0001 0000
  PARTNER = 32, // ... 0010 0000
  DISTRIBUTOR = 64, // ... 0100 0000
  RESELLER = 128 // ... 1000 0000
}

export type OrganizationsResponse = {
  organizations: Organization[];
}