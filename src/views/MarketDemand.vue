<template>
	<div class="market-demand">
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

		<!-- 主要内容区域 -->
		<div class="main-content">
			<!-- 左侧内容 -->
			<div class="left-section">
				<!-- 市场需求分析 -->
				<div class="analysis-card">
					<h3 class="analysis-title">Market Analysis</h3>
					<div class="analysis-content">
						<div class="analysis-item">
							<h4 class="analysis-subtitle">Global Water Transportation Market</h4>
							<p class="analysis-text">The global water transportation market is experiencing significant growth, driven by increasing demand for sustainable and efficient transportation solutions.</p>
						</div>
						<div class="analysis-item">
							<h4 class="analysis-subtitle">Target Market Size</h4>
							<p class="analysis-text">Our target market includes scenic areas, tourist destinations, and private berth users, representing a $2.5B addressable market.</p>
						</div>
						<div class="analysis-item">
							<h4 class="analysis-subtitle">Growth Drivers</h4>
							<p class="analysis-text">Environmental awareness, technological advancement, and increasing tourism demand are key growth drivers in this market.</p>
						</div>
					</div>
				</div>

				<!-- 市场趋势图表 -->
				<div class="trend-card">
					<h3 class="trend-title">Market Trends</h3>
					<div class="trend-chart">
						<div class="trend-bars">
							<div v-for="(trend, index) in marketTrends" :key="index" class="trend-bar-group">
								<div class="trend-bar" :style="{ height: trend.value + '%' }"></div>
								<div class="trend-label">{{ trend.year }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 右侧地图区域 -->
			<div class="right-section">
				<div class="market-map">
					<div class="map-title">Global Market Distribution</div>
					<div class="market-regions">
						<div class="region region-1">
							<div class="region-marker"></div>
							<div class="region-label">North America</div>
							<div class="region-value">35%</div>
						</div>
						<div class="region region-2">
							<div class="region-marker"></div>
							<div class="region-label">Europe</div>
							<div class="region-value">28%</div>
						</div>
						<div class="region region-3">
							<div class="region-marker"></div>
							<div class="region-label">Asia Pacific</div>
							<div class="region-value">25%</div>
						</div>
						<div class="region region-4">
							<div class="region-marker"></div>
							<div class="region-label">Others</div>
							<div class="region-value">12%</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 市场趋势数据
const marketTrends = ref([
	{ year: '2019', value: 20 },
	{ year: '2020', value: 25 },
	{ year: '2021', value: 35 },
	{ year: '2022', value: 45 },
	{ year: '2023', value: 60 },
	{ year: '2024', value: 75 },
	{ year: '2025', value: 85 }
])

function goHome() {
	router.push('/')
}

onMounted(() => {
	// 页面加载完成后的初始化逻辑
})
</script>

<style scoped>
.market-demand {
	min-height: 100vh;
	background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
	color: #ffffff;
	font-family: 'Arial', sans-serif;
}

/* 顶部导航栏 */
.top-nav {
	position: fixed;
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

/* 首页按钮样式 */
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

/* 主要内容区域 */
.main-content {
	display: flex;
	min-height: 100vh;
	padding-top: 80px;
}

.left-section {
	flex: 1;
	padding: 40px;
	display: flex;
	flex-direction: column;
	gap: 30px;
}

.right-section {
	flex: 1;
	padding: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* Market Demand 页面样式 */
.analysis-card, .trend-card {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	padding: 30px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	margin-bottom: 30px;
}

.analysis-title, .trend-title {
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 20px;
	color: #ffffff;
}

.analysis-item {
	margin-bottom: 20px;
}

.analysis-subtitle {
	font-size: 16px;
	font-weight: 600;
	color: #00d4ff;
	margin-bottom: 10px;
}

.analysis-text {
	font-size: 14px;
	line-height: 1.6;
	color: #cccccc;
}

.trend-chart {
	height: 200px;
	display: flex;
	align-items: end;
	gap: 15px;
}

.trend-bars {
	display: flex;
	align-items: end;
	gap: 15px;
	height: 100%;
	width: 100%;
}

.trend-bar-group {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	height: 100%;
}

.trend-bar {
	width: 100%;
	background: linear-gradient(to top, #00d4ff, #0099cc);
	border-radius: 4px 4px 0 0;
	transition: all 0.3s ease;
	min-height: 4px;
}

.trend-label {
	font-size: 12px;
	color: #ffffff;
	margin-top: 10px;
}

.market-map {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 30px;
	border: 1px solid rgba(0, 212, 255, 0.3);
	height: 500px;
}

.map-title {
	font-size: 20px;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 30px;
	text-align: center;
}

.market-regions {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
	height: calc(100% - 60px);
}

.region {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: rgba(0, 212, 255, 0.1);
	border-radius: 15px;
	padding: 20px;
	border: 1px solid rgba(0, 212, 255, 0.3);
	transition: all 0.3s ease;
}

.region:hover {
	background: rgba(0, 212, 255, 0.2);
	transform: translateY(-5px);
}

.region-marker {
	width: 20px;
	height: 20px;
	background: #00d4ff;
	border-radius: 50%;
	margin-bottom: 15px;
	box-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
}

.region-label {
	font-size: 14px;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 5px;
}

.region-value {
	font-size: 24px;
	font-weight: 700;
	color: #00d4ff;
}

/* 响应式设计 */
@media (max-width: 768px) {
	.main-content {
		flex-direction: column;
	}
	
	.nav-container {
		flex-wrap: wrap;
		gap: 10px;
	}
	
	.nav-item {
		font-size: 12px;
		padding: 8px 15px;
	}
	
	.left-section, .right-section {
		padding: 20px;
	}
	
	.market-regions {
		grid-template-columns: 1fr;
	}
}
</style>
