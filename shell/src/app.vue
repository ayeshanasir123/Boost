<script setup lang="ts">
import { BoostHeader } from '@boost/ui'
import { RouterView } from 'vue-router'
</script>

<template>
    <v-app>
        <v-layout class="layout">
            <BoostHeader style="position: relative"/>
            <v-main>
                <RouterView :key="$route.path.split('/')[2]" />
            </v-main>
        </v-layout>
    </v-app>
</template>

<style scoped lang="scss">
.layout {

    height: 100%;
    display: flex;
    flex-direction: column;

    > *:first-child {
        flex-grow: 0
    }

    > *:last-child {
        position: relative;
        flex-grow: 1;
        overflow: auto;
        height: calc(100% - 48px);
    }
}
</style>