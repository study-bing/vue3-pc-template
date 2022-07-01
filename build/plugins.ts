import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import vueJsx from '@vitejs/plugin-vue-jsx'
import removeConsole from 'vite-plugin-remove-console'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export function getPluginsList() {
    return [
        vue(),
        // jsx、tsx语法支持
        vueJsx(),
        DefineOptions(),
        // 线上环境删除console
        removeConsole({ external: ['src/assets/iconfont/iconfont.js'] }),
        // svg组件化支持
        svgLoader(),
        // 自动按需引入element
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ]
}
