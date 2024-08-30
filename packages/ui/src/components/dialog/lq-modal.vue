<script setup lang="ts">

import { useAttrs, ref, watch, onMounted, render, shallowRef, h, useSlots, nextTick, type Component, getCurrentInstance } from 'vue';
import { useSaveData, getExposed } from '../_common/utils';
import LqDialogTabs from './lq-dialog-tabs.vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
    title?: string;
    save?: () => Promise<void>,
    tabs?: InstanceType<typeof LqDialogTabs>['$props']['items'],
    content?: () => Promise<{ default: Component }>
    load?: () => Promise<void>
}>();

const $emit = defineEmits<{
    close: [],
    saved: [result: any]
}>();

const tabs = ref<InstanceType<typeof LqDialogTabs>['$props']['items']>(props.tabs);

const $content = shallowRef<Component>();

const open = defineModel<boolean>('open');
const currentTab = defineModel<InstanceType<typeof LqDialogTabs>['$props']['modelValue']>('tab');

const { save, saving, savingError } = useSaveData();
const extraProps = getExposed('exposeToParent');

const $dialog = ref<HTMLDialogElement>();
const $box = ref<HTMLDivElement>();
const $attrs = useAttrs();

(async () => {
    try {
        await props.load?.();
    } catch (e) {
        savingError.value = (e as Error).message;
    }
})();

onMounted(async () => {
    if ('fixed-width' in $attrs) {
        $box.value!.style.width = $box.value!.offsetWidth + 'px';
    }
});

watch(open, async val => {
    if (val) {
        props.content && !$content.value && ($content.value = (await props.content()).default);
        await nextTick();
        const exposed = extraProps().exposeToParent?.[0];
        if (exposed) {
            exposed.tabs && (tabs.value = exposed.tabs);
            exposed.tab && (currentTab.value = exposed.tab);
            exposed['onUpdate:tab'] && watch(currentTab, val => {
                exposed['onUpdate:tab'](val);
            });
        }
        await nextTick();
        $dialog.value!.showModal();
    }
}, { immediate: true });

async function doSave() {
    const saved = await save();
    $emit('saved', saved);
    savingError.value || (open.value = false);
}

watch($dialog, val => val && autoFocus());

function autoFocus() {
    setTimeout(() => {
        if (!$dialog.value!.querySelector('input[autofocus]')) {
            ($dialog.value!.querySelector('input:not([disabled])') as HTMLInputElement)?.focus();
        }
    });
}

function loader(fn: () => Promise<{ default: Component }>) {
    const component = ref<Component>();
    (async () => {
        component.value = (await fn()).default;
    })();
    return component;
}

const $slots = defineSlots<{
    default?(props: { loader: typeof loader }): any
    title?(): any
}>();

const slotted = () => {
    if (props.content) {
        return $content.value ? h($content.value) : null;
    }
    return $slots.default?.({ loader });
}

function close() {
    open.value = false;
    $emit('close');
}

</script>

<template>
    <teleport to="body">
        <dialog @keydown.escape.stop @autofocus="autoFocus" v-if="open" ref="$dialog"
            class="v-theme--light modal-dialog"
            @close="close">
            <div ref="$box" class="dialog-box">
                <template v-if="title || $slots.title">
                    <div class="title">
                        <div>
                            <slot name="title">{{ title }}</slot>
                        </div>
                        <div v-if="save" class="button-bar">
                            <v-btn @click="$dialog?.close()" style="box-shadow: none">Cancel</v-btn>
                            <v-btn @click="doSave" :loading="saving" class="bg-green"
                                style="box-shadow:none">Save</v-btn>
                        </div>
                        <!-- <lq-clear-button @click="close" /> -->
                    </div>
                </template>
                <div v-if="savingError" class="error">
                    {{ savingError }}
                </div>
                <lq-dialog-tabs v-if="tabs" :items="tabs" v-model="currentTab">
                    <template #content="{ content }">
                        <div v-if="content" class="content">
                            <component :is="content" />
                        </div>
                    </template>
                </lq-dialog-tabs>
                <div v-if="$slots.default || content" class="content">
                    <slotted />
                </div>
            </div>
        </dialog>
    </teleport>
</template>

<style scoped lang="scss">
dialog {
    border: none;
    outline: none;
    z-index: 1000;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .1);
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;

    .dialog-box {
        //min-width: 600px;
        // max-width: 100%;
        min-height: 400px;
        max-height: 100%;
        background-color: white;
        position: relative;
        border-radius: 5px;
        box-shadow: 0 0 15px rgba(0, 0, 0, .15);
        display: flex;
        flex-direction: column;
        width: 30%;

        > .error {
            max-height: 128px;
            overflow-y: auto;
            padding: 8px 32px;
            background-color: #fee;
            border-top: 1px solid #faa;
            border-bottom: 1px solid #faa;
            font-size: smaller;

            &:has(+.lq-dialog-tabs) {
                margin-bottom: 8px;
                position: relative;

                &:after {
                    content: '';
                    display: block;
                    background-color: #eee;
                    position: absolute;
                    bottom: -9px;
                    left: 0;
                    right: 0;
                    height: 8px;

                }
            }
        }

        > .title {
            display: flex;
            align-items: center;
            gap: 32px;
            position: relative;
            padding: 12px 32px 8px 32px;
            border-radius: 5px 5px 0 0;
            font-size: 18px;
            background-color: #eee;
            //border-bottom: 1px solid #ddd;

            &:has(+.lq-dialog-tabs) {
                border-bottom: none;
            }

            .button-bar {
                flex-grow: 1;
                justify-content: right;
                display: flex;
                gap: 12px;
            }

            .clear-button {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                inset: 0;
                left: calc(100% - 54px);

                :deep(svg) {
                    transform: scale(1.1);
                    top: -1px;
                    left: -3px;
                }
            }
        }

        .content {
            overflow: auto;
            padding: 32px;
            padding-top: 24px;
        }
    }
}
</style>