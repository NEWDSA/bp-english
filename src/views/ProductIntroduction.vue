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
				<!-- 产品优势 -->
				<div class="product-advantages">
					<h3 class="section-title">Product advantages</h3>
					<div class="advantages-content">
						<p class="advantages-text">
							Positioned within 5 meters, driving qualification exemption for entertainment powered boats, 
							using hydrofoil and control algorithms to significantly reduce player entry barriers and enhance entertainment experience
						</p>
						<p class="product-intro">Y-H2O Product Introduction</p>
						<p class="selling-points">
							Selling point: 1. No need for a license to drive, low threshold for getting started; 
							2. The purchase cost is equivalent to the price of a motorboat; 3. Intelligentization; 
							4. High safety factor; 5. Low usage cost; 6. Better experience
						</p>
					</div>
				</div>

				<!-- 对比传统渡轮 -->
				<div class="comparison-section">
					<h3 class="section-title">Compared to traditional ferries</h3>
				</div>

				<!-- 设计与仿真技术 -->
				<div class="design-tech-section">
					<h3 class="section-title">Design&Simulation Technology</h3>
				</div>

				<!-- 颜色和价格 -->
				<div class="color-price-section">
					<h3 class="section-title">Color and Price</h3>
					<div class="color-options">
						<div class="color-swatch" style="background: #FFFFFF;"></div>
						<div class="color-swatch" style="background: #3CC8C8;"></div>
						<div class="color-swatch" style="background: #9B59B6;"></div>
						<div class="color-swatch" style="background: #E74C3C;"></div>
						<div class="color-swatch" style="background: #3498DB;"></div>
						<div class="color-swatch" style="background: #34495E;"></div>
					</div>
					<div class="purchase-btn">
						<div class="price-icon">¥</div>
						<span>Please click here to contact us for purchase</span>
					</div>
				</div>

				<!-- 产品亮点 -->
				<div class="product-highlights">
					<h3 class="section-title">Product Highlights</h3>
					<div class="highlights-grid">
						<div class="highlight-card">
							<div class="highlight-icon">🚢</div>
							<h4 class="highlight-title">Unmanned Systems</h4>
							<p class="highlight-desc">The third mock examination switching+sliding rail expansion<br>Electromagnetic locking structure, spring damping indicating limit</p>
						</div>
						<div class="highlight-card">
							<div class="highlight-icon">👥</div>
							<h4 class="highlight-title">Team Members</h4>
							<p class="highlight-desc">U/C-shaped wing design: The front wing (U-shaped) and rear wing (C-shaped) feature streamlined surfaces optimized for fluid dynamics<br>Resistance quick assembly system: Reduced transportation volume, with on-site assembly efficiency increased by 50%</p>
						</div>
						<div class="highlight-card">
							<div class="highlight-icon">🤖</div>
							<h4 class="highlight-title">Adaptive hydrofoil control algorithm</h4>
							<p class="highlight-desc">AI adaptive algorithm<br>Multi sensor fusion: integrating radar, vision, and positioning systems to achieve obstacle avoidance and navigation monitoring</p>
						</div>
						<div class="highlight-card">
							<div class="highlight-icon">🔧</div>
							<h4 class="highlight-title">Modular detachable hull</h4>
							<p class="highlight-desc">Embedded locking design: The hydrofoil and hull are seamlessly integrated through assembly/connection frames to ensure structural strength; Quick disassembly interface: Standardized positioning and installation holes, supporting hydrofoil replacement or storage within 10 minutes</p>
						</div>
					</div>
				</div>
			</div>

			<!-- 中间3D产品展示区域 -->
			<div class="center-section">
				<div class="product-3d-showcase">
					<div class="boat-3d-model">
						<!-- 3D船体模型 -->
						<div class="boat-hull">
							<div class="boat-seats">
								<div class="seat seat-1"></div>
								<div class="seat seat-2"></div>
								<div class="seat seat-3"></div>
							</div>
							<div class="boat-bow-light"></div>
						</div>
						<div class="hydrofoils">
							<div class="hydrofoil front"></div>
							<div class="hydrofoil rear"></div>
						</div>
					</div>
				</div>
			</div>

			<!-- 右侧产品规格区域 -->
			<div class="right-section">
				<div class="product-specs-panel">
					<h3 class="specs-title">Ship name: YU</h3>
					
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
							<h4 class="spec-category">Power, speed, and range:</h4>
							<div class="dropdown-arrow">▼</div>
						</div>
						<div class="spec-details">
							<div class="spec-row">
								<span class="spec-label">Cruising speed</span>
								<span class="spec-value">15/30 sections (kt)</span>
							</div>
							<div class="spec-row">
								<span class="spec-label">Maximum speed</span>
								<span class="spec-value">18/33 sections (kt)</span>
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
	background: #233439;
	color: #ffffff;
	font-family: 'Arial', sans-serif;
	position: relative;
	overflow: hidden;
}

/* 海洋背景 */
.product-introduction::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: url('https://image-resource.mastergo.com/158461235620048/158461235620054/8885c4e0bc747601bbffb1820ad9772c.png') center/cover;
	opacity: 0.5;
	z-index: -1;
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
	gap: 20px;
}

.left-section {
	flex: 1;
	padding: 40px;
	display: flex;
	flex-direction: column;
	gap: 30px;
}

.center-section {
	flex: 1.5;
	padding: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.right-section {
	flex: 1;
	padding: 40px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
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
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	padding: 30px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	margin-bottom: 30px;
}

.advantages-content {
	background: rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	padding: 20px;
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
.comparison-section, .design-tech-section {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	padding: 30px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	margin-bottom: 30px;
}

/* 颜色和价格部分 */
.color-price-section {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	padding: 30px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	margin-bottom: 30px;
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
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	padding: 30px;
	border: 1px solid rgba(255, 255, 255, 0.2);
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
	height: 200px;
	transform: rotateX(10deg) rotateY(-15deg);
	animation: boatFloat 4s ease-in-out infinite;
}

.boat-hull {
	position: relative;
	width: 100%;
	height: 80px;
	background: linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A0A0A0 100%);
	border-radius: 40px 20px 40px 20px;
	box-shadow: 
		0 10px 30px rgba(0, 0, 0, 0.3),
		inset 0 2px 10px rgba(255, 255, 255, 0.3);
}

.boat-seats {
	position: absolute;
	top: 15px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 15px;
}

.seat {
	width: 25px;
	height: 20px;
	background: linear-gradient(135deg, #FF9A4E 0%, #FF7A2E 100%);
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.boat-bow-light {
	position: absolute;
	top: 20px;
	left: 20px;
	width: 15px;
	height: 8px;
	background: linear-gradient(90deg, #3FF4FF 0%, #00D4FF 100%);
	border-radius: 50%;
	box-shadow: 0 0 20px rgba(63, 244, 255, 0.8);
	animation: lightPulse 2s ease-in-out infinite;
}

.hydrofoils {
	position: absolute;
	top: 60px;
	left: 0;
	width: 100%;
	height: 40px;
}

.hydrofoil {
	position: absolute;
	width: 60px;
	height: 8px;
	background: linear-gradient(90deg, #3CC8C8 0%, #2A9D9D 100%);
	border-radius: 4px;
	box-shadow: 0 2px 10px rgba(60, 200, 200, 0.3);
}

.hydrofoil.front {
	left: 50px;
	top: 10px;
	transform: rotate(-5deg);
}

.hydrofoil.rear {
	right: 50px;
	top: 20px;
	transform: rotate(5deg);
}

@keyframes boatFloat {
	0%, 100% {
		transform: rotateX(10deg) rotateY(-15deg) translateY(0px);
	}
	50% {
		transform: rotateX(10deg) rotateY(-15deg) translateY(-15px);
	}
}

@keyframes lightPulse {
	0%, 100% {
		box-shadow: 0 0 20px rgba(63, 244, 255, 0.8);
	}
	50% {
		box-shadow: 0 0 30px rgba(63, 244, 255, 1);
	}
}

/* 右侧产品规格面板 */
.product-specs-panel {
	background: rgba(100, 100, 100, 0.3);
	backdrop-filter: blur(15px);
	border-radius: 10px;
	padding: 30px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	width: 100%;
	max-width: 400px;
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
	
	.left-section, .center-section, .right-section {
		padding: 20px;
	}
	
	.highlights-grid {
		grid-template-columns: 1fr;
	}
	
	.boat-3d-model {
		width: 300px;
		height: 150px;
	}
	
	.product-specs-panel {
		max-width: 100%;
	}
}
</style>

