<template>
    <div class="login-wrap">
        <!--引入粒子特效-->
        <div class="bkpro-login-canvas">
            <Particles
                id="tsparticles"
                :particlesInit="particlesInit"
                :particlesLoaded="particlesLoaded"
                :options="options"
            />
        </div>
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input size="large" v-model="param.username" placeholder="username" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        size="large"
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter="submitForm()"
                    />
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { successMessage } from '@/utils/message'

const router = useRouter()
const param = reactive({
    username: '',
    password: '',
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
const options = {
    background: {
        color: {
            value: '#000', //粒子颜色
        },
    },
    fpsLimit: 60,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push', //可用的click模式有: "push", "remove", "repulse", "bubble"。
            },
            onHover: {
                enable: true,
                mode: 'grab', //可用的hover模式有: "grab", "repulse", "bubble"。
            },
            resize: true,
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
            },
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 2000,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: '#ffffff',
        },
        links: {
            color: '#ffffff', //'#dedede'。线条颜色。
            distance: 150, //线条长度
            enable: true, //是否有线条
            opacity: 0.5, //线条透明度。
            width: 1, //线条宽度。
        },
        collisions: {
            enable: false,
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 1, //粒子运动速度。
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 80, //粒子数量。
        },
        opacity: {
            value: 0.5, //粒子透明度。
        },
        shape: {
            type: 'circle', //可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
        },
        size: {
            random: true,
            value: 5,
        },
    },
    detectRetina: true,
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
    padding: 10px;
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    border-bottom: 1px solid #ddd;
    color: #fff;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    min-width: 400px;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background: rgb(255 255 255 / 30%);
    overflow: hidden;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
}

.ms-content {
    padding: 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
