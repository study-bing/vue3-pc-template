/*
 * @Author: linBin
 * @Date: 2022-04-09 17:16:03
 * @LastEditTime: 2022-07-11 16:07:51
 * @LastEditors: linBin
 * @Description: 按需引入echarts
 * @FilePath: /zzx-internet-web/src/plugins/echarts/index.ts
 */
import { App } from 'vue'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'

// 引入图表类型，图表后缀都为 Chart
import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts'

// 引入提示框，标题，直角坐标系等组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    ToolboxComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent,
    MarkLineComponent,
    VisualMapComponent,
    MarkPointComponent,
} from 'echarts/components'

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers'

// 将以上引入的组件使用use()方法注册
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    SVGRenderer,
    DataZoomComponent,
    MarkLineComponent,
    VisualMapComponent,
    CanvasRenderer,
    ToolboxComponent,
    MarkPointComponent,
])
// const { use, registerTheme } = echarts;
// import theme from "./theme.json";
// registerTheme("ovilia-green", theme);
export function useEcharts(app: App) {
    app.config.globalProperties.$echarts = echarts
}

// 导出
export default echarts
