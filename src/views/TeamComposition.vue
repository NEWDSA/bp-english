<template>
	<div class="team-composition">
		<!-- 背景视频/图片 -->
		<div class="video-background">
			<video v-if="!isCeoBackground && !isCfoBackground && !isCooBackground && !isEngineerBackground && !isInteractionEngineerBackground && !isStructuralEngineerBackground && !isStrategicPlannerBackground" autoplay muted loop playsinline class="background-video">
				<source src="../assets/team_bg.mp4" type="video/mp4">
			</video>
			<img v-if="isCeoBackground" src="../assets/ceo_bg.png" alt="CEO Background" class="background-image">
			<img v-if="isCfoBackground" src="../assets/cfo_bg.png" alt="CFO Background" class="background-image">
			<img v-if="isCooBackground" src="../assets/coo_bg.png" alt="COO Background" class="background-image">
			<img v-if="isEngineerBackground" src="../assets/engineer_bg.png" alt="Engineer Background" class="background-image">
			<img v-if="isInteractionEngineerBackground" src="../assets/interactionEngineer_bg.png" alt="Interaction Engineer Background" class="background-image">
			<img v-if="isStructuralEngineerBackground" src="../assets/structuralEngineer_bg.png" alt="Structural Engineer Background" class="background-image">
			<img v-if="isStrategicPlannerBackground" src="../assets/strategicPlanner_bg.png" alt="Strategic Planner Background" class="background-image">
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
        <div class="main-content" :class="{ panelsOpen: hasAnyPanelOpen }">
			<!-- 上半部分 - 水平布局 -->
			<div class="top-section">
				<!-- 左侧内容 - 创始人信息 -->
				<div class="left-section">
					<!-- 创始人标题 -->
					<div v-if="hasActiveMember" class="founder-header">
						<h1 class="founder-title">{{ getCurrentMemberTitle() }}</h1>
						<h2 class="founder-name">{{ getCurrentMemberName() }}</h2>
					</div>

					<!-- 工作经验（点击展开） -->
					<div v-if="hasActiveMember" class="info-section" :class="{ active: expanded.work }" @click="togglePanel('work')">
						<div class="section-icon">
							<img src="/src/assets/work.png" alt="Work Experience" class="icon-image" />
						</div>
						<h3 class="section-title">Work Experience</h3>
					</div>
					<div v-if="hasActiveMember" class="expand-panel" :class="{ open: expanded.work }">
						<p class="expand-text">{{ memberContent.work }}</p>
					</div>

					<!-- 教育背景（点击展开） -->
					<div v-if="hasActiveMember" class="info-section" :class="{ active: expanded.education }" @click="togglePanel('education')">
						<div class="section-icon">
							<img src="/src/assets/edu.png" alt="Educational Background" class="icon-image" />
						</div>
						<h3 class="section-title">Educational Background</h3>
					</div>
					<div v-if="hasActiveMember" class="expand-panel" :class="{ open: expanded.education }">
						<p class="expand-text">{{ memberContent.education }}</p>
					</div>

					<!-- 代表作品（点击展开） -->
					<div v-if="hasActiveMember" class="info-section" :class="{ active: expanded.works }" @click="togglePanel('works')">
						<div class="section-icon">
							<img src="/src/assets/video.png" alt="Representative works" class="icon-image" />
						</div>
						<h3 class="section-title">Representative works (Delivered)</h3>
					</div>
					<div v-if="hasActiveMember" class="expand-panel" :class="{ open: expanded.works }">
						<div class="works-grid">
							<div v-for="(img, idx) in memberContent.worksImages" :key="idx" class="work-card">
								<img :src="img" alt="work" />
							</div>
						</div>
					</div>
				</div>

				<!-- 右侧内容 -->
				<div class="right-section">
					<!-- 上方信息区域 -->
					<div class="top-info">
						<div class="info-item">
							<div class="info-frame">
								<h3 class="info-title">Who we are?</h3>
							</div>
						</div>
						<div class="info-item">
							<div class="info-frame">
								<h3 class="info-title">Investment Highlights</h3>
							</div>
						</div>
					</div>
				</div>
			</div>

            <!-- 底部团队成员区域 -->
            <div class="bottom-section" :class="{ collapsed: hasAnyPanelOpen }">
				<div v-if="!hasAnyPanelOpen" class="team-members-grid">
					<!-- Team Members -->
					<div class="team-members-title">Team Members</div>
					<!-- CEO -->
					<div class="member-card" @click="toggleCeoBackground">
						<div class="member-role">CEO</div>
						<img class="member-avatar" src="../assets/ceo.png" alt="CEO" />
					</div>
					<div class="member-card" @click="toggleCfoBackground">
						<div class="member-role">CFO</div>
						<img class="member-avatar" src="../assets/cfo.png" alt="CFO" />
					</div>
					<div class="member-card" @click="toggleCooBackground">
						<div class="member-role">COO</div>
						<img class="member-avatar" src="../assets/coo.png" alt="COO" />
					</div>
					<div class="member-card" @click="toggleEngineerBackground">
						<div class="member-role">Engineer</div>
						<img class="member-avatar" src="../assets/engineer.png" alt="Engineer" />
					</div>
					<div class="member-card" @click="toggleInteractionEngineerBackground">
						<div class="member-role">Interaction Engineer</div>
						<img class="member-avatar" src="../assets/interactionEngineer.png" alt="Interaction Engineer" />
					</div>
					<div class="member-card" @click="toggleStructuralEngineerBackground">
						<div class="member-role">Structural Engineer</div>
						<img class="member-avatar" src="../assets/structuralEnginner.png" alt="Structural Engineer" />
					</div>
					<div class="member-card" @click="toggleStrategicPlannerBackground">
						<div class="member-role">Strategic Planner</div>
						<img class="member-avatar" src="../assets/strategicPlanner.png" alt="Strategic Planner" />
					</div>
					<div style="width: 200px;">Team members gather top talents in the four core fields of ship
						engineering, intelligent systems, corporate internal control, finance, taxation, and legal
						affairs.</div>
				</div>
				<!-- 折叠时显示的恢复入口 -->
				<div v-else class="team-toggle" @click="closeAllPanels">Team Members</div>

			</div>
		</div>

	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCeoBackground = ref(false)
const isCfoBackground = ref(false)
const isCooBackground = ref(false)
const isEngineerBackground = ref(false)
const isInteractionEngineerBackground = ref(false)
const isStructuralEngineerBackground = ref(false)
const isStrategicPlannerBackground = ref(false)

// 展开面板状态
const expanded = ref({ work: false, education: false, works: false })

// 当前成员内容
const memberContent = ref({ work: '', education: '', worksImages: [] })

const hasAnyPanelOpen = computed(() => expanded.value.work || expanded.value.education || expanded.value.works)

// 计算是否有活跃的成员被选中
const hasActiveMember = computed(() => {
	return isCeoBackground.value || isCfoBackground.value || isCooBackground.value || 
		   isEngineerBackground.value || isInteractionEngineerBackground.value || 
		   isStructuralEngineerBackground.value || isStrategicPlannerBackground.value
})

function goHome() {
	router.push('/')
}


function togglePanel(type) {
    // 单选：展开一个，其它关闭
    expanded.value.work = false
    expanded.value.education = false
    expanded.value.works = false
    expanded.value[type] = true
}

function closeAllPanels() {
    expanded.value.work = false
    expanded.value.education = false
    expanded.value.works = false
}

// 获取当前成员信息的方法
function getCurrentMemberTitle() {
	if (!hasActiveMember.value) {
		return 'Our Team'
	}
	const currentMember = getCurrentActiveMember()
	const titles = {
		ceo: 'Founder & CEO',
		cfo: 'CFO',
		coo: 'COO',
		engineer: 'Engineer',
		interactionEngineer: 'Interaction Engineer',
		structuralEngineer: 'Structural Engineer',
		strategicPlanner: 'Strategic Planner'
	}
	return titles[currentMember] || 'Team Member'
}

function getCurrentMemberName() {
	if (!hasActiveMember.value) {
		return 'Click on any team member to learn more'
	}
	const currentMember = getCurrentActiveMember()
	const names = {
		ceo: 'Kevin',
		cfo: 'Liang Gong',
		coo: 'David',
		engineer: 'Ben',
		interactionEngineer: 'Mike',
		structuralEngineer: 'Tom',
		strategicPlanner: 'John'
	}
	return names[currentMember] || 'Team Member'
}

function getCurrentActiveMember() {
	if (isCeoBackground.value) return 'ceo'
	if (isCfoBackground.value) return 'cfo'
	if (isCooBackground.value) return 'coo'
	if (isEngineerBackground.value) return 'engineer'
	if (isInteractionEngineerBackground.value) return 'interactionEngineer'
	if (isStructuralEngineerBackground.value) return 'structuralEngineer'
	if (isStrategicPlannerBackground.value) return 'strategicPlanner'
	return null // 没有活跃成员时返回null
}


function toggleCeoBackground() {
	isCeoBackground.value = !isCeoBackground.value
    syncMemberContent()
	// 关闭其他所有背景
	isCfoBackground.value = false
	isCooBackground.value = false
	isEngineerBackground.value = false
	isInteractionEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
}

function toggleCfoBackground() {
	isCfoBackground.value = !isCfoBackground.value
    syncMemberContent()
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCooBackground.value = false
	isEngineerBackground.value = false
	isInteractionEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
}

function toggleCooBackground() {
	isCooBackground.value = !isCooBackground.value
    syncMemberContent()
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCfoBackground.value = false
	isEngineerBackground.value = false
	isInteractionEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
}

function toggleEngineerBackground() {
	isEngineerBackground.value = !isEngineerBackground.value
    syncMemberContent()
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCfoBackground.value = false
	isCooBackground.value = false
	isInteractionEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
}

function toggleInteractionEngineerBackground() {
	isInteractionEngineerBackground.value = !isInteractionEngineerBackground.value
    syncMemberContent()
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCfoBackground.value = false
	isCooBackground.value = false
	isEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
}

function toggleStructuralEngineerBackground() {
	isStructuralEngineerBackground.value = !isStructuralEngineerBackground.value
    syncMemberContent()
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCfoBackground.value = false
	isCooBackground.value = false
	isEngineerBackground.value = false
	isInteractionEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
}

function toggleStrategicPlannerBackground() {
	isStrategicPlannerBackground.value = !isStrategicPlannerBackground.value
    syncMemberContent()
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCfoBackground.value = false
	isCooBackground.value = false
	isEngineerBackground.value = false
	isInteractionEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
}

function syncMemberContent() {
    const key = getCurrentActiveMember()
    // 简单示例数据，可替换为真实内容
    const dataMap = {
        ceo: {
            work: '• 10+ years ship design\n• Ferrari Group QC & After-sales\n• China Academy of Art - Industrial Design Teacher',
            education: '• BFA CAA\n• Joint Master: Genoa/Milan Poly - Ship & Yacht\n• PhD UNIKL - Ship & Ocean',
            worksImages: [
                '/src/assets/Delivered.png'
            ]
        },
        cfo: {
            work: '• Founding Partner of Micro Light Investment\n• Tax laws, investment and financing expert\n• Financial strategy and risk management\n• Oversees all financial operations and compliance',
            education: '• Master of Law, China University of Political Science and Law\n• Master of Finance from Stanford University',
            worksImages: ['/src/assets/Delivered.png']
        },
        coo: { 
            work: '• Operations leadership and management\n• Business process optimization\n• Strategic planning and execution\n• Team coordination and development', 
            education: '• MBA in Operations Management\n• Bachelor in Business Administration', 
            worksImages: ['/src/assets/Delivered.png'] 
        },
        engineer: { 
            work: '• Performance testing and optimization\n• CNC structural engineering\n• Software and hardware embedded systems\n• Material research and innovation', 
            education: '• Bachelor of Engineering in Mechanical Engineering\n• Master of Science in Materials Science\n• Advanced certifications in CNC programming', 
            worksImages: ['/src/assets/Delivered.png'] 
        },
        interactionEngineer: { 
            work: '• User interaction systems design\n• UI/UX development\n• Human-computer interaction optimization\n• Interface design and testing', 
            education: '• Master in Human-Computer Interaction\n• Bachelor in Computer Science\n• UX Design certifications', 
            worksImages: ['/src/assets/Delivered.png'] 
        },
        structuralEngineer: { 
            work: '• Structural analysis and design\n• Engineering calculations and modeling\n• Safety assessment and compliance\n• Construction oversight', 
            education: '• Master in Civil Engineering\n• Bachelor in Structural Engineering\n• Professional Engineering License', 
            worksImages: ['/src/assets/Delivered.png'] 
        },
        strategicPlanner: { 
            work: '• Strategic planning and analysis\n• Market research and forecasting\n• Business development strategies\n• Investment planning and evaluation', 
            education: '• Master in Economics\n• Bachelor in Business Strategy\n• Strategic Planning certifications', 
            worksImages: ['/src/assets/Delivered.png'] 
        }
    }

    if (key && dataMap[key]) {
        memberContent.value = dataMap[key]
    }
}


onMounted(() => {
	// 页面加载完成后的初始化逻辑
})
</script>

<style scoped>
.team-members-title {
	font-size: 16px;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 8px;
	text-align: left;
	/* //文字不换行 */
	white-space: nowrap;
	/* overflow: hidden; */
	/* text-overflow: ellipsis; */
}

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

.background-image {
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
	height: 100vh;
	padding-top: 80px;
	overflow: hidden;
}

.main-content.panelsOpen .top-section {
	height: calc(100vh - 80px - 10vh);
}

/* 上半部分 - 水平布局 */
.top-section {
	display: flex;
	flex: 1;
	height: calc(100vh - 80px - 30vh);
	overflow: hidden;
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
	padding: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 30vh;
	max-height: 30vh;
	overflow: hidden;
}

.bottom-section.collapsed {
	height: 8vh;
	max-height: 8vh;
	opacity: 0.9;
	transition: height 0.3s ease;
}

.team-toggle {
	background: rgba(0, 0, 0, 0.4);
	color: #ffffff;
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 12px;
	padding: 10px 16px;
	cursor: pointer;
	backdrop-filter: blur(6px);
	transition: all 0.2s ease;
}
.team-toggle:hover {
	background: rgba(0, 212, 255, 0.2);
	box-shadow: 0 0 14px rgba(0, 212, 255, 0.4);
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
	cursor: pointer;
	/* padding: 10px 0; */
}

/* 展开面板样式 */
.expand-panel {
	display: none;
	overflow: hidden;
	padding: 0 8px;
}
.expand-panel.open {
	display: block;
	max-height: none;
	padding: 8px;
}

.expand-text {
	font-size: 16px;
	color: #ffffff;
	line-height: 1.8;
	opacity: 0.9;
}
.works-grid {
	position: fixed;
	right: 170px;
	top: 50%;
	transform: translateY(-50%);
	display: grid;
	grid-template-columns: 1fr;
	gap: 12px;
	max-width: 560px;
	z-index: 1001;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(20px) saturate(180%);
	-webkit-backdrop-filter: blur(20px) saturate(180%);
	padding: 20px;
	border-radius: 8px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37), 
				inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
.work-card {
	background: rgba(0, 0, 0, 0.25);
	border: 1px solid rgba(255, 255, 255, 0.15);
	border-radius: 0px;
	overflow: hidden;
}
.work-card img {
	width: 300px;
	/* height: 580px; */
	object-fit: contain;
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

/* 选中态样式（轻微高亮及左侧线） */
.info-section.active {
	background: rgba(0, 212, 255, 0.08);
	border-left: 3px solid #00d4ff;
	border-radius: 8px;
	padding: 10px;
}


/* 右侧内容样式 */
.top-info {
	/* display: flex;
	justify-content: space-between; */
	margin-bottom: 40px;
}

.info-item {
	flex: 1;
	margin: 0 10px;
}

.info-title {
	font-size: 18px;
	font-weight: 500;
	color: #ffffff;
	text-align: right;
	margin: 0;
}

/* 团队成员网格样式 */
.team-members-grid {
	background: rgba(255, 255, 255, 0.05);
	border-radius: 15px;
	padding: 10px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	/* max-width: 800px; */
	justify-content: center;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	gap: 20px;
}

.team-members-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex: 1;
}

.members-title {
	font-size: 16px;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 8px;
	text-align: left;
}

.members-avatars {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 30px;
	margin-bottom: 20px;
	justify-items: center;
	max-width: 600px;
}

.member-avatar {
	width: 98px;
	height: 133px;
	/* height: 100px; */
	/* border-radius: 12px; */
	position: relative;
	border: 2px solid transparent;
	/* background-size: cover; */
	background-position: center;
	transition: all 0.3s ease;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.member-avatar:hover {
	transform: scale(1.05);
	border: 2px solid #00d4ff;
	box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
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
	bottom: -12px;
	left: 50%;
	transform: translateX(-50%);
	font-size: 7px;
	color: #ffffff;
	text-align: center;
	white-space: nowrap;
	font-weight: 500;
}

.team-description {
	text-align: left;
	color: #cccccc;
	font-size: 9px;
	line-height: 1.2;
	max-width: 300px;
	flex: 1;
	display: flex;
	align-items: center;
}

/* 成员卡片外框样式 */
.member-card {
	width: 120px;
	padding: 10px 10px 12px 10px;
	border-radius: 16px;
	background: rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(6px);
	border: 1px solid rgba(255, 255, 255, 0.18);
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(0, 212, 255, 0.15);
	display: flex;
	flex-direction: column;
	align-items: center;
}

.member-card:hover {
	box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45), 0 0 20px rgba(0, 212, 255, 0.35);
	transform: translateY(-3px);
}

/* 职位胶囊标签 */
.member-role {
	color: #e6faff;
	font-size: 12px;
	font-weight: 700;
	margin-bottom: 8px;
	text-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
	display: block;
	width: 100%;
	text-align: center;
}

/* 统一头像尺寸与边框 */
.member-card .member-avatar {
	width: 86px;
	height: 116px;
	border-radius: 12px;
	border: 2px solid rgba(255, 255, 255, 0.25);
	box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
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

	.left-section,
	.right-section {
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
