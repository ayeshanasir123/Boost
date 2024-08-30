export type FiscalYear = {
    'UUID': string;
    'organizationUUID': string;
    'startDate': Date;
    'endDate': Date;
    'locked'?: number;
    'lockedAt'?: Date | null;
    'lockedByUUID'?: string | null;
    'createdByUUID'?: string | null;
    'createdAt'?: Date;
    'updatedAt'?: Date | null;
    'deletedAt'?: Date | null;  
    'isPersisted'?: boolean;
    'isPartial'?: boolean;
}