<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import EChartsComponent from '../components/EChartsComponent.vue';
import GlobeComponent from '../components/GlobeComponent.vue';
import Navigation from '../components/Navigation.vue';
import ChartModal from '../components/ChartModal.vue';
import { useRouter } from 'vue-router'
const router = useRouter()

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
const selectedCity = ref(null)
const isChinaSelected = ref(false)
const isSoutheastAsiaSelected = ref(false)
const isItalySelected = ref(false)
const isAmericaSelected = ref(false)
const isMiddleEastSelected = ref(false)

// nav
const goHome = () => {
	router.push('/')
}

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

// Handle city click event from globe
const handleCityClick = (cityInfo) => {
  selectedCity.value = cityInfo
  isChinaSelected.value = cityInfo.country === 'China'
  isSoutheastAsiaSelected.value = cityInfo.country === 'Singapore' || cityInfo.region === 'Southeast Asia'
  isItalySelected.value = cityInfo.country === 'Italy'
  isAmericaSelected.value = cityInfo.country === 'United States'
  isMiddleEastSelected.value = cityInfo.country === 'United Arab Emirates' || cityInfo.region === 'Middle East'
  console.log('City selected:', cityInfo.city, cityInfo.country, 'Is China:', isChinaSelected.value, 'Is Southeast Asia:', isSoutheastAsiaSelected.value, 'Is Italy:', isItalySelected.value, 'Is America:', isAmericaSelected.value, 'Is Middle East:', isMiddleEastSelected.value)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative">
    <!-- navItems: 导航栏 -->
    <!-- <Navigation :nav-items="navItems" /> -->
    <!-- 顶部导航栏 -->
    <nav class="top-nav">
      <div class="nav-container">
        <!-- 返回首页按钮 -->
        <div class="home-btn" @click="goHome">
          <div class="home-icon">
            <img src="../assets/nav_back.png" alt="Home" />
          </div>
        </div>
        <div class="nav-divider"></div>

        <div class="nav-item active">Industry Background</div>
        <div class="nav-divider"></div>
        <router-link to="/market-demand" class="nav-item">Market Demand</router-link>
        <div class="nav-divider"></div>
        <router-link to="/business-model" class="nav-item">Business Model</router-link>
        <div class="nav-divider"></div>
        <router-link to="/team-composition" class="nav-item">Team Composition</router-link>
        <div class="nav-divider"></div>
        <router-link to="/product-introduction" class="nav-item">Product Introduction</router-link>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="w-full px-4 sm:px-8 pt-24 pb-8 min-h-screen overflow-hidden">
      <div class="flex flex-col xl:flex-row gap-8 xl:gap-12 h-full overflow-hidden">
        <!-- Left Side - Page Title and Charts -->
        <div class="w-full xl:w-1/2 flex flex-col h-full">
          <!-- Page Title -->
          <div class="mt-1 mb-6 xl:mb-8 flex-shrink-0">
            <div class="flex items-center text-white">
              <img src="../assets/icon-1.png" alt="Icon" class="w-[27px] h-[28px] mr-3" />
              <p class="text-[20px] font-bold text-gray-300 tracking-wide">Industry Background - {{ isChinaSelected ? 'China' : isSoutheastAsiaSelected ? 'Southeast Asia' : isItalySelected ? 'Italian' : isAmericaSelected ? 'America' : isMiddleEastSelected ? 'Middle East' : 'Global' }}</p>
            </div>
          </div>

          <!-- Charts Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6">
            <!-- Chart 1: Global small yacht manufacturing industry -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">{{ isChinaSelected ? "China's small yacht manufacturing industry" : isSoutheastAsiaSelected ? "Small yacht manufacturing industry in Southeast Asia" : isItalySelected ? "Italian small yacht manufacturing industry" : isAmericaSelected ? "Small yacht manufacturing industry in the United States" : isMiddleEastSelected ? "Small yacht manufacturing industry in the Middle East" : "Global small yacht manufacturing industry" }}</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="bar" :selected-city="selectedCity" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- Chart 2: Global small yacht sales market size -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">{{ isChinaSelected ? "China's Small Yacht Sales Market" : isSoutheastAsiaSelected ? "Water sports equipment in Southeast Asia" : isItalySelected ? "Italian small yacht sales market" : isAmericaSelected ? "Size of the Small Yacht Sales Market in the United States" : isMiddleEastSelected ? "Scale of Small Yacht Sales Market in the Middle East" : "Global small yacht sales market size" }}</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="area" :selected-city="selectedCity" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- Chart 3: Global market size of water outdoor sports equipment (growth rate) -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">{{ isChinaSelected ? "Water sports equipment in China" : isSoutheastAsiaSelected ? "Water sports equipment in Southeast Asia" : isItalySelected ? "Water sports equipment in Italy" : isAmericaSelected ? "Water sports equipment in USA" : isMiddleEastSelected ? "Water sports equipment in the Middle East" : "Global market size of water outdoor sports equipment" }}<br/>(growth rate)</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="line" :selected-city="selectedCity" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- Chart 4: Global market size of water outdoor sports equipment -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">{{ isChinaSelected ? "Water sports equipment in China" : isSoutheastAsiaSelected ? "Water sports equipment in Southeast Asia" : isItalySelected ? "Water sports equipment in Italy" : isAmericaSelected ? "Water sports equipment in the United States" : isMiddleEastSelected ? "Water sports equipment in the Middle East" : "Global market size of water outdoor sports equipment" }}</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="scatter" :selected-city="selectedCity" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- Chart 5: Global ship leasing market size -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">{{ isChinaSelected ? "China's ship leasing market" : isSoutheastAsiaSelected ? "The ship leasing market in Southeast Asia" : isItalySelected ? "The scale of the Italian ship leasing market" : isAmericaSelected ? "The scale of the US ship leasing market" : isMiddleEastSelected ? "The scale of the ship leasing market in the Middle East" : "Global ship leasing market size" }}</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="gradientBar" :selected-city="selectedCity" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- Chart 6: Age structure of global shipowners -->
            <div class="text-white">
              <div class="flex items-center mb-4">
                <div class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <h3 class="text-sm text-gray-300">{{ isChinaSelected ? "Age structure of Chinese ship owners" : isSoutheastAsiaSelected ? "Age structure of shipowners in Southeast Asia" : isItalySelected ? "Age structure of Italian shipowners" : isAmericaSelected ? "Age structure of American shipowners" : isMiddleEastSelected ? "Age structure of shipowners in the Middle East" : "Age structure of global shipowners" }}</h3>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="pie" :selected-city="selectedCity" @chart-click="handleChartClick" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Globe -->
        <div class="w-[50vw] h-[80vh] flex flex-col items-center justify-center mt-10">
          <div class="relative w-full h-full aspect-square">
            <!-- Selected City Indicator & Summary Button -->
            <div class="absolute top-0 right-0 z-10 flex flex-col items-end space-y-3">
              <!-- Selected City Display -->
              <!-- <div v-if="selectedCity" class="bg-gray-800/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2 text-white text-sm">
                <span class="text-cyan-400 font-medium">Selected:</span> {{ selectedCity.city }}, {{ selectedCity.country }}
              </div> -->

              <!-- Summary Button -->
              <div
                @mouseenter="showSummary = true"
                @mouseleave="showSummary = false"
                class="relative"
              >
                <button
                  @click="showSummary = !showSummary"
                  class="button-focus bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 text-sm xl:text-base rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 animate-pulse focus:outline-none focus:ring-0 focus:border-0"
                >
                  {{ isChinaSelected || isSoutheastAsiaSelected || isItalySelected || isAmericaSelected || isMiddleEastSelected ? 'Government Policy' : 'Summary' }}
                </button>

                <!-- Summary Popup -->
                <div
                  v-show="showSummary"
                  @mouseenter="showSummary = true"
                  @mouseleave="showSummary = false"
                  class="absolute top-full z-9999999 right-0 mt-6 w-96 bg-gray-800/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 shadow-2xl transform transition-all duration-300 origin-top-right"
                  :class="showSummary ? 'animate-in fade-in-90 slide-in-from-top-2' : 'animate-out fade-out-90 slide-out-to-top-2'"
                >
                  <!-- Content -->
                  <div class="text-gray-100 text-sm leading-relaxed">
                    <template v-if="isChinaSelected">
                      <p class="mb-3 font-semibold text-cyan-400">Guiding Opinions on Promoting the Development of Energy Electronics Industry</p>
                      <p class="mb-3">
                        Promote the electrification of transportation and machinery, accelerate the research and promotion of electric ships, electric aircraft, and other technologies
                      </p>
                      <p class="mb-3 font-semibold text-cyan-400">Guiding Opinions on Accelerating the Green Development of Manufacturing Industry</p>
                      <p>
                        Accelerate the development and demonstration application of green and intelligent ships powered by liquefied natural gas (LNG), methanol, ammonia, batteries, and other forms of energy in the field of ships and marine engineering equipment, and promote pilot projects for the electrification of inland and offshore ships
                      </p>
                    </template>
                    <template v-else-if="isSoutheastAsiaSelected">
                      <p class="mb-3 font-semibold text-cyan-400">Regulation No. 18/2024 of the Indonesian Maritime Authority:</p>
                      <p class="mb-3">
                        Starting from 2026, the operation of fuel powered sightseeing boats will be completely banned in Bali and Komodo National Parks, and they will be forced to replace with pure electric or solar hybrid boats. Imported electric boats will be exempt from tariffs and receive a 15% subsidy for purchasing boats.
                      </p>
                      <p class="mb-3 font-semibold text-cyan-400">Singapore Green Port Fund:</p>
                      <p class="mb-3">
                        Subsidies 30% of the cost of ship electrification transformation, exempts electric ships from port tonnage tax for 5 years, and requires Tuas Port to achieve the world's first fully electric container terminal operation by 2026
                      </p>
                      <p class="mb-3 font-semibold text-cyan-400">Thailand's National Electric Boat Infrastructure Plan:</p>
                      <p>
                        Build 50 marine battery swapping stations in waters such as the Mekong River and Pattaya, providing 15 minute fast battery swapping services. Electric boat charging can enjoy a 70% discount on industrial electricity prices.
                      </p>
                    </template>
                    <template v-else-if="isItalySelected">
                      <p class="mb-3 font-semibold text-cyan-400">The European Green Deal</p>
                      <p class="mb-3">
                        A landmark document for Europe's green transformation, with the core goal of achieving climate neutrality and decoupling the economy from resource utilization by 2050. This strategy has promoted the deep decarbonization of the shipping industry, and electric ships, as one of the zero emission technology paths, have been included in the key support category
                      </p>
                      <p class="mb-3 font-semibold text-cyan-400">The EU Renewable Energy Directive (RED III)</p>
                      <p class="mb-3">
                        Provides fuel support for electric ships, specifies the definition and usage ratio of sustainable fuels, and provides policy guarantees for the energy sources of electric ships. This directive includes green hydrogen and its synthetic fuels in the mandatory quota system, providing long-term policy support for the "green fuel+electric propulsion" integration model of electric ships
                      </p>
                      <p class="mb-3 font-semibold text-cyan-400">The "FuelEU Maritime" regulation</p>
                      <p>
                        Requires ships of over 5000 tons to reduce their fuel carbon intensity annually starting from 2025 (by 6% in 2030 and 80% in 2050). After 2030, shore power or zero emission technologies must be used when docking, and violators will be fined according to the carbon emission difference.
                      </p>
                    </template>
                    <template v-else-if="isAmericaSelected">
                      <p class="mb-3 font-semibold text-cyan-400">The Port Electrification and Climate Resilience Act</p>
                      <p class="mb-3">
                        Allocates $5.4 billion to support port electrification, including $3 billion for deploying high-voltage charging networks (covering the top 20 ports in the United States), $1.5 billion for subsidizing the purchase of electric tugboats/ferries, and $900 million for upgrading grid adaptation capabilities.
                      </p>
                      <p class="mb-3 font-semibold text-cyan-400">California AB1296 Act</p>
                      <p>
                        Starting from 2027, government vessels in the San Francisco Bay Area must be fully electrified. By 2035, the carbon emissions per unit voyage of commercial ferries must be ≤ 35g CO₂/passenger km (120g by 2023), and a maximum subsidy of $500000 will be provided for electric vessels through the HVIP program.
                      </p>
                    </template>
                    <template v-else-if="isMiddleEastSelected">
                      <p class="mb-3 font-semibold text-cyan-400">Saudi NEOM's 'Blue Channel' Plan</p>
                      <p class="mb-3">
                        Investing $18 billion to deploy 300 hydrogen electric dual fuel yachts (with hydrogen energy accounting for ≥ 50%) in the Red Sea, supporting the construction of offshore photovoltaic charging islands (120MW installed capacity, daily power supply of 200MWh) and the world's first underwater wireless charging corridor.
                      </p>
                      <p class="mb-3 font-semibold text-cyan-400">UAE DSMART Port Regulations</p>
                      <p class="mb-3">
                        Mandatory reservation of ≥ 1MW ship charging interface (compatible with CHAdeMO/GB/T/CCS protocol) for new terminals, exemption of berthing fees for electric ships and priority scheduling rights, with the goal of achieving 100% electrification of port operation ships by 2027.
                      </p>
                      <p class="mb-3 font-semibold text-cyan-400">Middle East Green Shipping Cooperation</p>
                      <p>
                        Jointly build the Red Sea Persian Gulf Green Shipping Corridor, unify electric ship technology standards and carbon emission accounting methods, cooperate in developing green hydrogen fuel supply chains, and establish regional carbon trading markets.
                      </p>
                    </template>
                    <template v-else>
                      <p class="mb-3">
                        The global small yacht industry is developing towards electrification, intelligence, sharing, and youthfulness.
                      </p>
                      <p class="mb-3">
                        The global small yacht and related water leisure industry will show strong growth momentum by 2030, and the overall market size is expected to reach nearly 80 billion US dollars in economic volume by 2030.
                      </p>
                      <p>
                        Technological innovation and sustainable development concepts will reshape the industry's competitive landscape.
                      </p>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <!-- Globe -->
            <div class="absolute inset-0 flex items-center justify-center">
              <GlobeComponent @city-click="handleCityClick" />
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

/* 顶部导航栏.start */
.home-btn {
	cursor: pointer;
	transition: all 0.3s ease;
	padding: 5px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
}

.home-btn:hover {
	background: rgba(0, 212, 255, 0.2);
	transform: scale(1.1);
}

.home-icon {
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.home-icon img {
	width: 100%;
	height: 100%;
	object-fit: contain;
}

.top-nav {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(10px);
	z-index: 40;
	padding: 15px 0;
}

.nav-container {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 12px;
	flex-wrap: wrap;
}

@media (min-width: 1024px) {
	.nav-container {
		gap: 20px;
		padding: 0 20px;
		flex-wrap: nowrap;
	}
}

.nav-item {
	padding: 8px 12px;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	font-size: 12px;
	font-weight: 500;
	text-decoration: none;
	color: #ffffff;
	text-align: center;
}

@media (min-width: 1024px) {
	.nav-item {
		padding: 10px 20px;
		font-size: 14px;
	}
}

.nav-item:hover {
	color: #00d4ff;
}

.nav-item.active {
	color: #00d4ff;
}

.nav-item.active::after {
	content: '';
	position: absolute;
	bottom: -5px;
	left: 0;
	right: 0;
	height: 2px;
	background: #00d4ff;
}

.nav-divider {
	width: 1px;
	height: 20px;
	background: rgba(255, 255, 255, 0.3);
}
/* 顶部导航栏.start */

</style>
