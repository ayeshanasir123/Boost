<script setup lang="ts">
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';

import LqDropdown from '../lq-dropdown.vue';
defineOptions({
    inheritAttrs: false
});

defineProps<{
    idx: number,
    length: number,
}>()

const icons = import.meta.glob('./*.svg', { eager: true, as: 'raw' });

const $emit = defineEmits<{
    'add-above': [],
    'add-below': [],
    'move-up': [],
    'move-down': [],
    'activate': [],
    delete: []
}>();

const opened = ref(false);

function doEmit(what) {
    $emit(what);
    opened.value = false;
}

</script>
<template>
    <td class="grid-menu-cell" width="48">
        <lq-dropdown v-model:open="opened">
            <template #activator="props">
                <div>
                    <input readonly tabindex="-1" skip-nav :="mergeProps($attrs, props)">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                        width="24px" fill="#5f6368">
                        <path
                            d="M480-189.23q-24.75 0-42.37-17.63Q420-224.48 420-249.23q0-24.75 17.63-42.38 17.62-17.62 42.37-17.62 24.75 0 42.37 17.62Q540-273.98 540-249.23q0 24.75-17.63 42.37-17.62 17.63-42.37 17.63ZM480-420q-24.75 0-42.37-17.63Q420-455.25 420-480q0-24.75 17.63-42.37Q455.25-540 480-540q24.75 0 42.37 17.63Q540-504.75 540-480q0 24.75-17.63 42.37Q504.75-420 480-420Zm0-230.77q-24.75 0-42.37-17.62Q420-686.02 420-710.77q0-24.75 17.63-42.37 17.62-17.63 42.37-17.63 24.75 0 42.37 17.63Q540-735.52 540-710.77q0 24.75-17.63 42.38-17.62 17.62-42.37 17.62Z" />
                    </svg>
                </div>
            </template>
            <div class="grid-menu">
                <div @click="doEmit('add-above')">
                    <span v-html="icons['./add-row-above.svg']"></span>{{ $t('Add row above') }}
                </div>
                <div @click="doEmit('add-below')">
                    <span v-html="icons['./add-row-below.svg']"></span>{{ $t('Add row below') }}
                </div>
                <div v-if="idx > 0" @click="doEmit('move-up')">
                    <span v-html="icons['./move-up.svg']"></span>{{ $t('Move row up') }}
                </div>
                <div v-if="idx < length - 1" @click="doEmit('move-down')">
                    <span v-html="icons['./move-down.svg']"></span>{{ $t('Move row down') }}
                </div>
                <div @click="doEmit('delete')">
                    <span class="delete material-symbols-outlined">delete</span>{{ $t('Delete row') }}
                </div>
            </div>
        </lq-dropdown>
    </td>
</template>
<style scoped lang="scss">
.grid-menu {

    user-select: none;

    > div {
        font-size: 13px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        cursor: pointer;
        padding: 4px 16px;
        gap: 8px;

        > span {
            position: relative;
            top: 2px;

            &.delete {
                top: -2px;
            }
        }

        &:hover {
            background-color: #eee;
        }
    }
}

.grid-menu-cell {
    position: relative;
    height: 32px;

    svg {
        pointer-events: none;
    }

    > div {
        position: absolute;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        inset: 0;

        > input {
            outline: none;
            cursor: pointer;
            color: transparent;
            position: absolute;
            inset: 0;

            &:hover {
                background-color: rgba(0, 0, 0, .05);
            }
        }
    }
}
</style>