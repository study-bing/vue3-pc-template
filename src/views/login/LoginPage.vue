<template>
    <el-form ref="ruleFormRef" size="large">
        <el-form-item prop="username">
            <el-input
                clearable
                v-model="ruleForm.username"
                placeholder="账号"
                :prefix-icon="useRenderIcon('user')"
            />
        </el-form-item>

        <el-form-item prop="password">
            <el-input
                clearable
                show-password
                v-model="ruleForm.password"
                placeholder="密码"
                :prefix-icon="useRenderIcon('lock')"
            />
        </el-form-item>
    </el-form>
    {{ useUserStoreHook().name }}
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import { useUserStoreHook } from '@/store/modules/user'
defineOptions({
    name: 'loginPage',
})
let ruleForm = reactive<{ username: string; password: string }>({
    username: '',
    password: '',
})
</script>

<style></style>
