<template>
    <ob-tabs :tabList="tabList" />
    <ob-table-page :getTableUrl="userList">
        <template #search>
            <div class="search-item">
                <p class="search-name">设备所属产品</p>
                <ob-input suffix="ios-search" placeholder="用户名/账户" />
            </div>
        </template>
        <template #btn>
            <svg-icon name="add" width="28" height="28" />
            <svg-icon name="export" width="28" height="28" class="ml-6" />
        </template>
        <template #table="{ tableData }">
            <vxe-table border :data="tableData" height="auto">
                <vxe-column type="seq" width="60" />
                <vxe-column field="fileName" title="自定义插槽模板">
                    <template #default="{ row }">
                        <span>自定义插槽模板 {{ row.fileName }}</span>
                    </template>
                </vxe-column>
                <vxe-column field="productName" title="产品" />
            </vxe-table>
        </template>
    </ob-table-page>
</template>

<script setup lang="ts">
import { userList } from '@api/user/user'

const tabList = ref([
    { value: 1, name: '监测类型' },
    { value: 2, name: '设备状态定义', noShow: false },
    { value: 3, name: '指令定义', noShow: true },
])
</script>
