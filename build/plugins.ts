import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import removeConsole from 'vite-plugin-remove-console'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import'
import svgLoader from 'vite-svg-loader'
import { viteBuildInfo } from './info'
import { visualizer } from 'rollup-plugin-visualizer'
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'

export function getPluginsList() {
    const lifecycle = process.env.npm_lifecycle_event
    return [
        vue(),
        // jsx、tsx语法支持
        vueJsx(),
        // 打包信息
        viteBuildInfo(),
        DefineOptions(),
        // 线上环境删除console
        removeConsole(),
        // 自动按需引入element
        AutoImport({
            imports: ['vue'],
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            dts: true,
            types: [
                {
                    from: 'vue-router',
                    names: ['RouterLink', 'RouterView'],
                },
            ],
            resolvers: [ElementPlusResolver()],
        }),
        createSvgIconsPlugin({
            // Specify the icon folder to be cached
            iconDirs: [
                resolve(process.cwd(), 'src/assets/svg'),
                resolve(process.cwd(), 'src/assets/menu'),
            ],
            // Specify symbolId format
            symbolId: 'icon-[dir]-[name]',
        }),
        createStyleImportPlugin({
            resolves: [VxeTableResolve()],
        }),
        // svg组件化支持
        svgLoader(),
        lazyImport({
            resolvers: [
                VxeResolver({
                    libraryName: 'vxe-table',
                }),
                VxeResolver({
                    libraryName: 'vxe-pc-ui',
                }),
            ],
        }),
        // 打包分析
        lifecycle === 'report'
            ? visualizer({ open: true, brotliSize: true, filename: 'report.html' })
            : null,
    ]
}
