<script setup lang="ts">
defineOptions({
    inheritAttrs: false
});
const model = defineModel<string>();
</script>
<template>
    <div class="lq-common-input" :class="{ 'has-append': $slots['append-inner'] }">
        <div class="outline"></div>
        <input :="$attrs" v-model="model">
        <div v-if="$slots['append-inner']" class="append-inner">
            <slot name="append-inner"></slot>
        </div>
    </div>
</template>

<style lang="scss">
.lq-input {
    label {
        font-size: 13px;
        color: #555 !important;
        white-space: nowrap;
    }

    &:has(input:focus, input:hover) {
        label {
            color: #000 !important
        }
    }
}
</style>

<style scoped lang="scss">
.lq-common-input {
    position: relative;

    &:has(input:focus, .focused) {
        .outline {
            border: 2px solid black;
        }
    }

    &:has(input:hover:not([disabled])) {
        .outline {
            border-color: #333;
        }
    }

    .outline {
        z-index: 1;
        position: absolute;
        inset: 0;
        pointer-events: none;
        border: .8px solid #9E9E9E;
        border-radius: 2px;
    }

    &.has-append {
        input {
            padding-right: 0;
        }
    }


    input {
        background-color: white;
        position: relative;
        z-index: 0;
        font-size: 14px;
        border: none;
        outline: none;
        padding: 8px 12px 6px 12px;
        letter-spacing: 0.009375em;
        width: 100%;

        &[disabled] {
            background-color: #eee;
        }

        &.small-placeholder::placeholder {
            font-size: 11px;
        }

        &.error-format {
            background: rgba(255, 230, 230) !important;
        }

    }

    .append-inner {
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        display: flex;
    }
}
</style>