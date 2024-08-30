import { useSalesOrderStore } from '@boost/repository';

export async function beforeEnter(
    to: any,
    from: any,
    next: (to?: any) => void
  ): Promise<void> {

    if (to.name === 'sales-order.header' || to.name === 'sales-order.items') {
        next(); // If already on the correct route, proceed without redirecting
        return;
    }

    if (to.params.salesOrderUUID === 'new') {
        // Redirect to 'sales-order.header' with the same params
        next({ name: 'sales-order.header', params: to.params });
    } else {
        const salesOrderStore = useSalesOrderStore();
        await salesOrderStore.getSalesOrderByUUID(to.params.salesOrderUUID);
        
       // Redirect to 'sales-order.items' with the same params
       next({
            name: 'sales-order.items',
            params: to.params
        });
    }    
}