<script lang="ts">
const instances: Set<({ resize: () => void })> = new Set;
const resize = () => instances.forEach(instance => instance.resize());
window.addEventListener('resize', resize);
document.addEventListener('scroll', resize);
</script>
<script setup lang="ts">

defineOptions({ inheritAttrs: false });

import { ref, watch, reactive, nextTick, useSlots, computed, h, onMounted, onBeforeUnmount, type StyleValue, type Component } from 'vue';
// @ts-ignore
import { jdom as $$ } from '@boost/shared';
// @ts-ignore
import { default as $, type jQuery } from 'jquery';

const instance = {
    resize: onResize
};
instances.add(instance);

const emit = defineEmits<{
    open: [Event]
}>();

const isOpen = defineModel<boolean>('open', { default: false });
const isInitialized = ref(false);
watch(isOpen, val => val && (isInitialized.value = true));
watch(isInitialized, () => {
    const { input } = $elems;
    new ResizeObserver(onResize).observe(input[0]);
});

const
    $dialog = ref<HTMLDialogElement>(),
    dialogStyle = ref<StyleValue>(),
    $activator = ref<Component | HTMLElement>(),
    $container = $$.span
    ;

const vElem = {
    mounted($el: HTMLElement) {
        $container.add($el);
    }
}

const $elems = {
    get input(): jQuery<HTMLElement> {
        let { value } = $activator;
        if (!value) return null;
        // @ts-ignore
        if (value?.matches?.('.v-col')) {
            // @ts-ignore
            value = value.firstChild;
        }
        let node = value instanceof Node ? value : (value as any).$el;
        if (!(node instanceof HTMLElement)) {
            while (node = (node as HTMLElement).nextSibling) {
                if (node instanceof HTMLElement) {
                    break;
                }
            }
        }
        return $(node);
    },
    async addFocus() {
        await nextTick();
        this.input.find('.v-field').addClass('focused');
    },
    async removeFocus() {
        await nextTick();
        this.input.find('.v-field').removeClass('focused');
    }
};

const activatorProps = {
    onBlur,
    onFocus,
    onMousedown,
    onKeydown,
    ref: $activator
};

let focusing = false;
function onFocus(e: FocusEvent) {
    isOpen.value = true;
    focusing = true;
    setTimeout(() => focusing = false);
    e.stopImmediatePropagation();
}

function onKeydown(e: KeyboardEvent) {
    let prev = isOpen.value, next = prev;
    if (e.key === 'ArrowDown' && e.altKey && !isOpen.value) {
        next = true;
    } else if (e.key === 'Escape' && isOpen.value) {
        next = false;
    }
    if (prev !== next) {
        isOpen.value = next;
        e.stopImmediatePropagation();
        e.preventDefault();
    }
}

function onMousedown() {
    focusing || (isOpen.value = !isOpen.value);
}

onBeforeUnmount(() => {
    $dialog.value?.remove();
    instances.delete(instance);
});

async function onResize() {
    const { input } = $elems;
    if (!input) return;

    dialogStyle.value = {
        minWidth: input.prop('offsetWidth') + 'px'
    }
    await nextTick();

    const parent = document.querySelector('.modal-dialog') ?? document.querySelector('body');
    parent!.appendChild($dialog.value!);
    const prect = $(parent!).offset();
    const rect = input.offset();
    let left = rect.left - prect!.left;
    if (rect.left + $dialog.value!.offsetWidth > window.innerWidth) {
        left = rect.left + input.prop('offsetWidth') - $dialog.value!.offsetWidth;
    }
    Object.assign(dialogStyle.value, {
        left: left + 'px',
        top: rect.top - prect!.top + input.prop('offsetHeight') + 'px',
    });
}

watch(isOpen, async val => {
    if (!val) return;
    await nextTick();
    const { input } = $elems;
    const parent = document.querySelector('.modal-dialog') ?? document.querySelector('body');
    parent!.appendChild($dialog.value!);
    onResize();
    let stopped = false;
    const e = {
        stopImmediatePropagation() {
            stopped = true;
        }
    };
    Object.setPrototypeOf(e, Event.prototype);

    emit('open', e as Event);
    if (!stopped) {
        input.focus();
    }
});

async function onBlur(e: FocusEvent) {
    if ($dialog.value === ((e.relatedTarget as HTMLElement)?.closest('dialog'))) {
        await $elems.addFocus();
        return;
    }
    isOpen.value = false;
}

async function onDialogBlur(e: FocusEvent) {
    if ($.contains($elems.input, e.relatedTarget as HTMLElement)) {
        return;
    }
    await $elems.removeFocus();
    isOpen.value = false;
}

</script>
<template>
    <slot name="activator" :="activatorProps" />
    <dialog ref="$dialog" v-if="isInitialized" :open="isOpen" :style="dialogStyle" @focusout="onDialogBlur">
        <slot />
    </dialog>
</template>

<style scoped lang="scss">
dialog {
    z-index: 100000;
    background: white;
    color: #555;
    border: none;
    max-height: 400px;
    max-width: 800px;
    overflow: auto;
    outline: none;
    box-shadow: 0 0 16px rgba(0, 0, 0, .2);

    .no-found {
        font-size: 12px;
        padding: 8px 16px;
    }
}
</style>