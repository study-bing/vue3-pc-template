<template>
    <el-button text @click="dialogVisible = true">click to open the Dialog</el-button>
    <ob-dialog
        v-model="dialogVisible"
        title="标题"
        @handleConfirm="handleConfirm"
        @handleCancel="handleConfirm"
    >
        <span>This is a message</span>
    </ob-dialog>
</template>

<script setup lang="ts">
import { confirmMessageBox, successMessage } from '@utils/message'
const dialogVisible = ref(false)
const handleConfirm = () => {
    dialogVisible.value = false
}
onMounted(() => {
    confirmMessageBox({ message: '确定要删除该产品吗？' }).then(() => {
        console.log(123)
    })
    successMessage('测试')
})
</script>

<style></style>
