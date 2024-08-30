import type { ComponentInternalInstance } from 'vue';
import type { jQuery } from 'jquery';
export function findElem(selector: ComponentInternalInstance | string, arg2?: string): jQuery<HTMLElementTagNameMap>;
export function onMountedElem(cb: (elem: jQuery<HTMLElementTagNameMap>) => void): void;