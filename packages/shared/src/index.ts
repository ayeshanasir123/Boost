export * from './lib/BoostApi'
//@ts-ignore
export * from './lib/utils';
import jdom from './lib/jdom';
import { useShortcuts } from './composables/useShortcuts';
import { defineShortcuts } from './composables/defineShortcuts';
export { jdom, useShortcuts, defineShortcuts };
