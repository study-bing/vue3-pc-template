import { App } from 'vue'
import XEUtils from 'xe-utils'
import {
    VxeUI,
    VxeTable,
    VxeColumn,
    // VxeColgroup,
    // VxeGrid,
    // VxeToolbar
} from 'vxe-table'
import {
    // VxeButton,
    // VxeButtonGroup,
    // VxeCheckbox,
    // VxeCheckboxGroup,
    // VxeFormItem,
    // VxeForm,
    VxeIcon,
    VxeLoading,
    // VxeInput,
    // VxeModal,
    // VxePager,
    // VxePulldown,
    // VxeRadio,
    // VxeRadioButton,
    // VxeRadioGroup,
    // VxeSelect,
    // VxeSwitch,
    // VxeTextarea,
    // VxeTooltip
} from 'vxe-pc-ui'

import './index.scss'

function LazyVxeTable(app) {
    app.use(VxeTable)
    app.use(VxeColumn)
    // app.use(VxeColgroup)
    // app.use(VxeGrid)
    // app.use(VxeToolbar)
}

function LazyVxeUI(app) {
    // app.use(VxeButton)
    // app.use(VxeButtonGroup)
    // app.use(VxeCheckbox)
    // app.use(VxeCheckboxGroup)
    // app.use(VxeFormItem)
    // app.use(VxeForm)
    app.use(VxeIcon)
    app.use(VxeLoading)
    // app.use(VxeInput)
    // app.use(VxeModal)
    // app.use(VxePager)
    // app.use(VxePulldown)
    // app.use(VxeRadio)
    // app.use(VxeRadioButton)
    // app.use(VxeRadioGroup)
    // app.use(VxeSelect)
    // app.use(VxeSwitch)
    // app.use(VxeTextarea)
    // app.use(VxeTooltip)
}
// 导入默认的语言
import zhCN from 'vxe-pc-ui/lib/language/zh-CN'

VxeUI.setI18n('zh-CN', zhCN)
VxeUI.setLanguage('zh-CN')
// 全局默认参数
VxeUI.setConfig({
    version: 0,
    zIndex: 1002,
    table: {
        // 自动监听父元素的变化去重新计算表格
        autoResize: true,
        // 鼠标移到行是否要高亮显示
        highlightHoverRow: true,
        // stripe: true,
        align: 'left',
        border: 'inner',
    },
    pager: {
        size: 'small',
        align: 'right',
        layouts: ['Sizes', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'Total'],
        pageSizes: [30, 50, 100],
    },
})

export function useTable(app: App) {
    app.use(LazyVxeUI).use(LazyVxeTable)
}
