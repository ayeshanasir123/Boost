// global.d.ts
export {};

declare global {
  interface Window {
    boostConfig: {
      tenantId: string;
      authToken?: string;
      anotherVariable: number;
    };
  }
}