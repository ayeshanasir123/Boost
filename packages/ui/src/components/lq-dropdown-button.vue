<template>
    <span class="dropdown-button">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="20px" fill="#4a4d51"><path d="M480-371.69 267.69-584 296-612.31l184 184 184-184L692.31-584 480-371.69Z"/></svg>
    </span>
</template>

<style scoped lang="scss">
.dropdown-button {
    width: 32px;
    cursor: pointer;
    display:flex;
    align-items: center;
    justify-content: center;
    svg {
        transform: scale(1.2);
    }

    &:hover {
        path {
            fill: #777;
        }
    }
}
</style>
