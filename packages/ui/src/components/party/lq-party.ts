import { type Organization, type Person } from '@boost/repository';
// @ts-ignore
export interface Customer extends Organization, Person { };
export class Customer implements Customer {
    get customerName() {
        if ('name' in this) {
            return this.name;
        }
        const p = this as Person;
        return ((p.firstname ?? '') + ' ' + (p.lastname ?? '')).trim();
    }
}