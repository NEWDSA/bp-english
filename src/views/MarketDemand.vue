<script setup>
import { ref } from 'vue'
import Navigation from '../components/Navigation.vue'
import CountryCircle from '../components/CountryCircle.vue'

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
</script>

<template>
  <div class="bg-center bg-no-repeat relative flex flex-col min-h-screen w-full"
       style="background: url('/src/assets/icon-3.png'); background-size: 100% 100%;">
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
    <div class="flex">
      <!-- Left Content -->
      <div class="w-1/3 flex items-center justify-center relative">
        <!-- Circle Container -->
        <div class="relative w-[830px] h-[830px]">
          <!-- 830x830 white circle -->
          <div class="ring"></div>

          <!-- Icons positioned along the circle -->
          <div class="absolute top-0 left-0 w-full h-full">
            <!-- Icon 6 - 30 degrees -->
            <div class="absolute w-[196px] h-[100px] transition-all duration-300 hover:scale-110 hover:shadow-lg" style="top: 70px; left: 124px;">
              <img src="/src/assets/icon-6.png" alt="板块一" class="w-full h-full object-contain" />
            </div>

            <!-- Icon 7 - 60 degrees -->
            <div class="absolute w-[244px] h-[100px] transition-all duration-300 hover:scale-110 hover:shadow-lg" style="top: 170px; left: 187px;">
              <img src="/src/assets/icon-7.png" alt="板块二" class="w-full h-full object-contain" />
            </div>

            <!-- Icon 8 - 90 degrees -->
            <div class="absolute w-[210px] h-[70px] transition-all duration-300 hover:scale-110 hover:shadow-lg" style="top: 300px; left: 212px;">
              <img src="/src/assets/icon-8.png" alt="板块三" class="w-full h-full object-contain" />
            </div>

            <!-- Icon 9 - 120 degrees -->
            <div class="absolute w-[206px] h-[56px] transition-all duration-300 hover:scale-110 hover:shadow-lg" style="top: 430px; left: 184px;">
              <img src="/src/assets/icon-9.png" alt="板块四" class="w-full h-full object-contain" />
            </div>

            <!-- Icon 10 - 150 degrees -->
            <div class="absolute w-[210px] h-[62px] transition-all duration-300 hover:scale-110 hover:shadow-lg" style="top: 540px; left: 98px;">
              <img src="/src/assets/icon-10.png" alt="板块五" class="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      <!-- Middle Content-->
      <div class="w-1/3 flex items-start justify-center p-8">
        <div class="text-white max-w-lg">
          <div class="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 p-6">
            <div class="space-y-4">
              <div class="mb-6">
                <div class="flex items-center mb-2">
                  <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
                  <h3 class="text-lg font-semibold text-white">Target Customers:</h3>
                </div>
                <div class="text-sm space-y-2 ml-5">
                  <p>High end resort groups, emerging shipping companies, yacht clubs</p>
                  <p>Seed users: Local tourism operators and start-up technology companies</p>
                </div>
              </div>

              <div class="mb-6">
                <div class="flex items-center mb-2">
                  <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
                  <h3 class="text-lg font-semibold text-white">Requirements:</h3>
                </div>
                <div class="text-sm space-y-2 ml-5">
                  <p>Highly concerned about cost-effectiveness and operating costs of products</p>
                  <p>Ships need to adapt to high temperature and high salinity tropical marine environments with strong corrosion resistance</p>
                  <p>Requirements for product multifunctionality (connectivity and sightseeing needs)</p>
                </div>
              </div>

              <div class="mb-6">
                <div class="flex items-center mb-2">
                  <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
                  <h3 class="text-lg font-semibold text-white">Type:</h3>
                </div>
                <p class="text-sm leading-relaxed ml-5">
                  High end private yachts, island shuttle ships, and offshore transport ships are mainly purchased from the B-end
                </p>
              </div>

              <div>
                <div class="flex items-center mb-2">
                  <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
                  <h3 class="text-lg font-semibold text-white">Market Opportunity:</h3>
                </div>
                <div class="text-sm space-y-2 ml-5">
                  <p>Southeast Asia's island tourism industry is recovering rapidly, driving demand for new transportation tools</p>
                  <p>Growth of regional trade and "Belt and Road" initiative promote green offshore shipping development</p>
                  <p>Infrastructure upgrading increases demand for port dredging and engineering construction ships</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content -->
      <div class="w-1/3 flex items-start justify-center p-8">
        <div class="text-white max-w-lg">
          <div class="bg-cover bg-center bg-no-repeat rounded-[10px] shadow-xl border border-white/20 overflow-hidden bg-white/10 transition-all duration-300 hover:shadow-2xl hover:scale-105"
               style="background-image: url('/src/assets/icon-4.png'); background-blend-mode: overlay;">

            <!-- Person Introduction Header -->
            <div class="bg-white/10 p-6 border-b border-white/20 shadow-inner">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h2 class="text-2xl font-bold mb-1">Mr Chen</h2>
                  <p class="text-sm opacity-90">General Manager of Yacht Club</p>
                </div>
                <div class="ml-4">
                  <img src="/src/assets/icon-5.png" alt="Mr Chen" class="w-[92px] h-[92px] rounded-[10px] object-cover shadow-xl" />
                </div>
              </div>
            </div>

            <!-- Requirements Content -->
            <div class="bg-white/10 p-6 shadow-inner">
              <div class="space-y-4">
                <p class="text-sm leading-relaxed">
                  To operate yacht rental, water transportation, and water sports businesses in Dameisha, Shenzhen, it is necessary to introduce new products to enrich the tourist experience.
                </p>

                <div>
                  <h3 class="text-lg font-semibold mb-3 flex items-center">
                    <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
                    Core Requirements:
                  </h3>
                  <div class="text-sm space-y-2 ml-5">
                    <p>• The product is innovative and has recognition</p>
                    <p>• Efficient and energy-saving, easy to operate</p>
                    <p>• Environmental Protection and Scenic Area Protection Requirements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Content: Image Gallery -->
    <div class="fixed bottom-4 left-0 right-0 h-[175px]">
      <div class="relative w-full h-full">
        <!-- Image 1 -->
        <div class="gallery-item">
          <img src="/src/assets/img/view-1.png" alt="Gallery Image 1" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
          <div class="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <!-- Image 2 -->
        <div class="gallery-item">
          <img src="/src/assets/img/view-2.png" alt="Gallery Image 2" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
          <div class="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <!-- Image 3 -->
        <div class="gallery-item">
          <img src="/src/assets/img/view-3.png" alt="Gallery Image 3" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
          <div class="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <!-- Image 4 -->
        <div class="gallery-item">
          <img src="/src/assets/img/view-4.png" alt="Gallery Image 4" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
          <div class="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 顶部导航栏 */
.top-nav {
	/* position: fixed; */
	top: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(10px);
	z-index: 1000;
	padding: 15px 0;
}

.nav-container {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
}

.nav-item {
	padding: 10px 20px;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	font-size: 14px;
	font-weight: 500;
	text-decoration: none;
	color: #ffffff;
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
  left: -360px;
  top: 32px;
	width: 600px;
	height: 600px;
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
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease;
}

.gallery-item:nth-child(1) {
  left: calc(50% - 642px);
}

.gallery-item:nth-child(2) {
  left: calc(50% - 318px);
}

.gallery-item:nth-child(3) {
  left: calc(50% + 6px);
}

.gallery-item:nth-child(4) {
  left: calc(50% + 330px);
}

.gallery-item:hover {
  height: 175px;
}
</style>