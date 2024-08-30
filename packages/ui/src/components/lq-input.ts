import { createTextVNode, h, type VNode, mergeProps, nextTick } from 'vue';
//import LqClearButton from './lq-clear-button.vue';
//import LqAddButton from './lq-add-button.vue';
import LqDropdownButton from './lq-dropdown-button.vue';
import { VCol } from 'vuetify/components';

export default function (props: {
    addButton?: boolean | string
    dropdownButton?: boolean
    required?: boolean
    label?: string
    cols?: number
    modelValue?: any
    hint?: string
    width?: number | string
    ['onUpdate:modelValue']?: () => void
    onFocusNext?: (next: HTMLInputElement, delta: number) => boolean | undefined
    [K: string]: any
}, { slots, emit }: { emit: Function, slots: Record<string, (...args: any[]) => Array<VNode>> }) {

    const { width, hint, addButton, dropdownButton, required, label, cols, onFocusNext, ...attrs } = props;

    const hasDropdown = dropdownButton ?? attrs['dropdown-button'];

    const $slots: Record<string, () => any> = (hasDropdown || hasDropdown === '') ? {
        'append-inner': () => {
            const out: VNode[] = [];
            /*if (!required && attrs.modelValue?.toString()) out.push(h(LqClearButton, {
                onMousedown: (e: MouseEvent) => {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    emit('update:modelValue', null);
                    emit('input-clear');
                }
            }));*/
            out.push(h(LqDropdownButton));
            return out;
        }
    } : {};

    const out = slots.default().map(vnode => {

        const children = {} as Record<string, VNode>;
        const from = (vnode.children ?? {}) as Record<string, VNode>;

        for (const k in from) {
            if (!k.startsWith('_')) children[k] = from[k];
        }

        const props = {};

        if (attrs.placeholder?.length > 20) {
            props.class = 'small-placeholder';
        }

        const boxProps = { class: 'lq-input' } as any;
        if (width) {
            if (typeof width === 'string' && width.match(/^\d+$/) || typeof width === 'number') {
                boxProps.style = `width:${width}px`;
            } else {
                boxProps.style = `width:${width}`;
            }
        }

        return h('div', boxProps, [
            label ? h('label', [
                createTextVNode(label),
                required ? h('span', { style: 'color:red' }, ' *') : null
            ]) : null,
            h(vnode, mergeProps(props,
                attrs,
                {
                    onFocusin(e: FocusEvent) {
                        (e.target as HTMLInputElement).select?.();
                    },
                    onSelectValue: ({ target }: { target?: HTMLInputElement }) => {
                        focusNext(1, target);
                    },
                    onKeydown(e: KeyboardEvent) {
                        if (e.ctrlKey || e.altKey) return;
                        if (e.key === 'Tab') e.preventDefault();
                        if (!['Enter', 'Tab'].includes(e.key)) return;
                        focusNext(e.shiftKey ? -1 : 1);
                    }
                }
            ), { ...children, ...$slots })]);
    });

    if (cols) {
        return h(VCol, { cols }, () => out);
    }
    return out;


    async function focusNext(delta = 1, target?: HTMLInputElement) {

        await new Promise(r => setTimeout(r));

        const elems = Array.from(document.querySelectorAll('input, textarea, [contenteditable]')) as HTMLInputElement[];
        const focused = document.querySelector(':focus') as HTMLInputElement;
        if (focused.tagName === 'TEXTAREA') return;
        if (target && focused !== target) return; //avoid double nav

        let idx = elems.indexOf(focused);
        const from = idx;
        while ((idx += delta) < elems.length) {
            if (elems[idx].tabIndex == -1 && (elems[idx].value || elems[idx].hasAttribute('skip-nav'))) continue;
            break;
        }
        if (idx === elems.length) {
            while ((idx += delta) < from) {
                if (elems[idx].tabIndex == -1 && elems[idx].value) continue;
                break;
            }
        }
        if (idx === from) return;
        // if (idx >= elems.length) {
        //     idx = 0;
        // } else if (idx < 0) {
        //     idx = elems.length - 1;
        // }
        const whatNext = onFocusNext?.(elems[idx], delta);
        if (whatNext === false) {
            return;
        } else if (whatNext === true) {
            return focusNext(delta);
        }
        elems[idx]?.focus();
        elems[idx]?.select?.();
    }
}