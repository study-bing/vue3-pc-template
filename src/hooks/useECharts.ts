import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'
import { unref, nextTick } from 'vue'
import echarts from '@/plugins/echarts'
import { tryOnUnmounted, useDebounceFn, useTimeoutFn } from '@vueuse/core'
import { addResizeListener, removeResizeListener } from '@/utils/resize'

export function useECharts(
    elRef: Ref<HTMLDivElement>,
    theme: 'light' | 'dark' | 'default' = 'default'
) {
    let chartInstance: echarts.ECharts | null = null
    let resizeFn = resize
    // 防抖
    resizeFn = useDebounceFn(resize, 200)
    // const el = unref(elRef)
    function initCharts(t = theme) {
        const el = unref(elRef)
        if (!el || !unref(el)) {
            return
        }
        // 监听
        addResizeListener(el, resizeFn)
        // 初始化
        chartInstance = echarts.init(el, t)
    }

    function setOptions(options: EChartsOption, clear = true) {
        if (unref(elRef)?.offsetHeight === 0) {
            useTimeoutFn(() => {
                setOptions(unref(options))
            }, 30)
            return
        }

        nextTick(() => {
            useTimeoutFn(() => {
                if (!chartInstance) {
                    initCharts()
                    if (!chartInstance) return
                }
                clear && chartInstance?.clear()
                chartInstance?.setOption(unref(options))
            }, 30)
        })
    }
    function resize() {
        chartInstance?.resize()
    }
    tryOnUnmounted(() => {
        const el = unref(elRef)
        if (!chartInstance) return
        removeResizeListener(el, resizeFn)
        chartInstance.dispose()
        chartInstance = null
    })

    function getInstance(): echarts.ECharts | null {
        if (!chartInstance) {
            initCharts()
        }
        return chartInstance
    }

    return {
        setOptions,
        resize,
        echarts,
        getInstance,
    }
}
