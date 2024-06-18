<script setup lang="ts">
import LeftMenu from './components/LeftMenu.vue'
import TopHeader from './components/TopHeader.vue'
import { useRouter, useRoute } from 'vue-router'
defineOptions({
    name: 'layoutIndex',
})
const router = useRouter()
const goBack = () => {
    router.go(-1)
}
const route = useRoute()
const closeMenu = ref(false)
const showMouseBox = computed(() => {
    return route.name === 'homePage'
})
function mouseenter() {
    if (showMouseBox.value) {
        closeMenu.value = false
    }
}
function mouseleave() {
    if (showMouseBox.value) {
        closeMenu.value = true
    }
}
</script>
<template>
    <section class="view-content">
        <top-header />
        <section class="view-body">
            <div
                class="mouse-box"
                v-if="showMouseBox"
                @mouseenter="
                    () => {
                        closeMenu = false
                    }
                "
                @mouseleave="
                    () => {
                        closeMenu = true
                    }
                "
            />
            <left-menu
                :class="{ 'hide-menu': closeMenu, 'position-a': showMouseBox }"
                @mouseenter="mouseenter"
                @mouseleave="mouseleave"
            />
            <router-view>
                <template #default="{ Component, route }">
                    <transition name="fade" mode="out-in">
                        <section :key="route.path" class="router-content">
                            <section class="page-title" v-if="$route.meta.title">
                                <svg-icon
                                    name="go-back"
                                    @click="goBack"
                                    width="22"
                                    height="22"
                                    class="mr-8"
                                    color="#acacac"
                                    v-if="$route.meta.hasBack"
                                />
                                <span>{{ $route.meta.title }}</span>
                            </section>
                            <component :is="Component" />
                        </section>
                    </transition>
                </template>
            </router-view>
            <svg-icon
                :name="closeMenu ? 'open' : 'close'"
                width="15"
                height="28"
                class="open-close"
                :class="{ 'hide-menu': closeMenu }"
                @click="closeMenu = !closeMenu"
                v-if="!showMouseBox"
            />
        </section>
    </section>
</template>
<style scoped lang="scss">
.view-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.view-body {
    position: relative;
    flex: auto;
    overflow: auto;
    display: flex;

    .mouse-box {
        position: absolute;
        width: 24px;
        left: 0;
        top: 0;
        bottom: 30px;
        z-index: 99;
    }
}

.router-content {
    position: relative;
    background-color: #f1f5f9;
    flex: auto;
    overflow: auto;
    display: flex;
    flex-direction: column;
}

.open-close {
    transition: all 0.6s;
    position: absolute;
    bottom: 8px;
    left: 200px;
    color: #fff;

    &.hide-menu {
        left: 0;
    }
}

.page-title {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 24px;
    background-color: #fff;
    flex-shrink: 0;
    height: 50px;

    .title {
        font-size: 16px;
        font-weight: 500;
        color: #303030;
    }
}

.hide-menu {
    width: 0;
}

.position-a {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
}
</style>
