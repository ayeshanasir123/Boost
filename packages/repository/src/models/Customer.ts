import { type Organization } from "./Organization";
import { type Person } from "./Person";

type CustomerCommonFields = {
    customerUUID?: string;
    customerType?: string;
  };

export type Customer = 
    | ( CustomerCommonFields & Organization ) 
    | ( CustomerCommonFields & Person );