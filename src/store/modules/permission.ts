import { defineStore } from 'pinia'
import { store } from '@/store'

export const usePermissionStore = defineStore({
    id: 'pure-permission',
    state: () => ({
        // 静态路由生成的菜单
        constantMenus: [],
        // 整体路由生成的菜单（静态、动态）
        wholeMenus: [],
        // 深拷贝一个菜单树，与导航菜单不突出
        menusTree: [],
        buttonAuth: [],
        // 缓存页面keepAlive
        cachePageList: [],
    }),
    actions: {
        // 清空缓存页面
        clearAllCachePage() {
            this.cachePageList = []
        },
    },
})

export function usePermissionStoreHook() {
    return usePermissionStore(store)
}
