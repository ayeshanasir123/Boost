import { type JSONValue } from "./JSONValue"

export type LogEntry = {
    UUID: string
    entityUUID: string
    entityType: string
    action: string
    createdByUUID: string
    createdAt: Date
    metaData: JSONValue
  }