import { App } from 'vue'
import XEUtils from 'xe-utils'
import {
    // 核心
    VXETable,
    // 表格功能
    Header,
    Footer,
    Icon,
    Filter,
    Edit,
    Menu,
    Export,
    Keyboard,
    Validator,
    // 可选组件
    Column,
    Colgroup,
    Grid,
    Tooltip,
    Toolbar,
    Pager,
    Form,
    FormItem,
    FormGather,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    RadioButton,
    Switch,
    Input,
    Select,
    Optgroup,
    Option,
    Textarea,
    Button,
    Modal,
    List,
    Pulldown,
    // 表格
    Table,
} from 'vxe-table'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'
import './index.scss'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
    i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
})
// 全局默认参数
VXETable.setup({
    size: 'mini',
    version: 0,
    zIndex: 1002,
    table: {
        size: 'mini',
        // 自动监听父元素的变化去重新计算表格
        autoResize: true,
        // 鼠标移到行是否要高亮显示
        highlightHoverRow: true,
        stripe: true,
        align: 'center',
        height: 'atuo',
    },
    pager: {
        size: 'small',
        align: 'right',
        layouts: ['Sizes', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'Total'],
        pageSizes: [30, 50, 100],
    },
    input: {},
    modal: {},
})

export function useTable(app: App) {
    app.use(Header)
        .use(Footer)
        .use(Icon)
        .use(Filter)
        .use(Edit)
        .use(Menu)
        .use(Export)
        .use(Keyboard)
        .use(Validator)
        // 可选组件
        .use(Column)
        .use(Colgroup)
        .use(Grid)
        .use(Tooltip)
        .use(Toolbar)
        .use(Pager)
        .use(Form)
        .use(FormItem)
        .use(FormGather)
        .use(Checkbox)
        .use(CheckboxGroup)
        .use(Radio)
        .use(RadioGroup)
        .use(RadioButton)
        .use(Switch)
        .use(Input)
        .use(Select)
        .use(Optgroup)
        .use(Option)
        .use(Textarea)
        .use(Button)
        .use(Modal)
        .use(List)
        .use(Pulldown)
        // 安装表格
        .use(Table)
}
