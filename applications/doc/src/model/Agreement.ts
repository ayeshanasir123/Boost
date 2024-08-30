export default interface Agreement {
    'UUID': string;
    'agreementPartyId': string | null;
    'parentId': string | null;
    'name': string | null;
    'referenceNo': string | null;
    'startDate': Date | null;
    'endDate': Date | null;
    'revisionDate': Date | null;
    'createdAt'?: Date;
    'createdById': string | null;
    'deletedAt': Date | null;
    'deletedById': string | null;
    'updatedAt': Date | null;
    'updatedById': string | null;
}
export interface AgreementRelation {
    'relationId': string;
    'agreementId': string;
    'organizationId': string | null;
    'personId': string | null;
}

