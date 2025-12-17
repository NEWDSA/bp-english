<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PasswordGuard from './components/PasswordGuard.vue'

// 移除了 lib-flexible 相关代码，改用纯 CSS 响应式方案

const route = useRoute()
const STORAGE_KEY = 'bp_english_auth'
const isChecking = ref(true)

// 页面加载时验证版本
onMounted(async () => {
  const authData = localStorage.getItem(STORAGE_KEY)
  if (authData) {
    try {
      const { version } = JSON.parse(authData)
      const response = await fetch('/api/auth/check-version', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passwordVersion: version })
      })
      const data = await response.json()
      if (!data.valid) {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (e) {
      // 网络错误时保持现有状态
    }
  }
  isChecking.value = false
})

// 检查认证状态
const isAuthenticated = computed(() => {
  // /settings 路径不需要密码验证
  if (route.path === '/settings') {
    return true
  }
  try {
    const authData = localStorage.getItem(STORAGE_KEY)
    if (!authData) return false
    const { status } = JSON.parse(authData)
    return status === 'authenticated'
  } catch {
    return false
  }
})
</script>

<template>
	<div v-if="isChecking" class="checking-auth"></div>
	<PasswordGuard v-else-if="!isAuthenticated" />
	<router-view v-else />
</template>

<style scoped>
</style>
