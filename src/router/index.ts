import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from '@/utils/progress'
import { toRouteType } from './types'

import errorRouter from './modules/error'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../views/login/LoginPage.vue'),
    },
    {
        path: '/console',
        component: () => import('@/layout/Index.vue'),
    },
    errorRouter,
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})
router.addRoute({
    path: '/:pathMatch(.*)',
    redirect: '/error/404',
})
router.beforeEach((to: toRouteType, _from, next) => {
    NProgress.start()
    next()
})
router.afterEach(() => {
    NProgress.done()
})
export default router
