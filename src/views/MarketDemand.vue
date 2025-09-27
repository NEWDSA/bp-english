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
// import Navigation from '../components/Navigation.vue'
// import CountryCircle from '../components/CountryCircle.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// State to track active icon
const activeIcon = ref('icon-8')

// lib-flexible 适配相关
let cleanupFlexible = null

// Initialize with default content
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

// Function to handle icon activation
const activateIcon = (iconName, middleContent, rightContent) => {
  // Remove active class from current active icon
  const currentActive = document.querySelector('.icon-container.active-icon')
  if (currentActive) {
    currentActive.classList.remove('active-icon')
  }

  // Add active class to new icon
  const newActive = document.querySelector(`.${iconName}`)
  if (newActive) {
    newActive.classList.add('active-icon')
  }

  // Update content
  updateMiddleContent(middleContent)
  updateRightContent(rightContent)
  activeIcon.value = iconName
}

const middleContent = ref('')
const rightContent = ref('')

const updateMiddleContent = (contentType) => {
  if (contentType === 'european') {
    middleContent.value = `
      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Core customers:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5 items-center mb-2">
          <p>tourism platforms, environmental logistics companies, high-end camping resorts</p>
          <p>technology elites and environmental pioneers, industry KOLs</p>
        </div>
        <div class="flex items-center pt-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Seed users: </h3>
        </div>
         <div class="text-sm lg:text-base space-y-2 ml-5 items-center">
          <p>technology elites and environmental pioneers, industry KOLs</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Basic information and requirements:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>There are extremely high requirements for the environmental performance of ships, which comply with strict EU environmental regulations</p>
          <p>Emphasize innovative technology experience and pursue high performance and security, while also requiring a comprehensive after-sales and maintenance network</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Type:</h3>
        </div>
        <p class="text-sm lg:text-base leading-relaxed ml-5">
          High end sightseeing boat, green logistics boat, high-tech leisure boat, catering to both B-end procurement and C-end high-end consumers.
        </p>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Market opportunity:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>The European Union is one of the world's largest markets for large LNG carriers, with a market share of approximately 30%.</p>
          <p>The tourism economy in the Mediterranean and Nordic islands is developed, and there is a stable demand for green and efficient sea transportation tools.</p>
          <p>The EU's "Green Agreement" drives the upgrade of traditional shipping, providing huge subsidies and policy benefits for new energy ships.</p>
          <p>The water sports culture is profound, and 67% of the general public prefer leisure and</p>
        </div>
      </div>
    `
  } else if (contentType === 'middle-east') {
    // Middle East market content
    middleContent.value = `
      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Core customers:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>Royal affiliated enterprises, national energy companies, high-end tourism development groups</p>
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
        </div>

        <div class="flex items-center">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Seed users: </h3>
        </div>
         <div class="text-sm lg:text-base space-y-2 ml-5 items-center">
          <p>Wealthy class, high-tech enterprises</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Basic information and requirements:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>Pursuing ultimate luxury, customization, and high performance, with low price sensitivity</p>
          <p>As a symbol of identity and a 'mobile luxury palace', ships need to be designed to highlight their nobility</p>
          <p>Need to adapt to high temperature environments and meet specific religious and cultural customs</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Type:</h3>
        </div>
        <p class="text-sm lg:text-base leading-relaxed ml-5">
          Mainly targeting the B-end market, government and state-owned enterprises, and some C-end users
        </p>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Market opportunity:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>LNG expansion plans in countries such as Qatar and Saudi Arabia have generated a demand for high-end, green shipping solutions.</p>
          <p>Saudi Arabia's "2030 Vision" vigorously develops tourism and logistics industries, and large-scale tourism projects in the Red Sea require supporting maritime transportation.</p>
          <p>The wealthy class is vast and an important sales market for top luxury yachts worldwide.</p>
        </div>
      </div>
    `
  } else if (contentType === 'usa') {
    // USA market content
    middleContent.value = `
      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Core customers:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>National Park Service, large boat rental chain brands, diving service companies</p>
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
        </div>
        <div class="flex items-center">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Seed users: </h3>
        </div>
         <div class="text-sm lg:text-base space-y-2 ml-5 items-center">
          <p>yacht and water sports operators</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Basic information and needs:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>preference for high displacement and high-performance boats (8% of high-end users) and comfortable and safe leisure and entertainment boats (67% of general users)</p>
          <p>Emphasize brand reputation and entertainment attributes, and have high requirements for the convenience and flexibility of leasing services</p>
          <p>The demand for financing purchase and leasing solutions is widespread among C-end users</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Type:</h3>
        </div>
        <p class="text-sm lg:text-base leading-relaxed ml-5">
          High horsepower sports speedboat, family leisure boat, park shuttle boat, with a high market share in the C-end market.
        </p>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Market opportunity:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>The United States is the world's largest yacht consumer market, with a water sports equipment market size of $79.9 billion by 2023.</p>
          <p>There are numerous national parks and private lakes, and there are a large number of government orders for the upgrading of green transportation within the scenic areas.</p>
          <p>The demand for outdoor leisure and entertainment continues to be strong, and the rental market is active.</p>
        </div>
      </div>
    `
  } else if (contentType === 'china') {
    // China market content
    middleContent.value = `
      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Core customers:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>local governments and large state-owned enterprises</p>
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
        </div>

        <div class="flex items-center">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Seed users: </h3>
        </div>
         <div class="text-sm lg:text-base space-y-2 ml-5 items-center">
          <p>Yacht and water sports operators</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Basic information and requirements:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>The cost-effectiveness of higher products requires environmental protection and intelligent technology, which is easy to manage</p>
          <p>Comprehensive after-sales service</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Type:</h3>
        </div>
        <p class="text-sm lg:text-base leading-relaxed ml-5">
          Mainly targeting the B-end market, government and state-owned enterprises, and some C-end users
        </p>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Market opportunity:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>China is the "core engine" of global shipbuilding, with a global share of over 45% in ship exports by 2024.</p>
          <p>The demand for gas powered boats in the market has significantly increased.</p>
          <p>The green and intelligent transformation of inland and coastal vessels is a clear direction, and the plan is to achieve comprehensive green and intelligent transformation of inland vessels by 2030.</p>
          <p>The "the Belt and Road" initiative has deepened cooperation with Southeast Asia, the Middle East and other places, bringing demand for engineering ships related to infrastructure.</p>
        </div>
      </div>
    `
  } else if (contentType === 'southeast-asia') {
    // Southeast Asia market content
    middleContent.value = `
      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Core customers:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>High end resort groups, emerging shipping companies, yacht clubs</p>
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
        </div>

        <div class="flex items-center">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Seed users: </h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5 items-center">
          <p>Local tourism operators and start-up technology companies</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Basic information and requirements:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>Highly concerned about the cost-effectiveness and operating costs of products</p>
          <p>Ships need to adapt to high temperature and high salinity tropical marine environments with strong corrosion resistance</p>
          <p>There are requirements for the product's multifunctionality (such as being able to meet both connectivity and sightseeing needs)</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Type:</h3>
        </div>
        <p class="text-sm lg:text-base leading-relaxed ml-5">
          High end private yachts, island shuttle ships, and offshore transport ships are mainly purchased from the B-end.
        </p>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Market opportunity:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>Southeast Asia's island tourism industry is recovering rapidly, and the development of new vacation projects is driving demand for new transportation tools.</p>
          <p>The growth of regional trade and the deepening of the "the Belt and Road" initiative promote the development of green offshore shipping.</p>
          <p>The upgrading of infrastructure in various countries has led to an increase in demand for ships related to port dredging and engineering construction.</p>
        </div>
      </div>
    `
  } else if (contentType === 'default') {
    // Reset to original content
    middleContent.value = `
      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Target Customers:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>High end resort groups, emerging shipping companies, yacht clubs</p>
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
        </div>
        <div class="flex items-center mt-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Seed users: </h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5 items-center">
          <p>Local tourism operators and start-up technology companies</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Requirements:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
          <p>Highly concerned about cost-effectiveness and operating costs of products</p>
          <p>Ships need to adapt to high temperature and high salinity tropical marine environments with strong corrosion resistance</p>
          <p>Requirements for product multifunctionality (connectivity and sightseeing needs)</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Type:</h3>
        </div>
        <p class="text-sm lg:text-base leading-relaxed ml-5">
          High end private yachts, island shuttle ships, and offshore transport ships are mainly purchased from the B-end
        </p>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
          <h3 class="text-base lg:text-lg xl:text-xl font-semibold text-white">Market Opportunity:</h3>
        </div>
        <div class="text-sm lg:text-base space-y-2 ml-5">
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
      name: 'Sarah Johnson',
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
    // Default content (Mr Chen)
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

// Modal state
const showModal = ref(false)
const currentImageIndex = ref(0)
const currentImages = ref([])

// nav
const goHome = () => {
	router.push('/')
}

// import view1 from '../assets/img/view-1.png'
// import view2 from '../assets/img/view-2.png'
// import view3 from '../assets/img/view-3.png'
// import view4 from '../assets/img/view-4.png'
// import view5 from '../assets/img/view-5.png'
// import view6 from '../assets/img/view-6.png'
// import view7 from '../assets/img/view-7.png'
// import view8 from '../assets/img/view-8.png'
// import view9 from '../assets/img/view-9.png'
// import view10 from '../assets/img/view-10.png'
// import view11 from '../assets/img/view-11.png'
// import view12 from '../assets/img/view-12.png'
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

// Image sets for each gallery item
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
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showModal.value = false
  // Restore body scroll
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
  <div class="bg-center bg-no-repeat relative flex flex-col w-full overflow-hidden"
       :style="`background: url('${icon3}'); background-size: 100% 100%; height: 100vh;`">
    <!-- Navigation -->
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

        <router-link to="/industry-background" class="nav-item">Industry Background</router-link>
        <div class="nav-divider"></div>
        <div class="nav-item active">Market Demand</div>
        <div class="nav-divider"></div>
        <router-link to="/business-model" class="nav-item">Business Model</router-link>
        <div class="nav-divider"></div>
        <router-link to="/team-composition" class="nav-item">Team Composition</router-link>
        <div class="nav-divider"></div>
        <router-link to="/product-introduction" class="nav-item">Product Introduction</router-link>
      </div>
    </nav>

    <!-- Main Content Container -->
    <div class="flex flex-col lg:flex-row mt-[71px] main-content-container">
      <!-- Left Content -->
      <div class="flex-1 flex items-center justify-center relative min-w-0">
        <!-- Circle Container -->
        <div class="relative w-[830px] h-[830px] max-w-full max-h-full" style="transform: scale(min(1.1, calc(100vw / 3 / 600px), calc((100vh - 200px) / 600px), 0.85)); transform-origin: left;">
          <!-- 830x830 white circle -->
          <div class="ring"></div>

          <!-- Icons positioned along the circle -->
          <div class="absolute top-0 left-0 w-full h-full">
            <!-- Icon 6 - 30 degrees -->
            <div class="absolute icon-6-container icon-container transition-all duration-300 flex items-center cursor-pointer" style="top: 20px; left: 100px;" @click="activateIcon('icon-6-container', 'european', 'european')" @mouseenter="activateIcon('icon-6-container', 'european', 'european')">
              <!-- White dot 10x10 -->
              <div class="w-[10px] h-[10px] bg-white rounded-full dot-container-dot relative"></div>
              <!-- Map image icon-6.png 100x100 -->
              <img src="/src/assets/icon-6.png" alt="板块一" class="w-[100px] h-[100px] object-contain ml-[40px] icon-image" />
              <!-- Positioning dot icon-11.png 8x11 -->
              <img src="/src/assets/icon-11.png" alt="定位点" class="w-[8px] h-[11px] object-contain ml-1 mr-2 icon-dot" />
              <!-- Location name -->
              <span class="text-white text-sm font-medium ml-1 shadow-lg icon-text">Italian</span>
            </div>

            <!-- Icon 7 - 60 degrees -->
            <div class="absolute icon-7-container icon-container transition-all duration-300 flex items-center cursor-pointer" style="top: 130px; left: 180px;" @click="activateIcon('icon-7-container', 'southeast-asia', 'southeast-asia')" @mouseenter="activateIcon('icon-7-container', 'southeast-asia', 'southeast-asia')">
              <!-- White dot 10x10 -->
              <div class="w-[10px] h-[10px] bg-white rounded-full dot-container-dot relative"></div>
              <!-- Map image icon-7.png 100x100 -->
              <img src="/src/assets/icon-7.png" alt="板块二" class="w-[100px] h-[100px] object-contain ml-[40px] icon-image" />
              <!-- Positioning dot icon-11.png 8x11 -->
              <img src="/src/assets/icon-11.png" alt="定位点" class="w-[8px] h-[11px] object-contain ml-1 mr-2 icon-dot" />
              <!-- Location name -->
              <span class="text-white text-sm font-medium ml-1 shadow-lg icon-text">Southeast Asia</span>
            </div>

            <!-- Icon 8 - 90 degrees -->
            <div class="absolute icon-8-container icon-container transition-all duration-300 flex items-center cursor-pointer active-icon" style="top: 270px; left: 221px;" @click="activateIcon('icon-8-container', 'china', 'default')" @mouseenter="activateIcon('icon-8-container', 'china', 'default')">
              <!-- White dot 10x10 -->
              <div class="w-[10px] h-[10px] bg-white rounded-full dot-container-dot relative"></div>
              <!-- Map image icon-8.png 100x100 -->
              <img src="/src/assets/icon-8.png" alt="板块三" class="w-[100px] h-[100px] object-contain ml-[40px] icon-image" />
              <!-- Positioning dot icon-11.png 8x11 -->
              <img src="/src/assets/icon-11.png" alt="定位点" class="w-[8px] h-[11px] object-contain ml-2 mr-2 icon-dot" />
              <!-- Location name -->
              <span class="text-white text-sm font-medium ml-1 shadow-lg icon-text">China</span>
            </div>

            <!-- Icon 9 - 120 degrees -->
            <div class="absolute icon-9-container icon-container transition-all duration-300 flex items-center cursor-pointer" style="top: 410px; left: 213px;" @click="activateIcon('icon-9-container', 'usa', 'usa')" @mouseenter="activateIcon('icon-9-container', 'usa', 'usa')">
              <!-- White dot 10x10 -->
              <div class="w-[10px] h-[10px] bg-white rounded-full dot-container-dot relative"></div>
              <!-- Map image icon-9.png 100x100 -->
              <img src="/src/assets/icon-9.png" alt="板块四" class="w-[100px] h-[100px] object-contain ml-[40px] icon-image" />
              <!-- Positioning dot icon-11.png 8x11 -->
              <img src="/src/assets/icon-11.png" alt="定位点" class="w-[8px] h-[11px] object-contain ml-1 mr-2 icon-dot" />
              <!-- Location name -->
              <span class="text-white text-sm font-medium ml-1 shadow-lg icon-text">America</span>
            </div>

            <!-- Icon 10 - 150 degrees -->
            <div class="absolute icon-10-container icon-container transition-all duration-300 flex items-center cursor-pointer" style="top: 550px; left: 150px;" @click="activateIcon('icon-10-container', 'middle-east', 'middle-east')" @mouseenter="activateIcon('icon-10-container', 'middle-east', 'middle-east')">
              <!-- White dot 10x10 -->
              <div class="w-[10px] h-[10px] bg-white rounded-full dot-container-dot relative"></div>
              <!-- Map image icon-10.png 100x100 -->
              <img src="/src/assets/icon-10.png" alt="板块五" class="w-[100px] h-[100px] object-contain ml-[40px] icon-image" />
              <!-- Positioning dot icon-11.png 8x11 -->
              <img src="/src/assets/icon-11.png" alt="定位点" class="w-[8px] h-[11px] object-contain ml-1 mr-2 icon-dot" />
              <!-- Location name -->
              <span class="text-white text-sm font-medium ml-1 shadow-lg icon-text">Middle East</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Scroll Container (for Middle and Right Content) -->
      <div class="flex-3 flex flex-col lg:flex-row content-scroll-container">
        <!-- Middle Content-->
        <div class="flex-1 flex items-start justify-center px-0 py-4 lg:py-8 min-w-0">
          <div class="text-white w-full max-w-4xl">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 p-4 lg:p-6">
              <div class="space-y-4" v-html="middleContent"></div>
            </div>
          </div>
        </div>

        <!-- Right Content -->
        <div class="flex-1 flex items-start justify-center px-0 py-4 lg:py-8 min-w-0">
          <div class="text-white w-full max-w-4xl px-8 lg:px-8">
            <div class="bg-cover bg-center bg-no-repeat rounded-[10px] shadow-xl border border-white/20 overflow-hidden bg-white/10"
                 :style="`background-image: url('${rightContent.backgroundImage}'); background-blend-mode: overlay;`">

              <!-- Person Introduction Header -->
              <div class="bg-white/10 p-4 border-b border-white/20 shadow-inner">
                <div class="flex items-center justify-between">
                  <div class="flex-1">
                    <h2 class="text-2xl lg:text-1xl font-bold mb-1">{{ rightContent.name }}</h2>
                    <p class="text-sm lg:text-base opacity-90">{{ rightContent.title }}</p>
                  </div>
                  <div class="ml-2 lg:ml-4">
                    <img :src="rightContent.personImage" :alt="rightContent.name" class="w-[72px] h-[72px] lg:w-[92px] lg:h-[92px] rounded-[10px] object-cover shadow-xl" />
                  </div>
                </div>
              </div>

              <!-- Requirements Content -->
              <div class="bg-white/10 p-4 shadow-inner">
                <div class="space-y-4">
                  <p class="text-sm lg:text-base leading-relaxed">
                    {{ rightContent.bio }}
                  </p>

                  <div>
                    <h3 class="text-lg lg:text-xl font-semibold mb-3 flex items-center">
                      Core Requirements:
                    </h3>
                    <div class="text-sm lg:text-base space-y-2">
                      <p v-for="(requirement, index) in rightContent.requirements" :key="index" :class="{'border-b pb-2 border-white/20': index < rightContent.requirements.length - 1}">
                        {{ requirement }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Content: Image Gallery -->
    <div class="fixed bottom-0 left-0 right-0 h-[175px] overflow-x-auto bottom-gallery">
      <div class="relative w-full h-full">
        <!-- Image 1 -->
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
              <p class="text-white text-sm font-medium">Inter island transportation</p>
            </div>
          </div>
        </div>

        <!-- Image 2 -->
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
              <p class="text-white text-sm font-medium">Urban water system transportation</p>
            </div>
          </div>
        </div>

        <!-- Image 3 -->
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
              <p class="text-white text-sm font-medium">Water sports and fishing</p>
            </div>
          </div>
        </div>

        <!-- Image 4 -->
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
              <p class="text-white text-sm font-medium">Tourist attraction</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Gallery Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-16" @click="closeModal">
      <div class="relative w-full h-full" @click.stop>
        <!-- Close Button -->
        <button @click="closeModal" class="absolute top-4 right-4 text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-2 z-10 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="gray" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Navigation Buttons -->
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

        <!-- Current Image -->
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

        <!-- Image Counter -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
          {{ currentImageIndex + 1 }} / {{ currentImages.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 顶部导航栏 */
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

.ring {
  position: absolute;
  left: -600px;
  top: -50px;
	width: 830px;
	height: 830px;
	border: 3px solid white;
	border-radius: 50%;
}

.gallery-item {
  position: absolute;
  bottom: 0;
  width: 312px;
  height: 125px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(128, 128, 128, 0.5);
  transition: height 0.3s ease;
}

.gallery-item:nth-child(1) {
  left: calc(50% - min(642px, 45vw));
}

.gallery-item:nth-child(2) {
  left: calc(50% - min(318px, 22.5vw));
}

.gallery-item:nth-child(3) {
  left: calc(50% + min(6px, 0.5vw));
}

.gallery-item:nth-child(4) {
  left: calc(50% + min(330px, 23.5vw));
}

.gallery-item:hover {
  height: 175px;
}

.gallery-item:hover .image-mask {
  opacity: 0;
}

.gallery-item {
  cursor: pointer;
}

/* Middle Content responsive font sizes */
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

/* Active state styles for default hover effect */
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

/* Main content container height calculation */
.main-content-container {
  height: calc(100vh - 71px - 175px);
}

/* Content scroll container for Middle and Right Content */
.content-scroll-container {
  flex: 3;
  height: 100%;
  overflow-y: auto;
  padding-right: 8px;
  gap: 16px;
}

/* Custom scrollbar styling */
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