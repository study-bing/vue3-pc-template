import type {
    ComponentRenderProxy,
    VNode,
    ComponentPublicInstance,
    FunctionalComponent,
    PropType as VuePropType,
} from 'vue'

// GlobalComponents for Volar
declare module 'vue' {
    export interface GlobalComponents {
        IconifyIconOffline: typeof import('../src/components/ReIcon')['IconifyIconOffline']
        IconifyIconOnline: typeof import('../src/components/ReIcon')['IconifyIconOnline']
        FontIcon: typeof import('../src/components/ReIcon')['FontIcon']
    }
}

declare global {
    type Recordable<T = any> = Record<string, T>
    type TimeoutHandle = ReturnType<typeof setTimeout>
    type IntervalHandle = ReturnType<typeof setInterval>

    const __APP_INFO__: {
        pkg: {
            name: string
            version: string
            dependencies: Recordable<string>
            devDependencies: Recordable<string>
        }
        lastBuildTime: string
    }
    interface Window {
        // Global vue app instance
        __APP__: App<Element>
        webkitCancelAnimationFrame: (handle: number) => void
        mozCancelAnimationFrame: (handle: number) => void
        oCancelAnimationFrame: (handle: number) => void
        msCancelAnimationFrame: (handle: number) => void
        webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number
    }

    declare interface ServerConfigs {
        Version?: string
    }

    declare interface ViteEnv {
        VITE_PORT: number
        VITE_PUBLIC_PATH: string
        VITE_PROXY_DOMAIN: string
        VITE_PROXY_DOMAIN_REAL: string
        VITE_ROUTER_HISTORY: string
    }
}
