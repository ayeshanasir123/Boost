<script setup lang="ts">
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';

import { type RouteRecordRaw } from 'vue-router';
import { LqError } from '@boost/ui';

const props = defineProps<{
    items: Record<string, string | [string, RouteRecordRaw['component']]>,
}>();

const $tabs = ref<HTMLElement>();

const model = defineModel<string>();
const $slots = useSlots();

model.value ??= Object.keys(props.items)[0];

onMounted(() => {
    $tabs.value!.closest('.modal-dialog')?.addEventListener('keydown', (e: KeyboardEvent) => {
        // @todo: doesn't work
        if (e.key === 'Tab' && e.ctrlKey) {
            state.idx += e.shiftKey ? -1 : 1;
            e.stopPropagation();
            e.preventDefault();
        }
    });
});

const state = {
    get keys() {
        return Object.keys(props.items);
    },
    get idx() {
        return this.keys.indexOf(model.value!);
    },
    set idx(idx) {
        if (idx >= this.keys.length) {
            idx = 0;
        } else if (idx < 0) {
            idx = this.keys.length - 1;
        }
        model.value = this.keys[idx];
    }
};

const parsed = computed(() => {
    const header: Record<string, string> = {}, components: Record<string, RouteRecordRaw['component']> = {};
    for (const name in props.items) {
        if (Array.isArray(props.items[name])) {
            [header[name], components[name]] = props.items[name];
        } else {
            header[name] = props.items[name];
        }
    }
    return { header, components };
});

const tabs = () => {
    if (!$slots.default) {
        if (!Object.keys(parsed.value.components).length) return;
        const out = [];
        for (const [key, comp] of Object.entries(parsed.value.components)) {
            if (typeof comp !== 'function') {
                out.push(h('div', { style: model.value === key ? '' : 'display:none' }, h(comp, { key })));
            }
        }
        return out;

    }
    const visibleIdx = Object.keys(props.items).indexOf(model.value!);
    return $slots.default!().filter((_, idx) => idx === visibleIdx);
};

async function activateTab(key: string) {
    const comp = parsed.value.components[key];
    if (typeof comp === 'function') {
        let factory = (await comp()).default;
        if (!factory) {
            factory = () => h(LqError, {
                error: `
                Failed to load component for the tab "$key".<br/>
                Load function provided:<br/>
                ${comp}
            `});
        }
        parsed.value.components[key] = factory;
    }
    model.value = key;
    $tabs.value?.dispatchEvent(new Event('autofocus', { bubbles: true }));

}

</script>
<template>
    <div class="lq-dialog-tabs" ref="$tabs">
        <div class="route-tabs">
            <v-card class="router-buttons">
                <v-btn class="route-button" :ripple="false" :class="{ 'v-btn--active': model !== key }"
                    v-for="(item, key) in parsed.header"
                    :key
                    @mousedown="activateTab(key)">{{
                        // @ts-ignore
                        item
                    }}</v-btn>
            </v-card>
        </div>
    </div>
    <slot v-if="$slots.content || $slots.default" name="content"
        :="{ content: Object.entries(parsed.components).length || $slots.default ? tabs : null }" />
    <tabs v-else />
</template>

<style scoped lang="scss">
.lq-dialog-tabs {
    background: #eee;
    //margin: -32px;
    //margin-bottom: 24px;
    padding-inline: 32px;
}

.route-tabs {
    display: flex;
    flex-wrap: nowrap;
}

.route-tabs-tab {
    .router-block {
        padding: 16px
    }
}

.lq-router-page {
    box-shadow: none;
    padding: 24px 16px;
}

.router-buttons {

    // &::before {
    //     content: '';
    //     position: absolute;
    //     display: block;
    //     height: 5px;
    //     inset: 0;
    //     background: linear-gradient(to bottom, rgba(0, 0, 0, .1) 0%, transparent 100%);
    // }

    box-shadow: none;
    border-radius: 4px 4px 0 0;

    .route-button {

        font-weight: normal;
        border-radius: 0;
        border: none;
        box-shadow: none;

        &:not(.v-btn--active) {
            position: relative;

            &::before {
                content: '';
                position: absolute;
                display: block;
                height: 2px;
                inset: 0;
                background: rgb(0, 162, 255);
            }

        }
    }
}
</style>