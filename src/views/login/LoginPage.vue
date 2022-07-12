<template>
    <el-form ref="ruleFormRef" size="large">
        <el-form-item prop="username">
            <el-input v-model="ruleForm.username" clearable placeholder="账号" />
        </el-form-item>

        <el-form-item prop="password">
            <el-input v-model="ruleForm.password" clearable show-password placeholder="密码" />
        </el-form-item>
    </el-form>
    {{ useUserStoreHook().name }}
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStoreHook } from '@/store/modules/user'
defineOptions({
    name: 'loginPage',
})
let ruleForm = reactive({
    username: '',
    password: '',
})
</script>

<style></style>
