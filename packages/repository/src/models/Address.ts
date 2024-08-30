export type Address = {
  addressId: string
  organizationId: string | null
  personId: string | null
  type: 'VISIT' | 'INVOICE' | 'DELIVERY' | null
  name: string | null
  addressLine1: string | null
  addressLine2: string | null
  addressLine3: string | null
  postcode: string | null
  city: string | null
  countrySubentity: string | null
  country: string | null
  phone: string | null
  buyerReference: string | null
  invoiceReference: string | null
  GLN: string | null
  plusCode: string | null
  googleData: string | null
  isDefault: boolean | null
  createdAt: Date | null
  createdById: string | null
  updatedAt: Date | null
}

export enum addressType {
  VISIT = 'VISIT',
  INVOICE = 'INVOICE',
  DELIVERY = 'DELIVERY'
}
