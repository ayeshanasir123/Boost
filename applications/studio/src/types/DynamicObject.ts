export interface DynamicObject {
  id: string
  name: string
  [key: string]: any // Allow additional properties dynamically
}
