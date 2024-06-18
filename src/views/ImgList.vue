<template>
    <ob-table-page :getTableUrl="userList" :tableSearch="tableSearch" :tableParams="tableParams">
        <template #search>
            <div class="search-item">
                <p class="search-name">测试1：</p>
                <ob-input
                    :prefix-icon="Search"
                    placeholder="测试1"
                    v-model="tableParams.key"
                    @input="tableSearch = !tableSearch"
                />
            </div>
            <div class="search-item">
                <p class="search-name">测试2：</p>
                <ob-input
                    :prefix-icon="Search"
                    placeholder="测试2"
                    v-model="tableParams.key"
                    @input="tableSearch = !tableSearch"
                />
            </div>
        </template>
        <template #btn>
            <el-button type="primary" @click="setImg">处理图片</el-button>
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
import { Search } from '@element-plus/icons-vue'
import { userList } from '@api/user/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const setImg = () => {
    router.push('/ImgSet')
}
const tableSearch = ref(false)
const tableParams = reactive({
    key: '',
})
</script>
