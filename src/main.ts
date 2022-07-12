import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import { getServerConfig } from './config'
import { useEcharts } from '@/plugins/echarts'
import { useTable } from '@/plugins/vxe-table'
// 引入重置样式
import './style/reset.scss'
// 导入公共样式
import './style/index.scss'
import 'virtual:svg-icons-register'

const app = createApp(App)

// 自定义指令
import * as directives from '@/directives'
Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string]: Directive })[key])
})

getServerConfig(app).then(async () => {
    app.use(router)
    await router.isReady()
    setupStore(app)
    app.use(useTable).use(useEcharts)
    app.mount('#app')
})
