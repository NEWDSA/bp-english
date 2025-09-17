<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium'
  },
  variant: {
    type: String,
    default: 'default'
  }
})

const pinSizeClass = computed(() => {
  switch (props.size) {
    case 'small': return 'w-6 h-6'
    case 'large': return 'w-10 h-10'
    default: return 'w-8 h-8'
  }
})

const dotSizeClass = computed(() => {
  switch (props.size) {
    case 'small': return 'w-2 h-2'
    case 'large': return 'w-4 h-4'
    default: return 'w-3 h-3'
  }
})

const pinColorClass = computed(() => {
  switch (props.variant) {
    case 'highlighted': return 'bg-yellow-400'
    case 'active': return 'bg-orange-500'
    default: return 'bg-cyan-500'
  }
})
</script>

<template>
  <div class="relative flex items-center justify-center cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110">
    <div :class="[
      'relative -rotate-45 shadow-md',
      pinColorClass,
      pinSizeClass,
      { 'animate-pulse': variant === 'active' }
    ]" style="border-radius: 50% 50% 50% 0;">
      <div :class="[
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white rounded-full',
        dotSizeClass
      ]"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(249, 115, 22, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(249, 115, 22, 0);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}
</style>