<template>
    <div class="ob-tabs">
        <span
            v-for="(item, index) in tabList"
            :key="index"
            @click="changeTabIndex(item)"
            :class="{
                'tab-active': tabIndex === item.value,
                disable: item.disable,
                'one-tab': oneTab,
            }"
            class="tab-space"
            v-show="!item.noShow"
        >
            {{ item.name }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
defineOptions({
    name: 'ObTabs',
})
type tab = {
    name: string
    value: string | number
    noShow?: unknown // 是否不显示
    disable?: unknown // 是否禁用
}
const props = defineProps<{ tabList: tab[]; defaultActive?: number | string }>()
const oneTab = computed(() => {
    let list = props.tabList.filter(el => {
        return !el.noShow
    })
    return list.length === 1
})
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
    padding-bottom: 6px;
    flex-shrink: 0;

    .tab-space {
        height: 28px;
        border: 1px solid #cbd5dd;
        border-right: none;
        padding: 7px 12px;
        line-height: 28px;
        cursor: pointer;
        color: #333333;
        background-color: #ffffff;
        font-size: 12px;

        &:first-child {
            border-radius: 2px 0px 0px 2px;
        }

        &:last-child {
            border-right: 1px solid #cbd5dd;
            border-radius: 0px 2px 2px 0px;
        }

        &.one-tab {
            border-radius: 2px;
        }
    }

    .tab-active {
        border: 1px solid #4698eb;
        color: #ffffff;
        background-color: #4698eb;
    }

    .disable {
        background-color: #eeeeee;
        border-radius: 2px 0px 0px 2px;
        color: #acacac;
    }
}
</style>
