<template>
    <section class="table-page" :class="{ 'has-tab': hasTab, 'no-mg-pd': noMgPd }">
        <slot />
        <section class="table-page-search" v-if="hasSearch">
            <section class="search-content">
                <slot name="search" />
            </section>
        </section>
        <div class="btn-box" v-if="hasBtn">
            <slot name="btn" />
        </div>
        <section class="table-content" v-allow="tableAllow">
            <slot name="table" :tableData="tableData" :comData="comData" />
        </section>
        <div class="page-content" v-show="pagerParams.totalNumber > 0">
            <div class="mr-16">
                从{{ fromNum }}到{{ toNum }}条，共{{ pagerParams.totalNumber }}条记录
            </div>
            <vxe-pager
                v-model:current-page="pagerParams.curPage"
                v-model:page-size="pagerParams.pageSize"
                :total="pagerParams.totalNumber"
                @page-change="handleSizeChange"
                :layouts="['PrevPage', 'JumpNumber', 'NextPage']"
                background
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { reactive, watch, onMounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { propTypes } from '@utils/propTypes'
import { isArray } from '/@/utils/is'
const props = defineProps({
    tableAllow: propTypes.string.def(''), // 列表显示权限字段
    hasSearch: propTypes.bool.def(true), // 是否有搜索项
    isPage: propTypes.bool.def(true), // 是否分页
    tableSearch: propTypes.bool.def(true), // 值变化，搜索条件触发
    tableRefresh: propTypes.bool.def(true), // 值变化，刷新列表
    defaultGet: propTypes.bool.def(true), // 是否默认调用列表接口
    hasBtn: propTypes.bool.def(true), // 是否有按钮
    getTableUrl: propTypes.func, // 获取列表url
    tableParams: propTypes.object, // 除分页外的搜索条件
    opeBtnNames: propTypes.array, // 操作列按钮权限数组
    hasTab: propTypes.bool.def(false), // 是否有tab
    isSelfSetPage: propTypes.bool.def(false), // 是否前端自己分页
    pageDataKey: propTypes.string.def('infoLists'), // 分页数据类型
    noMgPd: propTypes.bool.def(false), // 删除margin和padding
    pageSize: propTypes.number.def(12),
})
const emit = defineEmits(['getData'])
const pagerParams = reactive<{ curPage: number; pageSize: number; totalNumber: number }>({
    curPage: 1,
    pageSize: props.pageSize,
    totalNumber: 0,
})
const tableData = ref<Array<any>>()
const comData = ref()
// 获取数据
const getTableData = () => {
    let params = {
        ...props.tableParams,
    }
    if (props.isPage || props.isSelfSetPage) {
        params = {
            ...pagerParams,
            ...params,
        }
    }
    props.getTableUrl &&
        props.getTableUrl(params).then(data => {
            comData.value = data
            if (props.isSelfSetPage) {
                if (isArray(data)) {
                    pagerParams.totalNumber = Number(data.length || 0)
                    tableData.value = data.slice(fromNum.value - 1, toNum.value)
                } else {
                    pagerParams.totalNumber = 0
                    tableData.value = []
                }
            } else if (props.isPage) {
                pagerParams.totalNumber = Number(data.totalNumber || 0)
                tableData.value = data[props.pageDataKey] || []
            } else {
                tableData.value = data || []
            }
            emit('getData', { data, setData: tableData.value })
        })
}
// 搜索函数
const searchData = useDebounceFn(() => {
    pagerParams.curPage = 1
    getTableData()
})
watch(
    () => props.tableRefresh,
    () => {
        getTableData()
    }
)
// 页数变化、数据量变化
const handleSizeChange = ({ type }) => {
    if (type === 'size') {
        searchData()
    } else {
        getTableData()
    }
}
// 搜索触发
watch(
    () => props.tableSearch,
    () => {
        searchData()
    }
)
onMounted(() => {
    if (props.defaultGet) {
        getTableData()
    }
})
// 判断页面数量和总数，触发刷新
watch(
    () => pagerParams.totalNumber,
    () => {
        if (
            Number(pagerParams.totalNumber) === (pagerParams.curPage - 1) * pagerParams.pageSize &&
            Number(pagerParams.totalNumber) > 0
        ) {
            pagerParams.curPage = pagerParams.curPage - 1
            getTableData()
        }
    }
)
// 分页从xxx
const fromNum = computed(() => {
    if (Number(pagerParams.totalNumber) > 0) {
        return (pagerParams.curPage - 1) * pagerParams.pageSize + 1
    } else {
        return 0
    }
})
// 分页到xxx
const toNum = computed(() => {
    if (Number(pagerParams.totalNumber) <= pagerParams.pageSize) {
        return pagerParams.totalNumber
    } else {
        if (Number(pagerParams.totalNumber) > pagerParams.curPage * pagerParams.pageSize) {
            return pagerParams.curPage * pagerParams.pageSize
        } else {
            return Number(pagerParams.totalNumber)
        }
    }
})
</script>

<style lang="scss" scoped>
.table-page {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex: auto;
    margin: 16px;
    background-color: #fff;
    border-radius: 8px;
    padding: 24px 16px;

    &.has-tab {
        border-radius: 0 0 8px 8px;
        margin-top: 0;
    }

    &.no-mg-pd {
        margin: 0;
        padding: 0;
    }
}

.table-page-search {
    position: relative;
    background: #fff;
    display: flex;
    flex-shrink: 0;
}

.table-content {
    flex: auto;
    overflow: auto;
}

.search-content {
    flex: auto;
    flex-wrap: wrap;
    display: flex;
    margin-bottom: 12px;
}

.btn-content {
    margin-top: 6px;
    display: flex;
    flex-shrink: 0;
}

.btn-box {
    padding: 0 30px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
}

:deep(.vxe-pager--total) {
    margin-right: 24px;
}

.page-content {
    background-color: #fff;
    padding-right: 40px;
    height: 60px;
    display: flex;
    align-items: center;
    color: #303030;
    justify-content: flex-end;
    flex-shrink: 0;
}
</style>
