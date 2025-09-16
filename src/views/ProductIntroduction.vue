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
			<!-- 左侧内容 -->
			<div class="left-section">
				<!-- 产品特性 -->
				<div class="product-features">
					<h3 class="product-title">Product Features</h3>
					<div class="features-grid">
						<div class="feature-card">
							<div class="feature-icon">⚡</div>
							<h4 class="feature-name">High Performance</h4>
							<p class="feature-desc">Advanced hydrofoil technology for superior speed and efficiency</p>
						</div>
						<div class="feature-card">
							<div class="feature-icon">🔋</div>
							<h4 class="feature-name">Eco-Friendly</h4>
							<p class="feature-desc">Zero-emission electric propulsion system</p>
						</div>
						<div class="feature-card">
							<div class="feature-icon">📱</div>
							<h4 class="feature-name">Smart Control</h4>
							<p class="feature-desc">Intuitive mobile app for remote monitoring and control</p>
						</div>
						<div class="feature-card">
							<div class="feature-icon">🛡️</div>
							<h4 class="feature-name">Safety First</h4>
							<p class="feature-desc">Advanced safety systems and real-time monitoring</p>
						</div>
					</div>
				</div>

				<!-- 技术规格 -->
				<div class="tech-specs">
					<h3 class="specs-title">Technical Specifications</h3>
					<div class="specs-list">
						<div class="spec-item">
							<span class="spec-label">Max Speed:</span>
							<span class="spec-value">45 knots</span>
						</div>
						<div class="spec-item">
							<span class="spec-label">Range:</span>
							<span class="spec-value">150 nautical miles</span>
						</div>
						<div class="spec-item">
							<span class="spec-label">Capacity:</span>
							<span class="spec-value">8 passengers</span>
						</div>
						<div class="spec-item">
							<span class="spec-label">Battery Life:</span>
							<span class="spec-value">6-8 hours</span>
						</div>
					</div>
				</div>
			</div>

			<!-- 右侧展示区域 -->
			<div class="right-section">
				<div class="product-showcase">
					<h3 class="showcase-title">Product Showcase</h3>
					<div class="product-image">
						<div class="product-3d">
							<div class="boat-outline"></div>
							<div class="boat-details">
								<div class="detail detail-1"></div>
								<div class="detail detail-2"></div>
								<div class="detail detail-3"></div>
							</div>
						</div>
					</div>
					<div class="product-info">
						<h4 class="product-name">Hydrofoil Pro Series</h4>
						<p class="product-tagline">The future of water transportation</p>
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

/* Product Introduction 页面样式 */
.product-features, .tech-specs {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	padding: 30px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	margin-bottom: 30px;
}

.product-title, .specs-title {
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 25px;
	color: #ffffff;
}

.features-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
}

.feature-card {
	padding: 20px;
	background: rgba(0, 212, 255, 0.1);
	border-radius: 15px;
	border: 1px solid rgba(0, 212, 255, 0.3);
	text-align: center;
	transition: all 0.3s ease;
}

.feature-card:hover {
	background: rgba(0, 212, 255, 0.2);
	transform: translateY(-5px);
}

.feature-icon {
	font-size: 32px;
	margin-bottom: 15px;
}

.feature-name {
	font-size: 16px;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 10px;
}

.feature-desc {
	font-size: 14px;
	color: #cccccc;
	line-height: 1.5;
}

.specs-list {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.spec-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.spec-label {
	font-size: 14px;
	color: #cccccc;
}

.spec-value {
	font-size: 16px;
	font-weight: 600;
	color: #00d4ff;
}

.product-showcase {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 30px;
	border: 1px solid rgba(0, 212, 255, 0.3);
	height: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.showcase-title {
	font-size: 20px;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 30px;
}

.product-image {
	width: 100%;
	height: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 30px;
}

.product-3d {
	position: relative;
	width: 200px;
	height: 100px;
}

.boat-outline {
	width: 100%;
	height: 100%;
	background: linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.3) 50%, transparent 70%);
	border-radius: 50px 20px 50px 20px;
	box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
	animation: boatFloat 3s ease-in-out infinite;
}

@keyframes boatFloat {
	0%, 100% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-10px);
	}
}

.boat-details {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.detail {
	position: absolute;
	width: 8px;
	height: 8px;
	background: #00d4ff;
	border-radius: 50%;
	box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
	animation: pulse 2s ease-in-out infinite;
}

.detail-1 {
	top: 20%;
	left: 20%;
	animation-delay: 0s;
}

.detail-2 {
	top: 30%;
	right: 20%;
	animation-delay: 0.5s;
}

.detail-3 {
	bottom: 20%;
	left: 50%;
	animation-delay: 1s;
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

.product-name {
	font-size: 24px;
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 10px;
	text-align: center;
}

.product-tagline {
	font-size: 16px;
	color: #00d4ff;
	text-align: center;
	opacity: 0.8;
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
	
	.features-grid {
		grid-template-columns: 1fr;
	}
}
</style>
