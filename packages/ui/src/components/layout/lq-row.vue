<script setup lang="ts">
import LqCol from './lq-col.vue';
import { useSlots, h, ref, useAttrs } from 'vue';
const $slots = useSlots();
const $attrs = useAttrs();
const sizes = new Set(['xs', 'sm', 'md', 'lg']);
let cols = ref();
const slotted = () => {
    cols.value = Object.entries($attrs as Record<string, string>)
        .filter(([key]) => sizes.has(key))
        .reduce((r, [key, cols]) => (r[key] = cols.toString().match(/\S+/g)!, r), {} as Record<string, string[]>);
    return $slots.default?.().map((vnode, idx) => {
        //const keys = Object.keys($attrs).filter(key => sizes.has(key));
        //if (keys.length) {
        // @ts-ignore
        if (vnode.type?.constructor !== Symbol && vnode.type?.__name !== 'lq-col') {
            const attrs = {} as Record<string, string>;
            sizes.forEach(size => {
                const found = cols.value[size];
                if (found) {
                    attrs[size] = found[Math.min(found.length - 1, idx)];
                }
            });
            return [h(LqCol, attrs, () => vnode)];
        }
        return vnode;
    });
};
</script>
<template>
    <div class="lq-row">
        <slotted />
    </div>
</template>

<style lang="scss">
.lq-col:has(>.lq-row) {
    gap: 0;
}

.lq-row {
    display: flex;
    flex-wrap: wrap;
    align-items:flex-start;
    align-content:flex-start;
    //flex: 1 1 auto;
    margin-inline: -12px;
}

.lq-row + .lq-row {
    margin-top: 0px;
}
</style>