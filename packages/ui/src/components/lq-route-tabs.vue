<script setup lang="ts">

import { useRouter, RouterView } from 'vue-router';
import LqError from './lq-error.vue';

const props = defineProps<{
    parent: string
}>();

const $router = useRouter();
const routes = $router.getRoutes();
const route = routes.find(route => route.name === props.parent)!;

</script>
<template>
    <lq-error v-if="!route">
        {{ '<lq-router-tabs>' }} : Cannot find route named {{ props.parent }}
    </lq-error>
    <template v-else>
        <div class="lq-route-tabs">
            <div class="route-tabs">
                <v-card class="router-buttons">
                    <v-btn class="route-button" :ripple="false" :class="{ 'v-btn--active': $route.name !== child.name }" :key="child.name"
                        v-for="child in route.children" @mousedown="$router.push(child)">{{
                            // @ts-ignore
                            child.title 
                        }}</v-btn>
                </v-card>
            </div>
            <div class="route-tabs-tab">
                <v-card class="lq-router-page">
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </router-view>
                </v-card>
            </div>
        </div>
    </template>
</template>

<style scoped lang="scss">
.route-tabs {
    margin: 16px 0 0 0;
    display: flex;
}

.route-tabs-tab {
    .router-block {
        padding: 16px
    }
}

.lq-router-page {
    box-shadow: none;
    padding: 24px 16px;
}

.router-buttons {

    // &::before {
    //     content: '';
    //     position: absolute;
    //     display: block;
    //     height: 5px;
    //     inset: 0;
    //     background: linear-gradient(to bottom, rgba(0, 0, 0, .1) 0%, transparent 100%);
    // }

    box-shadow: none;
    border-radius: 4px 4px 0 0;

    .route-button {
        height: 46px;
        padding-left:24px;
        padding-right:24px;
        letter-spacing: 0.85px;
        text-transform: none;
        font-weight: 400;
        background: none;
        border-radius: 0;
        border: none;
        box-shadow: none;

        &:not(.v-btn--active) {
            position: relative;
            font-weight: 500;

            &::before {
                content: '';
                position: absolute;
                display: block;
                height: 2px;
                inset: 0;
                background: rgb(0, 162, 255);
            }

        }
    }
}
</style>