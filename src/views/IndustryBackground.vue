<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import EChartsComponent from '../components/EChartsComponent.vue';
import GlobeComponent from '../components/GlobeComponent.vue';
import Navigation from '../components/Navigation.vue';
import ChartModal from '../components/ChartModal.vue';
import { useRouter } from 'vue-router'
const router = useRouter()

// 页面相关状态
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

// 导航到首页
const goHome = () => {
	router.push('/')
}

// 动态计算图表高度
const chartContainerHeight = ref('0px')
const chartHeight = ref('0px')

const calculateChartHeight = () => {
  // 导航栏高度 (pt-24 = 6rem = 96px)
  const navHeight = 84
  // 页面标题部分高度 (mt-5 + mb-6 + 内容高度 ≈ 80px)
  const titleHeight = 82
  // 底部内边距 (pb-8 = 2rem = 32px)
  const paddingBottom = 32

  // 根据是否选择了地区调整计算
  if (selectedCity.value) {
    // Global视图：3行图表
    const gridGap = window.innerWidth >= 1024 ? 12 * 2 : 8 * 2 // 3行之间有2个间隙
    const gridTitle = window.innerWidth <= 1600 ? 40 * 3 : window.innerWidth > 1600 && window.innerWidth <= 1920 ? 46 * 3 : 68 * 3
    const availableHeight = window.innerHeight - navHeight - titleHeight - paddingBottom - gridGap - gridTitle
    const calculatedChartHeight = Math.floor(availableHeight / 3) // 3行图表
    chartHeight.value = `${calculatedChartHeight}px`
  } else {
    // 选择了地区：只有2行图表
    const gridGap = window.innerWidth >= 1024 ? 12 * 1 : 8 * 1 // 2行之间有1个间隙
    const gridTitle = window.innerWidth <= 1600 ? 40 * 2 : window.innerWidth > 1600 && window.innerWidth <= 1920 ? 46 * 2 : 60 * 2
    const availableHeight = window.innerHeight - navHeight - titleHeight - paddingBottom - gridGap - gridTitle
    const calculatedChartHeight = Math.floor(availableHeight / 2) // 2行图表
    chartHeight.value = `${calculatedChartHeight}px`
  }

  console.log('Chart height calculated:', chartHeight.value, 'Selected city:', selectedCity.value)
}

onMounted(() => {
  calculateChartHeight()
  window.addEventListener('resize', calculateChartHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateChartHeight)
})

// 处理图表点击事件
const handleChartClick = (chartInfo) => {
  selectedChart.value = {
    title: getChartTitle(chartInfo.chartType),
    type: chartInfo.chartType,
  }
  showChartModal.value = true
}

// 根据图表类型和地区获取图表标题
const getChartTitle = (chartType) => {
  const titles = {
    'bar': isChinaSelected.value ? "Market size of China's small yacht manufacturing industry" :
           isSoutheastAsiaSelected.value ? "Market size of small yacht manufacturing industry in Southeast Asia" :
           isItalySelected.value ? "Market size of Italian small yacht manufacturing industry" :
           isAmericaSelected.value ? "Market size of small yacht manufacturing industry in the United States" :
           isMiddleEastSelected.value ? "Market size of small yacht manufacturing industry in the Middle East" :
           "The market size of the global small yacht manufacturing industry",
    'area': isChinaSelected.value ? "Scale of China's Small Yacht Sales Market" :
            isSoutheastAsiaSelected.value ? "Market size of outdoor water sports equipment in Southeast Asia" :
            isItalySelected.value ? "The size of the Italian small yacht sales market" :
            isAmericaSelected.value ? "Size of the Small Yacht Sales Market in the United States" :
            isMiddleEastSelected.value ? "Scale of Small Yacht Sales Market in the Middle East" :
            "Global small yacht sales market size",
    'line': isChinaSelected.value ? "Market size of outdoor water sports equipment in China" :
             isSoutheastAsiaSelected.value ? "Market size of outdoor water sports equipment in Southeast Asia" :
             isItalySelected.value ? "Market size of outdoor water sports equipment in Italy" :
             isAmericaSelected.value ? "Market size of outdoor water sports equipment in the United States" :
             isMiddleEastSelected.value ? "Market size of water and outdoor sports equipment in the Middle East" :
             "Global market size of water outdoor sports equipment",
    'scatter': isChinaSelected.value ? "The scale of China's leisure yacht market" :
               isSoutheastAsiaSelected.value ? "The scale of the leisure yacht market in Southeast Asia" :
               isItalySelected.value ? "The scale of the Italian leisure yacht market" :
               isAmericaSelected.value ? "The scale of the recreational yacht market in the United States" :
               isMiddleEastSelected.value ? "The scale of the leisure yacht market in the Middle East" :
               "Global leisure yacht market size",
    'pie': isChinaSelected.value ? "Age structure of Chinese ship owners" :
           isSoutheastAsiaSelected.value ? "Age structure of shipowners in Southeast Asia" :
           isItalySelected.value ? "Age structure of Italian shipowners" :
           isAmericaSelected.value ? "Age structure of American shipowners" :
           isMiddleEastSelected.value ? "Age structure of shipowners in the Middle East" :
           "Age structure of global shipowners",
    'gradientBar': isChinaSelected.value ? "China's ship leasing market" :
                   isSoutheastAsiaSelected.value ? "The scale of the ship leasing market in Southeast Asia" :
                   isItalySelected.value ? "The scale of the Italian ship leasing market" :
                   isAmericaSelected.value ? "The scale of the US ship leasing market" :
                   isMiddleEastSelected.value ? "The scale of the ship leasing market in the Middle East" :
                   "Global ship leasing market size"
  }
  return titles[chartType] || 'Chart Details'
}

// 处理地球上的城市点击事件
const handleCityClick = (cityInfo) => {
  selectedCity.value = cityInfo
  isChinaSelected.value = cityInfo.country === 'China'
  isSoutheastAsiaSelected.value = cityInfo.country === 'Singapore' || cityInfo.region === 'Southeast Asia'
  isItalySelected.value = cityInfo.country === 'Italy'
  isAmericaSelected.value = cityInfo.country === 'United States'
  isMiddleEastSelected.value = cityInfo.country === 'United Arab Emirates' || cityInfo.region === 'Middle East'
  console.log('City selected:', cityInfo.city, cityInfo.country, 'Is China:', isChinaSelected.value, 'Is Southeast Asia:', isSoutheastAsiaSelected.value, 'Is Italy:', isItalySelected.value, 'Is America:', isAmericaSelected.value, 'Is Middle East:', isMiddleEastSelected.value)
  // 重新计算图表高度
  calculateChartHeight()
}

// 处理地球背景点击事件 - 切换到Global数据
const handleGlobeClick = () => {
  selectedCity.value = null
  isChinaSelected.value = false
  isSoutheastAsiaSelected.value = false
  isItalySelected.value = false
  isAmericaSelected.value = false
  isMiddleEastSelected.value = false
  console.log('Globe clicked: Reset to Global data')
  // 重新计算图表高度
  calculateChartHeight()
}

// 数字滚动动画函数
const animateNumber = (element, start, end, duration = 1500, isPercentage = false, isCurrency = false) => {
  if (!element) return

  const startTime = Date.now()
  const diff = end - start

  const animate = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 使用缓动函数让动画更自然
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = start + diff * easeOutQuart

    // 格式化显示
    let displayValue = ''
    if (isCurrency) {
      displayValue = '$' + Math.round(current).toLocaleString()
      if (end >= 1000000000) {
        displayValue = '$' + (current / 1000000000).toFixed(0) + '亿'
      } else if (end >= 100000000) {
        displayValue = '$' + (current / 100000000).toFixed(0) + '亿'
      }
    } else if (isPercentage) {
      displayValue = Math.round(current) + '%'
    } else {
      // 船艇数量
      if (current < 1) {
        displayValue = current.toFixed(1) + '艘'
      } else if (element.classList.contains('boat-value') && isSoutheastAsiaSelected.value) {
        displayValue = '2-5艘'
      } else {
        displayValue = Math.round(current) + '艘'
      }
    }

    element.textContent = displayValue

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

// 触发所有数字动画
const triggerNumberAnimations = () => {
  nextTick(() => {
    // GDP动画
    const gdpElement = document.querySelector('.gdp-value')
    if (gdpElement) {
      const targetValue = parseFloat(gdpElement.getAttribute('data-value')) || 0
      if (targetValue > 0) {
        animateNumber(gdpElement, 0, targetValue, 1500, false, true)
      }
    }

    // 收入比例动画
    const incomeElement = document.querySelector('.income-value')
    if (incomeElement) {
      const targetValue = parseFloat(incomeElement.getAttribute('data-value')) || 0
      if (targetValue > 0) {
        animateNumber(incomeElement, 0, targetValue, 1500, true)
      }
    }

    // 产业规模动画
    const industryElement = document.querySelector('.industry-value')
    if (industryElement) {
      const targetValue = parseFloat(industryElement.getAttribute('data-value')) || 0
      if (targetValue > 0) {
        animateNumber(industryElement, 0, targetValue * 100000000, 1500, false, true)
      }
    }

    // 船艇拥有量动画
    const boatElement = document.querySelector('.boat-value')
    if (boatElement) {
      const targetValue = parseFloat(boatElement.getAttribute('data-value')) || 0
      if (targetValue > 0) {
        animateNumber(boatElement, 0, targetValue, 1500)
      }
    }
  })
}

// 监听selectedCity变化，触发动画
watch(selectedCity, (newValue) => {
  if (newValue) {
    triggerNumberAnimations()
  }
})
</script>

<template>
  <div class="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
    <!-- 顶部导航栏 -->
    <nav class="flex-shrink-0 top-nav">
      <div class="nav-container">
        <!-- 返回首页按钮 -->
        <div class="home-btn" @click="goHome">
          <div class="home-icon">
            <img src="../assets/nav_back.png" alt="Home" />
          </div>
        </div>
        <div class="nav-divider"></div>

        <router-link to="/product-introduction" class="nav-item">Product Introduction</router-link>
        <div class="nav-divider"></div>
        <div class="nav-item active">Industry Background</div>
        <div class="nav-divider"></div>
        <router-link to="/market-demand" class="nav-item">Market Demand</router-link>
        <div class="nav-divider"></div>
        <router-link to="/business-model" class="nav-item">Business Model</router-link>
        <div class="nav-divider"></div>
        <router-link to="/team-composition" class="nav-item">Team Composition</router-link>
      </div>
    </nav>

    <!-- 主内容区域 -->
    <div class="flex-1 overflow-auto px-4 sm:px-8 pt-5 pb-5">
      <div class="flex flex-col xl:flex-row gap-8 xl:gap-12 h-full">
        <!-- 左侧 - 页面标题和图表 -->
        <div class="w-full xl:w-1/2 flex flex-col h-full">
          <!-- 页面标题 -->
          <div class="mb-[30px] xl:mb-8 flex-shrink-0">
            <div class="flex items-center text-white">
              <img src="../assets/icon-1.png" alt="Icon" class="w-[27px] h-[28px] mr-3" />
              <p class="text-sm md:text-sm lg:text-lg xl:text-xl 2xl:text-[24px]">Industry Background - {{ isChinaSelected ? 'China' : isSoutheastAsiaSelected ? 'Southeast Asia' : isItalySelected ? 'Italian' : isAmericaSelected ? 'America' : isMiddleEastSelected ? 'Middle East' : 'Global' }}</p>
            </div>
          </div>

          <!-- 图表网格布局 -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-4">
           
            <!-- 图表1：全球小型游艇销售市场规模 -->
            <div class="text-white">
              <div class="flex items-center h-12">
                <div class="w-1 h-1 bg-white rounded-full mr-3"></div>
                <p class="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-[18px]">{{ isChinaSelected ? "China's Small Yacht Sales Market" : isSoutheastAsiaSelected ? "Water sports equipment in Southeast Asia" : isItalySelected ? "Italian small yacht sales market" : isAmericaSelected ? "Size of the Small Yacht Sales Market in the United States" : isMiddleEastSelected ? "Scale of Small Yacht Sales Market in the Middle East" : "Global small yacht sales market size" }}</p>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="area" :selected-city="selectedCity" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- 图表2：全球船舶租赁市场规模 -->
            <div class="text-white">
              <div class="flex items-center h-12">
                <div class="w-1 h-1 bg-white rounded-full mr-3"></div>
                <p class="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-[18px]">{{ isChinaSelected ? "China's ship leasing market" : isSoutheastAsiaSelected ? "The ship leasing market in Southeast Asia" : isItalySelected ? "The scale of the Italian ship leasing market" : isAmericaSelected ? "The scale of the US ship leasing market" : isMiddleEastSelected ? "The scale of the ship leasing market in the Middle East" : "Global ship leasing market size" }}</p>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="gradientBar" :selected-city="selectedCity" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- 图表3：全球船东年龄结构 -->
            <div v-if="!selectedCity" class="text-white">
              <div class="flex items-center h-12">
                <div class="w-1 h-1 bg-white rounded-full mr-3"></div>
                <p class="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-[18px]">{{ isChinaSelected ? "Age structure of Chinese ship owners" : isSoutheastAsiaSelected ? "Age structure of shipowners in Southeast Asia" : isItalySelected ? "Age structure of Italian shipowners" : isAmericaSelected ? "Age structure of American shipowners" : isMiddleEastSelected ? "Age structure of shipowners in the Middle East" : "Age structure of global shipowners" }}</p>
              </div>
              <div :style="{ height: chartHeight }">
                <EChartsComponent chart-type="pie" :selected-city="selectedCity" @chart-click="handleChartClick" />
              </div>
            </div>

            <!-- 文本 -->
            <div v-if="!selectedCity" class="text-white">
              <!-- 数据下方放行业趋势、结论 -->
              <div class="flex items-center h-12">
                <div class="w-1 h-1 bg-white rounded-full mr-3"></div>
                <p class="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-[18px]">数据下方放行业趋势、结论</p>
              </div>
              <div class="bg-gray-900/50 rounded-xl overflow-hidden" :style="{ height: chartHeight }">
                <div class="content-scroll-container h-full overflow-auto p-4 lg:p-6">
                  <div class="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-[18px]">
                    未来船舶发展呈现出"电动化"与"智能化"深度融合的明确趋势
                  </div>

                  <!-- 政策 -->
                  <div class="flex items-center mt-6 lg:mt-10">
                    <p class="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-[18px]">电动化</p>
                    <img src="../assets/icon-12.png" alt="Icon" class="w-[14px] lg:w-[16px] mr-2 ml-2 lg:mr-3 lg:ml-3" />
                    <p class="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-[18px]">智能化</p>
                  </div>
                  <div class="mt-2 text-[11px] lg:text-[12px] 2xl:text-[16px] leading-6 lg:leading-8 space-y-2">
                    <p class="flex"><img src="../assets/icon-13.png" alt="Icon" class="flex-shrink-0 w-[16px] lg:w-[18px] h-[16px] lg:h-[18px] mr-2 lg:mr-3 mt-0.5 lg:mt-1" />环保法规要求：全球主要国家海事均发布船舶零排放法规，未来将逐步禁止油船进入水域。</p>
                    <p class="flex"><img src="../assets/icon-14.png" alt="Icon" class="flex-shrink-0 w-[18px] lg:w-[20px] h-[18px] lg:h-[20px] mr-2 lg:mr-3 mt-0.5 lg:mt-1" />"三电"下放：中国电池、电机、电控技术&产业链随新能源汽车发展已成熟，三电技术将逐步下放其他交通工具领域，引领能源技术变革。目前主流船艇公司均逐步推出电动船艇产品，力图抢占市场。</p>
                    <p class="flex"><img src="../assets/icon-15.png" alt="Icon" class="flex-shrink-0 w-[18px] lg:w-[20px] h-[18px] lg:h-[20px] mr-2 lg:mr-3 mt-0.5 lg:mt-1" />智能化趋势：电动化不应是简单的"油转电"，而是全新品类的全面升级；在其他行业我们已经看到了智能化设计在不断颠覆并替代传统产品，算力芯片、AI技术已较为成熟，可快速迁移。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 数据+结论 -->
          <div v-if="selectedCity" class="flex flex-col flex-1">
            <!-- 地区特点数据 -->
            <div class="text-white flex-shrink-0">
              <div class="flex items-center h-12">
                <div class="w-1 h-1 bg-white rounded-full mr-3"></div>
                <p class="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-[18px]">地区经济与产业数据</p>
              </div>
              <div class="bg-gray-900/50 rounded-xl">
                <div class="p-2 xl:p-4 2xl:p-6">
                  <!-- 横向排列的数据 -->
                  <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
                    <!-- GDP数据 -->
                    <div class="text-center">
                      <p class="text-cyan-400 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6">人均GDP{{
                        isChinaSelected ? ' (中国大陆)' :
                        isSoutheastAsiaSelected ? ' (印尼)' :
                        isItalySelected ? ' (意大利)' :
                        isAmericaSelected ? ' (美国)' :
                        isMiddleEastSelected ? ' (阿联酋)' :
                        ''
                      }}</p>
                      <p class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white gdp-value mb-1 sm:mb-1 md:mb-2" :data-value="
                        isChinaSelected ? '13445' :
                        isSoutheastAsiaSelected ? '4960' :
                        isItalySelected ? '40437' :
                        isAmericaSelected ? '85876' :
                        isMiddleEastSelected ? '53813' :
                        '0'
                      ">{{
                        isChinaSelected ? '$13,445' :
                        isSoutheastAsiaSelected ? '$4,960' :
                        isItalySelected ? '$40,437' :
                        isAmericaSelected ? '$85,876' :
                        isMiddleEastSelected ? '$53,813' :
                        '全球平均水平'
                      }}</p>
                      <div class="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-400 leading-relaxed">
                        <p class="mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-6 hidden md:block">超$3000是游艇经济萌芽临界点,超过10,000美元时，划艇等水上运动会更受欢迎</p>
                      </div>
                    </div>

                    <!-- 家庭收入分布 -->
                    <div class="text-center">
                      <p class="text-cyan-400 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6">家庭年收入>50万{{
                        isSoutheastAsiaSelected ? ' (新加坡)' :
                        isMiddleEastSelected ? ' (沙特)' :
                        isItalySelected ? ' (意大利)' :
                        ''
                      }}</p>
                      <p class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white income-value mb-1 sm:mb-1 md:mb-2" :data-value="
                        isChinaSelected ? '4' :
                        isSoutheastAsiaSelected ? '15' :
                        isItalySelected ? '28' :
                        isAmericaSelected ? '45' :
                        isMiddleEastSelected ? '7' :
                        '0'
                      ">{{
                        isChinaSelected ? '4%' :
                        isSoutheastAsiaSelected ? '15%' :
                        isItalySelected ? '28%' :
                        isAmericaSelected ? '45%' :
                        isMiddleEastSelected ? '7%' :
                        '各地区差异较大'
                      }}</p>
                      <div class="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-400 leading-relaxed">
                        <p class="mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-6 hidden md:block">人均月收入超过2万元的家庭有能力租用游艇，年收入超过50万元以上的家庭，则有能力购买游艇</p>
                      </div>
                    </div>

                    <!-- 产业规模 -->
                    <div class="text-center">
                      <p class="text-cyan-400 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6">休闲船艇产业链{{
                        isItalySelected ? ' (欧洲)' :
                        ''
                      }}</p>
                      <p class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white industry-value mb-1 sm:mb-1 md:mb-2" :data-value="
                        isChinaSelected ? '60' :
                        isSoutheastAsiaSelected ? '12' :
                        isItalySelected ? '250' :
                        isAmericaSelected ? '750' :
                        isMiddleEastSelected ? '20' :
                        '0'
                      ">{{
                        isChinaSelected ? '$60亿' :
                        isSoutheastAsiaSelected ? '$12亿' :
                        isItalySelected ? '$250亿' :
                        isAmericaSelected ? '$750亿' :
                        isMiddleEastSelected ? '$20亿' :
                        '全球市场规模'
                      }}</p>
                      <div class="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-400 leading-relaxed">
                        <p class="mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-6 hidden md:block">产业规模反映基础设施完善程度</p>
                      </div>
                    </div>

                    <!-- 船艇拥有量 -->
                    <div class="text-center">
                      <p class="text-cyan-400 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-6">船艇拥有量</p>
                      <p class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white boat-value mb-1 sm:mb-1 md:mb-2" :data-value="
                        isChinaSelected ? '0.5' :
                        isSoutheastAsiaSelected ? '3.5' :
                        isItalySelected ? '10' :
                        isAmericaSelected ? '15' :
                        isMiddleEastSelected ? '8' :
                        '0'
                      ">{{
                        isChinaSelected ? '0.5艘' :
                        isSoutheastAsiaSelected ? '2-5艘' :
                        isItalySelected ? '10艘' :
                        isAmericaSelected ? '15艘' :
                        isMiddleEastSelected ? '8艘' :
                        '全球平均水平'
                      }}</p>
                      <div class="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-400 leading-relaxed">
                        <p class="mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-6 hidden md:block">每百户家庭拥有船艇数量</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 法规文字 -->
            <div class="text-white flex flex-col flex-1">
              <div class="flex items-center h-10 md:h-12 flex-shrink-0">
                <div class="w-1 h-1 bg-white rounded-full mr-3"></div>
                <p class="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-[18px]">水污染禁航法规</p>
              </div>
              <div class="bg-gray-900/50 rounded-xl overflow-hidden flex-1">
                <div class="content-scroll-container h-full overflow-auto p-3 md:p-4 lg:p-6 xl:p-8">
                  <div class="text-[10px] sm:text-xs lg:text-sm 2xl:text-[15px] text-gray-200 space-y-3 lg:space-y-4">
                    <template v-if="isChinaSelected">
                      <p class="text-cyan-400 font-semibold">国家排放标准：</p>
                      <p>根据中国的《船舶排放控制区规定》，中国设有"排放控制区"，包括长江、珠江等沿海和内河的主要水道，对船舶的排放提出了严格要求，特别是二氧化氮（NOx）、颗粒物（PM）以及废气排放。</p>

                      <p class="text-cyan-400 font-semibold mt-4 lg:mt-6">长江：</p>
                      <p>根据《长江船舶排放控制区（2018年修订）》规定，所有航行的船舶必须符合排放标准，尤其是燃油船舶要达到更严格的排放标准，部分区域直接禁止高排放船只入水。</p>

                      <p class="text-cyan-400 font-semibold mt-4 lg:mt-6">港口与码头管理：</p>
                      <p>中国很多沿海城市的码头对排放超标的船舶有禁止入港的规定，并对在港船只要求使用低硫燃料或符合排放标准的动力系统。</p>
                    </template>

                    <template v-else-if="isSoutheastAsiaSelected">
                      <p class="text-cyan-400 font-semibold">马来西亚：</p>
                      <p>马来西亚部分地区（如兰卡威、槟城等海岛）对燃油船实行严格的区域限制，特别是在保护区，部分海域禁止使用内燃机动力的船只。</p>

                      <p class="text-cyan-400 font-semibold mt-4 lg:mt-6">新加坡：</p>
                      <p>新加坡有严格的港口管理法规，要求船舶在入港时必须符合环境排放标准，并对内燃机船实施限制，尤其是在海洋保护区。</p>

                      <p class="text-cyan-400 font-semibold mt-4 lg:mt-6">泰国：</p>
                      <p>泰国的普吉岛等热门旅游地区对高排放船舶（如一些老旧的渔船）进行了限制，逐步鼓励使用低排放或电动的船只。</p>
                    </template>

                    <template v-else-if="isItalySelected">
                      <p class="text-cyan-400 font-semibold">欧盟指令：</p>
                      <p>欧洲出台了《休闲船艇指令（RCD，2013/53/EU）》，规定了船舶排放要求，涵盖气候变化（温室气体）、空气污染（颗粒物、氮氧化物）以及噪声污染等内容。指令要求所有进入欧盟市场的船舶必须符合环境保护标准。2018年，欧盟更新了船舶排放标准，要求所有新船必须满足更严格的排放要求。氮氧化物、碳氢化合物等污染物的排放量将进一步减少。</p>

                      <p class="text-cyan-400 font-semibold mt-4 lg:mt-6">意大利湖泊：</p>
                      <p>意大利的多个湖泊（如Lake Garda、Lake Bracciano、Lake Vico）对燃油动力船有严格的禁航令，尤其是在环保保护区和旅游保护区。例如，意大利湖区禁止使用高污染的船舶，并推动更多电动船只或环保船舶的使用。意大利部分水域限制噪音水平超过某一标准的船舶进入，尤其是在敏感生态区域和度假区。部分湖泊也设有排放限制，例如规定只有符合欧盟排放标准的船舶才允许进入。</p>
                    </template>

                    <template v-else-if="isAmericaSelected">
                      <p class="text-cyan-400 font-semibold">Lake Tahoe：</p>
                      <p>自1999年起，California州严格禁止二冲程化油器发动机进入湖泊。这意味着湖区内不得使用老旧的污染性较强的发动机。</p>

                      <p class="text-cyan-400 font-semibold mt-4 lg:mt-6">EPA Tier 4标准（2010）：</p>
                      <p>2010年推出的《美国船舶排放标准》（EPA's Tier 4 Standards），规定了小型船舶、游艇的排放限值。联邦标准（EPA）为新船和发动机制定了严格的排放标准，其中包括低硫燃料要求以及二氧化氮（NOx）、碳氢化合物和颗粒物（PM）的限制。</p>

                      <p class="text-cyan-400 font-semibold mt-4 lg:mt-6">噪音标准：</p>
                      <p>很多州，如加利福尼亚州，要求游艇和小型船舶的噪音不能超过特定的噪音标准（如75 dB）。这些要求适用于大部分船舶，包括游艇和水上摩托。</p>
                    </template>

                    <template v-else-if="isMiddleEastSelected">
                      <p class="text-cyan-400 font-semibold">阿联酋：</p>
                      <p>阿联酋迪拜的部分海域和码头限制内燃机动力船舶，特别是在靠近海洋保护区和高端旅游区（如朱美拉海滩）。迪拜的环境保护署（DEWA）要求船舶满足环保标准，逐步推广使用电动船和低排放动力的船只。</p>

                      <p class="text-cyan-400 font-semibold mt-4 lg:mt-6">沙特阿拉伯：</p>
                      <p>沙特的红海区域和海湾沿岸的一些水域已开始对高污染船舶进行限制，尤其是老旧船舶，并鼓励使用更环保的船舶。</p>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧 - 地球组件 -->
        <div class="w-[50vw] h-[80vh] flex flex-col items-center justify-center mt-10">
          <div class="relative w-full h-full aspect-square">
            <!-- 选中城市指示器和摘要按钮 -->
            <div class="absolute top-0 right-0 z-10 flex flex-col items-end space-y-3">
              <!-- 选中城市显示 -->
              <!-- <div v-if="selectedCity" class="bg-gray-800/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-4 py-2 text-white text-sm">
                <span class="text-cyan-400 font-medium">Selected:</span> {{ selectedCity.city }}, {{ selectedCity.country }}
              </div> -->

              <!-- 摘要按钮 -->
              <div
                @mouseenter="showSummary = true"
                @mouseleave="showSummary = false"
                class="relative"
              >
                <button
                  @click="showSummary = !showSummary"
                  class="button-focus bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-[20px] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 animate-pulse focus:outline-none focus:ring-0 focus:border-0"
                >
                  {{ isChinaSelected || isSoutheastAsiaSelected || isItalySelected || isAmericaSelected || isMiddleEastSelected ? 'Government Policy' : 'Summary' }}
                </button>

                <!-- 摘要弹出框 -->
                <div
                  v-show="showSummary"
                  @mouseenter="showSummary = true"
                  @mouseleave="showSummary = false"
                  class="absolute top-full z-9999999 right-0 mt-6 w-[320px] sm:w-[400px] md:w-[480px] lg:w-[820px] bg-gray-800/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 sm:p-4 shadow-2xl transform transition-all duration-300 origin-top-right"
                  :class="showSummary ? 'animate-in fade-in-90 slide-in-from-top-2' : 'animate-out fade-out-90 slide-out-to-top-2'"
                >
                  <!-- 内容 -->
                  <div class="text-gray-100 text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-[18px] leading-relaxed">
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

            <!-- 地球组件 -->
            <div class="absolute inset-0 flex items-center justify-center">
              <GlobeComponent @city-click="handleCityClick" @globe-click="handleGlobeClick" />
            </div>
          </div>

          <!-- 图例 -->
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

    <!-- 浮动粒子视觉效果 -->
    <!-- <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
      <div class="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-ping animation-delay-4000"></div>
    </div> -->

    <!-- 图表弹窗 -->
    <ChartModal
      :is-visible="showChartModal"
      :title="selectedChart.title"
      :chart-type="selectedChart.type"
      :selected-city="selectedCity"
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

/* 自定义动画类 */
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
	/* background: rgba(255, 255, 255, 0.1); */
	backdrop-filter: blur(10px);
}

.home-btn:hover {
	/* background: rgba(0, 212, 255, 0.2); */
	/* transform: scale(1.2); */
}

.home-icon {
	width: 25px;
	height: 25px;
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
	background: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(10px);
	z-index: 40;
	padding: 15px 0;
  font-family: 'Arial', sans-serif !important;
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

/* 自定义滚动条样式 */
.content-scroll-container::-webkit-scrollbar {
  width: 6px;
}

.content-scroll-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.content-scroll-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.content-scroll-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.content-scroll-container::-webkit-scrollbar-corner {
  background: transparent;
}

</style>
