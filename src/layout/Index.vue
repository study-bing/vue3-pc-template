<template>
    <section>
        console
        <FontIcon icon="team-iconlogo" svg style="width: 35px; height: 35px" />
        <el-button>Default</el-button>
        {{ version }}
        <router-view>
            <template #default="{ Component, route }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" :key="route.fullPath" />
                </transition>
            </template>
        </router-view>
    </section>
</template>

<script setup lang="ts">
import { getConfig } from '@/config'
import { successMessage } from '@/utils/message'
defineOptions({
    name: 'LayoutIndex',
})
const version = getConfig('Version')

successMessage('ss')
</script>

<style></style>
