import type { Customer } from './Customer';
import type { JSONObject } from './JSONValue';

export type SalesOrder = {
  accountingCost?: string | null;
  accountingCustomerPartyUUID?: string | null;
  agreementPartyUUID?: string | null;
  allowanceTotalAmount?: number;
  balance?: number | null;
  billingAddressUUID?: string | null;
  buyerCustomerPartyUUID?: string;
  chargeTotalAmount?: number;
  contractUUID?: string | null;
  contractType?: string | null;
  costcenterCode?: string | null;
  createdAt?: Date;
  createdByUUID?: string | null;
  customer?: Customer| null;
  customerUUID?: string | null;
  customerReference?: string | null;
  customerReferencePersonUUID?: string | null;

  /** BR-01 An Invoice shall have a Specification identifier (BT-24) */
  customizationId?: string;
  deletedAt?: Date | null;
  deliveryAddressUUID?: string | null;
  deliveryLocationId?: string | null;
  deliveryLocationIdScheme?: string | null;
  deliveryPartyUUID?: string | null;
  deliveryShipmentId?: string | null;
  deliveryShipmentTransportHandlingUnitShippingMarks?: string | null;
  deliveryShippingPriorityLevelCode?: number | null;
  deliveryTermsDeliveryLocationId?: string | null;
  deliveryTermsId?: string | null;
  deliveryTermsSpecialTerms?: string | null;
  documentCurrencyCode?: string | null;
  externalDocumentReferenceId?: string | null;

  /** UUID for this invoice */
  UUID?: string;
  invoicePeriodDescriptionCode?: string | null;
  invoicePeriodEnd?: Date | null;
  invoicePeriodStart?: Date | null;

  /** BR-03 An Invoice shall have an Invoice issue date (BT-2). */
  issueDateTime?: Date;
  lineExtensionAmount?: number;
  metaData?: JSONObject | null;

  /** BT-22 No more than one note is allowed on document level. Invoiced note subject code shall be coded using UNCL4451 */
  note?: string | null;
  orderDocumentReferenceId?: string | null;

  /** BR-02 An Invoice shall have an Invoice number (BT-1). */
  orderNumber?: number;
  orderReferencePurchaseorderReferenceId?: string | null;
  orderType?: string;

  /** BT-3 The document type code MUST be coded by the invoice and credit note related code lists of UNTDID 1001. */
  orderTypeCode?: string | null;

  /** UUID for the CustomerParty if an organization */
  //organizationId: string | null;
  originatorCustomerPartyUUID?: string | null;
  originatorDocumentReferenceId?: string | null;

  /** UUID for the orderer organization if different from buyer */
  originatorUUID?: string | null;

  ourReference?: string | null;
  ourReferencePersonUUID?: string | null;
  payableAmount?: number;
  payableRoundingAmount?: number;
  paymentTermsNote: string | null;

  /** UUID for the CustomerParty if a person */
  //personId: string | null;
  prepaidAmount?: number;

  /** BT-23 Business process MUST be in the format urn:fdc:peppol.eu:2017:poacc:billing:NN:1.0 where NN indicates the process number. */
  profileId?: string;
  projectUUID?: string | null;
  projectReferenceId?: string | null;
  quotationDocumentReferenceId?: string | null;
  requestedDeliveryPeriodEndDate?: Date | null;
  requestedDeliveryPeriodStartDate?: Date | null;
  sellerSupplierPartyUUID?: string | null;
  status?: any;
  taxExclusiveAmount?: number;
  taxInclusiveAmount?: number;
  taxTotalTaxAmount?: number;
  updatedAt?: Date | null;
  validityPeriodEndDate?: Date | null;

  orderLines?: SalesOrderLine[] | null;
  additionalDocumentReferences?: SalesOrderAdditionalDocumentReference[] | null;
  allowanceCharges?: SalesOrderAllowanceCharge[] | null;

  isPersisted?: boolean;
  isPartial?: boolean;
}

export type SalesOrderLine = {
  UUID?: string;
  id?: number;
  orderUUID?: string | null;
  type?: any;
  accountingCost?: string | null;
  accountNumber?: number | null;
  allowanceTotalAmount?: number;
  chargeTotalAmount?: number;
  costcenterCode?: string | null;
  deliveredQuantity?: number;
  deliveredQuantityUnitCode?: string;
  deliveryDate?: Date | null;
  deliveryLocationId?: string | null;
  deliveryLocationSchemeId?: string | null;
  deliveryRequestedDeliveryPeriodEndDate?: Date | null;
  deliveryRequestedDeliveryPeriodStartDate?: Date | null;
  documentReferenceDocumentTypeCode?: string | null;
  documentReferenceId?: string | null;
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
  metaData?: string | null;
  note?: string | null;
  orderLineReferenceId?: string | null;
  originatorPartyId?: string | null;
  originatorPartyName?: string | null;

  /** ubl:Order cac:OrderLine cac:LineItem cbc:PartialDeliveryIndicator */
  partialDeliveryIndicator?: number;
  projectUUID?: string | null;

  /** ubl:Order cac:OrderLine cac:LineItem cbc:Quantity */
  quantity?: number;

  /** ubl:Order cac:OrderLine cac:LineItem cbc:Quantity @unitCode */
  quantityUnitCode?: string;
  sortorder?: number;
  taxInclusiveLineExtensionAmount?: number;
  taxInclusiveLineExtensionAmountCurrencyCode?: string | null;
  totalTaxAmount?: number;
  totalTaxAmountCurrencyCode?: string | null;
  allowanceCharges?: SalesOrderAllowanceCharge[] | null;
  createdAt?: Date | null;
  createdByUUID?: string | null;
  updatedAt?: Date;
  updatedByUUID?: string | null;
  deletedAt?: Date | null;

  isPersisted?: boolean;
}

export type SalesOrderLineAdditionalItemProperty = {
  id: string;
  name: string;
  orderLineId: string;
  value: string;
  createdAt?: Date | null;
  createdByUUID?: string | null;
  updatedAt?: Date;
  updatedByUUID?: string | null;
  deletedAt?: Date | null;
}

export type SalesOrderLineItemCommodityClassifcation = {
  UUID?: string;
  salesOrderLineUUID: string;
  itemClassificationCodeListId: string;
  itemClassificationCodeListVersionId?: string;
  createdAt?: Date | null;
  createdByUUID?: string | null;
  updatedAt?: Date;
  updatedByUUID?: string | null;  
}

export type SalesOrderLineItemInstance = {
  UUID: string;
  salesOrderLineUUID: string;
  productTraceId: string | null;
  manufactureDate: Date | null;
  bestBeforeDate: Date | null;
  registrationId: string | null;
  serialId: string | null;
  lotIdentificationLotExpiryDate: Date | null;
  lotIdentificationLotNumberId: string | null;
  createdAt?: Date | null;
  createdByUUID?: string | null;
  updatedAt?: Date;
  updatedByUUID?: string | null;
}

export type SalesOrderType = {
  UUID?: string;
  name?: string;
  active?: boolean;
  sortOrder?: number;
}

export type SalesOrderAdditionalDocumentReference = {
  UUID: string;
  salesOrderUUID: string;
  schemeId: string | null;
  documentTypeCode?: string;
  documentDescription?: string | null;
  fileUUID: string | null;
  externalReferenceURI?: string | null;
  createdAt?: Date | null;
  createdByUUID?: string | null;
  updatedAt?: Date;
  updatedByUUID?: string | null;
}

export type SalesOrderAllowanceCharge = {
  allowanceChargeReason: string | null;
  allowanceChargeReasonCode: string | null;
  itemUUID?: string | null;
  amount: number | null;
  amountCurrencyCode: string | null;
  baseAmount: number | null;
  baseAmountCurrencyCode: string | null;
  chargeIndicator: number | null;
  id: string;
  multiplierFactorNumeric: number | null;
  parentUUID: string;
  taxCategoryCode: string | null;
  taxCategoryPercent: number | null;
  taxCategoryTaxSchemeId?: string | null;
  createdAt?: Date | null;
  createdByUUID?: string | null;
  updatedAt?: Date;
  updatedByUUID?: string | null;
}