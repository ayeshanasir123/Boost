import { type File } from "./File";
import type { JSONValue } from "./JSONValue";

export type Document = {
    UUID?: string;
    documentNumber?: number;
    identifier?: string | null;
    title?: string | null;
    body?: string | null;
    version?: string | null;
    createdAt?: Date;
    createdByUUID?: string;
    status?: string | null;
    state?: string | null;
    deletedAt?: Date | null;
    description?: string | null;
    entityUUID?: string | null;
    entityType?: string | null;
    fromName?: string | null;
    fromEmail?: string | null;
    partyName?: string | null;
    partyUUID?: string | null;
    updatedAt?: Date | null;
    thumbNailUrl?: string;
    metaData?: JSONValue | null;
    file?: File | null;
    tags?: string[] | null;
    dueDate?: Date | null;
    relatedDocuments?: Document[] | null;
    log?: { action: string; userUUID: string; timestamp: Date }[] | null;
    comments?: { userUUID: string; comment: string; timestamp: Date }[] | null;    
}

export type DocumentType = {
    UUID?: string;
    name?: string;
    metaData?: JSONValue | null;
}