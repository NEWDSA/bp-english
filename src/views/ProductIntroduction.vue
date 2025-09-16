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

			</div>

			<!-- 中间3D产品展示区域 -->
			<div class="center-section">
				<div class="product-3d-showcase">
					<div class="boat-3d-model">
						<!-- 3D船体模型 -->
						<img src="../assets/white_bot.png" alt="YU Hydrofoil Boat" class="boat-image" />
					</div>
				</div>
			</div>

			<!-- 右侧产品规格区域 -->
			<div class="right-section">
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
	height: calc(100vh - 80px);
	padding-top: 80px;
	gap: 20px;
	position: relative;
	z-index: 1;
	overflow: hidden;
}

.left-section {
	flex: 1;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	overflow-y: auto;
}

.center-section {
	flex: 1.5;
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.right-section {
	flex: 1;
	padding: 20px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	overflow-y: auto;
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
	background: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(15px);
	border-radius: 15px;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	margin-bottom: 20px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.color-options {
	display: flex;
	gap: 10px;
	margin-bottom: 20px;
}

.color-swatch {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	border: 2px solid rgba(255, 255, 255, 0.3);
	cursor: pointer;
	transition: all 0.3s ease;
}

.color-swatch:hover {
	transform: scale(1.1);
	border-color: #3CC8C8;
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

.price-icon {
	font-size: 20px;
	font-weight: bold;
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
	width: 400px;
	height: 250px;
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

/* 右侧产品规格面板 */
.product-specs-panel {
	background: rgba(100, 100, 100, 0.4);
	backdrop-filter: blur(20px);
	border-radius: 10px;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	width: 100%;
	max-width: 400px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.specs-title {
	font-size: 24px;
	font-weight: 700;
	color: #FFFFFF;
	margin-bottom: 30px;
	text-align: center;
}

.spec-group {
	margin-bottom: 30px;
}

.spec-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
	cursor: pointer;
}

.spec-category {
	font-size: 20px;
	font-weight: 600;
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
	gap: 10px;
}

.spec-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
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
		width: 300px;
		height: 180px;
	}

	.product-specs-panel {
		max-width: 100%;
	}
}
</style>
