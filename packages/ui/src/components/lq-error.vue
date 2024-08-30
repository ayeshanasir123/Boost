<script setup lang="ts">
const size = 32;
const props = defineProps<{
    error?: string
}>();
</script>
<template>
    <div class="lq-error" v-if="error || $slots.default">
        <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" :width="`${size}px`" :height="`${size}px`"
                :viewBox="`0 0 ${size} ${size}`" fill="red">
                <path
                    d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z"
                    stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 9V13" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 17.0195V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </div>
        <div v-if="error" class="message" v-html="error"></div>
        <div v-else class="message"><slot/></div>
    </div>
</template>
<style scoped lang="scss">
.icon {
    position: relative;
    top: 8px;
    transform: scale(1.5);
}

.lq-error {
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 16px 32px;
    border: 1px solid red;
    border-radius: 8px;
    background-color: #ffeeee;
}
</style>