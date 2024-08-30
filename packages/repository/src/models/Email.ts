export type EmailMessage = {
  UUID?: string | null
  parentUUID?: string | null
  id?: string
  dtFetched?: Date
  mailDate?: string
  fromAddress?: string
  toAddress?: string[]
  cc?: string[] | null
  subject?: string
  body?: string // Assuming this to be a plain text body
  textBody?: string // Alternative to 'body' for plain text representation
  htmlBody?: string // HTML representation of the email body
  attachments?: EmailAttachment[]
  replyTo?: string | null
  messageId?: string
  header?: string // Potentially a JSON string or a complex object structure
  workOrderId?: string | null
  fromDomain?: string | null
  processed?: boolean
  deleted?: boolean
}

export type EmailAttachment = {
  fileName?: string | null
  location?: string | null
  mimeType?: string | null
  size?: number | null // Size in bytes
  content?: Blob | string | null // Could be a binary blob or a base64 encoded string
}
