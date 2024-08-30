import type { Edge, Node } from '@vue-flow/core'

export type FlowDiagram = {
  UUID: string | null;
  title: string | null;
  description: string | null;
  nodes: Node[];
  edges: Edge[];
  createdAt?: Date;
  createdByUUID?: string;
  updatedAt?: Date;
  deletedAt?: Date | null;
}