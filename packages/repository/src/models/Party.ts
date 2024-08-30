export type Party = {
    UUID: string;
    organizationUUID?: string | null;
    personUUID?: string | null;
    // accountingSupplierParty | accountingCustomerParty | payeeParty | taxRepresentativeParty | deliveryParty | buyerCustomerParty | originatorCustomerParty
    partyType?: string | null;
    partyName?: string | null;
    partyAddressLine1?: string | null;
    partyAddressLine2?: string | null;
    partyAddressLine3?: string | null;
    partyCity?: string | null;
    partyCountry?: string | null;
    partyCountrySubentity?: string | null;
    partyEndpointId?: string | null;
    partyEndpointSchemeId?: string | null;
    partyIdentificationId?: string | null;
    partyIdentificationSchemeId?: string | null;
    partyLegalCompanyId?: string | null;
    partyLegalCompanyLegalForm?: string | null;
    partyLegalRegistrationName?: string | null;
    partyLegalSchemeId?: string | null;
    partyPostCode?: string | null;
    partyTaxSchemeTaxId?: string | null;
    partyTaxSchemeVatId?: string | null;
  }
  