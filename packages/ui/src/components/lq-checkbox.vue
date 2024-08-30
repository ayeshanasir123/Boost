<script setup lang="ts">
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';

type Value = boolean | string | number;

const props = withDefaults(defineProps<{
    label?: string,
    items?: [Value, Value]
}>(), {
    items: [false, true]
});
const model = defineModel<Value | undefined | null>();
const size = '20px';

</script>
<template>
    <div class="lq-checkbox">
        <label>
            <div class="checkbox">
                <svg style="background-color: black;" v-if="model === items[1]" xmlns="http://www.w3.org/2000/svg" fill="#fff" width="20" viewBox="0 -960 960 960" version="1.1">
                    <title>checkmark2</title>
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                </svg>
            </div>
            <input type="checkbox" :checked="model === items[1]"
                @change="model = model === items[1] ? items[0] : items[1]">
            <span v-if="label">{{ label }}</span>
        </label>
    </div>
</template>

<style scoped lang="scss">
.lq-checkbox {

    label {
        font-size: 14px;
        font-weight: 500;
        user-select: none;
        cursor: pointer;
        overflow:hidden;
        display: flex;
        gap: 12px;
        align-items: center;

        span{
            border-bottom: 1px solid transparent;
        }
        &:hover{
            span{
                border-bottom: 1px solid #aaa;
            }
        }
        input {
            position: absolute;
            left: -128px;
        }

        &:has(input:focus) {
            .checkbox {
                &:after {
                    border: 2px solid black
                }
            }
        }

        .checkbox {
            position: relative;
            width: v-bind(size);
            height: v-bind(size);

            &:after {
                content: '';
                position: absolute;
                inset: 0;
                border: 1px solid #999;
            }
        }

    }
}
</style>