<template>
  <div
    v-if="!isAuthenticated"
    class="password-guard fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
  >
    <!-- 动态渐变背景 -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_50%)]"></div>
    </div>

    <!-- 装饰性粒子效果 -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
      <div class="particle particle-5"></div>
    </div>

    <!-- 主要内容 -->
    <div class="password-container w-full max-w-md px-6 relative z-10">
      <div class="password-card bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10 relative overflow-hidden">
        <!-- 卡片内部光效 -->
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <!-- 图标装饰 -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-4xl font-bold text-white mb-3 tracking-tight">访问验证</h1>
          <p class="text-slate-400 text-lg">请输入访问密码以继续</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50"></div>
            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                v-model="password"
                type="password"
                placeholder="请输入密码"
                class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                :class="{ 
                  'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50': error,
                  'focus:bg-white/15': !error
                }"
                autofocus
              />
            </div>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <p v-if="error" class="mt-3 text-sm text-red-400 flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ error }}
              </p>
            </transition>
          </div>

          <button
            type="submit"
            class="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-500 hover:via-blue-400 hover:to-purple-500 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            :disabled="!password || isLoading"
          >
            <!-- 按钮光效 -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span v-if="!isLoading" class="relative flex items-center justify-center gap-2">
              <span>确认访问</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <span v-else class="relative flex items-center justify-center gap-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>验证中...</span>
            </span>
          </button>
        </form>

        <!-- 底部提示 -->
        <div class="mt-8 text-center">
          <p class="text-xs text-slate-500">安全访问 · 受保护内容</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const PASSWORD = 'bp2025' // 默认密码，可以根据需要修改
const STORAGE_KEY = 'bp_english_auth'

const route = useRoute()

const password = ref('')
const error = ref('')
const isLoading = ref(false)

// 检查是否已认证
const isAuthenticated = computed(() => {
  // /team-composition 路径不需要密码验证
  if (route.path.includes('/team-composition')) {
    return true
  }
  const authStatus = localStorage.getItem(STORAGE_KEY)
  return authStatus === 'authenticated'
})

// 处理表单提交
const handleSubmit = () => {
  error.value = ''
  
  if (!password.value) {
    error.value = '请输入密码'
    return
  }

  isLoading.value = true

  // 模拟验证延迟，提供更好的用户体验
  setTimeout(() => {
    if (password.value === PASSWORD) {
      // 保存认证状态到 localStorage
      localStorage.setItem(STORAGE_KEY, 'authenticated')
      // 触发页面重新加载以显示应用内容
      window.location.reload()
    } else {
      error.value = '密码错误，请重试'
      password.value = ''
      isLoading.value = false
    }
  }, 300)
}
</script>

<style scoped>
.password-guard {
  animation: fadeIn 0.6s ease-out;
}

.password-card {
  animation: slideUp 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 粒子动画 */
.particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent);
  animation: float 20s infinite ease-in-out;
}

.particle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.particle-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.particle-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.particle-4 {
  width: 250px;
  height: 250px;
  top: 30%;
  right: 30%;
  animation-delay: 6s;
}

.particle-5 {
  width: 180px;
  height: 180px;
  bottom: 30%;
  right: 10%;
  animation-delay: 8s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, -30px) scale(1.1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
    opacity: 0.4;
  }
  75% {
    transform: translate(20px, 30px) scale(1.05);
    opacity: 0.5;
  }
}

/* 输入框聚焦效果 */
input:focus {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

/* 响应式优化 */
@media (max-width: 640px) {
  .password-card {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .particle {
    display: none;
  }
}
</style>

