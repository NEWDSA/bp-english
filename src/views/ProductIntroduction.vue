<template>
	<div class="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative">
		<!-- 顶部导航栏 -->
		<nav class="flex-shrink-0  top-nav">
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

		<!-- 背景视频 -->
		<video
			class="absolute inset-0 w-full h-full object-cover"
			src="../assets/video/video-1.mp4"
			autoplay
			muted
			loop
			playsinline
		></video>

		<!-- 右侧产品规格区域 -->
		<div class="right-section">
			<div class="product-specs-panel">
				<!-- <h3 class="specs-title">Ship name: YU</h3> -->
				<div class="ship-name-header">
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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

// 导航到首页
const goHome = () => {
	router.push('/')
}

</script>

<style scoped>
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
	/* background: rgba(0, 212, 255, 0.2);
	transform: scale(1.1); */
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


/* 弹窗样式.start */
/* 右侧区域：传统船数据 */
.right-section {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 15px;
	box-shadow: 0 0 10px #646464;
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
	width: 409px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	padding-left: 29px;
}
/* 船舶名称头部样式 */
.ship-name-header {
	width: 409px;
	height: 58px;
	background: #646464;
	border-radius: 10px 10px 10px 10px;
	/* opacity: 0.5; */
	/* text-align: left; */
	display: flex;
	align-items: center;
	/* justify-content: center; */
	margin-left: -29px;
}
/* 船舶名称头部样式 */
.ship-name-header {
	width: 409px;
	height: 58px;
	background: #646464;
	border-radius: 10px 10px 10px 10px;
	/* opacity: 0.5; */
	/* text-align: left; */
	display: flex;
	align-items: center;
	/* justify-content: center; */
	margin-left: -29px;
}
.specs-title {
	font-size: 24px;
	font-weight: 300;
	color: #FFFFFF;
	margin-left: 29px;
	line-height: 20px;
	font-style: normal;
	text-transform: none;
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
/* 弹窗样式.end */
</style>
