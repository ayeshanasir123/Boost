import { type TimWorkOrder } from '@boost/repository';

export interface WorkOrder extends TimWorkOrder { };
export class WorkOrder implements WorkOrder {
  get position() {
    return this.addressEntity?.googleDataEntity.results[0].geometry.location
  }
}
