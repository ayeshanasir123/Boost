import type { Customer } from './Customer';

export type Project = {
    UUID?: string | null;
    categoryUUID?: string | null;
    /* organizationId */
    customerUUID?: string | null;
    customer?: Customer| null;
    mainContactUUID?: string | null;
    accountingCustomer?: Customer| null;

    identifier: string;
    name?: string | null;
    prefix?: string | null;
    /* personId */
    projectManagerUUID?: string | null;
    /* personId */
    ourAccountingReferenceUUID: string;
    /* personId */
    theirAccountingReferenceUUID: string;
    /* organizationId */
    projectReferenceId: string,
    invoiceReference: string,

    accountingCustomerUUID?: string | null;
    agreementUUID?: string | null;
    projectedStart?: Date | null;
    projectedEnd?: Date | null;
    actualStart?: Date | null;
    actualEnd?: Date | null;
    foreignId?: string | null;
    active?: number | null;
    createdAt?: Date | null;
    /* personId */
    createdByUUID?: string | null;
    updatedAt?: Date | null;
    /* personId */
    updatedByUUID?: string | null;    
    deletedAt?: Date | null;
    
    isPersisted?: boolean;
    isPartial?: boolean;

    // Virtual fields
    generateIdentifier?: boolean;
}
  