<template>
    <section class="table-page">
        <section class="table-page-search" v-if="searchShow">
            <section class="search-content">
                <slot name="search" />
            </section>
            <section class="btn-content"><slot name="btn" /></section>
        </section>
        <section class="table-content" v-allow="tableAllow">
            <slot name="table" :tableData="tableData" />
        </section>
        <vxe-pager
            v-show="pagerParams.totalNumber > 0"
            v-model:current-page="pagerParams.curPage"
            v-model:page-size="pagerParams.pageSize"
            :total="pagerParams.totalNumber"
            @page-change="handleSizeChange"
        />
    </section>
</template>

<script setup lang="ts">
import { reactive, watch, onMounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { propTypes } from '@utils/propTypes'
const props = defineProps({
    tableAllow: propTypes.string.def(''),
    searchShow: propTypes.bool.def(true),
    isPage: propTypes.bool.def(true),
    tableSearch: propTypes.bool.def(true),
    tableRefresh: propTypes.bool.def(true),
    defaultGet: propTypes.bool.def(true),
    getTableUrl: propTypes.func,
    tableParams: propTypes.object,
    opeBtnNames: propTypes.array,
})
const pagerParams = reactive<{ curPage: number; pageSize: number; totalNumber: number }>({
    curPage: 1,
    pageSize: 30,
    totalNumber: 0,
})
const tableData = ref<Array<any>>()
// 获取数据
const getTableData = () => {
    let params = {
        ...props.tableParams,
    }
    if (props.isPage) {
        params.curPage = pagerParams.curPage
        params.pageSize = pagerParams.pageSize
    }
    props.getTableUrl &&
        props.getTableUrl(params).then(res => {
            if (props.isPage) {
                let data = res.data || {}
                pagerParams.totalNumber = Number(data.totalNumber || 0)
                tableData.value = data.infoLists || []
            } else {
                tableData.value = res.data || []
            }
        })
}
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
</script>

<style lang="scss" scoped>
.table-page {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex: auto;
}

.table-page-search {
    position: relative;
    background: #ffffff;
    padding: 0 12px 6px;
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
}

.btn-content {
    margin-top: 6px;
    display: flex;
    flex-shrink: 0;
}
</style>
