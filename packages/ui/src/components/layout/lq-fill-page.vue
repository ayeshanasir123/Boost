<template>
    <div class="lq-fill-page">
        <slot />
    </div>
</template>
<style scope lang="scss">
.lq-fill-page {
    position: absolute;
    inset: 32px;
    top: 0;
    display: flex;
    flex-direction: column;

    > *:last-child {
        flex-grow: 1;
    }
}
</style>
