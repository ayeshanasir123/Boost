export type ItemAdditionalIdentification = {
  'itemInstanceUUID'?: string | null;
  'barcodeSymbologyId'?: string | null;
  'barcodeSymbologySchemeUUID'?: string | null;
  'createdAt'?: Date;
  'createdByUUID': string;
  'identifier'?: string | null;
  'identifierSchemeId'?: string | null;
  'issuerPartyUUID'?: string | null;
  'itemUUID': string;
  'updatedAt'?: Date | null;
  'UUID': string;
}

export type ItemGroupCriteria = {
  'UUID': string;
  'groupUUID': string;
  'criteriaField': string;
  'criteriaType': 'CONTAINS' | 'STARTSWITH' | 'ENDSWITH' | 'EQ' | 'NEQ';
  'criteriaValue': string;
}

export type ItemGroupData = {
  'UUID': string;
  'name': string;
}

export type ItemInstance = {
  'UUID': string;
  'itemUUID': string;
  'bestBeforeDate'?: Date | null;
  'lotIdentificationLotExpiryDate'?: Date | null;
  'lotIdentificationLotNumberId'?: string | null;
  'manufactureDate'?: Date | null;
  'metaData'?: Object | null;
  'productTraceId'?: string | null;
  'registrationId'?: string | null;
  'serialId'?: string | null;
}

export type ItemPricelist = {
  'code': string;
  'comment'?: string | null;
  'currencyCode'?: string;
  'def'?: number | null;
  'id': string;
  'includesVat'?: number;
  'name': string;
}

export type ItemPrice = {
  'UUID': string;
  'agreementUUID'?: string | null;
  'itemGroupUUID'?: string | null;
  'itemUUID'?: string | null;
  'createdAt'?: Date;
  'createdByUUID': string;
  'customerGroupUUID'?: string | null;
  'customerUUID'?: string | null;
  'maxQty'?: number | null;
  'minQty'?: number | null;
  'percentage'?: number | null;
  'price'?: number | null;
  'pricelistUUID'?: string | null;
  'projectUUID'?: string | null;
  'regularPrice'?: number;
  'type'?: 'FIXED_PRICE' | 'PERCENTAGE_ON_REGULAR_PRICE' | 'PERCENTAGE_ON_DISCOUNTED_PRICE' | null;
  'updatedAt'?: Date | null;
  'validFrom'?: Date | null;
  'validTo'?: Date | null;
}

export type ItemRelation = {
  'UUID': string;
  'childUUID': string;
  'parentUUID': string;
  'type': 'CONTAINS' | 'REPLACES';
}

export type Item = {
  'accountNumber'?: number | null;
  'active'?: number;
  'altName'?: string | null;
  'articleGroupId'?: string | null;
  'articleId': string;
  'baseCode'?: string | null;
  'brandName'?: string | null;
  'colorCode'?: string | null;
  'colorName'?: string | null;
  'comment'?: 'NOTALLOWED' | 'ALLOWED' | 'REQUIRED';
  'createdAt'?: Date;
  
  /* personId */
  'createdById': string;
  'currency'?: string | null;
  'defaultSaleQty'?: number;
  'deletedAt'?: Date | null;
  
  /* personId */
  'deletedById'?: string | null;
  'depth'?: number | null;
  'description'?: string | null;
  'dicountedPrice'?: number | null;
  'foreignId'?: string | null;
  
  /* EAN */
  'GTIN'?: string | null;
  'hazardousRiskIndicator'?: number;
  'height'?: number | null;
  'includesVat'?: number;
  'incrementAmountAllowed'?: number;
  'isPhysical'?: number;
  'jsonData'?: string | null;
  'length'?: number | null;
  'manageStock'?: number | null;
  
  /* organizationId */
  'manufacturerId'?: string | null;
  'manufacturerSKU'?: string | null;
  'masterDb'?: string | null;
  'measurementUnit'?: 'metric' | 'imperial';
  'metaData'?: Object | null;
  'modelName'?: string | null;
  'name'?: string | null;
  'notifyOnStockCount'?: number | null;
  'packQuantity'?: number | null;
  'packQuantityUnitCode'?: string | null;
  'packSizeNumeric': number;
  'packSizeNumericFormat': 'INTEGER' | 'DECIMAL' | 'REALNUMBER' | 'PERCENTAGE';
  'PLU'?: number | null;
  'price'?: number | null;
  'purchasePrice'?: number | null;
  'qtyPerUnit'?: number;
  'reorderPoint'?: number;
  'reorderQuantity'?: number;
  'saleUnit'?: string;
  'sizeCode'?: string | null;
  'sizeName'?: string | null;
  'SKU'?: string | null;
  'stockCount'?: number | null;
  'supplierSKU'?: string | null;
  'supplierUUID'?: string | null;
  'unit'?: string;
  'UPC'?: string | null;
  'updatedAt'?: Date | null;
  
  /* personId */
  'updatedById'?: string | null;
  'vat'?: number | null;
  'weight'?: number | null;
  'width'?: number | null;
}

export type ItemSupplier = {
  'articleId': string;
  'createdAt'?: Date;
  
  /* personId */
  'createdByUUID': string;
  'price': number;
  'SKU'?: string | null;
  'stockCount'?: number | null;
  'stockCountTakenAt'?: Date | null;
  
  /* organizationId */
  'supplierId': string;
  'updatedAt'?: Date | null;
  'UUID': string;
}