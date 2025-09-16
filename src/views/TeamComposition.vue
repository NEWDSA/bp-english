<template>
	<div class="team-composition">
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
				<div class="nav-item active">Team Composition</div>
				<div class="nav-divider"></div>
				<router-link to="/product-introduction" class="nav-item">Product Introduction</router-link>
			</div>
		</nav>

		<!-- 主要内容区域 -->
		<div class="main-content">
			<!-- 左侧内容 -->
			<div class="left-section">
				<!-- 团队结构 -->
				<div class="team-structure">
					<h3 class="team-title">Team Structure</h3>
					<div class="team-grid">
						<div class="team-member">
							<div class="member-avatar"></div>
							<div class="member-info">
								<h4 class="member-name">CEO & Founder</h4>
								<p class="member-role">Strategic Leadership</p>
							</div>
						</div>
						<div class="team-member">
							<div class="member-avatar"></div>
							<div class="member-info">
								<h4 class="member-name">CTO</h4>
								<p class="member-role">Technology Innovation</p>
							</div>
						</div>
						<div class="team-member">
							<div class="member-avatar"></div>
							<div class="member-info">
								<h4 class="member-name">COO</h4>
								<p class="member-role">Operations Management</p>
							</div>
						</div>
						<div class="team-member">
							<div class="member-avatar"></div>
							<div class="member-info">
								<h4 class="member-name">CFO</h4>
								<p class="member-role">Financial Strategy</p>
							</div>
						</div>
					</div>
				</div>

				<!-- 核心能力 -->
				<div class="capabilities-card">
					<h3 class="capabilities-title">Core Capabilities</h3>
					<div class="capabilities-list">
						<div class="capability-item">
							<div class="capability-icon">🚀</div>
							<div class="capability-text">Innovation & R&D</div>
						</div>
						<div class="capability-item">
							<div class="capability-icon">⚙️</div>
							<div class="capability-text">Engineering Excellence</div>
						</div>
						<div class="capability-item">
							<div class="capability-icon">🌊</div>
							<div class="capability-text">Marine Technology</div>
						</div>
						<div class="capability-item">
							<div class="capability-icon">📊</div>
							<div class="capability-text">Data Analytics</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 右侧图表区域 -->
			<div class="right-section">
				<div class="team-chart">
					<h3 class="chart-title">Team Experience</h3>
					<div class="experience-bars">
						<div class="exp-bar">
							<div class="exp-label">Marine Engineering</div>
							<div class="exp-progress">
								<div class="exp-fill" style="width: 90%"></div>
							</div>
							<div class="exp-value">90%</div>
						</div>
						<div class="exp-bar">
							<div class="exp-label">Technology Development</div>
							<div class="exp-progress">
								<div class="exp-fill" style="width: 85%"></div>
							</div>
							<div class="exp-value">85%</div>
						</div>
						<div class="exp-bar">
							<div class="exp-label">Business Strategy</div>
							<div class="exp-progress">
								<div class="exp-fill" style="width: 80%"></div>
							</div>
							<div class="exp-value">80%</div>
						</div>
						<div class="exp-bar">
							<div class="exp-label">Market Operations</div>
							<div class="exp-progress">
								<div class="exp-fill" style="width: 75%"></div>
							</div>
							<div class="exp-value">75%</div>
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
.team-composition {
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

/* Team Composition 页面样式 */
.team-structure, .capabilities-card {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 15px;
	padding: 30px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	margin-bottom: 30px;
}

.team-title, .capabilities-title {
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 25px;
	color: #ffffff;
}

.team-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
}

.team-member {
	display: flex;
	align-items: center;
	gap: 15px;
	padding: 15px;
	background: rgba(0, 212, 255, 0.1);
	border-radius: 10px;
	border: 1px solid rgba(0, 212, 255, 0.3);
	transition: all 0.3s ease;
}

.team-member:hover {
	background: rgba(0, 212, 255, 0.2);
	transform: translateY(-2px);
}

.member-avatar {
	width: 50px;
	height: 50px;
	background: linear-gradient(45deg, #00d4ff, #0099cc);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	color: #ffffff;
}

.member-name {
	font-size: 16px;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 5px;
}

.member-role {
	font-size: 14px;
	color: #cccccc;
}

.capabilities-list {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 15px;
}

.capability-item {
	display: flex;
	align-items: center;
	gap: 15px;
	padding: 15px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;
}

.capability-item:hover {
	background: rgba(0, 212, 255, 0.1);
	transform: translateX(5px);
}

.capability-icon {
	font-size: 24px;
}

.capability-text {
	font-size: 14px;
	color: #ffffff;
	font-weight: 500;
}

.team-chart {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 30px;
	border: 1px solid rgba(0, 212, 255, 0.3);
	height: 500px;
}

.chart-title {
	font-size: 20px;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 30px;
}

.experience-bars {
	display: flex;
	flex-direction: column;
	gap: 20px;
	height: calc(100% - 60px);
}

.exp-bar {
	display: flex;
	align-items: center;
	gap: 15px;
}

.exp-label {
	font-size: 14px;
	color: #ffffff;
	width: 120px;
	flex-shrink: 0;
}

.exp-progress {
	flex: 1;
	height: 8px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
	overflow: hidden;
}

.exp-fill {
	height: 100%;
	background: linear-gradient(90deg, #00d4ff, #0099cc);
	border-radius: 4px;
	transition: width 1s ease;
}

.exp-value {
	font-size: 14px;
	font-weight: 600;
	color: #00d4ff;
	width: 40px;
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
	
	.left-section, .right-section {
		padding: 20px;
	}
	
	.team-grid {
		grid-template-columns: 1fr;
	}
	
	.capabilities-list {
		grid-template-columns: 1fr;
	}
}
</style>
