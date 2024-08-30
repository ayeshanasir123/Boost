import type { App } from 'vue';
import vuetify from "./vuetify";
import { i18n, plugin as ui } from '../index';
import { pinia } from '@boost/repository';

export async function initializeVueAppPlugins(app: App) {
    app.use(vuetify);
    app.use(i18n);
    app.use(ui);
    app.use(pinia);
}