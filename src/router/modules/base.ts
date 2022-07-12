const Layout = () => import('@/layout/Index.vue')

const baseRouter = {
    path: '/',
    component: Layout,
    redirect: '/403',
    meta: {
        icon: 'information-line',
        title: '错误页面',
        rank: 9,
    },
    children: [
        {
            path: '/403',
            name: '403',
            component: () => import('@/views/base/403.vue'),
            meta: {
                title: 403,
            },
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/base/404.vue'),
            meta: {
                title: 404,
            },
        },
        {
            path: '/svgList',
            name: 'svgList',
            component: () => import('@/views/base/SvgPage.vue'),
            meta: {
                title: 'svgList',
            },
        },
        {
            path: '/demoPage',
            name: 'demoPage',
            component: () => import('@/views/base/DemoPage.vue'),
            meta: {
                title: 'DemoPage',
            },
        },
        {
            path: '/tableDemo',
            name: 'tableDemo',
            component: () => import('@/views/base/TableDemo.vue'),
            meta: {
                title: 'tableDemo',
            },
        },
        {
            path: '/modalDemo',
            name: 'modalDemo',
            component: () => import('@/views/base/ModalDemo.vue'),
            meta: {
                title: 'modalDemo',
            },
        },
        {
            path: '/echartDemo',
            name: 'echartDemo',
            component: () => import('@/views/base/EchartDemo.vue'),
            meta: {
                title: 'echartDemo',
            },
        },
    ],
}

export default baseRouter
