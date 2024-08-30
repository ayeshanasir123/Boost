<script setup lang="ts">

</script>
<template>
    <div class="lq-line">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.lq-line {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 24px;
    align-items: flex-start;
    justify-content: flex-start;

    &[column]{
        flex-direction: column;
        margin-top: 0 !important;
    }
    > * {
        flex-grow: 0;
    }

    @media (max-width: 600px) {

        > * {
            flex-grow: reset;
            width: 100% !important;
        }
    }
}

.lq-line + .lq-line {
    margin-top: 4px;
}
</style>