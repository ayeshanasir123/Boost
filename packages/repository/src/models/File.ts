import type { JSONValue } from "./JSONValue";

export type File = {
    clientFilename: string | null;
    contentSubType: string | null;
    contentType: string | null;
    createdAt?: Date;
    createdByUUID?: string;
    deletedAt: Date | null;
    deletedByUUID: string | null;
    entityId?: string;
    entityType?: string;
    fileId?: string;
    UUID?: string;
    fileSize: number | null;
    metaData: JSONValue | null;
    location: string | null;
    parentUUID: string | null;
    serverFilename: string | null;
}