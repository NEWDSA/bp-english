<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/60 backdrop-blur-sm"
      @click="$emit('close')"
    ></div>

    <!-- Modal Content -->
    <div class="relative bg-gray-900 border border-cyan-500/30 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-700">
        <div class="flex items-center">
          <div class="w-3 h-3 bg-cyan-400 rounded-full mr-3"></div>
          <h2 class="text-xl font-bold text-white">{{ title }}</h2>
        </div>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Chart Content -->
      <div class="p-6">
        <div class="h-[600px] w-full">
          <EChartsComponent :chart-type="chartType" :is-detailed="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import EChartsComponent from './EChartsComponent.vue'

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  chartType: {
    type: String,
    required: true
  }
})

defineEmits(['close'])
</script>