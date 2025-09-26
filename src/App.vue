<script setup>
import { onMounted, onUnmounted } from 'vue'
import { initGlobalFlexible, destroyGlobalFlexible } from './utils/flexible.js'

// 全局初始化 lib-flexible 适配
onMounted(() => {
  initGlobalFlexible()
})

// 应用卸载时清理
onUnmounted(() => {
  destroyGlobalFlexible()
})
</script>

<template>
	<router-view />
</template>

<style scoped>
</style>
