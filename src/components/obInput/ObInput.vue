<template>
    <el-input :model-value="modelValue" v-bind="$attrs" @input="updateVal" @change="changeVal" />
</template>
<script setup lang="ts">
import { setValue, isEmpty } from './setValue'
defineOptions({
    name: 'ObInput',
})
const props = defineProps({
    modelValue: {
        type: [String, Number], //String | Number
        default: '',
    },
    typeValue: {
        type: [String], //String
        default: '',
    },
    minValue: {
        type: [String, Number], //String | Number
        default: '',
    },
    maxValue: {
        type: [String, Number], //String | Number
        default: '',
    },
})
const emit = defineEmits(['update:modelValue'])

// 输入更新值
const updateVal = value => {
    //获取到input元素里面的值，
    let targetVal = value.trim()
    if (props.typeValue) {
        targetVal = setValue(targetVal, props.typeValue)
    }
    // 发送事件和值
    emit('update:modelValue', targetVal)
}
// 失去交点或者回车时判断值
const changeVal = value => {
    if (['int', 'number'].includes(props.typeValue)) {
        if (!isEmpty(props.minValue) && Number(value) <= Number(props.minValue)) {
            emit('update:modelValue', value === '' ? '' : Number(props.minValue))
            return
        }
        if (!isEmpty(props.maxValue) && Number(value) > Number(props.maxValue)) {
            emit('update:modelValue', value === '' ? '' : Number(props.maxValue))
            return
        }
        // 发送事件和值
        emit('update:modelValue', value === '' ? '' : Number(value))
    }
}
</script>
