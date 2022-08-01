<template>
    <section class="view-content">
        <top-header />
        <section class="view-body">
            <left-menu />
            <router-view>
                <template #default="{ Component, route }">
                    <transition name="fade" mode="out-in">
                        <section :key="route.path" class="router-content">
                            <component :is="Component" />
                        </section>
                    </transition>
                </template>
            </router-view>
        </section>
    </section>
</template>

<script setup lang="ts">
import LeftMenu from './components/LeftMenu.vue'
import TopHeader from './components/TopHeader.vue'
defineOptions({
    name: 'layoutIndex',
})
</script>
<style scoped lang="scss">
.view-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.view-body {
    flex: auto;
    overflow: auto;
    display: flex;
}

.router-content {
    padding: 16px;
    background-color: #f7f8fc;
    flex: auto;
    overflow: auto;
    display: flex;
    flex-direction: column;
}
</style>
