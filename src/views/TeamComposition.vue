<template>
	<div class="team-composition">
		<!-- 背景视频 -->
		<div class="video-background">
			<video 
				autoplay 
				muted 
				loop 
				playsinline
				class="background-video"
			>
				<source src="../assets/team_bg.mp4" type="video/mp4">
			</video>
			<div class="video-overlay"></div>
		</div>

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
			<!-- 上半部分 - 水平布局 -->
			<div class="top-section">
				<!-- 左侧内容 - 创始人信息 -->
				<div class="left-section">
					<!-- 创始人标题 -->
					<div class="founder-header">
						<h1 class="founder-title">Founder & CEO</h1>
						<h2 class="founder-name">Kevin</h2>
					</div>

					<!-- 工作经验 -->
					<div class="info-section">
						<div class="section-icon">
							<img src="/src/assets/work.png" alt="Work Experience" class="icon-image" />
						</div>
						<h3 class="section-title">Work Experience</h3>
					</div>

					<!-- 教育背景 -->
					<div class="info-section">
						<div class="section-icon">
							<img src="/src/assets/edu.png" alt="Educational Background" class="icon-image" />
						</div>
						<h3 class="section-title">Educational Background</h3>
					</div>

					<!-- 代表作品 -->
					<div class="info-section">
						<div class="section-icon">
							<img src="/src/assets/video.png" alt="Representative works" class="icon-image" />
						</div>
						<h3 class="section-title">Representative works (Delivered)</h3>
					</div>
				</div>

				<!-- 右侧内容 -->
				<div class="right-section">
					<!-- 上方信息区域 -->
					<div class="top-info">
						<div class="info-item">
							<h3 class="info-title">Who we are?</h3>
						</div>
						<div class="info-item">
							<h3 class="info-title">Investment Highlights</h3>
						</div>
					</div>
				</div>
			</div>

			<!-- 底部团队成员区域 -->
			<div class="bottom-section">
				<div class="team-members-grid">
					<h3 class="members-title">Team Members</h3>
					<div class="members-avatars">
						<div class="member-avatar cfo">
							<div class="avatar-label">CFO</div>
						</div>
						<div class="member-avatar coo">
							<div class="avatar-label">COO</div>
						</div>
						<div class="member-avatar engineer">
							<div class="avatar-label">Engineer</div>
						</div>
						<div class="member-avatar founder">
							<div class="avatar-label">Founder/Engineer</div>
						</div>
						<div class="member-avatar engineer2">
							<div class="avatar-label">Founder/Engineer</div>
						</div>
						<div class="member-avatar strategy">
							<div class="avatar-label">Strategy/Service</div>
						</div>
					</div>
					<div class="team-description">
						<p>Team members gather top talents in the four core fields of ship engineering, intelligent systems, corporate internal control, finance, taxation, and legal affairs.</p>
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
	color: #ffffff;
	font-family: 'Arial', sans-serif;
	position: relative;
	overflow: hidden;
}

/* 背景视频样式 */
.video-background {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -2;
	overflow: hidden;
}

.background-video {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
}

.video-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, rgba(26, 26, 46, 0.7) 0%, rgba(22, 33, 62, 0.6) 50%, rgba(15, 52, 96, 0.8) 100%);
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
	flex-direction: column;
	min-height: 100vh;
	padding-top: 80px;
}

/* 上半部分 - 水平布局 */
.top-section {
	display: flex;
	flex: 1;
	min-height: 60vh;
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
	align-items: flex-start;
	justify-content: center;
}

/* 底部团队成员区域 */
.bottom-section {
	padding: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* min-height: 40vh; */
}

/* 创始人信息样式 */
.founder-header {
	margin-bottom: 60px;
}

.founder-title {
	font-size: 48px;
	font-weight: 300;
	color: #ffffff;
	margin-bottom: 10px;
	line-height: 1.2;
}

.founder-name {
	font-size: 36px;
	font-weight: 400;
	color: #ffffff;
	margin-bottom: 0;
}

.info-section {
	display: flex;
	align-items: center;
	gap: 15px;
	/* margin-bottom: 40px;
	padding: 20px 0; */
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-icon {
	font-size: 24px;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 8px;
}

.icon-image {
	width: 24px;
	height: 24px;
	object-fit: contain;
	filter: brightness(0) invert(1);
}

.section-title {
	font-size: 18px;
	font-weight: 500;
	color: #ffffff;
	margin: 0;
}

/* 右侧内容样式 */
.top-info {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40px;
}

.info-item {
	flex: 1;
	margin: 0 10px;
}

.info-title {
	font-size: 16px;
	font-weight: 500;
	color: #ffffff;
	text-align: right;
	margin: 0;
}

/* 团队成员网格样式 */
.team-members-grid {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 15px;
	padding: 40px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	max-width: 800px;
	width: 100%;
}

.members-title {
	font-size: 24px;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 40px;
	text-align: center;
}

.members-avatars {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 30px;
	margin-bottom: 40px;
	justify-items: center;
	max-width: 600px;
	margin-left: auto;
	margin-right: auto;
}

.member-avatar {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	position: relative;
	border: 3px solid rgba(255, 255, 255, 0.3);
	background-size: cover;
	background-position: center;
	transition: all 0.3s ease;
}

.member-avatar:hover {
	transform: scale(1.1);
	border-color: #00d4ff;
}

.member-avatar.cfo {
	background: linear-gradient(45deg, #ff6b6b, #ee5a24);
}

.member-avatar.coo {
	background: linear-gradient(45deg, #4834d4, #686de0);
}

.member-avatar.engineer {
	background: linear-gradient(45deg, #00d2d3, #01a3a4);
}

.member-avatar.founder {
	background: linear-gradient(45deg, #ff9ff3, #f368e0);
}

.member-avatar.engineer2 {
	background: linear-gradient(45deg, #feca57, #ff9f43);
}

.member-avatar.strategy {
	background: linear-gradient(45deg, #48dbfb, #0abde3);
}

.avatar-label {
	position: absolute;
	bottom: -25px;
	left: 50%;
	transform: translateX(-50%);
	font-size: 10px;
	color: #ffffff;
	text-align: center;
	white-space: nowrap;
	font-weight: 500;
}

.team-description {
	text-align: center;
	color: #cccccc;
	font-size: 14px;
	line-height: 1.6;
	max-width: 400px;
	margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
	.top-section {
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
	
	.bottom-section {
		padding: 20px;
	}
	
	.members-avatars {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 20px;
	}
	
	.founder-title {
		font-size: 36px;
	}
	
	.founder-name {
		font-size: 28px;
	}
}
</style>
