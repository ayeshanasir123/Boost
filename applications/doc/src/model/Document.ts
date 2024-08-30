export default interface Document {
    'createdAt'?: Date;
    'createdByUUID': string;
    'deletedAt': Date | null;
    'description': string | null;
    'entityUUID': string | null;
    'fromEmail': string | null;
    'identifier': string | null;
    'partyUUID': string | null;
    'status'?: any;
    'title': string | null;
    'typeUUID': string | null;
    'updatedAt': Date;
    'UUID': string;
    'PDFUrl': string;
    'thumbNailUrl': string;
    'invoiceNumber': number;
    'invoiceId': number;
    'issueDate': Date;
    'dueDate': Date;
    'supplierName': string;
    'taxTotalTaxAmount': number;
    'taxInclusiveAmount': number;
    'currency': string;
    'OCR': string;
}