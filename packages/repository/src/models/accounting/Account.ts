export type Account = {
    'UUID'?: string;
    'accountNumber': number;
    'fiscalYearId': string;
    'type': 'DEPRECIATION' | 'DIRECTDEPRECIATION' | 'ACCRUAL' | 'ASSET' | 'DEBT' | 'REVENUE' | 'EXPENSE';
    'name': string;
    'information'?: string | null;
    'SRU'?: number | null;
    'startBalance'?: number;
    'balance'?: number;
    'vatCode'?: string | null;
    'transactionInfo'?: 'NOTALLOWED' | 'ALLOWED' | 'REQUIRED';
    'project'?: 'NOTALLOWED' | 'ALLOWED' | 'REQUIRED';
    'defaultProjectUUID'?: string | null;
    'costCenter'?: 'NOTALLOWED' | 'ALLOWED' | 'REQUIRED';
    'defaultCostCenterUUID'?: string | null;
    'accountTemplateUUID'?: string | null;
    'active'?: number;
    'createdByUUID'?: Date | null;
    'updatedAt'?: Date | null;
    'createdAt'?: Date;
    'deletedAt'?: Date | null;
}

