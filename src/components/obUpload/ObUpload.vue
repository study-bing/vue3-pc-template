<!--
 * @Author: linBin
 * @Date: 2022-07-11 09:32:28
 * @LastEditTime: 2022-09-22 17:06:43
 * @LastEditors: linBin
 * @Description: 弹窗组件
 * @FilePath: /industrialCloud-web/src/components/obUpload/ObUpload.vue
-->

<template>
    <ul class="upload-img-list">
        <li v-for="(item, index) in imageUrlList" :key="index" class="upload-img-item">
            <svg-icon
                name="chacha"
                class="delete-img"
                width="14"
                height="14"
                @click.stop="handleRemove(index)"
                v-if="!isSee"
            />
            <img :src="(item as string)" :key="(item as string)" class="upload-img-item" />
        </li>
        <li v-show="imageUrlList.length < maxLength" class="upload-img-item">
            <el-upload
                class="ob-upload"
                action="x"
                :show-file-list="false"
                :before-upload="beforeUpload"
            >
                <el-icon class="ob-upload-icon">
                    <Plus v-show="!upLoading" />
                    <Loading v-show="upLoading" />
                </el-icon>
            </el-upload>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { setFileUploadApi } from '@api/common'
import { Plus, Loading } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'
import { errorMessage } from '/@/utils/message'
import { propTypes } from '@utils/propTypes'
const props = defineProps({
    imageUrlList: propTypes.array.def([]),
    maxLength: propTypes.number.def(1),
    maxSize: propTypes.number.def(10),
    imgType: propTypes.array.def([
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'image/bmp',
    ]),
    isSee: propTypes.bool.def(false),
})
const upLoading = ref(false)
const emit = defineEmits(['handleRemove', 'imgHandle'])
const beforeUpload: UploadProps['beforeUpload'] = rawFile => {
    if (!props.imgType.includes(rawFile.type)) {
        errorMessage('传入类型有误！')
        return false
    } else if (rawFile.size > props.maxSize * 1024 * 1024) {
        errorMessage(`图片文件不大于${props.maxSize}M`)
        return false
    }
    const image = new FormData()
    image.append('file', rawFile)
    upLoading.value = true
    setFileUploadApi(image).then(data => {
        upLoading.value = false
        emit('imgHandle', {
            file: rawFile,
            url: data,
        })
    })
    return false
}
const handleRemove = index => {
    emit('handleRemove', index)
}
</script>
<style scoped lang="scss">
.ob-upload .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.upload-img-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    .upload-img-item {
        position: relative;
        margin-right: 15px;
        margin-bottom: 15px;
        width: 80px;
        height: 50px;

        &:nth-of-type(4n) {
            margin-right: 0;
        }

        .delete-img {
            position: absolute;
            right: -4px;
            top: -7px;
            cursor: pointer;
            z-index: 9;
        }
    }

    .upload-img-loading {
        margin-right: 10px;
        width: 120px;
        height: 120px;
        transform: scale(0.5);
        transform-origin: top left;
    }
}
</style>

<style>
.ob-upload .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.ob-upload .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.ob-upload-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 50px;
    text-align: center;
}
</style>
