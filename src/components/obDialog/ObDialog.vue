<!--
 * @Author: linBin
 * @Date: 2022-07-11 09:32:28
 * @LastEditTime: 2022-07-11 15:06:25
 * @LastEditors: linBin
 * @Description: 弹窗组件
 * @FilePath: /zzx-internet-web/src/components/global/obDialog/ObDialog.vue
-->

<template>
    <vxe-modal v-bind="$attrs" showFooter width="800">
        <slot />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancel">{{ CancelText }}</el-button>
                <el-button type="primary" @click="handleConfirm">{{ ConfirmText }}</el-button>
            </span>
            <slot name="footer" />
        </template>
    </vxe-modal>
</template>
<script setup lang="ts">
// https://vxetable.cn/#/modal/api 文档链接
import { propTypes } from '@utils/propTypes'
defineProps({
    ConfirmText: propTypes.string.def('确定'),
    CancelText: propTypes.string.def('取消'),
    selfFooter: propTypes.bool.def(false),
})
const emit = defineEmits(['handleCancel', 'handleConfirm'])
// 取消函数
const handleCancel = () => {
    emit('handleCancel')
}
// 确认函数
const handleConfirm = () => {
    emit('handleConfirm')
}
</script>
<style scope></style>
