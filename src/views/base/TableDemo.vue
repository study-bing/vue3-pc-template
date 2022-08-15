<template>
    <ob-table-page :getTableUrl="userList" pageName="测试列表">
        <template #search>
            <div class="search-item">
                <p class="search-name">测试1：</p>
                <ob-input suffix="ios-search" placeholder="测试1" />
            </div>
            <div class="search-item">
                <p class="search-name">测试2：</p>
                <ob-input suffix="ios-search" placeholder="测试2" />
            </div>
        </template>
        <template #btn>
            <el-button type="primary" class="ml-10">新增报备</el-button>
            <el-button type="primary" class="ml-10">批量审批</el-button>
            <el-button class="import-button">批量撤销</el-button>
        </template>
        <template #table="{ tableData }">
            <vxe-table :data="tableData" height="auto">
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
</script>
