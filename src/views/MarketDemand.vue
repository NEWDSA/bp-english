<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import icon5 from '../assets/icon-5.png'
import icon3 from '../assets/icon-3.png'
import icon4 from '../assets/icon-4.png'
import icon6_1 from '../assets/icon-6-1.png'
import icon6_2 from '../assets/icon-6-2.png'
import icon7_1 from '../assets/icon-7-1.png'
import icon7_2 from '../assets/icon-7-2.png'
import icon9_1 from '../assets/icon-9-1.png'
import icon9_2 from '../assets/icon-9-2.png'
import icon10_1 from '../assets/icon-10-1.png'
import icon10_2 from '../assets/icon-10-2.png'
import TopNavigation from '../components/TopNavigation.vue';
// import Navigation from '../components/Navigation.vue'
// import CountryCircle from '../components/CountryCircle.vue'
import GlobeComponent from '../components/GlobeComponent.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// 追踪激活图标的状态
const activeIcon = ref('icon-8')

// lib-flexible 适配相关
let cleanupFlexible = null

// 核心需求内容显示状态
const showCoreRequirements = ref(false)

// 使用默认内容初始化
onMounted(() => {
  updateMiddleContent('china')
  updateRightContent('default')
})

onUnmounted(() => {
  // 页面清理
})

const countries = ref([
  { id: 1, name: 'USA', image: '/countries/usa.png', angle: 0 },
  { id: 2, name: 'UK', image: '/countries/uk.png', angle: 30 },
  { id: 3, name: 'Germany', image: '/countries/germany.png', angle: 60 },
  { id: 4, name: 'France', image: '/countries/france.png', angle: 90 },
  { id: 5, name: 'Japan', image: '/countries/japan.png', angle: 120 },
//   { id: 6, name: 'Australia', image: '/countries/australia.png', angle: 150 },
//   { id: 7, name: 'Canada', image: '/countries/canada.png', angle: 180 },
//   { id: 8, name: 'Brazil', image: '/countries/brazil.png', angle: 210 },
//   { id: 9, name: 'India', image: '/countries/india.png', angle: 240 },
//   { id: 10, name: 'China', image: '/countries/china.png', angle: 270 },
//   { id: 11, name: 'South Korea', image: '/countries/south-korea.png', angle: 300 },
//   { id: 12, name: 'Singapore', image: '/countries/singapore.png', angle: 330 }
])

const handleCountryHover = (country) => {
  console.log('Country hovered:', country.name)
  // 可以在这里添加更多处理逻辑，比如更新其他组件的状态
}

// 处理图标激活的函数
const activateIcon = (iconName, middleContent, rightContent) => {
  // 从当前激活的图标移除激活类
  const currentActive = document.querySelector('.icon-container.active-icon')
  if (currentActive) {
    currentActive.classList.remove('active-icon')
  }

  // 给新图标添加激活类
  const newActive = document.querySelector(`.${iconName}`)
  if (newActive) {
    newActive.classList.add('active-icon')
  }

  // 更新内容
  updateMiddleContent(middleContent)
  updateRightContent(rightContent)
  activeIcon.value = iconName
}

const middleContent = ref('')
const rightContent = ref('')

const updateMiddleContent = (contentType) => {
  if (contentType === 'european') {
    middleContent.value = `
      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Core customers:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5 items-center mb-2">
          <p>tourism platforms, environmental logistics companies, high-end camping resorts</p>
          <p>technology elites and environmental pioneers, industry KOLs</p>
        </div>
        <div class="flex items-center pt-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Seed users: </h3>
        </div>
         <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5 items-center">
          <p>technology elites and environmental pioneers, industry KOLs</p>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Basic information and requirements:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>There are extremely high requirements for the environmental performance of ships, which comply with strict EU environmental regulations</p>
          <p>Emphasize innovative technology experience and pursue high performance and security, while also requiring a comprehensive after-sales and maintenance network</p>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Type:</h3>
        </div>
        <p class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] leading-relaxed ml-5">
          High end sightseeing boat, green logistics boat, high-tech leisure boat, catering to both B-end procurement and C-end high-end consumers.
        </p>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Market opportunity:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>The European Union is one of the world's largest markets for large LNG carriers, with a market share of approximately 30%.</p>
          <p>The tourism economy in the Mediterranean and Nordic islands is developed, and there is a stable demand for green and efficient sea transportation tools.</p>
          <p>The EU's "Green Agreement" drives the upgrade of traditional shipping, providing huge subsidies and policy benefits for new energy ships.</p>
          <p>The water sports culture is profound, and 67% of the general public prefer leisure and</p>
        </div>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Market demand:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>Driven by strict regulations, and pursuing zero emissions, high performance, quiet comfort, there is strong demand from high-end consumers (C-end), while maintaining a balance between B-end and C-end.</p>
          <p>Focusing on the European market, it has made great strides in environmental protection, intelligence, comfort, and tranquility, which aligns with policy guidance and high-quality tourism standards.</p>
        </div>
      </div>
    `
  } else if (contentType === 'middle-east') {
    // 中东市场内容
    middleContent.value = `
      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Core customers:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5 mb-5">
          <p>Royal affiliated enterprises, national energy companies, high-end tourism development groups</p>
        </div>

        <div class="flex items-center">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Seed users: </h3>
        </div>
         <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5 items-center">
          <p>Wealthy class, high-tech enterprises</p>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Basic information and requirements:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>Pursuing ultimate luxury, customization, and high performance, with low price sensitivity</p>
          <p>As a symbol of identity and a 'mobile luxury palace', ships need to be designed to highlight their nobility</p>
          <p>Need to adapt to high temperature environments and meet specific religious and cultural customs</p>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Type:</h3>
        </div>
        <p class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] leading-relaxed ml-5">
          Mainly targeting the B-end market, government and state-owned enterprises, and some C-end users
        </p>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Market opportunity:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>LNG expansion plans in countries such as Qatar and Saudi Arabia have generated a demand for high-end, green shipping solutions.</p>
          <p>Saudi Arabia's "2030 Vision" vigorously develops tourism and logistics industries, and large-scale tourism projects in the Red Sea require supporting maritime transportation.</p>
          <p>The wealthy class is vast and an important sales market for top luxury yachts worldwide.</p>
        </div>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Market Demand:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>The ultra-wealthy market is price-insensitive, seeking ultimate luxury, cutting-edge technology, highly personalized customization, and top-tier service.</p>
          <p>Targeting high-end B2B and top-tier B2C clients, it primarily caters to top Middle Eastern clients and high-end resorts globally, pursuing the ultimate in design, craftsmanship, technology, and exclusive service, becoming a symbol of status and power.</p>
        </div>
      </div>
    `
  } else if (contentType === 'usa') {
    // 美国市场内容
    middleContent.value = `
      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Core customers:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5 mb-5">
          <p>National Park Service, large boat rental chain brands, diving service companies</p>
        </div>
        <div class="flex items-center">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Seed users: </h3>
        </div>
         <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5 items-center">
          <p>yacht and water sports operators</p>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Basic information and needs:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>preference for high displacement and high-performance boats (8% of high-end users) and comfortable and safe leisure and entertainment boats (67% of general users)</p>
          <p>Emphasize brand reputation and entertainment attributes, and have high requirements for the convenience and flexibility of leasing services</p>
          <p>The demand for financing purchase and leasing solutions is widespread among C-end users</p>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Type:</h3>
        </div>
        <p class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] leading-relaxed ml-5">
          High horsepower sports speedboat, family leisure boat, park shuttle boat, with a high market share in the C-end market.
        </p>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Market opportunity:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>The United States is the world's largest yacht consumer market, with a water sports equipment market size of $79.9 billion by 2023.</p>
          <p>There are numerous national parks and private lakes, and there are a large number of government orders for the upgrading of green transportation within the scenic areas.</p>
          <p>The demand for outdoor leisure and entertainment continues to be strong, and the rental market is active.</p>
        </div>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Market Demand:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>The world's largest yacht market experiences robust rental demand, with a strong focus on ease of operation, wear resistance, and low maintenance costs. Primarily driven by individual consumers, the market focuses on the US rental market, emphasizing cost-effectiveness, durability, and low maintenance.</p>
          <p>The core focus is meeting the high-frequency, multi-user commercial operation needs.</p>
        </div>
      </div>
    `
  } else if (contentType === 'china') {
    // 中国市场内容
    middleContent.value = `
      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Core customers:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5 mb-5">
          <p>local governments and large state-owned enterprises</p>
        </div>

        <div class="flex items-center">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Seed users: </h3>
        </div>
         <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5 items-center">
          <p>Yacht and water sports operators</p>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Basic information and requirements:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>The cost-effectiveness of higher products requires environmental protection and intelligent technology, which is easy to manage</p>
          <p>Comprehensive after-sales service</p>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Type:</h3>
        </div>
        <p class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] leading-relaxed ml-5">
          Mainly targeting the B-end market, government and state-owned enterprises, and some C-end users
        </p>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Market opportunity:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>China is the "core engine" of global shipbuilding, with a global share of over 45% in ship exports by 2024.</p>
          <p>The demand for gas powered boats in the market has significantly increased.</p>
          <p>The green and intelligent transformation of inland and coastal vessels is a clear direction, and the plan is to achieve comprehensive green and intelligent transformation of inland vessels by 2030.</p>
          <p>The "the Belt and Road" initiative has deepened cooperation with Southeast Asia, the Middle East and other places, bringing demand for engineering ships related to infrastructure.</p>
        </div>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Market Demand:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>Following the national policy of green and intelligent development, this B2B-driven product emphasizes ease of management and comprehensive after-sales service.</p>
          <p>The Premium Experience version targets the Chinese market, focusing on environmental friendliness, intelligence, comfort, and tranquility, aligning with policy guidance and high-quality tourism standards.</p>
        </div>
      </div>
    `
  } else if (contentType === 'southeast-asia') {
    // 东南亚市场内容
    middleContent.value = `
      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Core customers:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5 mb-5">
          <p>High end resort groups, emerging shipping companies, yacht clubs</p>
        </div>

        <div class="flex items-center">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Seed users: </h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5 items-center">
          <p>Local tourism operators and start-up technology companies</p>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Basic information and requirements:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>Highly concerned about the cost-effectiveness and operating costs of products</p>
          <p>Ships need to adapt to high temperature and high salinity tropical marine environments with strong corrosion resistance</p>
          <p>There are requirements for the product's multifunctionality (such as being able to meet both connectivity and sightseeing needs)</p>
        </div>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Type:</h3>
        </div>
        <p class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] leading-relaxed ml-5">
          High end private yachts, island shuttle ships, and offshore transport ships are mainly purchased from the B-end.
        </p>
      </div>

      <div class="mb-5">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Market opportunity:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>Southeast Asia's island tourism industry is recovering rapidly, and the development of new vacation projects is driving demand for new transportation tools.</p>
          <p>The growth of regional trade and the deepening of the "the Belt and Road" initiative promote the development of green offshore shipping.</p>
          <p>The upgrading of infrastructure in various countries has led to an increase in demand for ships related to port dredging and engineering construction.</p>
        </div>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Market Demand:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>Tropical marine environments require high corrosion resistance; the recovery of tourism has spurred demand for multi-functional vessels that can serve both transportation and sightseeing purposes. </p>
          <p>Emphasizing B2B and targeting the Southeast Asian market, the vessels highlight cost-effectiveness, durability, and low maintenance costs.</p>
          <p>The core requirement is to meet the high-frequency, multi-user commercial operation needs.</p>
        </div>
      </div>
    `
  } else if (contentType === 'default') {
    // 重置为原始内容
    middleContent.value = `
      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Target Customers:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>High end resort groups, emerging shipping companies, yacht clubs</p>
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
        </div>
        <div class="flex items-center mt-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Seed users: </h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5 items-center">
          <p>Local tourism operators and start-up technology companies</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Requirements:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>Highly concerned about cost-effectiveness and operating costs of products</p>
          <p>Ships need to adapt to high temperature and high salinity tropical marine environments with strong corrosion resistance</p>
          <p>Requirements for product multifunctionality (connectivity and sightseeing needs)</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Type:</h3>
        </div>
        <p class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] leading-relaxed ml-5">
          High end private yachts, island shuttle ships, and offshore transport ships are mainly purchased from the B-end
        </p>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] text-white">Market Opportunity:</h3>
        </div>
        <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px] space-y-2 ml-5">
          <p>Southeast Asia's island tourism industry is recovering rapidly, driving demand for new transportation tools</p>
          <p>Growth of regional trade and "Belt and Road" initiative promote green offshore shipping development</p>
          <p>Infrastructure upgrading increases demand for port dredging and engineering construction ships</p>
        </div>
      </div>
    `
  }
}

const updateRightContent = (contentType) => {
  if (contentType === 'european') {
    rightContent.value = {
      name: 'Marco Schmidt',
      title: 'Partner of high-end camping resort',
      bio: 'Operating multiple ecological resorts in Norwegian fjords and the Greek island of Mikonos, providing guests with unique sea sightseeing and island shuttle services, committed to creating a zero carbon footprint travel experience.',
      requirements: [
        'Zero emissions, fully electric, in compliance with local environmental regulations',
        'Quiet and stable, enhancing the sightseeing experience',
        'Strong cold resistance in winter, suitable for Nordic climate',
        'The brand has an environmentally friendly tone and can serve as a marketing highlight'
      ],
      backgroundImage: icon6_2,
      personImage: icon6_1
    }
  } else if (contentType === 'southeast-asia') {
    rightContent.value = {
      name: 'Banyan Tree Group',
      title: 'High end resort operator',
      bio: 'Resorts in Phuket, Bali, and other places need to provide transportation services between private islands, coral reefs, and main hotels for guests, pursuing a unique luxury experience.',
      requirements: [
        'Design modern luxury that matches the brand tone and is suitable for taking photos and clocking in',
        'Smooth and quiet operation, enhancing guest experience',
        'Green environmental protection, as a highlight of corporate social responsibility (CSR) promotion',
        'High reliability, avoiding the impact of faults on guest travel'
      ],
      backgroundImage: icon7_2,
      personImage: icon7_1
    }
  } else if (contentType === 'usa') {
    rightContent.value = {
      name: 'William',
      title: 'Founder of a leasing company',
      bio: 'Operating water sports equipment and boat rentals in the Florida Keys, our clients are mostly family vacationers and diving enthusiasts, hoping to provide new options that are more environmentally friendly and easy to operate.',
      requirements: [
        'Easy to operate, easy for beginners to get started in a short period of time',
        'Durable and sturdy, able to adapt to high-frequency rental use',
        'Low maintenance costs and convenient supply of components',
        'Equipped with practical functions such as diving platform and surfboard rack'
      ],
      backgroundImage: icon9_2,
      personImage: icon9_1
    }
  } else if (contentType === 'middle-east') {
    rightContent.value = {
      name: 'Sheikh Ahmed Al Maktoum',
      title: 'Senior executive of a royal affiliated investment company in Dubai',
      bio: 'Passionate about water sports and high-tech products, plans to purchase a batch of new boats for its private island and yacht club for entertaining VIPs and family entertainment.',
      requirements: [
        'Top tier design and craftsmanship, showcasing identity and status',
        'Equipped with the latest technology and excellent performance',
        'Highly personalized customization is possible',
        'Provide top-notch global after-sales service and crew training support'
      ],
      backgroundImage: icon10_2,
      personImage: icon10_1
    }
  } else {
    // 默认内容（陈先生）
    rightContent.value = {
      name: 'Mr Chen',
      title: 'General Manager of Yacht Club',
      bio: 'To operate yacht rental, water transportation, and water sports businesses in Dameisha, Shenzhen, it is necessary to introduce new products to enrich the tourist experience.',
      requirements: [
        'The product is innovative and has recognition',
        'Efficient and energy-saving, easy to operate',
        'Environmental Protection and Scenic Area Protection Requirements'
      ],
      backgroundImage: icon4,
      personImage: icon5
    }
  }
}

// 模态框状态
const showModal = ref(false)
const currentImageIndex = ref(0)
const currentImages = ref([])

// 导航
const goHome = () => {
	router.push('/')
}

import video1 from '../assets/video/3-2_compressed.mp4'
import video2 from '../assets/video/3-1_compressed.mp4'
import video3 from '../assets/video/3-3_compressed.mp4'
import video4 from '../assets/video/2-2_compressed.mp4'
import video5 from '../assets/video/2-1_compressed.mp4'
import video6 from '../assets/video/2-3_compressed.mp4'
import video7 from '../assets/video/2-4_compressed.mp4'
import video8 from '../assets/video/1-1_compressed.mp4'
import video9 from '../assets/video/1-2_compressed.mp4'
import video10 from '../assets/video/1-4_compressed.mp4'
import video11 from '../assets/video/4-1_compressed.mp4'
import video12 from '../assets/video/4-2_compressed.mp4'
import video13 from '../assets/video/4-3_compressed.mp4'

// 每个画廊项的图片集
const imageSets = {
  1: [video1, video2, video3],
  2: [video4, video5, video6, video7],
  3: [video8, video9, video10],
  4: [video11, video12, video13]
}

const openModal = (imageSet, index = 0) => {
  currentImages.value = imageSets[imageSet]
  currentImageIndex.value = index
  showModal.value = true
  // 模态框打开时阻止body滚动
  document.body.style.overflow = 'hidden'
}

// 切换核心需求内容显示
const toggleCoreRequirements = () => {
  showCoreRequirements.value = !showCoreRequirements.value
}

// 关闭核心需求内容
const closeCoreRequirements = () => {
  showCoreRequirements.value = false
}

const closeModal = () => {
  showModal.value = false
  // 恢复body滚动
  document.body.style.overflow = 'auto'
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

const nextImage = () => {
  if (currentImageIndex.value < currentImages.value.length - 1) {
    currentImageIndex.value++
  }
}
</script>

<template>
  <div class="bg-center bg-no-repeat relative flex flex-col w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
    :style="`background: url('${icon3}'); background-size: 100% 100%; height: 100vh; font-family: 'Arial', sans-serif !important;`">
    
    <!-- 顶部导航栏 -->
		<TopNavigation />

    <!-- 主内容容器 -->
    <div v-if="!showCoreRequirements" class="flex flex-col lg:flex-row main-content-container">
      <!-- 左侧内容 -->
      <div class="w-[28%] flex items-center justify-center relative min-w-0">
        
        <!-- 圆圈容器 -->
        <div class="relative w-[830px] h-[830px] max-w-full max-h-full circle-container">
          <!-- 830x830 白色圆圈 -->
          <div class="ring">
            <!-- 地球组件 -->
            <div class="globeStyle absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="globeWith">
                <GlobeComponent :load-data="false" />
              </div>
            </div>
          </div>

          

          <!-- 沿圆圈定位的图标 -->
          <div class="absolute top-0 left-0 w-full h-full pointer-events-auto">
            <!-- 图标6 - 30度 -->
            <div class="absolute icon-6-container icon-container transition-all duration-300 flex items-center cursor-pointer" @click="activateIcon('icon-6-container', 'european', 'european')" @mouseenter="activateIcon('icon-6-container', 'european', 'european')">
              <!-- 白色圆点 10x10 -->
              <div class="w-[10px] h-[10px] bg-white rounded-full dot-container-dot relative"></div>
              <!-- 地图图片 icon-6.png 100x100 -->
              <img src="/src/assets/icon-6.png" alt="板块一" class="w-[100px] h-[100px] object-contain ml-[40px] icon-image" />
              <!-- 定位点 icon-11.png 8x11 -->
              <img src="/src/assets/icon-11.png" alt="定位点" class="w-[8px] h-[11px] object-contain ml-1 mr-2 icon-dot" />
              <!-- 位置名称 -->
              <span class="text-white text-sm font-medium ml-1 shadow-lg icon-text">Italian</span>
            </div>

            <!-- 图标7 - 60度 -->
            <div class="absolute icon-7-container icon-container transition-all duration-300 flex items-center cursor-pointer" @click="activateIcon('icon-7-container', 'southeast-asia', 'southeast-asia')" @mouseenter="activateIcon('icon-7-container', 'southeast-asia', 'southeast-asia')">
              <!-- 白色圆点 10x10 -->
              <div class="w-[10px] h-[10px] bg-white rounded-full dot-container-dot relative"></div>
              <!-- 地图图片 icon-7.png 100x100 -->
              <img src="/src/assets/icon-7.png" alt="板块二" class="w-[100px] h-[100px] object-contain ml-[40px] icon-image" />
              <!-- 定位点 icon-11.png 8x11 -->
              <img src="/src/assets/icon-11.png" alt="定位点" class="w-[8px] h-[11px] object-contain ml-1 mr-2 icon-dot" />
              <!-- 位置名称 -->
              <span class="text-white text-sm font-medium ml-1 shadow-lg icon-text">Southeast Asia</span>
            </div>

            <!-- 图标8 - 90度 -->
            <div class="absolute icon-8-container icon-container transition-all duration-300 flex items-center cursor-pointer active-icon" @click="activateIcon('icon-8-container', 'china', 'default')" @mouseenter="activateIcon('icon-8-container', 'china', 'default')">
              <!-- 白色圆点 10x10 -->
              <div class="w-[10px] h-[10px] bg-white rounded-full dot-container-dot relative"></div>
              <!-- 地图图片 icon-8.png 100x100 -->
              <img src="/src/assets/icon-8.png" alt="板块三" class="w-[100px] h-[100px] object-contain ml-[40px] icon-image" />
              <!-- 定位点 icon-11.png 8x11 -->
              <img src="/src/assets/icon-11.png" alt="定位点" class="w-[8px] h-[11px] object-contain ml-2 mr-2 icon-dot" />
              <!-- 位置名称 -->
              <span class="text-white text-sm font-medium ml-1 shadow-lg icon-text">China</span>
            </div>

            <!-- 图标9 - 120度 -->
            <div class="absolute icon-9-container icon-container transition-all duration-300 flex items-center cursor-pointer" @click="activateIcon('icon-9-container', 'usa', 'usa')" @mouseenter="activateIcon('icon-9-container', 'usa', 'usa')">
              <!-- 白色圆点 10x10 -->
              <div class="w-[10px] h-[10px] bg-white rounded-full dot-container-dot relative"></div>
              <!-- 地图图片 icon-9.png 100x100 -->
              <img src="/src/assets/icon-9.png" alt="板块四" class="w-[100px] h-[100px] object-contain ml-[40px] icon-image" />
              <!-- 定位点 icon-11.png 8x11 -->
              <img src="/src/assets/icon-11.png" alt="定位点" class="w-[8px] h-[11px] object-contain ml-1 mr-2 icon-dot" />
              <!-- 位置名称 -->
              <span class="text-white text-sm font-medium ml-1 shadow-lg icon-text">America</span>
            </div>

            <!-- 图标10 - 150度 -->
            <div class="absolute icon-10-container icon-container transition-all duration-300 flex items-center cursor-pointer" @click="activateIcon('icon-10-container', 'middle-east', 'middle-east')" @mouseenter="activateIcon('icon-10-container', 'middle-east', 'middle-east')">
              <!-- 白色圆点 10x10 -->
              <div class="w-[10px] h-[10px] bg-white rounded-full dot-container-dot relative"></div>
              <!-- 地图图片 icon-10.png 100x100 -->
              <img src="/src/assets/icon-10.png" alt="板块五" class="w-[100px] h-[100px] object-contain ml-[40px] icon-image" />
              <!-- 定位点 icon-11.png 8x11 -->
              <img src="/src/assets/icon-11.png" alt="定位点" class="w-[8px] h-[11px] object-contain ml-1 mr-2 icon-dot" />
              <!-- 位置名称 -->
              <span class="text-white text-sm font-medium ml-1 shadow-lg icon-text">Middle East</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 内容滚动容器（中间和右侧内容） -->
      <div class="flex flex flex-col lg:flex-row content-scroll-container">
        <!-- 中间内容 -->
        <div class="flex-3 flex items-start justify-center px-0 py-4 lg:py-8 min-w-0">
          <div class="text-white w-full">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 p-3 lg:p-3">
              <div class="space-y-4" v-html="middleContent"></div>
            </div>
          </div>
        </div>

        <!-- 右侧内容 -->
        <div class="flex-2 px-0 py-4 lg:py-8 min-w-0 relative">
          <div class="text-white w-full max-w-4xl pl-4 pr-8 ">
            <div class="bg-size-[100%_auto] bg-no-repeat rounded-[10px] shadow-xl border border-white/20 overflow-hidden bg-white/10"
                 :style="`background-image: url('${rightContent.backgroundImage}'); background-blend-mode: overlay;`">

              <!-- 人物介绍头部 -->
              <div class="bg-white/10 pl-4 border-b border-white/20 shadow-inner">
                <div class="flex items-center justify-between">
                  <div class="flex-1 my-2">
                    <h2 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[28px] mb-1" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);">{{ rightContent.name }}</h2>
                    <p class="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-[20px]" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);">{{ rightContent.title }}</p>
                  </div>
                  <div class="ml-2 lg:ml-4">
                    <img :src="rightContent.personImage" :alt="rightContent.name" class="w-[72px] h-[72px] lg:w-[92px] lg:h-[92px] rounded-[10px] object-cover shadow-xl" />
                  </div>
                </div>
              </div>

              <!-- 需求内容 -->
              <div class="bg-white/10 p-4 shadow-inner">
                <div class="space-y-4">
                  <p class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px]">
                    {{ rightContent.bio }}
                  </p>

                  <div>
                    <h3 class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[26px] mb-2 items-center">
                      Core Requirements:
                    </h3>
                    <div class="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-[20px]">
                      <p v-for="(requirement, index) in rightContent.requirements" :key="index" :class="{'border-b pb-1 pt-1 border-white/20': index < rightContent.requirements.length - 1}">
                        {{ requirement }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 核心需求切换按钮 -->
          <button
            v-if="!showCoreRequirements"
            @click="toggleCoreRequirements"
            class="absolute right-4 lg:right-8 mt-6 button-focus rounded-lg flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-xl hover:shadow-gray-500/30 transition-all duration-300 group">
            <span class="text-sm md:text-base lg:text-lg font-semibold tracking-wide">
              Core detailed
            </span>
            <svg class="w-6 h-6 transition-transform group-hover:translate-x-2 animate-bounce-right" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 底部内容：图片画廊 -->
    <div v-show="!showCoreRequirements" class="fixed bottom-0 left-0 right-0 h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px] 2xl:h-[220px] overflow-x-auto bottom-gallery">
      <div class="relative w-full h-full flex justify-center items-end">
        <!-- 图片1 -->
        <div class="gallery-item" @click="openModal(1)">
          <video
            :src="video1"
            alt="Inter island transportation"
            class="w-full h-full object-cover"
            autoplay
            muted
            loop
            playsinline
          ></video>
          <div class="image-mask absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
            <div class="text-content bg-black/50 px-4 py-2 rounded w-full text-center">
              <p class="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[22px]">Daily commute</p>
            </div>
          </div>
        </div>

        <!-- 图片2 -->
        <div class="gallery-item" @click="openModal(2)">
          <video
            :src="video7"
            alt="Urban water system transportation"
            class="w-full h-full object-cover"
            autoplay
            muted
            loop
            playsinline
          ></video>
          <div class="image-mask absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
            <div class="text-content bg-black/50 px-4 py-2 rounded w-full text-center">
              <p class="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[22px]">Leisure and vacation</p>
            </div>
          </div>
        </div>

        <!-- 图片3 -->
        <div class="gallery-item" @click="openModal(3)">
          <video
            :src="video8"
            alt="Water sports and fishing"
            class="w-full h-full object-cover"
            autoplay
            muted
            loop
            playsinline
          ></video>
          <div class="image-mask absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
            <div class="text-content bg-black/50 px-4 py-2 rounded w-full text-center">
              <p class="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[22px]">Business activities</p>
            </div>
          </div>
        </div>

        <!-- 图片4 -->
        <div class="gallery-item" @click="openModal(4)">
          <video
            :src="video11"
            alt="Tourist attraction"
            class="w-full h-full object-cover"
            autoplay
            muted
            loop
            playsinline
          ></video>
          <div class="image-mask absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
            <div class="text-content bg-black/50 px-4 py-2 rounded w-full text-center">
              <p class="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[22px]">Water sports</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 核心需求内容覆盖层 -->
    <div v-if="showCoreRequirements" class="fixed inset-0 z-40 flex items-center justify-center mt-[71px]">
      <!-- 关闭按钮 -->
      <button
        @click="closeCoreRequirements"
        class="button-focus absolute top-2 md:top-4 right-2 md:right-4 text-gray-300 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full p-2 md:p-2 z-50 transition-all duration-300 group">
        <img src="../assets/icon-17.png" alt="返回" class="w-6 h-6">
      </button>

      <!-- 核心需求内容区域 -->
      <div class="w-full h-full overflow-hidden p-4 md:p-6 lg:p-8 xl:p-12 2xl:p-16">
        <div class="max-w-[1600px] mx-auto h-full overflow-y-auto custom-scrollbar">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            <!-- 左侧容器：包含产品特点列表和版本对比卡片 -->
            <div class="lg:col-span-8 space-y-3 md:space-y-4 [@media(min-width:2000px)]:space-y-6 bg-white/10 rounded-lg p-3 md:p-4 [@media(min-width:2000px)]:p-6">
              <!-- 产品特点列表 -->
              <div>
                <ul class="space-y-2 [@media(min-width:2000px)]:space-y-3 text-white">
                  <li class="flex items-start">
                    <span class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-2 md:mr-3 mt-1 md:mt-1.5 lg:mt-2 flex-shrink-0"></span>
                    <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:2000px)]:text-[24px]">AI obstacle avoidance system + forward-looking sonar, with tilt angle control ≤1° to ensure excellent stability and low noise.</span>
                  </li>
                  <li class="flex items-start">
                    <span class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-2 md:mr-3 mt-1 md:mt-1.5 lg:mt-2 flex-shrink-0"></span>
                    <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:2000px)]:text-[24px]">Low procurement costs, short payback period, high annual economic benefits, and excellent cost performance.</span>
                  </li>
                  <li class="flex items-start">
                    <span class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-2 md:mr-3 mt-1 md:mt-1.5 lg:mt-2 flex-shrink-0"></span>
                    <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:2000px)]:text-[24px]">With speeds up to 20-40 km/h, high power-to-speed ratio, long range, and power outputs ranging from 15-40 kW, this vehicle boasts a high-performance engine.</span>
                  </li>
                  <li class="flex items-start">
                    <span class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-2 md:mr-3 mt-1 md:mt-1.5 lg:mt-2 flex-shrink-0"></span>
                    <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:2000px)]:text-[24px]">It offers excellent stability, a user-friendly seat design, convenient operation, and additional comfort features such as ambient lighting and 3D sound.</span>
                  </li>
                  <li class="flex items-start">
                    <span class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-2 md:mr-3 mt-1 md:mt-1.5 lg:mt-2 flex-shrink-0"></span>
                    <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:2000px)]:text-[24px]">Fully automated driving, AI obstacle avoidance system, and intelligent navigation control enhance ease of operation and technological sophistication.</span>
                  </li>
                  <li class="flex items-start">
                    <span class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-2 md:mr-3 mt-1 md:mt-1.5 lg:mt-2 flex-shrink-0"></span>
                    <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:2000px)]:text-[24px]">High-end private yachts are positioned to suit business, leisure, or social occasions, and the brand's innovative image enhances users' sense of belonging.</span>
                  </li>
                  <li class="flex items-start">
                    <span class="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-2 md:mr-3 mt-1 md:mt-1.5 lg:mt-2 flex-shrink-0"></span>
                    <span class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:2000px)]:text-[24px]">With "continuously leading innovation and defining new industry standards" as its core, the brand culture is young, sporty, and cutting-edge.</span>
                  </li>
                </ul>
              </div>

              <!-- 版本对比卡片 -->
              <div class="space-y-2 md:space-y-3 lg:space-y-4">
                <!-- 标准航迹版 -->
                <div class="flex flex-col md:flex-row items-stretch gap-2 relative">
                  <div class="bg-white/20 rounded-lg p-2 md:p-3 lg:p-4 flex items-center w-full md:w-[280px] lg:w-[320px] xl:w-[360px] [@media(min-width:2000px)]:w-[400px]">
                    <div class="bg-gray-700/30 rounded p-1 md:p-1.5 lg:p-2 mr-2 md:mr-3 lg:mr-4 overflow-hidden w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px]">
                      <img src="../assets/product-1.png" alt="Standard Edition" class="w-16 md:w-20 lg:w-24 xl:w-28 h-12 md:h-16 lg:h-18 xl:h-20 object-contain ml-[-8px] md:ml-[-12px] lg:ml-[-14px] xl:ml-[-16px]" />
                    </div>
                    <p class="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:2000px)]:text-[24px] font-medium">Standard Track Version</p>
                  </div>
                  <img src="../assets/icon-16.png" alt="arrow" class="hidden md:block w-[16px] md:w-[20px] lg:w-[24px] xl:w-[28px] h-[16px] md:h-[20px] lg:h-[24px] xl:h-[28px] absolute left-[282px] lg:left-[322px] xl:left-[362px] [@media(min-width:2000px)]:left-[404px] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" />
                  <div class="bg-white/20 rounded-lg p-2 md:p-3 lg:p-4 flex items-center flex-1">
                    <p class="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:2000px)]:text-[18px]">Focusing on passenger transport scenarios, it emphasizes corrosion resistance and modular design, offering high cost-effectiveness.</p>
                  </div>
                </div>

                <!-- 尊享体验版 -->
                <div class="flex flex-col md:flex-row items-stretch gap-2 relative">
                  <div class="bg-white/20 rounded-lg p-2 md:p-3 lg:p-4 flex items-center w-full md:w-[280px] lg:w-[320px] xl:w-[360px] [@media(min-width:2000px)]:w-[400px]">
                    <div class="bg-gray-700/30 rounded p-1 md:p-1.5 lg:p-2 mr-2 md:mr-3 lg:mr-4 overflow-hidden w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px]">
                      <img src="../assets/product-2.png" alt="Premium Experience" class="w-16 md:w-20 lg:w-24 xl:w-28 h-12 md:h-16 lg:h-18 xl:h-20 object-contain ml-[-8px] md:ml-[-12px] lg:ml-[-14px] xl:ml-[-16px]" />
                    </div>
                    <p class="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:2000px)]:text-[24px] font-medium">Premium Leisure Edition</p>
                  </div>
                  <img src="../assets/icon-16.png" alt="arrow" class="hidden md:block w-[16px] md:w-[20px] lg:w-[24px] xl:w-[28px] h-[16px] md:h-[20px] lg:h-[24px] xl:h-[28px] absolute left-[282px] lg:left-[322px] xl:left-[362px] [@media(min-width:2000px)]:left-[404px] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" />
                  <div class="bg-white/20 rounded-lg p-2 md:p-3 lg:p-4 flex items-center flex-1">
                    <p class="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:2000px)]:text-[18px]">Targeting B-end leasing/scenic spots, it focuses on low power consumption and high passenger capacity, balancing cost and efficiency.</p>
                  </div>
                </div>

                <!-- 尊享悠游版 -->
                <div class="flex flex-col md:flex-row items-stretch gap-2 relative">
                  <div class="bg-white/20 rounded-lg p-2 md:p-3 lg:p-4 flex items-center w-full md:w-[280px] lg:w-[320px] xl:w-[360px] [@media(min-width:2000px)]:w-[400px]">
                    <div class="bg-gray-700/30 rounded p-1 md:p-1.5 lg:p-2 mr-2 md:mr-3 lg:mr-4 overflow-hidden w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px]">
                      <img src="../assets/product-3.png" alt="Luxury Leisure" class="w-16 md:w-20 lg:w-24 xl:w-28 h-12 md:h-16 lg:h-18 xl:h-20 object-contain ml-[-8px] md:ml-[-12px] lg:ml-[-14px] xl:ml-[-16px]" />
                    </div>
                    <p class="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:2000px)]:text-[24px] font-medium">Luxury Leisure</p>
                  </div>
                  <img src="../assets/icon-16.png" alt="arrow" class="hidden md:block w-[16px] md:w-[20px] lg:w-[24px] xl:w-[28px] h-[16px] md:h-[20px] lg:h-[24px] xl:h-[28px] absolute left-[282px] lg:left-[322px] xl:left-[362px] [@media(min-width:2000px)]:left-[404px] top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" />
                  <div class="bg-white/20 rounded-lg p-2 md:p-3 lg:p-4 flex items-center flex-1">
                    <p class="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:2000px)]:text-[18px]">Positioned as a high-end private yacht, it is equipped with AI and autonomous driving functions to enhance its premium and experience.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右侧信息栏 -->
            <div class="lg:col-span-4 space-y-3 md:space-y-4 lg:space-y-6 bg-white/10 rounded-lg p-3 md:p-4 lg:p-6">
              <!-- 产品力核心指标 -->
              <div>
                <p class="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:2000px)]:text-[24px] font-medium mb-2 md:mb-3 lg:mb-4">The four core needs of all modes of transportation – the core of product strength</p>
                <div class="space-y-2 md:space-y-3">
                  <div class="flex justify-between items-center pb-2 md:pb-3 border-b border-white/20">
                    <span class="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:2000px)]:text-[18px]">01/</span>
                    <span class="text-white text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:2000px)]:text-[18px]">Safety</span>
                  </div>
                  <div class="flex justify-between items-center pb-2 md:pb-3 border-b border-white/20">
                    <span class="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:2000px)]:text-[18px]">02/</span>
                    <span class="text-white text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:2000px)]:text-[18px]">Cost</span>
                  </div>
                  <div class="flex justify-between items-center pb-2 md:pb-3 border-b border-white/20">
                    <span class="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:2000px)]:text-[18px]">03/</span>
                    <span class="text-white text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:2000px)]:text-[18px]">Performance</span>
                  </div>
                  <div class="flex justify-between items-center pb-2 md:pb-3 border-b border-white/20">
                    <span class="text-gray-300 text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:2000px)]:text-[18px]">04/</span>
                    <span class="text-white text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:2000px)]:text-[18px]">Comfort</span>
                  </div>
                </div>
              </div>

              <!-- 产品差异化 -->
              <div class="mt-6 md:mt-8 lg:mt-10">
                <p class="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:1920px)]:text-[24px] font-medium mb-2 md:mb-3 lg:mb-4">Potential demand that can generate a premium – product differentiation</p>
                <div class="bg-white/10 rounded-lg p-2 md:p-3 flex flex-col md:flex-row items-center h-auto md:h-[60px] lg:h-[80px] xl:h-[100px] gap-2 md:gap-0">
                  <span class="flex-1 text-center text-white text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:1920px)]:text-[24px] py-1">Intelligent</span>
                  <div class="hidden md:block w-px h-4 lg:h-5 xl:h-6 bg-white/30"></div>
                  <span class="flex-1 text-center text-white text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:1920px)]:text-[24px] py-1">Social attributes</span>
                  <div class="hidden md:block w-px h-4 lg:h-5 xl:h-6 bg-white/30"></div>
                  <span class="flex-1 text-center text-white text-xs sm:text-sm md:text-base lg:text-base xl:text-lg [@media(min-width:1920px)]:text-[24px] py-1">Brand Culture</span>
                </div>
              </div>

              <!-- 产品矩阵 -->
              <div>
                <p class="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl [@media(min-width:1920px)]:text-[24px]">A product matrix with different configurations, sizes, prices, and additional functions can be extended according to different scenarios.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片画廊模态框 -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-16" @click="closeModal">
      <div class="relative w-full h-full" @click.stop>
        <!-- 关闭按钮 -->
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-2 z-10 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="gray" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- 导航按钮 -->
        <button v-if="currentImageIndex > 0" @click.stop="prevImage" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-3 z-10 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="gray" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button v-if="currentImageIndex < currentImages.length - 1" @click.stop="nextImage" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-3 z-10 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="gray" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- 当前图片 -->
        <template v-if="typeof currentImages[currentImageIndex] === 'string' && currentImages[currentImageIndex].endsWith('.mp4')">
          <video
            :src="currentImages[currentImageIndex]"
            :alt="`Gallery Video ${currentImageIndex + 1}`"
            class="w-full h-full object-contain rounded-lg"
            autoplay
            muted
            loop
            playsinline
            controls
          ></video>
        </template>
        <img v-else :src="currentImages[currentImageIndex]" :alt="`Gallery Image ${currentImageIndex + 1}`" class="w-full h-full object-contain rounded-lg" />

        <!-- 图片计数器 -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
          {{ currentImageIndex + 1 }} / {{ currentImages.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-focus {
  outline: none !important;
}

/* 圆圈容器响应式缩放 */
.circle-container {
  transform: scale(var(--circle-scale));
  transform-origin: left center;
}

:root {
  --circle-scale: 0.5; /* 小屏默认 */
}

@media (min-width: 640px) {
  :root {
    --circle-scale: 0.6;
  }
}

@media (min-width: 768px) {
  :root {
    --circle-scale: 0.7;
  }
}

@media (min-width: 1024px) {
  :root {
    --circle-scale: 0.75;
  }
}

@media (min-width: 1280px) {
  :root {
    --circle-scale: 0.85;
  }
}

@media (min-width: 1536px) {
  :root {
    --circle-scale: 0.9;
  }
}

@media (min-width: 1920px) {
  :root {
    --circle-scale: 1;
  }
}

.ring {
  position: absolute;
  left: -600px;
  top: -50px;
	width: 830px;
	height: 830px;
	border: 3px solid white;
	border-radius: 50%;
}

.globeStyle {
  top: 0px;
  left: 60px;
}

.globeWith {
  width: 830px;
  height: 830px;
}

.icon-6-container {
	top: 20px;
	left: 100px;
}

.icon-7-container {
	top: 130px;
	left: 180px;
}

.icon-8-container {
	top: 270px;
	left: 221px;
}

.icon-9-container {
	top: 410px;
	left: 213px;
}

.icon-10-container {
	top: 550px;
	left: 150px;
}

/* 确保图标容器在缩放时保持在正确位置 */
.circle-container > .absolute {
  transform-origin: center;
}

.gallery-item {
  position: relative;
  margin-left: 20px;
  width: 18%;
  height: 80px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(128, 128, 128, 0.5);
  transition: height 0.3s ease;
}

@media (min-width: 640px) {
  .gallery-item {
    height: 95px;
  }
}

@media (min-width: 768px) {
  .gallery-item {
    height: 110px;
  }
}

@media (min-width: 1024px) {
  .gallery-item {
    height: 125px;
  }
}

@media (min-width: 1280px) {
  .gallery-item {
    height: 140px;
  }
}

@media (min-width: 1536px) {
  .gallery-item {
    height: 155px;
  }
}

.gallery-item:hover {
  height: 120px;
}

@media (min-width: 640px) {
  .gallery-item:hover {
    height: 140px;
  }
}

@media (min-width: 768px) {
  .gallery-item:hover {
    height: 160px;
  }
}

@media (min-width: 1024px) {
  .gallery-item:hover {
    height: 180px;
  }
}

@media (min-width: 1280px) {
  .gallery-item:hover {
    height: 200px;
  }
}

@media (min-width: 1536px) {
  .gallery-item:hover {
    height: 220px;
  }
}

.gallery-item:hover .image-mask {
  opacity: 0;
}

.gallery-item {
  cursor: pointer;
}

/* 中间内容响应式字体大小 */
@media (max-width: 1024px) {
  .text-responsive-title {
    font-size: 1.125rem;
  }

  .text-responsive-content {
    font-size: 0.875rem;
  }
}

@media (max-width: 768px) {
  .text-responsive-title {
    font-size: 1rem;
  }

  .text-responsive-content {
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .text-responsive-title {
    font-size: 0.875rem;
  }

  .text-responsive-content {
    font-size: 0.8rem;
  }
}

.dot-container-dot::after {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  border: 1px solid white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.icon-6-container:hover .dot-container-dot::after {
  opacity: 1;
}

.icon-image {
  transform: scale(1);
  transition: transform 0.3s ease;
  transform-origin: center;
}

.icon-text {
  transform: scale(1);
  transition: transform 0.3s ease;
  color: #cccccc;
  transform-origin: left;
}

.icon-dot {
  transform: scale(1);
  transition: transform 0.3s ease;
  transform-origin: left;
}

.icon-6-container:hover .icon-image {
  transform: scale(1.4);
}

.icon-6-container:hover .icon-text {
  transform: scale(1.4);
  color: white;
}

.icon-6-container:hover .icon-dot {
  transform: scale(1.4);
}

.icon-7-container:hover .dot-container-dot::after {
  opacity: 1;
}

.icon-7-container:hover .icon-image {
  transform: scale(1.4);
}

.icon-7-container:hover .icon-text {
  transform: scale(1.4);
  color: white;
}

.icon-7-container:hover .icon-dot {
  transform: scale(1.4);
}

.icon-8-container:hover .dot-container-dot::after {
  opacity: 1;
}

.icon-8-container:hover .icon-image {
  transform: scale(1.4);
}

.icon-8-container:hover .icon-text {
  transform: scale(1.4);
  color: white;
}

.icon-8-container:hover .icon-dot {
  transform: scale(1.4);
}

.icon-9-container:hover .dot-container-dot::after {
  opacity: 1;
}

.icon-9-container:hover .icon-image {
  transform: scale(1.4);
}

.icon-9-container:hover .icon-text {
  transform: scale(1.4);
  color: white;
}

.icon-9-container:hover .icon-dot {
  transform: scale(1.4);
}

.icon-10-container:hover .dot-container-dot::after {
  opacity: 1;
}

.icon-10-container:hover .icon-image {
  transform: scale(1.4);
}

.icon-10-container:hover .icon-text {
  transform: scale(1.4);
  color: white;
}

.icon-10-container:hover .icon-dot {
  transform: scale(1.4);
}

/* 默认悬停效果的激活状态样式 */
.icon-container.active-icon .dot-container-dot::after {
  opacity: 1;
}

.icon-container.active-icon .icon-image {
  transform: scale(1.4);
}

.icon-container.active-icon .icon-text {
  transform: scale(1.4);
  color: white;
}

.icon-container.active-icon .icon-dot {
  transform: scale(1.4);
}

/* 主内容容器高度计算 */
.main-content-container {
  height: calc(100vh - 71px - 120px);
}

@media (min-width: 640px) {
  .main-content-container {
    height: calc(100vh - 71px - 140px);
  }
}

@media (min-width: 768px) {
  .main-content-container {
    height: calc(100vh - 71px - 160px);
  }
}

@media (min-width: 1024px) {
  .main-content-container {
    height: calc(100vh - 71px - 180px);
  }
}

@media (min-width: 1280px) {
  .main-content-container {
    height: calc(100vh - 71px - 200px);
  }
}

@media (min-width: 1536px) {
  .main-content-container {
    height: calc(100vh - 71px - 220px);
  }
}

/* 中间和右侧内容的内容滚动容器 */
.content-scroll-container {
  flex: 3;
  height: 100%;
  overflow-y: auto;
  padding-right: 8px;
  gap: 16px;
}

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

/* 右跳动动画 */
@keyframes bounce-right {
  0%, 100% {
    transform: translateY(-0%) translateX(0);
  }
  50% {
    transform: translateY(-0%) translateX(-10px);
  }
}

.animate-bounce-right {
  animation: bounce-right 2s ease-in-out infinite;
}

.animate-bounce-right:hover {
  animation-play-state: paused;
}

/* 自定义滚动条样式 - 用于核心需求内容区域 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: transparent;
}

/* Firefox scrollbar styles */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
}
</style>