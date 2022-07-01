import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import { getServerConfig } from './config'
// 引入重置样式
import './style/reset.scss'
// 导入公共样式
import './style/index.scss'

// 导入字体图标
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'

const app = createApp(App)

// 自定义指令
import * as directives from '@/directives'
Object.keys(directives).forEach(key => {
    app.directive(key, (directives as { [key: string]: Directive })[key])
})

// 全局注册图标组件
import { FontIcon } from './components/ReIcon'
app.component('FontIcon', FontIcon)

getServerConfig(app).then(async config => {
    app.use(router)
    await router.isReady()
    setupStore(app)
    app

    app.mount('#app')
})
