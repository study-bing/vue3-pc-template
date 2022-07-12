<template>
    <section class="left-menu">
        <el-menu
            class="el-menu-vertical"
            active-text-color="#4698EB"
            background-color="#575966"
            text-color="#fff"
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
    background-color: rgb(87, 89, 102);
    flex-shrink: 0;
}

:deep(.el-menu) {
    border-right: none;
}
</style>
