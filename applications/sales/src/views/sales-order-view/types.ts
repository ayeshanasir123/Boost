import type { Ref, InjectionKey } from 'vue';
import type { SalesOrder } from '@boost/repository';
export const provideOrder = Symbol() as InjectionKey<Ref<SalesOrder>>;