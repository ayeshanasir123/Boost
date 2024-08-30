export interface Item {
    'UUID': string;
    'identifier'?: string | null;
    'itemGroupUUID'?: string | null;
    'name'?: string | null;
    'alternateName'?: string | null;
    'description'?: string | null;
    'isPhysical'?: number;
    'active'?: number;
    'metaData'?: Object | null;

    'dimensions'?: Dimensions;
    'identifications'?: Identifications;
    'inventorySettings'?: InventorySettings;
    'prices'?: Prices;
    'itemSuppliers'?: ItemSupplier[];
    'itemInstances'?: ItemInstance[];
    'specialPrices'?: SpecialPrice[];
    'itemRelations'?: ItemRelation[];    
    'additionalIdentifications'?: AdditionalIdentification[];

    'createdAt'?: Date;
    /* personUUID */
    'createdByUUID': string;    
        
    /* personUUID */
    'updatedByUUID'?: string | null;
    'updatedAt'?: Date | null;

    'deletedAt'?: Date | null;
    /* personUUID */
    'deletedByUUID'?: string | null;

    'isPartial'?: boolean;
  }

  export interface AdditionalIdentification {
    'createdAt'?: Date;
    'createdByUUID': string;
    'identifier'?: string | null;
    'identifierSchemeId'?: string | null;
    'itemInstanceUUID'?: string | null;
    'itemUUID': string;
    'metaData'?: Object | null;
    'updatedAt'?: Date | null;
    'updatedByUUID'?: string | null;
    'UUID': string;
  }

  export interface Dimensions {
    'height'?: number | null;
    'itemUUID': string;
    'length'?: number | null;
    'measurementUnitCode'?: string | null;
    'packQuantity'?: number | null;
    'packQuantityUnitCode'?: string | null;
    'packSizeNumeric'?: number | null;
    'packSizeNumericFormat'?: 'INTEGER' | 'DECIMAL' | 'REALNUMBER' | 'PERCENTAGE';
    'UUID': string;
    'weight'?: number | null;
    'weightUnitCode'?: string | null;
    'width'?: number | null;
  }

  export interface ItemGroupCriterias {
    'criteriaField': string;
    'criteriaType': 'CONTAINS' | 'STARTSWITH' | 'ENDSWITH' | 'EQ' | 'NEQ';
    'criteriaValue': string;
    'groupUUID': string;
    'UUID': string;
  }
  export interface ItemGroup {
    'name': string;
    'UUID': string;
  }

  export interface Identifications {
    'GTIN'?: string | null;
    'itemInstanceUUID'?: string | null;
    'itemUUID': string;
    'metaData'?: Object | null;
    'PLU'?: number | null;
    'SKU'?: string | null;
    'UUID': string;
  }

  export interface ItemInstance {
    'bestBeforeDate'?: Date | null;
    'createdAt'?: Date;
    'createdByUUID': string;
    'deletedAt'?: Date | null;
    'deletedByUUID'?: string | null;
    'itemUUID': string;
    'lotIdentificationLotExpiryDate'?: Date | null;
    'lotIdentificationLotNumberId'?: string | null;
    'manufactureDate'?: Date | null;
    'metaData'?: Object | null;
    'productTraceId'?: string | null;
    'registrationId'?: string | null;
    'serialId'?: string | null;
    'updatedAt'?: Date | null;
    'UUID': string;
  }

  export interface InventorySettings {
    'itemUUID': string;
    'manageStock'?: number | null;
    'notifyOnStockCount'?: number | null;
    'reorderPoint'?: number;
    'reorderQuantity'?: number;
    'reserved'?: number | null;
    'stockCount'?: number | null;
    'UUID': string;
  }

  export interface Pricelists {
    'code': string;
    'comment'?: string | null;
    'createdAt'?: Date;
    'createdByUUID': string;
    'currencyCode'?: string;
    'def'?: number | null;
    'includesVat'?: number;
    'name': string;
    'updatedAt'?: Date | null;
    'updatedByUUID'?: string | null;
    'UUID': string;
  }

  export interface Prices {
    'currency'?: string | null;
    'includesVat'?: number;
    'itemUUID': string;
    'price'?: number | null;
    'purchasePrice'?: number | null;
    'UUID': string;
    'vat'?: number | null;
  }

  export interface ItemRelation {
    'childUUID': string;
    'parentUUID': string;
    'type': 'CONTAINS' | 'REPLACES';
    'UUID': string;
  }

  export interface SpecialPrice {
    'agreementUUID'?: string | null;
    'createdAt'?: Date;
    'createdByUUID': string;
    'customerGroupUUID'?: string | null;
    'customerUUID'?: string | null;
    'itemGroupUUID'?: string | null;
    'itemUUID'?: string | null;
    'maxQty'?: number | null;
    'minQty'?: number | null;
    'percentage'?: number | null;
    'price'?: number | null;
    'pricelistUUID'?: string | null;
    'projectUUID'?: string | null;
    'regularPrice'?: number;
    'type'?: 'FIXED_PRICE' | 'PERCENTAGE_ON_REGULAR_PRICE' | 'PERCENTAGE_ON_DISCOUNTED_PRICE' | null;
    'updatedAt'?: Date | null;
    'UUID': string;
    'validFrom'?: Date | null;
    'validTo'?: Date | null;
  }

  export interface ItemSupplier {
    'createdAt'?: Date;
    
    /* personId */
    'createdByUUID': string;
    'itemUUID': string;
    'price': number;
    'SKU'?: string | null;
    'stockCount'?: number | null;
    'stockCountTakenAt'?: Date | null;
    
    /* organizationId */
    'supplierUUID': string;
    'updatedAt'?: Date | null;
    'UUID': string;
  }