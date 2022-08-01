<template>
    <section class="top-header">
        <section class="title">模板</section>
    </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.top-header {
    flex-shrink: 0;
    width: 100%;
    height: 60px;
    background-color: #293967;
    padding: 0 24px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
}

.title {
    font-size: 18px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
}

.avatar {
    border-radius: 45px;
    margin-right: 16px;
}
</style>
