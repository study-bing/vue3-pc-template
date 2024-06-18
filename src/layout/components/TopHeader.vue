<script setup lang="ts">
import SignOut from '../img/sign-out.svg'
import { useUserStoreHook } from '@/store/modules/user'
const useUserStore = useUserStoreHook()
</script>

<template>
    <section class="top-header">
        <section class="title">管理后台</section>
        <section class="ope-box">
            <SignOut class="svg-css" @click="useUserStore.logOut" />
        </section>
    </section>
</template>

<style scoped lang="scss">
.top-header {
    width: 100%;
    height: 56px;
    background-color: #fff;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    padding: 0 24px;
    flex-shrink: 0;
}

.before {
    position: relative;
    content: '';
    width: 1px;
    height: 12px;
    background-color: #d9d9d9;
    display: inline-block;
    margin-left: 16px;
}

.title {
    font-size: 18px;
    font-family: 'PingFang SC-Regular', 'PingFang SC';
    font-weight: 400;
    color: #303030;
    flex: auto;
}

.avatar {
    border-radius: 45px;
    margin-right: 16px;
}

.ope-box {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &::before {
        @extend .before;
    }

    .svg-css {
        width: 16px;
        height: 16px;
        margin-left: 24px;
        cursor: pointer;
    }
}
</style>
