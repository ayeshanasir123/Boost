import type { App } from 'vue';
import vuetify from "./vuetify";
import { i18n, plugin as ui } from '@boost/ui';
import { initializeStores } from '@boost/repository';
import { type Pinia } from 'pinia';
import pahoMqttPlugin from "./mqtt";

export async function initializePlugins(app: App) {
    app.use(vuetify);
    app.use(i18n);
    app.use(ui);

    app.use(pahoMqttPlugin);    

    const pinia:Pinia = await initializeStores();
    app.use(pinia);
}