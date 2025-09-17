<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EChartsComponent from '../components/EChartsComponent.vue';
import GlobeComponent from '../components/GlobeComponent.vue';

const chartData = ref([
  { title: 'Global Yacht Sales', subtitle: 'Market size and trends', type: 'line', id: 'yacht-sales' },
  { title: 'Water Sports Equipment', subtitle: 'Revenue by category', type: 'bar', id: 'equipment' },
  { title: 'Market Distribution', subtitle: 'Regional breakdown', type: 'pie', id: 'distribution' },
  { title: 'Ship Leasing Growth', subtitle: 'Year over year', type: 'area', id: 'leasing' },
  { title: 'Performance Metrics', subtitle: 'Key indicators', type: 'radar', id: 'metrics' },
  { title: 'Customer Analytics', subtitle: 'Behavior patterns', type: 'scatter', id: 'analytics' }
])

const navItems = ref([
  { id: 1, name: 'Industry Background', path: '/industry-background', active: true },
  { id: 2, name: 'Market Demand', path: '/market-demand', active: false },
  { id: 3, name: 'Business Model', path: '/business-model', active: false },
  { id: 4, name: 'Team Composition', path: '/team-composition', active: false },
  { id: 5, name: 'Product Introduction', path: '/product-introduction', active: false }
])

const router = useRouter()

const setActiveNav = (itemId) => {
  navItems.value.forEach(item => {
    item.active = item.id === itemId
  })

  const navItem = navItems.value.find(item => item.id === itemId)
  if (navItem) {
    router.push(navItem.path)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative">
    <!-- Floating Navigation Bar -->
    <div class="absolute top-8 left-8 z-20">
      <div class="bg-gray-800/30 backdrop-blur-md rounded-lg border-gray-700/50 px-6 py-3 border-t border-b">
        <div class="flex items-center space-x-1">
          <!-- Logo -->
          <img src="../assets/nav_back.png" alt="Logo" class="w-6 h-6 mr-4" />

          <!-- Navigation Items -->
          <div class="flex items-center space-x-0">
            <div v-for="(item, index) in navItems" :key="item.id" class="flex items-center">
              <span
                @click="setActiveNav(item.id)"
                :class="[
                  'px-3 py-1 cursor-pointer text-[18px] transition-all duration-200 h-full flex items-center',
                  item.active
                    ? 'text-white font-medium bg-[#3CC8C8]/30 -my-3 border-t border-b border-[#3CC8C8]'
                    : 'text-gray-400 hover:text-gray-300'
                ]">
                {{ item.name }}
              </span>
              <span v-if="index < navItems.length - 1" class="text-gray-600 mx-2">|</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full px-4 sm:px-8 pt-24 pb-8 min-h-screen">
      <div class="flex flex-col xl:flex-row gap-8 xl:gap-12 h-full">
        <!-- Left Side - Page Title and Charts -->
        <div class="w-full xl:w-1/2">
          <!-- Page Title -->
          <div class="mb-6 xl:mb-8">
            <div class="flex items-center text-white mb-6">
              <img src="../assets/icon-1.png" alt="Icon" class="w-[27px] h-[28px] mr-3" />
              <h1 class="text-[20px] font-normal text-gray-300 tracking-wide">Industry Background - Global</h1>
            </div>
          </div>

          <!-- Charts Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
            <!-- Chart 1: Global small yacht manufacturing industry -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Global small yacht manufacturing industry</h3>
              </div>
              <div class="h-[240px] xl:h-[300px] 2xl:h-[350px]">
                <EChartsComponent chart-type="bar" />
              </div>
            </div>

            <!-- Chart 2: Global small yacht sales market size -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Global small yacht sales market size</h3>
              </div>
              <div class="h-[240px] xl:h-[300px] 2xl:h-[350px]">
                <EChartsComponent chart-type="area" />
              </div>
            </div>

            <!-- Chart 3: Global market size of water outdoor sports equipment (growth rate) -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Global market size of water outdoor sports equipment<br/>(growth rate)</h3>
              </div>
              <div class="h-[240px] xl:h-[300px] 2xl:h-[350px]">
                <EChartsComponent chart-type="line" />
              </div>
            </div>

            <!-- Chart 4: Global market size of water outdoor sports equipment -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Global market size of water outdoor sports equipment</h3>
              </div>
              <div class="h-[240px] xl:h-[300px] 2xl:h-[350px]">
                <EChartsComponent chart-type="scatter" />
              </div>
            </div>

            <!-- Chart 5: Global ship leasing market size -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Global ship leasing market size</h3>
              </div>
              <div class="h-[240px] xl:h-[300px] 2xl:h-[350px]">
                <EChartsComponent chart-type="bar" />
              </div>
            </div>

            <!-- Chart 6: Age structure of global shipowners -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Age structure of global shipowners</h3>
              </div>
              <div class="h-[240px] xl:h-[300px] 2xl:h-[350px]">
                <EChartsComponent chart-type="pie" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Globe -->
        <div class="w-[50vw] h-[78vh] flex flex-col items-center justify-center">
          <div class="relative w-full h-full aspect-square">
            <!-- Summary Button -->
            <div class="absolute top-0 right-0 z-10">
              <button class="bg-gray-700 text-white px-4 py-2 text-sm xl:text-base rounded hover:bg-gray-600 transition-colors">Summary</button>
            </div>

            <!-- Globe -->
            <div class="absolute inset-0 flex items-center justify-center">
              <GlobeComponent />
            </div>
          </div>

          <!-- Legend -->
          <div class="mt-8 space-y-2">
            <div class="flex items-center">
              <div class="w-4 h-3 bg-cyan-600 mr-3"></div>
              <span class="text-white text-sm">Bar Chart</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-3 bg-gray-600 mr-3"></div>
              <span class="text-white text-sm">Flying lane</span>
            </div>
            <div class="flex items-center">
              <div class="w-4 h-3 bg-gray-500 mr-3"></div>
              <span class="text-white text-sm">Ocean</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating particles for visual effect -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
      <div class="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping animation-delay-4000"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
