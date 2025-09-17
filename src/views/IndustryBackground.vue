<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import EChartsComponent from '../components/EChartsComponent.vue';
import GlobeComponent from '../components/GlobeComponent.vue';
import Navigation from '../components/Navigation.vue';
import ChartModal from '../components/ChartModal.vue';

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

const showSummary = ref(false)
const showChartModal = ref(false)
const selectedChart = ref({ title: '', type: '' })

// Calculate chart height dynamically
const chartContainerHeight = ref('0px')
const chartHeight = ref('0px')

const calculateChartHeight = () => {
  // Navigation height (pt-24 = 6rem = 96px)
  const navHeight = 84
  // Page title section height (mt-5 + mb-6 + content height ≈ 80px)
  const titleHeight = 82
  // Padding bottom (pb-8 = 2rem = 32px)
  const paddingBottom = 32
  // Grid gap (gap-4 between 3 rows = 8px * 2 = 16px for mobile, gap-6 for desktop)
  const gridGap = window.innerWidth >= 1024 ? 12 * 2 : 8 * 2 // 2 gaps between 3 rows
  const gridTitle = 56 * 3

  console.log(navHeight, titleHeight, paddingBottom, gridGap)

  const availableHeight = window.innerHeight - navHeight - titleHeight - paddingBottom - gridGap - gridTitle
  const calculatedChartHeight = Math.floor(availableHeight / 3) // 3 rows of charts

  chartHeight.value = `${calculatedChartHeight}px`
}

onMounted(() => {
  calculateChartHeight()
  window.addEventListener('resize', calculateChartHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateChartHeight)
})

// Handle chart click event
const handleChartClick = (chartInfo) => {
  selectedChart.value = {
    title: getChartTitle(chartInfo.chartType),
    type: chartInfo.chartType
  }
  showChartModal.value = true
}

// Get chart title based on chart type
const getChartTitle = (chartType) => {
  const titles = {
    'bar': 'Global small yacht manufacturing industry',
    'area': 'Global small yacht sales market size',
    'line': 'Global market size of water outdoor sports equipment (growth rate)',
    'scatter': 'Global market size of water outdoor sports equipment',
    'pie': 'Age structure of global shipowners'
  }
  return titles[chartType] || 'Chart Details'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative">
    <!-- navItems: 导航栏 -->
    <Navigation :nav-items="navItems" />

    <!-- Main Content -->
    <div class="w-full px-4 sm:px-8 pt-24 pb-8 min-h-screen overflow-hidden">
      <div class="flex flex-col xl:flex-row gap-8 xl:gap-12 h-full overflow-hidden">
        <!-- Left Side - Page Title and Charts -->
        <div class="w-full xl:w-1/2 flex flex-col h-full">
          <!-- Page Title -->
          <div class="mt-5 mb-6 xl:mb-8 flex-shrink-0">
            <div class="flex items-center text-white">
              <img src="../assets/icon-1.png" alt="Icon" class="w-[27px] h-[28px] mr-3" />
              <p class="text-[20px] font-bold text-gray-300 tracking-wide">Industry Background - Global</p>
            </div>
          </div>

          <!-- Charts Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6">
            <!-- Chart 1: Global small yacht manufacturing industry -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Global small yacht manufacturing industry</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="bar" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- Chart 2: Global small yacht sales market size -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Global small yacht sales market size</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="area" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- Chart 3: Global market size of water outdoor sports equipment (growth rate) -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Global market size of water outdoor sports equipment<br/>(growth rate)</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="line" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- Chart 4: Global market size of water outdoor sports equipment -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Global market size of water outdoor sports equipment</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="scatter" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- Chart 5: Global ship leasing market size -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Global ship leasing market size</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="bar" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- Chart 6: Age structure of global shipowners -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">Age structure of global shipowners</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="pie" @chart-click="handleChartClick" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Globe -->
        <div class="w-[50vw] h-[80vh] flex flex-col items-center justify-center mt-10">
          <div class="relative w-full h-full aspect-square">
            <!-- Summary Button -->
            <div class="absolute top-0 right-0 z-10">
              <button
                @mouseenter="showSummary = true"
                @mouseleave="showSummary = false"
                @click="showSummary = !showSummary"
                class="button-focus bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 text-sm xl:text-base rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 animate-pulse focus:outline-none focus:ring-0 focus:border-0"
              >
                Summary
              </button>

              <!-- Summary Popup -->
              <div
                v-show="showSummary"
                class="absolute top-full right-0 mt-5 w-96 bg-gray-800/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 shadow-2xl transform transition-all duration-300 origin-top-right"
                :class="showSummary ? 'animate-in fade-in-90 slide-in-from-top-2' : 'animate-out fade-out-90 slide-out-to-top-2'"
              >
                <div class="relative">
                  <!-- Arrow -->
                  <div class="absolute -top-4 right-4 w-4 h-4 bg-gray-800/95 border-t border-l border-cyan-500/30 transform rotate-45"></div>

                  <!-- Content -->
                  <div class="text-gray-100 text-sm leading-relaxed">
                    <p class="mb-3">
                      The global small yacht industry is developing towards electrification, intelligence, sharing, and youthfulness.
                    </p>
                    <p class="mb-3">
                      The global small yacht and related water leisure industry will show strong growth momentum by 2030, and the overall market size is expected to reach nearly 80 billion US dollars in economic volume by 2030.
                    </p>
                    <p>
                      Technological innovation and sustainable development concepts will reshape the industry's competitive landscape.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Globe -->
            <div class="absolute inset-0 flex items-center justify-center">
              <GlobeComponent />
            </div>
          </div>

          <!-- Legend -->
          <!-- <div class="mt-8 space-y-2">
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
          </div> -->
        </div>
      </div>
    </div>

    <!-- Floating particles for visual effect -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
      <div class="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping animation-delay-4000"></div>
    </div>

    <!-- Chart Modal -->
    <ChartModal
      :is-visible="showChartModal"
      :title="selectedChart.title"
      :chart-type="selectedChart.type"
      @close="showChartModal = false"
    />
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-out {
  animation: fadeIn 0.3s ease-out reverse;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Custom animation classes */
.fade-in-90 {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}

.slide-in-from-top-2 {
  animation-name: slideIn;
}

.slide-out-to-top-2 {
  animation-name: slideIn;
  animation-direction: reverse;
}
.button-focus {
  outline: none !important;
}
</style>
