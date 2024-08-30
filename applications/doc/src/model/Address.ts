export default interface Address {
    addressId: string;
    organizationId: string;
    personId: string;
    type: addressType;
    name: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    postcode: string;
    city: string;
    countrySubentity: string;
    country: string;
    phone: string;
    buyerReference: string;
    invoiceReference: string;
    GLN: string;
    plusCode: string;
    googleData: string;
    isDefault: boolean;
    createdAt: Date;
    createdById: string;
    updatedAt: Date;
  }

  enum addressType {
    VISIT = 'VISIT',
    INVOICE = 'INVOICE',
    DELIVERY = 'DELIVERY'
  }