import { type EmailMessage } from './Email'
import { type LogEntry } from './LogEntry'
import type { Organization } from './Organization';
import type { Person } from './Person';
import type { File } from './File';

interface StatusDetail {
    id: string;
    color: string;
    description: string;
}
export const taskStatusDetails: StatusDetail[] = [
    {
        id: "NEW",
        color: "#add8e6",
        description: "New",
    },
    {
        id: "NOT_STARTED",
        color: "#add8e6",
        description: "Not Started",
    },
    {
        id: "IN_PROGRESS",
        color: "#0000ff",
        description: "In Progress",
    },
    {
        id: "PAUSED",
        color: "#ffff00",
        description: "Paused",
    },
    {
        id: "REVIEWING",
        color: "#add8e6",
        description: "Reviewing",
    },
    {
        id: "COMPLETED",
        color: "#008000",
        description: "Completed",
    },
];

export enum TaskStatus {
    NEW = 'NEW',
    UNASSIGNED = 'UNASSIGNED',
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    WAITING = 'WAITING'
    // Add other statuses as defined in your schema
}



export type Task = {
    prefix?: string | null
    number?: number
    UUID?: string
    categoryUUID?: string | null
    identifier?: string | null
    parentUUID?: string | null
    customer?: Organization | Person | null
    customerPartyName?: string | null
    customerPartyUUID?: string | null
    originatorPartyName?: string | null
    originatorPartyUUID?: string | null
    accountingPartyName?: string | null
    accountingPartyUUID?: string | null
    agreementUUID?: string | null
    projectName?: string | null
    projectUUID?: string | null
    objectiveUUID?: string | null
    title: string | null
    description?: string | null
    descriptionDelta?: string | null
    location?: string | null
    addressUUID?: string | null
    estimate?: number | null // decimal(20,2) is represented as number in TypeScript
    plannedWeek?: number | null
    plannedStart?: Date | null
    plannedEnd?: Date | null
    actualStart?: Date | null
    actualEnd?: Date | null
    dueDate?: Date | null
    weight?: number
    assignedPersonName?: string | null
    assignedPersonUUID?: string | null
    responsiblePersonName?: string | null
    responsiblePersonUUID?: string | null
    originatorPersonName?: string | null
    originatorPersonUUID?: string | null
    dependsOnUUID?: string | null
    status?: TaskStatus
    metaData?: Record<string, any> | null // Indicates an object with string keys and any type of values
    contexts?: string | null // Same assumption as metaData
    tags?: string | null // Same assumption as metaData
    sortOrder?: number
    createdByUUID?: string
    createdAt?: Date // TIMESTAMP in SQL is best represented as Date in TypeScript
    subTasks?: Task[] // Array of sub-tasks
    gridObject?: boolean // If this is full object or for grid
    assignments?: Assignment[] // Array of assignments
    originatingEmailUUID?: string | null
    originatingEmail?: EmailMessage | null
    comments?: Comment[] | null // Array of comments
    log?: LogEntry[] | null // Array of action logs,
    attachments?: File[] | null // Array of attachments
}

export type Assignment = {
    UUID: string
    entityUUID: string
    resourceUUID: string
    metaData?: Record<string, any> // Indicates an object with string keys and any type of values
}


export type UnifiedInboxItem = {
    UUID?: string;
    originatorPersonUUID?: string | null;
    originatorPersonName?: string | null;
    originatorOrganizationName?: string | null;
    originatorOrganizationUUID?: string | null;
    assignedPersonUUID?: string | null;
    assignedPersonName?: string | null;
    title: string;
    categories?: string[] | null;
    description?: string | null;
    taskUUID?: string | null;
    task?: Task | null;
    emailUUID?: string | null;
    email?: EmailMessage | null;
    cc?: string[];
    objectiveUUID?: string | null;
    goalUUID?: string | null;
    status?: TaskStatus | null;
    createdByUUID?: string | null;
    createdAt?: Date | null;
    managedByUUID?: string | null;
    managedAt?: Date | null;
    metaData?: Record<string, any> | null; // Indicates an object with string keys and any type of values
    comments?: Comment[] | null; // Array of comments
    log?: logEntry[] | null; // Array of action logs
}

export interface logEntry {
    UUID: string;
    entityUUID: string;
    entityType: string;
    action: string;
    createdByUUID: string;
    createdAt: Date;
    metaData: Record<string, any>; // Indicates an object with string keys and any type of values
}


export type Event = {
    uuid: string // Unique identifier for the event
    parentUUID?: string | null // UUID for the parent event, if any
    name: string // Name of the event
    description?: string // Name of the event
    allDay?: boolean // Whether the event lasts all day
    startDate: Date // Start date and time of the event
    endDate: Date // End date and time of the event
    resourceId?: string | null // UUID for the resource associated with this event
    durationUnit?: DurationUnit // Unit for the duration of the event
    percentDone?: number // Completion percentage of the event
    draggable?: boolean // Whether the event is draggable (for UI purposes)
    resizable?: boolean // Whether the event is resizable (for UI purposes)
    cls?: string | null // Additional CSS class(es) for the event
    eventColor?: string | null // Color for the event
    eventStyle?: string | null // Style for the event
    location?: string // Place of the event
    comments?: Comment[] | null // Array of comments
    log?: LogEntry[] | null // Array of action logs
}

export enum DurationUnit {
    Millisecond = 'millisecond',
    Second = 'second',
    Minute = 'minute',
    Hour = 'hour',
    Day = 'day'
    // Add other duration units as needed
}

export type Comment = {
    UUID: string
    entityUUID: string
    entityType: string
    comment: string
    createdByUUID: string
    createdAt: Date
    action: string | null
    metaData?: Record<string, any> // Indicates an object with string keys and any type of values
}