<script setup lang="ts">
import { ref, toRef, reactive, watch, computed, onMounted, onUnmounted, getCurrentInstance, useSlots, useAttrs, unref, shallowRef, shallowReactive, markRaw, isReactive, isRef, h, mergeProps, nextTick } from 'vue';
import LqCol from '../lq-col.vue';
import LqRow from '../lq-row.vue';
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
    <div class="actionbar">
        <div class="actionbutton">
            <div class="material-symbols-outlined">menu</div>
            <div>Skicka orderbekräftelse</div>
        </div>
    </div>
</template>
<style scoped>
.actionbar {
    padding: 10px 16px;
    font-size:13px;
    display: flex;
    justify-content: flex-end;
    align-items: right;
    height: 40px;
}

.actionbutton {
    display: flex;
}

.actionbutton .material-symbols-outlined {
    font-size: 20px !important;
    margin-right: 8px;
}
</style>