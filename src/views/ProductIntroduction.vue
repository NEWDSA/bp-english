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
								<div class="color-swatch white" @click="changeBoatColor('white')" :class="{ active: selectedColor === 'white' }" :style="{ backgroundImage: `url(${colorBackgrounds.white})` }"></div>
								<div class="color-swatch green" @click="changeBoatColor('green')" :class="{ active: selectedColor === 'green' }" :style="{ backgroundImage: `url(${colorBackgrounds.green})` }"></div>
								<div class="color-swatch blue" @click="changeBoatColor('blue')" :class="{ active: selectedColor === 'blue' }" :style="{ backgroundImage: `url(${colorBackgrounds.blue})` }"></div>
								<div class="color-swatch purple" @click="changeBoatColor('purple')" :class="{ active: selectedColor === 'purple' }" :style="{ backgroundImage: `url(${colorBackgrounds.purple})` }"></div>
								<div class="color-swatch red" @click="changeBoatColor('red')" :class="{ active: selectedColor === 'red' }" :style="{ backgroundImage: `url(${colorBackgrounds.red})` }"></div>
								<div class="color-swatch black" @click="changeBoatColor('black')" :class="{ active: selectedColor === 'black' }" :style="{ backgroundImage: `url(${colorBackgrounds.black})` }"></div>
							</div>
							<div class="purchase-btn">
								<img :src="priceImg" alt="Price" class="price-icon" />
								<span class="purchase-text">Please click here to contact us for purchase</span>
							</div>
						</div>
					</div>
					<div class="left-nav-item product-highlights-section">
						<span class="nav-text">Product Highlights</span>
						<!-- 产品亮点卡片 -->
						<div class="highlights-content">
							<div class="highlights-grid">
								<div class="highlight-card unmanned-systems" @mouseenter="showTooltip('unmanned')" @mouseleave="hideTooltip">
									<div v-if="activeTooltip !== 'unmanned'">
										<img :src="wheel1Img" alt="Unmanned Systems" class="highlight-icon" />
										<div class="highlight-title">Unmanned Systems</div>
									</div>
									<!-- 悬停时显示的详细信息 -->
									<div v-if="activeTooltip === 'unmanned'" class="card-content">
										<p>The third mock examination switching</p>
										<p>+ lifting rail expansion</p>
										<p>Electromagnetic locking structure spring</p>
										<p>damping increasing limit</p>
									</div>
								</div>
								<div class="highlight-card">
									<img :src="wheel2Img" alt="Team Members" class="highlight-icon" />
									<div class="highlight-title">Team Members</div>
									<!-- <div class="highlight-desc">Expert engineering and design team</div> -->
								</div>
								<div class="highlight-card">
									<img :src="wheel1Img" alt="Adaptive hydrofoil" class="highlight-icon" />
									<div class="highlight-title">Adaptive hydrofoil control algorithm</div>
								</div>
								<div class="highlight-card">
									<img :src="wheel2Img" alt="Modular detachable hull" class="highlight-icon" />
									<div class="highlight-title">Modular detachable hull</div>
									<!-- <div class="highlight-desc">Easy maintenance and upgrade design</div> -->
								</div>
							</div>
						</div>
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
// 导入船只图片资源
import whiteBoatImg from '../assets/white_boat.png'
import greenBoatImg from '../assets/green_boat.png'
import blueBoatImg from '../assets/blue_boat.png'
import purpleBoatImg from '../assets/purple_boat.png'
import redBoatImg from '../assets/red_boat.png'
import blackBoatImg from '../assets/black_boat.png'

// 导入颜色背景图片资源
import whiteBdImg from '../assets/white_bd.png'
import greenBdImg from '../assets/green_bd.png'
import blueBdImg from '../assets/blue_bd.png'
import purpleBdImg from '../assets/purple_bd.png'
import redBdImg from '../assets/red_bd.png'
import blackBdImg from '../assets/black_bd.png'

// 导入价格图标
import priceImg from '../assets/price.png'

// 导入产品亮点图标
import wheel1Img from '../assets/wheel1.png'
import wheel2Img from '../assets/wheel2.png'

const router = useRouter()

// 颜色选择状态
const selectedColor = ref('white')

// 悬停提示状态
const activeTooltip = ref(null)

// 船只图片映射
const boatImages = {
	'white': whiteBoatImg,
	'green': greenBoatImg,
	'blue': blueBoatImg,
	'purple': purpleBoatImg,
	'red': redBoatImg,
	'black': blackBoatImg
}

// 颜色背景图片映射
const colorBackgrounds = {
	'white': whiteBdImg,
	'green': greenBdImg,
	'blue': blueBdImg,
	'purple': purpleBdImg,
	'red': redBdImg,
	'black': blackBdImg
}

// 计算当前船只图片
const currentBoatImage = computed(() => {
	console.log('当前选择的颜色:', selectedColor.value)
	console.log('对应的图片:', boatImages[selectedColor.value])
	return boatImages[selectedColor.value] || boatImages['white']
})

// 切换船只颜色
function changeBoatColor(color) {
	console.log('点击了颜色:', color)
	selectedColor.value = color
	console.log('selectedColor更新为:', selectedColor.value)
	console.log('currentBoatImage应该是:', currentBoatImage.value)
}

// 显示悬停提示
function showTooltip(type) {
	activeTooltip.value = type
}

// 隐藏悬停提示
function hideTooltip() {
	activeTooltip.value = null
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
	left: 100px;
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
	right: 100px;
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
	z-index: 9999;
}

.left-nav-list::before {
	content: '';
	position: absolute;
	left: 0;
	top: 30px;
	bottom: -42px;
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

/* 产品亮点区域特殊样式 */
.product-highlights-section {
	flex-direction: column;
	align-items: flex-start;
	gap: 15px;
	position: relative;
	transform: translateY(70px);
}

.highlights-content {
	position: absolute;
	left: 200px;
	top: -10px;
	z-index: 50;
}

.highlights-grid {
	display: flex;
	flex-direction: row;
	gap: 8px;
	flex-wrap: nowrap;
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
	margin-left: 80px;
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
	max-width: 260px;
	position: relative;
	z-index: 100;
}

.color-swatch {
	width: 80px;
	height: 25px;
	border-radius: 8px;
	border: 2px solid rgba(255, 255, 255, 0.3);
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	z-index: 101;
	pointer-events: auto;
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
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
	margin-left: 80px;
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

.price-icon {
	width: 20px;
	height: 20px;
	object-fit: contain;
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


.highlight-card {
	background: rgba(255, 255, 255, 0.8);
	border-radius: 15px;
	padding: 15px;
	text-align: center;
	transition: all 0.3s ease;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	flex-shrink: 0;
	/* min-width: 200px; */
}

.highlight-card:hover {
	background: rgba(255, 255, 255, 0.7);
	transform: translateY(-5px);
}

.highlight-icon {
	width: 180px;
	height: 90px;
	/* margin-bottom: 12px; */
	object-fit: cover;
}

.highlight-title {
	font-size: 11px;
	font-weight: 600;
	color: #000000;
	margin-bottom: 3px;
	text-align: center;
	line-height: 1.2;
}

.highlight-desc {
	font-size: 9px;
	color: #666666;
	line-height: 1.3;
	text-align: center;
}

/* 卡片内容样式 */
.card-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	height: 100%;
	padding: 8px;
	animation: fadeInUp 0.3s ease-out;
}

.card-content p {
	margin: 0;
	padding: 2px 0;
	font-size: 11px;
	color: #333333;
	line-height: 1.4;
	text-align: left;
	width: 100%;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
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
