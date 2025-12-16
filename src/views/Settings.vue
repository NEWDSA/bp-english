<template>
  <div class="settings-page min-h-screen flex items-center justify-center overflow-hidden">
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
    </div>

    <!-- 主要内容 -->
    <div class="settings-container w-full max-w-md px-6 relative z-10">
      <div class="settings-card bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10 relative overflow-hidden">
        <!-- 卡片内部光效 -->
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <!-- 标题 -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 class="text-4xl font-bold text-white mb-3 tracking-tight">系统设置</h1>
          <p class="text-slate-400 text-lg">修改访问密码</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- 旧密码 -->
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-50"></div>
            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                v-model="oldPassword"
                type="password"
                placeholder="旧密码"
                class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>

          <!-- 新密码 -->
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-50"></div>
            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <input
                v-model="newPassword"
                type="password"
                placeholder="新密码（至少6位）"
                class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>

          <!-- 确认新密码 -->
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-50"></div>
            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="确认新密码"
                class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>

          <!-- 错误/成功提示 -->
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <p v-if="error" class="text-sm text-red-400 flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ error }}
            </p>
            <p v-else-if="success" class="text-sm text-green-400 flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              {{ success }}
            </p>
          </transition>

          <!-- 提交按钮 -->
          <button
            type="submit"
            class="w-full py-4 font-semibold rounded-2xl transition-all duration-300 shadow-lg relative overflow-hidden"
            :class="isSuccess
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-500 hover:via-blue-400 hover:to-purple-500 text-white hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'"
            :disabled="isLoading || isSuccess"
          >
            <div v-if="!isSuccess" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <span v-if="isSuccess" class="relative flex items-center justify-center gap-2">
              <span>{{ countdown }}秒后返回登录</span>
            </span>
            <span v-else-if="!isLoading" class="relative flex items-center justify-center gap-2">
              <span>确认修改</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span v-else class="relative flex items-center justify-center gap-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>修改中...</span>
            </span>
          </button>
        </form>

        <!-- 返回按钮 -->
        <div class="mt-6 text-center">
          <a
            @click="goToLogin"
            class="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>返回登录</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const isLoading = ref(false)
const isSuccess = ref(false)
const countdown = ref(5)
let countdownTimer = null

const startCountdown = () => {
  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownTimer)
      // 清除登录状态并跳转到首页（会显示登录页面）
      localStorage.removeItem('bp_english_auth')
      router.push('/')
    }
  }, 1000)
}

onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})

const goToLogin = () => {
  localStorage.removeItem('bp_english_auth')
  router.push('/')
}

const handleSubmit = async () => {
  error.value = ''
  success.value = ''

  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    error.value = '请填写完整信息'
    return
  }

  if (newPassword.value.length < 6) {
    error.value = '新密码长度至少6位'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = '两次输入的新密码不一致'
    return
  }

  isLoading.value = true

  try {
    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
      })
    })

    const data = await response.json()

    if (data.success) {
      success.value = data.message || '密码修改成功'
      oldPassword.value = ''
      newPassword.value = ''
      confirmPassword.value = ''
      isSuccess.value = true
      startCountdown()
    } else {
      error.value = data.message || '修改失败，请重试'
    }
  } catch (err) {
    error.value = '网络错误，请稍后重试'
    console.error('修改密码请求失败:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.settings-page {
  animation: fadeIn 0.6s ease-out;
}

.settings-card {
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
  .settings-card {
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
