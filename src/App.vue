<template>
    <el-config-provider>
        <router-view />
    </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
export default defineComponent({
    name: 'app',
    components: {
        [ElConfigProvider.name]: ElConfigProvider,
    },
    setup() {
        return {}
    },
})
</script>
