<script setup lang="ts">
defineProps<{
    isCol?: boolean
}>();
</script>
<template>
    <div class="lq-col" :="$attrs">
        <slot />
    </div>
</template>

<style lang="scss">
:root {
    --sm-breakpoint: 900px;
    --xs-breakpoint: 600px;
}

.lq-col {
    --gap: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px calc(var(--gap)* 2);
    padding-inline: var(--gap);
    padding-block: 6px;

    @media (min-width: 1px) {
        // xs
        width: 100%;
    }

    @media (min-width: 600px) {

        // sm
        &[sm="3"] {
            width: 25%
        }

        &[sm="4"] {
            width: 33.33%
        }

        &[sm="6"] {
            width: 50%;
        }

        &[sm="8"] {
            width: 66.66%;
        }
    }

    @media (min-width: 900px) {

        // md
        &[md="2"] {
            width: 16.16%;
        }

        &[md="3"] {
            width: 25%;
        }

        &[md="4"] {
            width: 33.33%;
        }

        &[md="6"] {
            width: 50%;
        }

        &[md="8"] {
            width: 66.66%;
        }
    }

    @media (min-width: 1280px) {

        // md
        &[lg="2"] {
            width: 16.16%;
        }

        &[lg="3"] {
            width: 25%;
        }

        &[lg="4"] {
            width: 33.33%;
        }

        &[lg="5"] {
            width: 41.66%;
        }

        &[lg="6"] {
            width: 50%;
        }

        &[lg="8"] {
            width: 66.66%;
        }
    }

}
</style>