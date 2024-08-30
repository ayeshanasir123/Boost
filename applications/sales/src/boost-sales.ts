import { routes } from './routes';
import { createVueApp } from '@boost/ui';

export default function appCreate() {
    return createVueApp({
        id: 'sales',
        routes
    });
}
