<script setup lang="ts">
// import { getRoleMenuApi } from '@api/manage'
// import { getMenuTreeApi } from '@api/system'
// import { useUserStoreHook } from '@/store/modules/user'
// const { userInfoData } = useUserStoreHook()
defineOptions({
    name: 'leftMenu',
})
const menuList = computed(() => {
    return roleMenuList.value.filter(item => hasMenu.value.includes(item.id))
})
// const menuList = ref([
//     {
//         label: '管理员管理',
//         path: 'manage',
//         icon: 'qypz',
//     },
//     {
//         label: '菜单管理',
//         path: 'menu',
//         icon: 'qypz',
//     },
//     {
//         label: '角色管理',
//         path: 'role',
//         icon: 'qypz',
//     },
//     {
//         label: '用户管理',
//         path: 'user',
//         icon: 'zfpz',
//     },
//     {
//         label: '积分管理',
//         path: 'integral',
//         icon: 'sbqrk',
//     },
//     {
//         label: '环保币管理',
//         path: 'coin',
//         icon: 'qysb',
//     },
//     {
//         label: '回收管理',
//         path: 'recovery',
//         icon: 'sppz',
//     },
//     {
//         label: '回收订单',
//         path: 'order',
//         icon: 'qxpz',
//     },
//     {
//         label: '广告管理',
//         path: 'advertisement',
//         icon: 'qxpz',
//     },
//     {
//         label: 'Banner管理',
//         path: 'banner',
//         icon: 'qxpz',
//     },
//     {
//         label: '系统管理',
//         path: 'set',
//         icon: 'qxpz',
//     },
//     {
//         label: '回收人员管理',
//         path: 'backUser',
//         icon: 'qxpz',
//     },
//     {
//         label: '系统通知',
//         path: 'notice',
//         icon: 'qxpz',
//     },
// ])
const isDev = process.env.NODE_ENV !== 'production'
const hasMenu = ref([])
const roleMenuList = ref([])
onMounted(() => {
    // getRoleMenuApi({ role_id: userInfoData?.role_id }).then(data => {
    //     if (data) {
    //         hasMenu.value = data.menu_ids
    //     }
    // })
    // getMenuTreeApi().then(data => {
    //     if (data) {
    //         roleMenuList.value = data
    //     }
    // })
})
onUnmounted(() => {})
</script>
<template>
    <section class="left-menu">
        <el-menu
            class="el-menu-vertical"
            active-text-color="#4378FF"
            background-color="#FFFFFF"
            text-color="#6B6D72"
            :default-active="$route.meta.activePath || $route.name"
            router
            unique-opened
        >
            <el-menu-item
                :index="item.uri"
                v-for="item in menuList"
                :key="item.uri"
                class="flex flex-a-center"
            >
                <!-- <svg-icon
                    :name="
                        [$route.meta.activePath, $route.name].includes(item.path)
                            ? `${item.icon}-blue`
                            : item.icon
                    "
                    width="18"
                    height="18"
                /> -->
                <span class="ml-10">{{ item.title }}</span>
            </el-menu-item>
            <el-sub-menu index="1" v-if="isDev">
                <template #title>
                    <svg-icon name="home" width="18" height="18" />
                    <span class="menu-title">开发demo</span>
                </template>
                <el-menu-item index="/tableDemo">tableDemo</el-menu-item>
                <el-menu-item index="/modalDemo">modalDemo</el-menu-item>
                <el-menu-item index="/echartDemo">echartDemo</el-menu-item>
                <el-menu-item index="/svgList">SvgList</el-menu-item>
                <el-menu-item index="/screenDemo">大屏demo</el-menu-item>
                <el-menu-item index="/demoPage">DemoPage</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </section>
</template>

<style scoped lang="scss">
.left-menu {
    transition: all 0.6s;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    flex-shrink: 0;
    width: 200px;
    padding: 16px 0;
    border-right: 1px solid #eee;
    overflow: hidden auto;
}

.menu-title {
    margin-left: 12px;
}

:deep(.el-menu) {
    border-right: none;
}

.el-menu-item {
    height: 44px;
    color: #6b6d72;
    margin-bottom: 8px;
    padding-left: 24px !important;

    &.is-active,
    &:hover {
        color: #3d6deb;
        background: linear-gradient(270deg, rgb(62 104 255 / 15%) 0%, rgb(62 104 255 / 0%) 100%);
        border-right: 2px solid #3d6deb;
    }
}

.el-sub-menu .el-menu-item {
    padding-left: 62px !important;
}

:deep(.el-sub-menu__title) {
    height: 44px;
    margin-bottom: 8px;
    padding: 0 24px !important;
}

:deep(.is-active) {
    .el-sub-menu__title {
        .menu-title,
        .svg-icon,
        .el-sub-menu__icon-arrow {
            color: #3d6deb;
        }
    }
}
</style>
