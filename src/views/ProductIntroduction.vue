<template>
	<div class="product-introduction">
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
				<router-link to="/business-model" class="nav-item">Business Model</router-link>
				<div class="nav-divider"></div>
				<router-link to="/team-composition" class="nav-item">Team Composition</router-link>
				<div class="nav-divider"></div>
				<div class="nav-item active">Product Introduction</div>
			</div>
		</nav>

		<!-- 主要内容区域 -->
		<div class="main-content">
			<!-- 左侧内容区域 -->
			<div class="left-section">
				<div class="left-nav-list">
					<div class="left-nav-item">
						<span class="nav-text">Product advantages</span>
					</div>
					<div class="left-nav-item">
						<span class="nav-text">Compared to traditional ferries</span>
					</div>
					<div class="left-nav-item">
						<span class="nav-text">Design&Simulation Technology</span>
					</div>
					<div class="left-nav-item color-price-section">
						<span class="nav-text">Color and Price</span>
						<!-- 颜色选择区域 -->
						<div class="color-price-content">
							<div class="color-options">
								<div class="color-swatch white" @click="changeBoatColor('white')" :class="{ active: selectedColor === 'white' }" style="background: #FFFFFF;"></div>
								<div class="color-swatch gray" @click="changeBoatColor('gray')" :class="{ active: selectedColor === 'gray' }" style="background: #87CEEB;"></div>
								<div class="color-swatch blue" @click="changeBoatColor('blue')" :class="{ active: selectedColor === 'blue' }" style="background: #4682B4;"></div>
								<div class="color-swatch purple" @click="changeBoatColor('purple')" :class="{ active: selectedColor === 'purple' }" style="background: #DDA0DD;"></div>
								<div class="color-swatch red" @click="changeBoatColor('red')" :class="{ active: selectedColor === 'red' }" style="background: #FF4500;"></div>
								<div class="color-swatch brown" @click="changeBoatColor('brown')" :class="{ active: selectedColor === 'brown' }" style="background: #8B7355;"></div>
							</div>
							<div class="purchase-btn">
								<span class="price-display">{{ currentPrice }}</span>
								<span class="purchase-text">Please click here to contact us for purchase</span>
							</div>
						</div>
					</div>
					<div class="left-nav-item">
						<span class="nav-text">Product Highlights</span>
					</div>
				</div>
			</div>

			<!-- 中间3D产品展示区域 -->
			<div class="center-section">
				<div class="product-3d-showcase">
					<div class="boat-3d-model">
						<!-- 3D船体模型 -->
						<img :src="currentBoatImage" alt="YU Hydrofoil Boat" class="boat-image" />
					</div>
				</div>
			</div>

			<!-- 右侧产品规格区域 -->
			<div class="right-section">
				<div class="product-specs-panel">
					<!-- <h3 class="specs-title">Ship name: YU</h3> -->
					<div style="background-color: rgba(100, 100, 100, 1);padding: 10px;border-radius: 10px 10px 0 0;">
						<span class="specs-title">Ship name: YU</span>
					</div>
					<!-- 主要尺寸 -->
					<div class="spec-group">
						<div class="spec-header">
							<h4 class="spec-category">Principal dimension:</h4>
							<div class="dropdown-arrow">▼</div>
						</div>
						<div class="spec-details">
							<div class="spec-row">
								<span class="spec-label">Total length</span>
								<span class="spec-value">4.90 m</span>
							</div>
							<div class="spec-row">
								<span class="spec-label">Total width</span>
								<span class="spec-value">3.40 m</span>
							</div>
							<div class="spec-row">
								<span class="spec-label">Draft</span>
								<span class="spec-value">1.20 m</span>
							</div>
							<div class="spec-row">
								<span class="spec-label">Person capacity</span>
								<span class="spec-value">3-5 people</span>
							</div>
						</div>
					</div>

					<!-- 动力、速度和续航 -->
					<div class="spec-group">
						<div class="spec-header">
							<!-- <h4 class="spec-category">Power, speed, and range:</h4> -->
							<span class="spec-category">Power, speed, and range:</span>
							<div class="dropdown-arrow">▼</div>
						</div>
						<div class="spec-details">
							<div class="spec-row">
								<span class="spec-label">Cruising speed</span>
								<span class="spec-value">15/30 sections (kt)</span>
							</div>
							<div class="spec-row">
								<span class="spec-label">Maximum speed</span>
								<span class="spec-value">18/33 sections(kt)</span>
							</div>
							<div class="spec-row">
								<span class="spec-label">Endurance</span>
								<span class="spec-value">2.5 hours (standard operating conditions)</span>
							</div>
							<div class="spec-row">
								<span class="spec-label">Propulsion power</span>
								<span class="spec-value">20kw/40 kw</span>
							</div>
							<div class="spec-row">
								<span class="spec-label">Charging method</span>
								<span class="spec-value">Equipped with dedicated charging stations</span>
							</div>
							<div class="spec-row">
								<span class="spec-label">Charging station</span>
								<span class="spec-value">380V 60A</span>
							</div>
							<div class="spec-row">
								<span class="spec-label">Charging time</span>
								<span class="spec-value">1.5 hours</span>
							</div>
							<div class="spec-row">
								<span class="spec-label">Charging power</span>
								<span class="spec-value">≤20kw</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// 导入图片资源
import whiteBotImg from '../assets/white_boat.png'
import blueBoatImg from '../assets/blue_boat.png'

const router = useRouter()

// 颜色选择状态
const selectedColor = ref('white')

// 船只图片映射
const boatImages = {
	'white': whiteBotImg,
	'gray': blueBoatImg,
	'blue': blueBoatImg,
	'purple': whiteBotImg,
	'red': whiteBotImg,
	'brown': whiteBotImg
}

// 颜色价格映射
const colorPrices = {
	'white': '¥ 2,800,000',
	'gray': '¥ 3,000,000',
	'blue': '¥ 3,200,000',
	'purple': '¥ 3,500,000',
	'red': '¥ 3,800,000',
	'brown': '¥ 3,300,000'
}

// 计算当前船只图片
const currentBoatImage = computed(() => {
	return boatImages[selectedColor.value] || boatImages['white']
})

// 计算当前价格
const currentPrice = computed(() => {
	return colorPrices[selectedColor.value] || colorPrices['white']
})

// 切换船只颜色
function changeBoatColor(color) {
	selectedColor.value = color
	console.log('切换到颜色:', color)
}

function goHome() {
	router.push('/')
}

onMounted(() => {
	// 页面加载完成后的初始化逻辑
})
</script>

<style scoped>
.product-introduction {
	min-height: 100vh;
	background: url('../assets/bp_bg.png') center/cover no-repeat;
	background-attachment: fixed;
	color: #ffffff;
	font-family: 'Arial', sans-serif;
	position: relative;
	overflow: hidden;
}

/* 添加半透明遮罩层以增强文字可读性 */
.product-introduction::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.3);
	z-index: 0;
}

/* 顶部导航栏 */
.top-nav {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(10px);
	z-index: 1001;
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
	position: relative;
	height: calc(100vh - 80px);
	padding-top: 80px;
	z-index: 1;
	overflow: hidden;
}

/* 左侧导航列表定位 */
.left-nav-list {
	position: absolute;
	left: 20px;
	top: 50%;
	transform: translateY(-50%);
}

/* 中间3D产品展示定位 */
.product-3d-showcase {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

/* 右侧产品规格面板 */
.product-specs-panel {
	position: absolute;
	right: 20px;
	top: 50%;
	transform: translateY(-50%);
	background-color: rgba(100, 100, 100, 0.3);
	backdrop-filter: blur(20px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	width: 100%;
	max-width: 350px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* 左侧导航列表样式 */
.left-nav-list {
	display: flex;
	flex-direction: column;
	gap: 40px;
	padding-left: 20px;
	min-height: 60vh;
	justify-content: space-around;
}

.left-nav-list::before {
	content: '';
	position: absolute;
	left: 0;
	top: -10px;
	bottom: -10px;
	width: 2px;
	background: rgba(255, 255, 255, 0.8);
}

.left-nav-item {
	display: flex;
	align-items: center;
	position: relative;
	cursor: pointer;
	transition: all 0.3s ease;
}

.left-nav-item::before {
	content: '';
	position: absolute;
	left: -20px;
	top: 50%;
	transform: translateY(-50%);
	width: 15px;
	height: 2px;
	background: rgba(255, 255, 255, 0.8);
	z-index: 2;
}

.left-nav-item:hover .nav-text {
	color: #00d4ff;
	transform: translateX(5px);
}

.nav-line {
	display: none;
}

.nav-text {
	font-size: 16px;
	font-weight: 500;
	color: #FFFFFF;
	transition: all 0.3s ease;
	white-space: nowrap;
}

/* 颜色价格区域特殊样式 */
.color-price-section {
	gap: 15px;
	transform: translateY(80px) translateX(0);
}

/* 颜色价格区域的伪类元素特殊定位 */
.color-price-section::before {
	content: '';
	position: absolute;
	left: -20px; /* 保持与文字的正常距离 */
	top: 50%;
	transform: translateY(-50%);
	width: 15px;
	height: 2px;
	background: rgba(255, 255, 255, 0.8);
	z-index: 2;
}

.color-price-content {
	display: flex;
	flex-direction: row;
	gap: 20px;
	width: 100%;
	align-items: center;
}

/* 左侧内容样式 */
.section-title {
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 20px;
	color: #DCDCDC;
	position: relative;
}

.section-title::after {
	content: '';
	position: absolute;
	left: -30px;
	top: 50%;
	transform: translateY(-50%);
	width: 2px;
	height: 40px;
	background: #FFFFFF;
}

/* 产品优势 */
.product-advantages {
	background: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(15px);
	border-radius: 15px;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	margin-bottom: 20px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.advantages-content {
	background: rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	padding: 15px;
}

.advantages-text {
	font-size: 12px;
	color: #DCDCDC;
	line-height: 1.6;
	margin-bottom: 15px;
}

.product-intro {
	font-size: 20px;
	color: #DCDCDC;
	font-weight: 600;
	margin-bottom: 10px;
}

.selling-points {
	font-size: 12px;
	color: #DCDCDC;
	line-height: 1.6;
}

/* 对比和设计技术部分 */
.comparison-section,
.design-tech-section {
	background: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(15px);
	border-radius: 15px;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	margin-bottom: 20px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* 颜色和价格部分 */
.color-price-section {
	/* background: rgba(255, 255, 255, 0.15); */
	/* backdrop-filter: blur(15px); */
	border-radius: 15px;
	/* padding: 20px; */
	/* border: 1px solid rgba(255, 255, 255, 0.3); */
	margin-bottom: 20px;
	/* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); */
}

.color-options {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
	width: 100%;
	max-width: 200px;
}

.color-swatch {
	width: 60px;
	height: 25px;
	border-radius: 8px;
	border: 2px solid rgba(255, 255, 255, 0.3);
	cursor: pointer;
	transition: all 0.3s ease;
}

.color-swatch:hover {
	transform: scale(1.1);
	border-color: #3CC8C8;
}

.color-swatch.active {
	border-color: #00d4ff;
	border-width: 3px;
	transform: scale(1.1);
	box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.purchase-btn {
	display: flex;
	align-items: center;
	gap: 10px;
	background: rgba(255, 255, 255, 0.8);
	color: #000000;
	padding: 15px 25px;
	border-radius: 8px;
	cursor: pointer;
	transition: all 0.3s ease;
}

.purchase-btn:hover {
	background: rgba(255, 255, 255, 1);
	transform: translateY(-2px);
}

.price-display {
	font-size: 18px;
	font-weight: bold;
	color: #00d4ff;
	margin-right: 10px;
}

.purchase-text {
	font-size: 14px;
	color: #000000;
}

/* 产品亮点 */
.product-highlights {
	background: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(15px);
	border-radius: 15px;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.highlights-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
}

.highlight-card {
	background: rgba(255, 255, 255, 0.5);
	border-radius: 10px;
	padding: 20px;
	text-align: center;
	transition: all 0.3s ease;
}

.highlight-card:hover {
	background: rgba(255, 255, 255, 0.7);
	transform: translateY(-5px);
}

.highlight-icon {
	font-size: 32px;
	margin-bottom: 15px;
}

.highlight-title {
	font-size: 16px;
	font-weight: 600;
	color: #000000;
	margin-bottom: 10px;
}

.highlight-desc {
	font-size: 12px;
	color: #000000;
	line-height: 1.5;
}

/* 3D产品展示区域 */
.product-3d-showcase {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	perspective: 1000px;
}

.boat-3d-model {
	position: relative;
	width: 650px;
	height: 420px;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: rotateX(5deg) rotateY(-10deg);
	animation: boatFloat 4s ease-in-out infinite;
}

.boat-image {
	width: 100%;
	height: 100%;
	object-fit: contain;
	filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
	transition: all 0.3s ease;
}

.boat-image:hover {
	transform: scale(1.05);
	filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.4));
}

@keyframes boatFloat {

	0%,
	100% {
		transform: rotateX(5deg) rotateY(-10deg) translateY(0px);
	}

	50% {
		transform: rotateX(5deg) rotateY(-10deg) translateY(-10px);
	}
}


.specs-title {
	font-size: 20px;
	font-weight: 400;
	color: #FFFFFF;
	/* margin-bottom: 20px; */
	text-align: left;
}

.spec-group {
	padding: 8px;
}

.spec-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* margin-bottom: 10px; */
	cursor: pointer;
	/* background: rgba(0, 0, 0, 0.3); */
	/* padding: 8px 12px; */
	border-radius: 5px;
}

.spec-category {
	font-size: 14px;
	font-weight: 400;
	color: #FFFFFF;
}

.dropdown-arrow {
	color: #FFFFFF;
	font-size: 12px;
	transition: transform 0.3s ease;
}

.spec-details {
	display: flex;
	flex-direction: column;
	gap: 5px;
}

.spec-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 4px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.spec-row:last-child {
	border-bottom: none;
}

.spec-label {
	font-size: 12px;
	color: #FFFFFF;
	flex: 1;
}

.spec-value {
	font-size: 12px;
	color: #FFFFFF;
	font-weight: 600;
	text-align: right;
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
	.center-section,
	.right-section {
		padding: 20px;
	}

	.highlights-grid {
		grid-template-columns: 1fr;
	}

	.boat-3d-model {
		width: 350px;
		height: 220px;
	}

	.product-specs-panel {
		max-width: 100%;
	}
}
</style>
