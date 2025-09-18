<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  countries: {
    type: Array,
    required: true,
    default: () => []
  }
})

const rotation = ref(0)
const isAutoRotating = ref(false)
const autoRotationTarget = ref(0)

const emit = defineEmits(['countryHover'])

const isHighlighted = (angle) => {
  const normalizedAngle = ((angle + rotation.value) % 360 + 360) % 360
  return normalizedAngle >= 45 && normalizedAngle <= 135
}

const isCollapsed = (angle) => {
  const normalizedAngle = ((angle + rotation.value) % 360 + 360) % 360
  return (normalizedAngle >= 0 && normalizedAngle <= 30) || (normalizedAngle >= 150 && normalizedAngle <= 210)
}

const shouldHide = (angle) => {
  const normalizedAngle = ((angle + rotation.value) % 360 + 360) % 360
  return normalizedAngle > 180 && normalizedAngle < 360
}

const getBoundaryVisibility = (angle) => {
  const normalizedAngle = ((angle + rotation.value) % 360 + 360) % 360

  // 计算所有国家的状态
  const countryStates = props.countries.map(country => {
    const countryAngle = ((country.angle + rotation.value) % 360 + 360) % 360
    return {
      angle: countryAngle,
      isHighlighted: isHighlighted(country.angle),
      inFront: countryAngle <= 180
    }
  })

  // 计算前半部分的高亮国家数量
  const frontHighlightedCount = countryStates.filter(state =>
    state.isHighlighted && state.inFront
  ).length

  // 核心策略：确保前半部分至少有3个高亮国家
  if (frontHighlightedCount < 3) {
    // 如果前半部分高亮国家少于3个，让所有在前半部分的国家都可见
    if (normalizedAngle <= 180) {
      return 'visible'
    }

    // 如果这个国家是高亮的但处于后半部分，也让它可见
    if (isHighlighted(angle) && normalizedAngle > 180) {
      return 'visible'
    }
  }

  // 如果前半部分已经有3个或更多高亮国家，采用正常逻辑
  if (frontHighlightedCount >= 3) {
    // 后半部分（180-360度）的隐藏逻辑
    if (normalizedAngle > 180 && normalizedAngle < 360) {
      // 高亮国家保持可见
      if (isHighlighted(angle)) {
        return 'visible'
      }

      // 计算前半部分的非高亮国家数量
      const frontNonHighlighted = countryStates.filter(state =>
        !state.isHighlighted && state.inFront
      ).length

      // 确保前半部分至少有1个非高亮国家可见
      if (frontNonHighlighted < 1) {
        // 如果这个非高亮国家接近边界，让它可见
        if (normalizedAngle >= 180 && normalizedAngle <= 200) {
          return 'visible'
        }
      }

      return 'hidden'
    }
  }

  // 默认规则：前半部分可见，后半部分隐藏
  return normalizedAngle <= 180 ? 'visible' : 'hidden'
}

const handleWheel = (e) => {
  e.preventDefault()
  const delta = e.deltaY > 0 ? 15 : -15
  const newRotation = rotation.value + delta

  // 限制旋转范围：逆时针最大到-180度，顺时针最大到180度
  if (newRotation >= -180 && newRotation <= 180) {
    rotation.value = newRotation
  }
}

const handleCountryHover = (country) => {
  if (isHighlighted(country.angle)) return

  isAutoRotating.value = true
  // 计算需要旋转的角度，让这个国家进入高亮区域（45-135度的中心，即90度）
  const targetAngle = 90 - country.angle
  autoRotationTarget.value = targetAngle

  // 平滑旋转到目标位置
  smoothRotateTo(targetAngle)

  // 触发父组件的事件
  emit('countryHover', country)
}

const smoothRotateTo = (targetRotation) => {
  const startRotation = rotation.value
  const rotationDiff = targetRotation - startRotation
  const duration = 1000 // 1秒
  const startTime = Date.now()

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 使用easeOutCubic缓动函数
    const easeProgress = 1 - Math.pow(1 - progress, 3)

    const currentRotation = startRotation + rotationDiff * easeProgress

    // 限制旋转范围
    if (currentRotation >= -180 && currentRotation <= 180) {
      rotation.value = currentRotation
    }

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      isAutoRotating.value = false
    }
  }

  animate()
}

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
})
</script>

<template>
  <div class="w-full h-full flex items-center justify-center relative">
    <div class="relative w-96 h-96">
      <!-- Center Circle -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full shadow-2xl border-4 border-blue-400"></div>

      <!-- Countries positioned around the circle -->
      <div
        v-for="country in props.countries"
        :key="country.id"
        class="absolute top-1/2 left-1/2 origin-center transition-all duration-300 ease-out cursor-pointer"
        :style="{
          transform: `translate(-50%, -50%) rotate(${country.angle + rotation}deg) translateY(-160px) rotate(-${country.angle + rotation}deg)`,
          transformOrigin: 'center center',
          visibility: getBoundaryVisibility(country.angle),
          opacity: getBoundaryVisibility(country.angle) === 'hidden' ? 0 : 1
        }"
        @mouseenter="handleCountryHover(country)"
      >
        <div
          class="text-center transition-all duration-300 ease-out"
          :class="[
            isCollapsed(country.angle)
              ? 'scale-50 opacity-50'
              : isHighlighted(country.angle)
                ? 'scale-125 brightness-125 drop-shadow-lg'
                : 'scale-100 brightness-90 hover:scale-110'
          ]"
        >
          <!-- Country Image -->
          <div class="w-16 h-16 mx-auto mb-2 bg-white rounded-lg overflow-hidden shadow-lg border-2"
               :class="isHighlighted(country.angle) ? 'border-yellow-400' : 'border-gray-300'">
            <img
              :src="country.image"
              :alt="country.name"
              class="w-full h-full object-cover"
              onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj7pgq7nvaI8L3RleHQ+Cjwvc3ZnPg=='"
            />
          </div>

          <!-- Country Name -->
          <div
            class="text-sm font-semibold px-2 py-1 rounded-full backdrop-blur-sm"
            :class="[
              isHighlighted(country.angle)
                ? 'bg-yellow-400 text-gray-900 shadow-lg'
                : 'bg-white/80 text-gray-800 shadow-md'
            ]"
          >
            {{ country.name }}
          </div>
        </div>
      </div>

      <!-- Center decoration -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
        <div class="text-white text-xs font-bold text-center px-2">GLOBAL<br/>MARKET</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.country-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.country-item:hover {
  z-index: 10;
}

/* Smooth scrolling for the rotation */
.circular-container {
  transition: transform 0.1s ease-out;
}

/* Custom cursor for dragging */
.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing;
}
</style>