import type { App } from 'vue';
import vuetify from "./vuetify";
import { i18n, plugin as ui } from '../index';
import { initializeStores } from '@boost/repository';
import { createPinia } from 'pinia';
import pahoMqttPlugin from "./mqtt";

export async function initializePlugins(app: App) {
    app.use(vuetify);
    app.use(i18n);
    app.use(ui);

    const pinia = createPinia();

    app.use(pinia);
    await initializeStores(pinia);
    app.use(pahoMqttPlugin);
}