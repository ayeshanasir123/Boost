<template>
    <span class="clear-button">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M256-213.85 213.85-256l224-224-224-224L256-746.15l224 224 224-224L746.15-704l-224 224 224 224L704-213.85l-224-224-224 224Z"/></svg>
    </span>
</template>

<style scoped lang="scss">
.clear-button {
    cursor: pointer;

    svg {
        position: relative;
        left: 5px;
        top: 3.5px;
        transform: scale(.8);
    }

    &:hover {
        path {
            fill: #777;
        }
    }
}
</style>