<template>
    <section class="left-menu">
        <el-menu
            class="el-menu-vertical"
            active-text-color="#386CE2"
            background-color="#FFFFFF"
            text-color="#787878"
            :default-active="$route.path"
            router
        >
            <el-sub-menu index="1">
                <template #title>
                    <svg-icon name="home" width="16" height="16" />
                    <span class="menu-title">开发demo</span>
                </template>
                <el-menu-item index="/tableDemo">tableDemo</el-menu-item>
                <el-menu-item index="/modalDemo">modalDemo</el-menu-item>
                <el-menu-item index="/echartDemo">echartDemo</el-menu-item>
                <el-menu-item index="/svgList">SvgList</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </section>
</template>

<script setup lang="ts">
defineOptions({
    name: 'leftMenu',
})
</script>

<style scoped lang="scss">
.left-menu {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    flex-shrink: 0;
    width: 220px;
}

.menu-title {
    margin-left: 10px;
}

:deep(.el-menu) {
    border-right: none;
}

.el-menu-item {
    &.is-active {
        background-color: #f0f2fc;
    }

    &:hover {
        --el-menu-hover-bg-color: #f0f2fc;
    }
}
</style>
