import { type ComponentItem } from './ComponentItem'
// Define a layout type
export interface Layout {
  id: string
  componentItems: ComponentItem[]
  metaData?: Record<string, any>
}
