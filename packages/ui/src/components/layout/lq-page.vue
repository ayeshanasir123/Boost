<script setup lang="ts">
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';
import LqActionButton from '../lq-action-button.vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

import type { Location } from '../lq-action-button.vue';

const props = defineProps<{
    title?: string,
    save?: Location | ((...args: any[]) => Promise<Location> | Location),
    cancel?: Location | ((...args: any[]) => Promise<Location> | Location),
    add?: Location | ((...args: any[]) => Promise<Location> | Location),
    saveTitle?: string,
    addTitle?: string,
    cancelTitle?: string
}>();

const error = ref('');

</script>

<template>
    <div class="lq-page">
        <div class="lq-page-header">
            <div>
                <slot name="title">
                    <h2>{{ title }}</h2>
                </slot>
            </div>
            <div class="headerbar">
                <slot name="headerbar">
                </slot>
            </div>
            <div class="buttons">
                <slot name="buttons" />
                <lq-action-button v-if="cancel" class="cancel" v-model:error="error" :action="cancel">
                    <slot name="cancel-title">{{ cancelTitle ?? $t('Cancel') }}</slot>
                </lq-action-button>
                <lq-action-button v-if="save" v-model:error="error" color="green" :action="save">
                    <slot name="save-title">{{ saveTitle ?? $t('Save') }}</slot>
                </lq-action-button>
                <lq-action-button v-if="add" v-model:error="error" color="green" :action="add">
                    <slot name="add-title">{{ addTitle ?? $t('Add') }}</slot>
                </lq-action-button>
            </div>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="lq-page-content">
            <slot />
        </div>
    </div>
</template>
<style scope lang="scss">
.lq-page {

    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;

    .lq-page-header {
        padding: 12px 32px 12px 32px;
        background: #f7f9fb;
        border-bottom: 1px solid #dcdcdc;
        display: flex;
        align-items: center;
        gap: 32px;

        h2 {
            //height: 36px;
            //line-height: 36px;
            font-size: 26px !important;
            margin: 0;
        }

        .headerbar {
            display: flex;
            justify-content: right;
            flex-grow: 1;
        }

        .buttons {
            min-height: 36px;
            display: flex;
            justify-content: right;

            button {
                margin-left: 10px;
                min-width: 128px;
                //text-transform: uppercase;
                box-shadow: none;
            }
        }
    }

    > .error {
        padding: 8px 32px;
        background-color: #fee;
        border-top: 1px solid #faa;
        border-bottom: 1px solid #faa;
        font-size: smaller;
    }

    .lq-page-content {
        padding: 32px;
        padding-top: 0;
        flex-grow: 1;
        overflow-y: scroll;
        overflow-x: hidden;
    }
}
</style>
