export interface ComponentItem {
  name: string
  component: string
  modelKey: string
  updateEvent: string
  props?: Record<string, any>
  children?: ComponentItem[]
}
