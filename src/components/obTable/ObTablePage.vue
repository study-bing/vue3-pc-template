<template>
    <section class="table-page">
        <section class="table-title">
            <span class="title">{{ $route.meta.title }}</span>
        </section>
        <section class="table-page-search" v-if="searchShow">
            <section class="search-content">
                <slot name="search" />
            </section>
        </section>
        <div class="table-page-name">
            <p class="page-name">{{ pageName }}</p>
            <div class="btn-box">
                <!-- <slot name="search"></slot>
                <slot name="ope"></slot> -->
                <slot name="btn" />
            </div>
        </div>
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
    pageName: propTypes.string,
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
    padding: 6px 0 24px;
    display: flex;
    flex-shrink: 0;

    &::after {
        content: '';
        display: block;
        width: 100%;
        height: 8px;
        background-color: #f7f8fc;
        position: absolute;
        bottom: 0;
    }
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

.table-title {
    position: relative;
    display: flex;
    align-content: center;
    align-items: center;
    padding-bottom: 16px;
    background-color: transparent;
    flex-shrink: 0;

    .title {
        font-weight: bold;
        font-size: 16px;
        color: #505050;
        display: flex;
        align-items: center;
        align-content: center;
        position: relative;
        padding-left: 20px;
        margin-right: 24px;
        cursor: pointer;

        &::before {
            content: '';
            width: 4px;
            height: 16px;
            background: #4c7ced;
            position: absolute;
            border-radius: 2px 2px 2px 2px;
            left: 0;
        }
    }
}

.table-page-name {
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;

    .page-name {
        font-size: 16px;
        font-weight: 500;
        color: #505050;
        min-width: 100px;
        flex-shrink: 0;
    }

    .btn-box {
        display: flex;
        align-items: center;
    }
}

:deep(.vxe-pager--total) {
    margin-right: 24px;
}
</style>
