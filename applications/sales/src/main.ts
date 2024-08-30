import { routes } from './routes';
import {createVueApp} from '@boost/ui';

const app = createVueApp({
    id:'sales',
    routes,
});

app.mount('#app')