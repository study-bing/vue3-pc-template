<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter="submitForm()"
                    />
                </el-form-item>
            </el-form>
            <div class="login-btn">
                <el-button type="primary" @click="submitForm()">登录</el-button>
            </div>
            <p class="login-tips">Tips : 用户名和密码随便填。</p>
            <div @click="changeLang('en')">English</div>
            <div @click="changeLang('zh')">中文</div>
            <div>
                {{ $t('login.userName') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { successMessage } from '@/utils/message'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const changeLang = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
    console.log(t('login.userName'))
}
const router = useRouter()
const param = reactive({
    username: 'admin',
    password: '123123',
})

const rules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
const login = ref(null)
const submitForm = () => {
    login.value.validate(valid => {
        if (valid) {
            successMessage('登录成功')
            router.push('/')
        }
    })
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-size: 100%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgb(255 255 255 / 30%);
    overflow: hidden;
}

.ms-content {
    padding: 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
