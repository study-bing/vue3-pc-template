<!--
 * @Author: linBin
 * @Date: 2022-07-11 09:32:28
 * @LastEditTime: 2022-10-18 10:08:42
 * @LastEditors: linBin
 * @Description: 弹窗组件
 * @FilePath: /vue3-pc-template/src/components/obDialog/ObDialog.vue
-->

<template>
    <el-dialog
        v-bind="$attrs"
        :width="width"
        :before-close="handleCancel"
        :close-on-click-modal="false"
    >
        <slot />
        <template #footer>
            <span class="dialog-footer" v-if="!selfFooter">
                <el-button @click="handleCancel" :loading="loading">{{ cancelText }}</el-button>
                <el-button type="primary" @click="handleConfirm" :loading="loading">
                    {{ confirmText }}
                </el-button>
            </span>
            <slot name="footer" />
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
// https://vxetable.cn/#/modal/api 文档链接
import { propTypes } from '@utils/propTypes'
defineProps({
    confirmText: propTypes.string.def('确定'),
    cancelText: propTypes.string.def('取消'),
    selfFooter: propTypes.bool.def(false),
    width: {
        type: [String, Number],
        default: '472px',
    },
    loading: propTypes.bool.def(false),
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
