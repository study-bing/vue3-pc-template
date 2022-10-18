<template>
    <div class="ob-tabs" :class="{ 'in-page': isInPage, background: background }">
        <span
            v-for="(item, index) in tabList"
            :key="index"
            @click="changeTabIndex(item)"
            :class="{
                'tab-active': tabIndex === item.value,
                disable: item.disable,
            }"
            class="tab-space"
            v-show="!item.noShow"
        >
            {{ item.name }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
defineOptions({
    name: 'ObTabs',
})
type tab = {
    name: string
    value: string | number
    noShow?: boolean // 是否不显示
    disable?: boolean // 是否禁用
}
const props = defineProps<{
    tabList: tab[]
    defaultActive?: number | string
    isInPage?: boolean
    background?: boolean
}>()

const tabIndex = ref<string | number>()
watch(
    () => props.defaultActive,
    newValue => {
        tabIndex.value = newValue
    }
)
const emit = defineEmits(['changeTabIndex'])
// 切换tab抛出事件
const changeTabIndex = item => {
    if (item.disable) {
        return false
    }
    tabIndex.value = item.value
    emit('changeTabIndex', item)
}
// 如没有传默认值 则默认选中第一个
onMounted(() => {
    let defaultActive = props.tabList.find(el => {
        return props.defaultActive === el.value
    })
    if (defaultActive && !defaultActive.noShow) {
        tabIndex.value = props.defaultActive
    } else {
        let activeObj = props.tabList.find(el => {
            return !el.noShow
        })
        tabIndex.value = activeObj.value
    }
})
</script>

<style lang="scss" scoped>
.ob-tabs {
    flex-shrink: 0;
    height: 50px;
    background-color: #ffffff;
    display: flex;
    align-items: center;

    .tab-space {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 24px;
        cursor: pointer;
        color: #6b6d72;
        font-size: 14px;
    }

    .tab-active {
        position: relative;
        color: #3d6deb;
        font-size: 16px;
        font-weight: 500;

        &::after {
            position: absolute;
            content: '';
            display: inline-block;
            width: 26px;
            height: 2px;
            background-color: #3d6deb;
            bottom: 0;
            left: 50%;
            margin-left: -13px;
        }
    }

    .disable {
        background-color: #eeeeee;
        color: #acacac;
    }
}

.in-page {
    height: 48px;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid #eeeeee;
    margin: 16px 16px 0;

    .tab-space {
        padding: 0;
        margin-left: 48px;
    }

    .tab-active {
        color: #4378ff;
        font-size: 14px;

        &::after {
            position: absolute;
            content: '';
            display: inline-block;
            width: 100%;
            height: 2px;
            background-color: #4378ff;
            bottom: 0;
            right: 0;
            margin-left: 0;
            left: 0;
        }
    }
}

.background {
    border-radius: 8px 8px 0 0;
    height: 32px;
    opacity: 1;

    .tab-space {
        position: relative;
        width: 50px;
        background: #f2f3f5;
        padding: 5px 3px;
        text-align: center;
        display: flex;
        justify-content: center;

        &:nth-child(n + 2)::before {
            content: '';
            position: absolute;
            left: 0px;
            width: 1px;
            height: 10px;
            background-color: #d9d9d9;
        }

        &:first-child {
            border-radius: 4px 0px 0px 4px;
        }

        &:last-child {
            border-radius: 0px 4px 4px 0px;
        }
    }

    .tab-active {
        color: #ffffff;
        font-size: 14px;
        background: #4378ff;

        &:nth-child(n + 2)::before {
            content: '';
            position: absolute;
            background-color: #4378ff;
        }
    }
}
</style>
