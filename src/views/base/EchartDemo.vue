<template>
    <div ref="barChartRef" style="width: 100%; height: 35vh" />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useECharts } from '@/hooks/useECharts'
import { onMounted } from 'vue'
const barChartRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(barChartRef as Ref<HTMLDivElement>)

onMounted(() => {
    setOptions({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        grid: {
            bottom: '20%',
            height: '68%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true,
                },
                axisLabel: {
                    interval: 0,
                },
                data: ['open_issues', 'forks', 'watchers', 'star'],
            },
        ],
        yAxis: [
            {
                type: 'value',
            },
        ],
        series: [
            {
                name: 'GitHub信息',
                type: 'bar',
                data: [3, 204, 1079, 1079],
            },
        ],
    })
})
</script>
