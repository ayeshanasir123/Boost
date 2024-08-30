import { ref, toRef, reactive, render, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';
import { findElem, onMountedElem } from '@boost/shared';
import $ from 'jquery';

export function useExpose(expose: Record<string, any>) {

    onMountedElem($me => {
        let appendTo = $me[0];
        if (!(appendTo instanceof HTMLElement)) {
            appendTo = appendTo.parentElement;
            if (!appendTo) {
                console.error('Can\'t expose since no parent element found');
                return;
            }
        }
        const $span = $('<span>', { class: 'lq-expose', exposed: Object.keys(expose).join(' '), style: 'visibility:hidden; position: absolute' })
            .appendTo(appendTo)
            .on('expose', () => $span[0].dispatchEvent(new CustomEvent('exposed', { bubbles: true, detail: { exposed: expose } })))
    });
}

export function getExposed(...names: string[]) {
    const self = getCurrentInstance()!;
    return function () {
        const $me = findElem(self, names.map(name => `.lq-expose[exposed~=${name}]`).join(','));
        const out = {} as { [key: string]: any[] };
        $me.on('exposed', (e: any) => {
            const { exposed } = e.originalEvent.detail;
            for (const name in exposed) {
                (out[name] ??= []).push(exposed[name])
            }
        });
        $me.each((_: any, elem: EventTarget) => elem.dispatchEvent(new Event('expose')));
        return out;
    }
}

export function useSaveData() {

    const self = getCurrentInstance()!;
    const saving = ref(false);
    const savingError = ref('');

    //const send = self?.props.save;

    async function save() {

        const $me = findElem(self, '.lq-expose[exposed~=save],.lq-expose[exposed~=saveAfter]');
        const saves: Array<() => Promise<void>> = [];
        const savesAfter: Array<() => Promise<void>> = [];
        $me.on('exposed', (e: any) => {
            const { save, saveAfter } = e.originalEvent.detail.exposed;
            save && saves.push(save);
            saveAfter && saves.push(saveAfter);
        });
        $me.each((_: any, elem: EventTarget) => elem.dispatchEvent(new Event('expose')));

        saving.value = true;
        savingError.value = '';

        const collect = [];

        try {

            for (const fn of saves) {
                collect.push(await fn());
                await nextTick();
            }
            collect.push(await (self.props as any).save?.());

            await nextTick();

            for (const fn of savesAfter) {
                collect.push(await fn());
                await nextTick();
            }
        } catch (e) {
            savingError.value = (e as Error).message;
        } finally {
            saving.value = false;
        }

        const results = collect.filter(Boolean);
        return results.length === 1 ? results[0] : results;
    }

    return {
        save,
        saving,
        savingError
    }
}