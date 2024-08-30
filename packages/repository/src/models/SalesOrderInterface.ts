import type { Organization } from './Organization';
import type { Person} from './Person';

export interface SalesOrder {
  accountingCost: string | null;
  accountingCustomerPartyId: string | null;
  agreementPartyId: string | null;
  allowanceTotalAmount?: number;
  balance: number | null;
  billingAddressId: string | null;
  buyerCustomerPartyId: string;
  chargeTotalAmount?: number;
  contractId: string | null;
  contractType: string | null;
  costcenterCode: string | null;
  createdAt?: Date;
  createdById: string | null;
  customer: Organization | Person | null;
  customerReference: string | null;
  customerReferencePersonId: string | null;

  /** BR-01 An Invoice shall have a Specification identifier (BT-24) */
  customizationId?: string;
  deletedAt: Date | null;
  deliveryLocationAddressId: string | null;
  deliveryLocationId: string | null;
  deliveryLocationIdScheme: string | null;
  deliveryPartyId: string | null;
  deliveryShipmentId: string | null;
  deliveryShipmentTransportHandlingUnitShippingMarks: string | null;
  deliveryTermsDeliveryLocationId: string | null;
  deliveryTermsId: string | null;
  deliveryTermsSpecialTerms: string | null;
  documentCurrencyCode?: string | null;
  externalDocumentReferenceId: string | null;

  /** UUID for this invoice */
  id: string;
  invoicePeriodDescriptionCode: string | null;
  invoicePeriodEnd: Date | null;
  invoicePeriodStart: Date | null;

  /** BR-03 An Invoice shall have an Invoice issue date (BT-2). */
  issueDateTime?: Date;
  lineExtensionAmount?: number;
  metadata: string | null;

  /** BT-22 No more than one note is allowed on document level. Invoiced note subject code shall be coded using UNCL4451 */
  note: string | null;
  orderDocumentReferenceId: string | null;

  /** BR-02 An Invoice shall have an Invoice number (BT-1). */
  orderNumber: number;
  orderReferencePurchaseorderReferenceId: string | null;
  orderType?: string;

  /** BT-3 The document type code MUST be coded by the invoice and credit note related code lists of UNTDID 1001. */
  orderTypeCode: string | null;

  /** UUID for the CustomerParty if an organization */
  organizationId: string | null;
  originatorCustomerPartyId: string | null;
  originatorDocumentReferenceId: string | null;

  /** UUID for the orderer organization if different from buyer */
  originatorOrganizationId: string | null;

  /** UUID of the person who made the order */
  originatorPersonId: string | null;
  ourReference: string | null;
  ourReferencePersonId: string | null;
  payableAmount?: number;
  payableRoundingAmount?: number;
  paymentTermsNote: string | null;

  /** UUID for the CustomerParty if a person */
  personId: string | null;
  prepaidAmount?: number;

  /** BT-23 Business process MUST be in the format urn:fdc:peppol.eu:2017:poacc:billing:NN:1.0 where NN indicates the process number. */
  profileId?: string;
  projectId: string | null;
  projectReferenceId: string | null;
  quotationDocumentReferenceId: string | null;
  requestedDeliveryPeriodEndDate: Date | null;
  requestedDeliveryPeriodStartDate: Date | null;
  sellerSupplierPartyId: string | null;
  status?: any;
  taxExclusiveAmount?: number;
  taxInclusiveAmount?: number;
  taxTotalTaxAmount?: number;
  updatedAt: Date | null;
  validityPeriodEndDate: Date | null;

  orderLines?: SalesOrderLine[] | null;
  additionalDocumentReferences?: SalesOrderAdditionalDocumentReference[] | null;
  allowanceCharges?: SalesOrderAllowanceCharge[] | null;

}

export interface SalesOrderLine {
  createdAt?: Date | null;
  createdById?: string;
  deletedAt?: Date | null;
  deleted?: Boolean | null;
  itemUUID?: string | null;
  lineItem: SalesOrderLineItem | null;
  metadata?: string | null;
  note?: string | null;
  orderUUID?: string | null;
  sortorder?: number;
  type?: any;
  updatedAt?: Date | null;
  UUID?: string;
}

export interface SalesOrderLineItem {
  accountingCost?: string | null;
  accountNumber?: number | null;
  allowanceTotalAmount?: number;
  chargeTotalAmount?: number;
  costcenterCode?: string | null;
  createdAt?: Date | null;
  deliveredQuantity?: number;
  deliveredQuantityUnitCode?: string;
  deliveryDate?: Date | null;
  deliveryLocationId?: string | null;
  deliveryLocationSchemeId?: string | null;
  deliveryRequestedDeliveryPeriodEndDate?: Date | null;
  deliveryRequestedDeliveryPeriodStartDate?: Date | null;
  documentReferenceDocumentTypeCode?: string | null;
  documentReferenceId?: string | null;
  id?: number;
  invoicePeriodEndDate?: Date | null;
  invoicePeriodStartDate?: Date | null;
  itemBuyersItemIdentificationId?: string | null;
  itemClassifiedTaxCategoryCode?: string | null;
  itemClassifiedTaxCategoryPercent?: number | null;
  itemClassifiedTaxCategoryTaxSchemeId?: string | null;
  itemDescription?: string | null;
  itemName?: string | null;
  itemOriginCountryIdentificationCode?: string | null;
  itemPriceAllowanceChargeAmount?: number;
  itemPriceAllowanceChargeAmountCurrencyCode?: string | null;
  itemPriceAllowanceChargeBaseAmount?: number;
  itemPriceAllowanceChargeBaseAmountCurrencyCode?: string | null;
  itemPriceAllowanceChargeChargeIndicator?: number | null;
  itemPriceAmount?: number;
  itemPriceAmountCurrencyCode?: string;
  itemPriceAmountIncludesVat?: number;
  itemPriceBaseQuantity?: number;
  itemPriceBaseQuantityUnitCode?: string;
  itemSellersItemIdentificationId?: string | null;
  itemStandardItemIdentificationId?: string | null;
  itemStandardItemIdentificationSchemeId?: string | null;
  itemUUID?: string | null;
  lineExtensionAmount?: number | null;
  lineExtensionAmountCurrencyCode?: string;
  metadata?: string | null;
  note?: string | null;
  orderLineReferenceId?: string | null;
  originatorPartyId?: string | null;
  originatorPartyName?: string | null;

  /** ubl:Order cac:OrderLine cac:LineItem cbc:PartialDeliveryIndicator */
  partialDeliveryIndicator?: number;
  projectId?: string | null;

  /** ubl:Order cac:OrderLine cac:LineItem cbc:Quantity */
  quantity?: number;

  /** ubl:Order cac:OrderLine cac:LineItem cbc:Quantity @unitCode */
  quantityUnitCode?: string;
  sortorder?: number;
  taxInclusiveLineExtensionAmount?: number;
  taxInclusiveLineExtensionAmountCurrencyCode?: string | null;
  totalTaxAmount?: number;
  totalTaxAmountCurrencyCode?: string | null;
  updatedAt?: Date;
  UUID?: string;
}

export interface SalesOrderLineAdditionalItemProperty {
  id: string;
  name: string;
  orderLineId: string;
  value: string;
}
export interface SalesOrderLineItemCommodityClassifcation {
  id: string;
  invoiceLineId: string;
  itemClassificationCodeListId: string;
  itemClassificationCodeListVersionId: string;
}
export interface SalesOrderLineItemInstance {
  bestBeforeDate: Date | null;
  id: string;
  lotIdentificationLotExpiryDate: Date | null;
  lotIdentificationLotNumberId: string | null;
  manufactureDate: Date | null;
  orderLineId: string;
  productTraceId: string | null;
  registrationId: string | null;
  serialId: string | null;
}

export interface SalesOrderTaxSubtotal {
  id: string;
  orderId: string;
  taxableAmount: number;
  taxableAmountCurrencyCode: string;
  taxAmount: number;
  taxAmountCurrencyCode: string;
  taxCategoryCode: string;
  taxCategoryPercent: number;
  taxCategoryTaxExemptionReason: string;
  taxCategoryTaxExemptionReasonCode: string;
  taxCategoryTaxSchemeId?: string;
}
export interface SalesOrderType {
  active: number;
  name: string;
  sortOrder?: number;
  uuid: string;
}

export interface SalesOrderAdditionalDocumentReference {
  documentDescription: string | null;
  documentTypeCode?: string;
  externalReferenceURI: string | null;
  fileId: string | null;
  id: string;
  parentId: string;
  schemeId: string | null;
}

export interface SalesOrderAllowanceCharge {
  allowanceChargeReason: string | null;
  allowanceChargeReasonCode: string | null;
  amount: number | null;
  amountCurrencyCode: string | null;
  baseAmount: number | null;
  baseAmountCurrencyCode: string | null;
  chargeIndicator: number | null;
  id: string;
  multiplierFactorNumeric: number | null;
  parentId: string;
  taxCategoryCode: string | null;
  taxCategoryPercent: number | null;
  taxCategoryTaxSchemeId?: string | null;
}