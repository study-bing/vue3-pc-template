import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
import { warpperEnv, regExps } from './build'
import { getPluginsList } from './build/plugins'
// 当前执行node命令时文件夹的地址（工作目录）
const root: string = process.cwd()

// 路径查找
const pathResolve = (dir: string): string => {
    return resolve(__dirname, '.', dir)
}

// 设置别名
const alias: Record<string, string> = {
    '@': pathResolve('src'),
    '@build': pathResolve('build'),
}

export default ({ mode }: ConfigEnv): UserConfigExport => {
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL } = warpperEnv(
        loadEnv(mode, root)
    )
    return {
        base: VITE_PUBLIC_PATH,
        root,
        resolve: {
            alias,
        },
        // 服务端渲染
        server: {
            // 是否开启 https
            https: false,
            // 端口号
            port: VITE_PORT,
            host: '0.0.0.0',
            // 本地跨域代理
            proxy:
                VITE_PROXY_DOMAIN_REAL.length > 0
                    ? {
                          [VITE_PROXY_DOMAIN]: {
                              target: VITE_PROXY_DOMAIN_REAL,
                              // ws: true,
                              changeOrigin: true,
                              rewrite: (path: string) => regExps(path, VITE_PROXY_DOMAIN),
                          },
                      }
                    : null,
        },
        plugins: getPluginsList(),
    }
}
