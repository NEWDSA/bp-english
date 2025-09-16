<template>
	<div class="industry-background">
		<!-- 顶部导航栏 -->
		<nav class="top-nav">
			<div class="nav-container">
				<div class="nav-item" :class="{ active: currentSection === 'industry' }" @click="navigateTo('industry')">
					Industry Background
				</div>
				<div class="nav-divider"></div>
				<div class="nav-item" :class="{ active: currentSection === 'market' }" @click="navigateTo('market')">
					Market Demand
				</div>
				<div class="nav-divider"></div>
				<div class="nav-item" :class="{ active: currentSection === 'business' }" @click="navigateTo('business')">
					Business Model
				</div>
				<div class="nav-divider"></div>
				<div class="nav-item" :class="{ active: currentSection === 'team' }" @click="navigateTo('team')">
					Team Composition
				</div>
				<div class="nav-divider"></div>
				<div class="nav-item" :class="{ active: currentSection === 'product' }" @click="navigateTo('product')">
					Product Introduction
				</div>
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
						<div class="chart-bars">
							<div v-for="(data, index) in chartData" :key="index" class="bar-group">
								<div class="bar orange" :style="{ height: data.orange + '%' }"></div>
								<div class="bar teal" :style="{ height: data.teal + '%' }"></div>
							</div>
						</div>
					</div>
				</div>

				<!-- 渠道策略 -->
				<div class="strategy-card">
					<h3 class="strategy-title">Channel Strategy</h3>
					
					<div class="strategy-section">
						<h4 class="strategy-subtitle">Domestic (B-end water area operator)</h4>
						<div class="strategy-content">
							<p class="strategy-label">Positioning:</p>
							<p class="strategy-text">To provide a full cycle hydrofoil operation solution for scenic spots, passenger transport companies, and hotels.</p>
							
							<p class="strategy-label">Core module:</p>
							<p class="strategy-text">Fleet operation and maintenance (equipment support)+safety management (real-time monitoring)</p>
							<p class="strategy-text">Product operation (leasing system)+dock support (infrastructure support)</p>
						</div>
					</div>

					<div class="strategy-section">
						<h4 class="strategy-subtitle">Overseas business (C-end private enterprises/private berth users)</h4>
						<div class="strategy-content">
							<p class="strategy-label">Positioning:</p>
							<p class="strategy-text">To build an intelligent hydrofoil boat lifestyle ecosystem for middle-class private berth users.</p>
							
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
						<div class="overlay-text overlay-1">The case of Lake Como</div>
						<div class="overlay-text overlay-2">Daily average number of boat tourists</div>
						<div class="overlay-text overlay-3">Operating profit and loss statement</div>
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
const currentSection = ref('industry')

// 图表数据
const chartData = ref([
	{ orange: 20, teal: 30 },
	{ orange: 25, teal: 35 },
	{ orange: 30, teal: 40 },
	{ orange: 35, teal: 45 },
	{ orange: 40, teal: 50 },
	{ orange: 45, teal: 55 },
	{ orange: 50, teal: 60 },
	{ orange: 55, teal: 65 },
	{ orange: 60, teal: 70 },
	{ orange: 65, teal: 75 },
	{ orange: 70, teal: 80 },
	{ orange: 80, teal: 90 }
])

function navigateTo(section) {
	currentSection.value = section
	// 这里可以添加路由跳转逻辑
	console.log('Navigate to:', section)
}

onMounted(() => {
	// 页面加载完成后的初始化逻辑
})
</script>

<style scoped>
.industry-background {
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

/* 图表卡片 */
.chart-card {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	padding: 30px;
	border: 1px solid rgba(255, 255, 255, 0.2);
}

.chart-title {
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 20px;
	color: #ffffff;
}

.chart-container {
	height: 200px;
	display: flex;
	align-items: end;
	gap: 8px;
}

.chart-bars {
	display: flex;
	align-items: end;
	gap: 8px;
	height: 100%;
	width: 100%;
}

.bar-group {
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex: 1;
	height: 100%;
}

.bar {
	width: 100%;
	border-radius: 2px 2px 0 0;
	transition: all 0.3s ease;
	min-height: 4px;
}

.bar.orange {
	background: linear-gradient(to top, #ff6b35, #ff8c42);
}

.bar.teal {
	background: linear-gradient(to top, #00d4ff, #0099cc);
}

/* 策略卡片 */
.strategy-card {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	padding: 30px;
	border: 1px solid rgba(255, 255, 255, 0.2);
}

.strategy-title {
	font-size: 20px;
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
	font-weight: 600;
	color: #00d4ff;
	margin-bottom: 15px;
}

.strategy-content {
	margin-left: 20px;
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
	width: 100%;
	height: 500px;
	background: linear-gradient(45deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
	border-radius: 20px;
	overflow: hidden;
	border: 1px solid rgba(0, 212, 255, 0.3);
}

.map-background {
	position: relative;
	width: 100%;
	height: 100%;
	background: radial-gradient(circle at 30% 40%, rgba(0, 212, 255, 0.1) 0%, transparent 50%);
}

.lake-outline {
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
}

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
	top: 30%;
	left: 25%;
}

.marker-2 {
	top: 50%;
	left: 50%;
}

.marker-3 {
	top: 70%;
	left: 75%;
}

@keyframes pulse {
	0%, 100% {
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
}

.overlay-1 {
	top: 20%;
	left: 20%;
}

.overlay-2 {
	top: 45%;
	left: 45%;
}

.overlay-3 {
	top: 75%;
	left: 60%;
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
	
	.chart-container {
		height: 150px;
	}
	
	.map-container {
		height: 300px;
	}
}
</style>
