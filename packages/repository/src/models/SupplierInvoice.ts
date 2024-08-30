import { type Document } from "./Document";

export type SupplierInvoice = {
    accountingCost: string | null;
    accountingCustomerPartyId?: string;
    accountingSupplierPartyUUID?: string;
    actualDeliveryDate: Date | null;
    agreementPartyId: string | null;
    allowanceTotalAmount?: number;
    balance: number | null;
    buyerReference: string | null;
    buyerReferencePersonId: string | null;
    chargeTotalAmount?: number;
    contractDocumentReferenceId: string | null;
    costcenterCode: string | null;
    createdAt?: Date;

    /** BR-01 An Invoice shall have a Specification identifier (BT-24) */
    customizationId?: string;
    deletedAt: Date | null;
    deliveryLocationId?: string;
    deliveryLocationIdScheme?: string;
    deliveryPartyId: string | null;
    despatchDocumentReferenceId: string | null;
    documentCurrencyCode?: string | null;

    /** BT-9 In case the Amount due for payment (BT-115) is positive, either the Payment due date (BT-9) or the Payment terms (BT-20) shall be present. */
    dueDate: Date | null;

    /** UUID for this invoice */
    id?: string;
    invoiceDocumentReferenceId: string | null;
    invoiceDocumentReferenceIssueDate: Date | null;

    /** BR-02 An Invoice shall have an Invoice number (BT-1). */
    invoiceNumber?: string;
    invoicePeriodDescriptionCode: string | null;
    invoicePeriodEnd: Date | null;
    invoicePeriodStart: Date | null;
    invoiceType: any | null;

    /** BT-3 The document type code MUST be coded by the invoice and credit note related code lists of UNTDID 1001. */
    invoiceTypeCode?: string;

    /** BR-03 An Invoice shall have an Invoice issue date (BT-2). */
    issueDate: Date | null;
    lineExtensionAmount?: number;
    metadata: string | null;

    /** BT-22 No more than one note is allowed on document level. Invoiced note subject code shall be coded using UNCL4451 */
    note: string | null;
    OCR: string | null;
    orderReferencePurchaseorderReferenceId: string | null;
    orderReferenceSalesOrderId: string | null;
    originatorDocumentReferenceId: string | null;
    payableAmount?: number;
    payableRoundingAmount?: number;
    payeePartyId: string | null;
    prepaidAmount?: number;

    /** BT-23 Business process MUST be in the format urn:fdc:peppol.eu:2017:poacc:billing:NN:1.0 where NN indicates the process number. */
    profileId?: string;
    projectId: string | null;
    projectReferenceId?: string;
    receiptDocumentReferenceId: string | null;
    status?: any;
    taxCurrencyCode: string | null;
    taxExclusiveAmount?: number;
    taxInclusiveAmount?: number;
    taxPointDate: Date | null;
    taxRepresentativePartyId: string | null;
    taxTotalTaxAmount?: number;
    updatedAt: Date | null;
    documents?: Document[];
}