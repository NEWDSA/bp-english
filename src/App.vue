<script setup>
import { computed } from 'vue'
import PasswordGuard from './components/PasswordGuard.vue'

// 移除了 lib-flexible 相关代码，改用纯 CSS 响应式方案

// 检查认证状态
const isAuthenticated = computed(() => {
  const authStatus = localStorage.getItem('bp_english_auth')
  return authStatus === 'authenticated'
})
</script>

<template>
	<PasswordGuard v-if="!isAuthenticated" />
	<router-view v-else />
</template>

<style scoped>
</style>
