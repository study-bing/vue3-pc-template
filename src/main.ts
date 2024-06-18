import { createApp } from 'vue'
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
import i18n from './utils/i18n'
const app = createApp(App)
getServerConfig(app).then(async () => {
    app.use(router)
    await router.isReady()
    setupStore(app)
    app.use(useTable).use(useEcharts).use(i18n)
    app.mount('#app')
})
