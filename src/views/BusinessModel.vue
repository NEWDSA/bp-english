<template>
	<div class="business-model">
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
				<router-link to="/market-demand" class="nav-item">Market Demand</router-link>
				<div class="nav-divider"></div>
				<div class="nav-item active">Business Model</div>
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
				<!-- 收入模型图表 -->
				<div class="chart-card">
					<h3 class="chart-title">Revenue Model</h3>
					<div class="chart-container">
						<div ref="revenueChartRef" class="revenue-echart"></div>
					</div>
				</div>


				<!-- 渠道策略 -->
				<div class="strategy-card">
					<h3 class="strategy-title">Channel Strategy</h3>

					<div class="strategy-section">
						<!-- <h4 class="strategy-subtitle">Domestic (B-end water area operator)</h4> -->
						<div class="strategy-subtitle">Domestic (B-end water area operator)</div>
						<div class="strategy-content">
							<p class="strategy-label">Positioning:</p>
							<p class="strategy-text">To provide a full cycle hydrofoil operation solution for scenic
								spots, passenger transport companies, and hotels.</p>

							<p class="strategy-label">Core module:</p>
							<p class="strategy-text">Fleet operation and maintenance (equipment support)+safety
								management (real-time monitoring)</p>
							<p class="strategy-text">Product operation (leasing system)+dock support (infrastructure
								support)</p>
						</div>
					</div>

					<div class="strategy-section">
						<h4 class="strategy-subtitle">Overseas business (C-end private enterprises/private berth users)
						</h4>
						<div class="strategy-content">
							<p class="strategy-label">Positioning:</p>
							<p class="strategy-text">To build an intelligent hydrofoil boat lifestyle ecosystem for
								middle-class private berth users.</p>

							<p class="strategy-label">Core module:</p>
							<p class="strategy-text">Map service (navigation planning)+APP service (remote control)</p>
							<p class="strategy-text">Additional services (customized maintenance/social functions)</p>
						</div>
					</div>
				</div>
			</div>

			<!-- 右侧地图区域 -->
			<div class="right-section">
				<div class="map-container">
					<div class="map-background">
						<div class="lake-outline"></div>
						<div class="map-markers">
							<div class="marker marker-1"></div>
							<div class="marker marker-2"></div>
							<div class="marker marker-3"></div>
						</div>
					</div>

					<div class="map-overlays">
						<div class="overlay-text overlay-1">Operating profit and loss statement</div>
						<div class="overlay-text overlay-2">The case of Lake Como</div>
						<div class="overlay-text overlay-3">Daily average number of boat tourists</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'

const router = useRouter()

// 图表数据
const chartData = ref([
	{ orange: 70, teal: 65 },
	{ orange: 75, teal: 70 },
	{ orange: 80, teal: 75 },
	{ orange: 85, teal: 85 },
	{ orange: 90, teal: 90 },
	{ orange: 95, teal: 95 },
	{ orange: 100, teal: 100 },
	{ orange: 95, teal: 65 },
	{ orange: 100, teal: 70 },
	{ orange: 105, teal: 75 },
	{ orange: 110, teal: 80 },
	{ orange: 120, teal: 90 }
])

// ECharts: Revenue Model
const revenueChartRef = ref(null)
let revenueChartInstance = null

function renderRevenueChart() {
	if (!revenueChartRef.value) return
	if (!revenueChartInstance) {
		revenueChartInstance = echarts.init(revenueChartRef.value)
	}

	const oranges = chartData.value.map(d => d.orange)
	const teals = chartData.value.map(d => d.teal)

	const option = {
		animation: true,
		grid: { top: 10, bottom: 8, containLabel: false },
		xAxis: {
			type: 'category',
			data: new Array(chartData.value.length).fill(''),
			axisLine: { show: false },
			axisTick: { show: false },
			axisLabel: { show: false },
			splitLine: { show: false }
		},
		yAxis: { type: 'value', show: false },
		tooltip: { show: false },
		series: [
			{
				name: 'Orange',
				type: 'bar',
				data: oranges,
				barWidth: 15,
				// barGap: '5%',
				itemStyle: {
					// borderRadius: [6, 6, 0, 0],
					shadowColor: 'rgba(0,0,0,0.35)',
					shadowBlur: 10,
					shadowOffsetY: 4,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#FFC27A' },
						{ offset: 0.35, color: '#FF9A4E' },
						{ offset: 1, color: 'rgba(140, 98, 64, 0.65)' }
					])
				}
			},
			{
				name: 'Teal',
				type: 'bar',
				data: teals,
				barWidth: 15,
				// barGap: '5%',
				itemStyle: {
					// borderRadius: [6, 6, 0, 0],
					shadowColor: 'rgba(0,0,0,0.35)',
					shadowBlur: 10,
					shadowOffsetY: 4,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#3FF4FF' },
						{ offset: 0.35, color: '#19D8F3' },
						{ offset: 1, color: 'rgba(22, 79, 96, 0.65)' }
					])
				}
			}
		]
	}

	revenueChartInstance.setOption(option)
	// 自适应
	setTimeout(() => { revenueChartInstance?.resize() }, 0)
}

onMounted(() => {
	renderRevenueChart()
	window.addEventListener('resize', onWindowResize)
})

function onWindowResize() {
	if (revenueChartInstance) revenueChartInstance.resize()
}

onBeforeUnmount(() => {
	window.removeEventListener('resize', onWindowResize)
	if (revenueChartInstance) {
		revenueChartInstance.dispose()
		revenueChartInstance = null
	}
})

// 若数据变化，重绘
watchEffect(() => {
	if (revenueChartInstance) renderRevenueChart()
})

function goHome() {
	router.push('/')
}

onMounted(() => {
	// 页面加载完成后的初始化逻辑
})
</script>

<style scoped>
.business-model {
	min-height: 100vh;
	background: url('../assets/bs_bg.png') center/contain;
	/* 背景色为#000000 */
	background-color: #000000;
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
	align-items: stretch;
	justify-content: left;
}

/* 图表卡片 */
.chart-card {
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(15px);
	border-radius: 20px;
	padding: 35px;
	border: 1px solid rgba(255, 255, 255, 0.15);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.chart-title {
	font-size: 22px;
	font-weight: 700;
	margin-bottom: 25px;
	color: #ffffff;
	text-align: center;
	letter-spacing: 0.5px;
}

.chart-container {
	height: 220px;
	display: flex;
	align-items: end;
	gap: 6px;
	padding: 10px 0;
}

.revenue-echart {
	width: 100%;
	height: 200px;
}

/* 策略卡片 */
.strategy-card {
	/* background: rgba(255, 255, 255, 0.08); */
	/* backdrop-filter: blur(15px); */
	/* border-radius: 20px; */
	padding: 35px;
	/* border: 1px solid rgba(255, 255, 255, 0.15); */
	/* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); */
}

.strategy-title {
	/* font-size: 20px; */
	font-weight: 600;
	margin-bottom: 25px;
	color: #ffffff;
}

.strategy-section {
	margin-bottom: 25px;
}

.strategy-section:last-child {
	margin-bottom: 0;
}

.strategy-subtitle {
	font-size: 16px;
	/* font-weight: 600; */
	/* color: #00d4ff; */
	margin-bottom: 15px;
}

.strategy-content {
	/* margin-left: 20px; */
}

.strategy-label {
	font-size: 14px;
	font-weight: 600;
	color: #ffffff;
	margin: 10px 0 5px 0;
}

.strategy-text {
	font-size: 13px;
	line-height: 1.6;
	color: #cccccc;
	margin: 5px 0;
}

/* 地图容器 */
.map-container {
	position: relative;
	width: 95%;
	height: 70%;
	/* min-height: 400px; */
	background: url('../assets/bs_map.png') center/cover no-repeat;
	border-radius: 20px;
	overflow: hidden;
	/* border: 1px solid pink; */
	/* border: 1px solid rgba(0, 212, 255, 0.3); */
}

.map-background {
	position: relative;
	width: 100%;
	height: 100%;
	background: radial-gradient(circle at 30% 40%, rgba(0, 212, 255, 0.1) 0%, transparent 50%);
}

/* .lake-outline {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	height: 60%;
	background: linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.3) 50%, transparent 70%);
	border-radius: 50% 30% 50% 30%;
	box-shadow:
		0 0 20px rgba(0, 212, 255, 0.5),
		inset 0 0 20px rgba(0, 212, 255, 0.2);
	animation: glow 3s ease-in-out infinite alternate;
} */

@keyframes glow {
	from {
		box-shadow:
			0 0 20px rgba(0, 212, 255, 0.5),
			inset 0 0 20px rgba(0, 212, 255, 0.2);
	}

	to {
		box-shadow:
			0 0 30px rgba(0, 212, 255, 0.8),
			inset 0 0 30px rgba(0, 212, 255, 0.4);
	}
}

.map-markers {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.marker {
	position: absolute;
	width: 12px;
	height: 12px;
	background: #00d4ff;
	border-radius: 50%;
	box-shadow: 0 0 15px rgba(0, 212, 255, 0.8);
	animation: pulse 2s ease-in-out infinite;
}

.marker-1 {
	top: 75%;
	left: 9%;
}

.marker-2 {
	top: 40%;
	left: 52%;
}

.marker-3 {
	top: 55%;
	left: 60%;
}

@keyframes pulse {

	0%,
	100% {
		transform: scale(1);
		opacity: 1;
	}

	50% {
		transform: scale(1.2);
		opacity: 0.8;
	}
}

.map-overlays {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.overlay-text {
	position: absolute;
	font-size: 12px;
	font-weight: 500;
	color: #ffffff;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
	background: rgba(0, 0, 0, 0.3);
	padding: 5px 10px;
	border-radius: 5px;
	white-space: nowrap;
}

.overlay-1 {
	top: 72%;
	left: 0%;
}

.overlay-2 {
	top: 37%;
	left: 40%;
}

.overlay-3 {
	top: 52%;
	left: 43%;
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

	.left-section,
	.right-section {
		padding: 20px;
	}

	.chart-container {
		height: 150px;
	}

	.map-container {
		height: 300px;
	}
}
</style>
