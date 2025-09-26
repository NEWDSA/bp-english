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
							<img :src="getAssetImage('work.png')" alt="Work Experience" class="icon-image" />
						</div>
						<h3 class="section-title">Work Experience</h3>
					</div>
					<div v-if="hasActiveMember" class="expand-panel" :class="{ open: expanded.work }">
						<p class="expand-text">{{ memberContent.work }}</p>
					</div>

					<!-- 教育背景（点击展开） - 只在有内容时显示 -->
					<div v-if="hasActiveMember && memberContent.education" class="info-section" :class="{ active: expanded.education }" @click="togglePanel('education')">
						<div class="section-icon">
							<img :src="getAssetImage('edu.png')" alt="Educational Background" class="icon-image" />
						</div>
						<h3 class="section-title">Educational Background</h3>
					</div>
					<div v-if="hasActiveMember && memberContent.education" class="expand-panel" :class="{ open: expanded.education }">
						<p class="expand-text">{{ memberContent.education }}</p>
					</div>

					<!-- 代表作品（点击展开） - 只在有图片时显示 -->
					<div v-if="hasActiveMember && memberContent.worksImages.length > 0" class="info-section" :class="{ active: expanded.works }" @click="togglePanel('works')">
						<div class="section-icon">
							<img :src="getAssetImage('video.png')" alt="Representative works" class="icon-image" />
						</div>
						<h3 class="section-title">Representative works (Delivered)</h3>
					</div>
					<div v-if="hasActiveMember && memberContent.worksImages.length > 0" class="expand-panel" :class="{ open: expanded.works }">
						<div class="works-grid">
							<div v-for="(img, idx) in memberContent.worksImages" :key="idx" class="work-card" @click="showWorksFullscreen">
								<img :src="getAssetImage(img)" alt="work" />
							</div>
						</div>
					</div>
				</div>

				<!-- 右侧内容 -->
				<div class="right-section">
					<!-- 上方信息区域 -->
					<div class="top-info">
						<div class="info-item">
							<div class="info-frame" @click="showWhoWeAreModal">
								<h3 class="info-title">Who we are?</h3>
							</div>
						</div>
						<div class="info-item">
							<div class="info-frame" @click="showInvestmentHighlightsModal">
								<h3 class="info-title">Investment Highlights</h3>
							</div>
						</div>
					</div>
				</div>
			</div>

            <!-- 底部团队成员区域 -->
            <div v-if="!showWhoWeAreContent && !showInvestmentHighlightsContent" class="bottom-section" :class="{ collapsed: hasAnyPanelOpen }">
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

			<!-- Who we are 中间显示内容 -->
			<div v-if="showWhoWeAreContent" class="overlay-content-display">
				<div class="overlay-close-btn" @click="closeWhoWeAreContent">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					</svg>
				</div>
				
				<div class="overlay-content">
					<h1 class="presentation-title">Who we are?</h1>
					
					<div class="presentation-grid">
						<div class="presentation-left">
							<div class="content-block">
								<h3 class="block-title">Company Overview</h3>
								<p class="block-text">The world's first high-performance intelligent hydrofoil boat focused on consumer and industry levels, solves the pain points of high energy consumption and low efficiency of traditional ships through a "hardware + software service" model.</p>
							</div>
							
							<div class="content-block">
								<h3 class="block-title">Innovation Leadership</h3>
								<p class="block-text">Outstanding leadership in core algorithms, dynamic control, and route perception. Currently holds 9 domestic patents, 6 appearance patents, 3 utility model patents, and 1 invention patent.</p>
							</div>
						</div>
						
						<div class="presentation-right">
							<div class="content-block">
								<h3 class="block-title">Key Achievements</h3>
								<div class="achievements-list">
									<div class="achievement-row">
										<span class="year-label">2015</span>
										<span class="achievement-desc">Earliest domestic entry into water-based consumer transportation</span>
									</div>
									<div class="achievement-row">
										<span class="year-label">2016</span>
										<span class="achievement-desc">First to define new water tourism ships direction in China</span>
									</div>
									<div class="achievement-row">
										<span class="year-label">2024</span>
										<span class="achievement-desc">First globally to complete 5M class hydrofoil model experiment</span>
									</div>
									<div class="achievement-row">
										<span class="bullet">•</span>
										<span class="achievement-desc">Strongest integration capability in national shipbuilding industry</span>
									</div>
									<div class="achievement-row">
										<span class="bullet">•</span>
										<span class="achievement-desc">Leading boat design with multiple latest water technology products</span>
									</div>
									<div class="achievement-row">
										<span class="bullet">•</span>
										<span class="achievement-desc">Outstanding R&D capabilities with closed-loop system</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Investment Highlights 中间显示内容 -->
			<div v-if="showInvestmentHighlightsContent" class="overlay-content-display">
				<div class="overlay-close-btn" @click="closeInvestmentHighlightsContent">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					</svg>
				</div>
				
				<div class="overlay-content">
					<h1 class="presentation-title">Investment Highlights</h1>
					
					<div class="presentation-grid">
						<div class="presentation-left">
							<div class="content-block">
								<h3 class="block-title">Market Opportunity</h3>
								<p class="block-text">Hydrofoil fusion is the best solution for ship electrification, opening up a trillion dollar market. Current ship electrification is limited to simple oil-to-electricity conversion, without fundamentally solving the contradiction between energy consumption and propulsion efficiency. Hydrofoil technology can truly solve and completely overturn the energy management mode of traditional watercraft.</p>
								<p class="block-text">High performance hydrofoil boats have been validated for their value in multiple scenarios, and leading overseas companies are making efforts, leaving a basic blank in China.</p>
							</div>
							
							<div class="content-block">
								<h3 class="block-title">Core Competencies</h3>
								<p class="block-text">Mastering the core industry chain with strong product innovation capability, leading the development of the industry. We adhere to independent research and production throughout the entire industry chain, with modular assembly lines for components.</p>
								<p class="block-text">Adhere to original design, improve product matrix, develop intelligent control system, three-mode intelligent steering wheel, smart cabin, terminal sales program, high-strength modular hydrofoil, and high-strength lightweight material process of hull.</p>
							</div>
						</div>
						
						<div class="presentation-right">
							<div class="content-block">
								<h3 class="block-title">Global Leadership Strategy</h3>
								<p class="block-text">Actively globalizing and striving to become an absolute leader in the consumer level field as soon as possible. Our past products have been recognized by top domestic and international customers and have been implemented in various scenarios such as technology, transportation, consumption, and cultural tourism.</p>
								<p class="block-text">80% of our revenue comes from the transportation industry.</p>
							</div>
							
							<div class="content-block">
								<h3 class="block-title">Future Innovation</h3>
								<p class="block-text">Based on technological accumulation and significant advantages, advance layout of consumer grade intelligent water transportation. Pioneering cooperation with multiple leading domestic and overseas enterprises to jointly promote the landing of AI + water transportation vehicles.</p>
								<p class="block-text">The company will release a new form of product in July this year, with no competition in the same scale, and will establish an absolute leading advantage by combining the full chain experience of "product definition - technological innovation - supply chain - channel".</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 全屏作品展示弹窗 -->
			<div v-if="showWorksModal" class="works-fullscreen-modal" @click="closeWorksModal">
				<div class="works-modal-wrapper" @click.stop>
					<!-- 关闭按钮 -->
					<button class="works-close-btn" @click="closeWorksModal">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
						</svg>
					</button>
					
					<div class="works-modal-content">
					<!-- <div class="works-modal-header">
						<h1 class="works-modal-title">Representative Works</h1>
						<button class="works-close-btn" @click="closeWorksModal">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
							</svg>
						</button>
					</div> -->
					
					<!-- <div class="works-images-grid">
						<div v-for="i in 6" :key="i" class="works-image-item">
							<img :src="getWorkImage(i)" :alt="`Work ${i}`" class="works-image" />
							<div class="works-image-overlay">
								<div class="works-image-number">{{ i }}</div>
							</div>
							<div v-if="i === 1" class="works-image-text">
								<div class="works-project-number">1</div>
								<div class="works-title">The Definer of the Future Water-X Pontoon</div>
								<div class="works-details">
									<div class="works-project">Project: Wuhu Pearl</div>
									<div class="works-launch">Launch Date: September 2022</div>
									<div class="works-location">Location: Wuhu, Anhui</div>
								</div>
							</div>
						</div>
					</div> -->
					<div class="works-images-grid">
						<template v-for="i in 6" :key="i">
							<div class="works-image-item">
								<img :src="getWorkImage(i)" :alt="`Work ${i}`" class="works-image" />
								
								<!-- 第一张图片文字 -->
								<div v-if="i === 1" class="works-text-overlay">
									<div class="works-number">1</div>
									<div class="works-title">The Definer of the Future Water-X Pontoon</div>
									<div class="works-project">Project: Wuhu Pearl</div>
									<div class="works-date">Launch Date: September 2022</div>
									<div class="works-location">Location: Wuhu, Anhui</div>
								</div>
								
								<!-- 第二张图片文字 -->
								<div v-if="i === 2" class="works-text-overlay">
									<div class="works-number">2</div>
									<div class="works-title">Definer of maritime cultural tourism vessels</div>
									<div class="works-project">Project: Xunxian 1 and 2</div>
									<div class="works-date">Landing Date: May 2017</div>
									<div class="works-location">Location: Yantai, Qinhuangdao</div>
								</div>
								
								<!-- 第三张图片文字 -->
								<div v-if="i === 3" class="works-text-overlay">
									<div class="works-number">3</div>
									<div class="works-title">Rich resources on B-side and G-side</div>
									<div class="works-project">Project: Jiuzhou Bay No. 1 (Nezha)</div>
									<div class="works-date">Landing Date: October 2020</div>
									<div class="works-location">Location: Zhuhai, Guangdong</div>
								</div>
								
								<!-- 第四张图片文字 -->
								<div v-if="i === 4" class="works-text-overlay">
									<div class="works-number">4</div>
									<div class="works-title">Pioneer of consumer transportation</div>
									<div class="works-project">Project: Kun</div>
									<div class="works-date">Landing Date: April 2024</div>
									<div class="works-location">Location: Weihai, Shandong</div>
								</div>
								
								<!-- 第五张图片文字 -->
								<div v-if="i === 5" class="works-text-overlay">
									<div class="works-number">5</div>
									<div class="works-title">Complete domestic and overseas channel network</div>
									<div class="works-project">Project: ADAMAS</div>
									<div class="works-date">Launch Date: March 2025</div>
									<div class="works-location">Location: Ho Chi Minh City, Vietnam</div>
								</div>
								
								<!-- 第六张图片文字 -->
								<div v-if="i === 6" class="works-text-overlay">
									<div class="works-number">6</div>
									<div class="works-title">Designer of the country's first smart yacht</div>
									<div class="works-project">Project: Smart Boat No. 1</div>
									<div class="works-date">Landing Date: October 2022</div>
									<div class="works-location">Location: Guangdong-Hong Kong-Macao Greater Bay Area</div>
									<div class="works-extra">"Smart Yacht Interior Design Technology Research Report"</div>
									<div class="works-extra">"Smart Yacht Independent Development Project"</div>
									<div class="works-extra">"Research on Exterior and Interior Design Technology of Medium-Sized Luxury Cruise Ships"</div>
									<div class="works-extra">"2023 Forward-Looking Research Project"</div>
								</div>
							</div>
						</template>
					</div>
					</div>
				</div>
			</div>

		</div>

	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getScale } from '../utils/flexible.js'

const router = useRouter()
const isCeoBackground = ref(false)
const isCfoBackground = ref(false)
const isCooBackground = ref(false)
const isEngineerBackground = ref(false)
const isInteractionEngineerBackground = ref(false)
const isStructuralEngineerBackground = ref(false)
const isStrategicPlannerBackground = ref(false)

// lib-flexible 适配相关
let cleanupFlexible = null

// 展开面板状态
const expanded = ref({ work: false, education: false, works: false })

// 当前成员内容
const memberContent = ref({ work: '', education: '', worksImages: [] })


// 中间内容显示状态
const showWhoWeAreContent = ref(false)
const showInvestmentHighlightsContent = ref(false)
const showWorksModal = ref(false)

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

function resetAllBackgrounds() {
    isCeoBackground.value = false
    isCfoBackground.value = false
    isCooBackground.value = false
    isEngineerBackground.value = false
    isInteractionEngineerBackground.value = false
    isStructuralEngineerBackground.value = false
    isStrategicPlannerBackground.value = false
}

// 内容显示控制函数
function showWhoWeAreModal() {
    // 关闭所有其他面板
    closeAllPanels()
    resetAllBackgrounds()
    showInvestmentHighlightsContent.value = false
    showWorksModal.value = false
    
    showWhoWeAreContent.value = true
}

function showInvestmentHighlightsModal() {
    // 关闭所有其他面板
    closeAllPanels()
    resetAllBackgrounds()
    showWhoWeAreContent.value = false
    showWorksModal.value = false
    
    showInvestmentHighlightsContent.value = true
}

// 中间内容控制函数
function closeWhoWeAreContent() {
    showWhoWeAreContent.value = false
}

function closeInvestmentHighlightsContent() {
    showInvestmentHighlightsContent.value = false
}

// 全屏作品展示控制函数
function showWorksFullscreen() {
	// 关闭所有其他面板
	closeAllPanels()
	resetAllBackgrounds()
	showWhoWeAreContent.value = false
	showInvestmentHighlightsContent.value = false
	
	showWorksModal.value = true
}

function closeWorksModal() {
	showWorksModal.value = false
}

// 获取作品图片路径
function getWorkImage(index) {
	return new URL(`../assets/work${index}.png`, import.meta.url).href
}

// 获取其他图片路径
function getAssetImage(imageName) {
	return new URL(`../assets/${imageName}`, import.meta.url).href
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
	// 关闭其他所有背景
	isCfoBackground.value = false
	isCooBackground.value = false
	isEngineerBackground.value = false
	isInteractionEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
	// 切换当前成员状态
	isCeoBackground.value = !isCeoBackground.value
    syncMemberContent()
}

function toggleCfoBackground() {
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCooBackground.value = false
	isEngineerBackground.value = false
	isInteractionEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
	// 切换当前成员状态
	isCfoBackground.value = !isCfoBackground.value
    syncMemberContent()
}

function toggleCooBackground() {
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCfoBackground.value = false
	isEngineerBackground.value = false
	isInteractionEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
	// 切换当前成员状态
	isCooBackground.value = !isCooBackground.value
    syncMemberContent()
}

function toggleEngineerBackground() {
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCfoBackground.value = false
	isCooBackground.value = false
	isInteractionEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
	// 切换当前成员状态
	isEngineerBackground.value = !isEngineerBackground.value
    syncMemberContent()
}

function toggleInteractionEngineerBackground() {
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCfoBackground.value = false
	isCooBackground.value = false
	isEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
	// 切换当前成员状态
	isInteractionEngineerBackground.value = !isInteractionEngineerBackground.value
    syncMemberContent()
}

function toggleStructuralEngineerBackground() {
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCfoBackground.value = false
	isCooBackground.value = false
	isEngineerBackground.value = false
	isInteractionEngineerBackground.value = false
	isStrategicPlannerBackground.value = false
	// 切换当前成员状态
	isStructuralEngineerBackground.value = !isStructuralEngineerBackground.value
    syncMemberContent()
}

function toggleStrategicPlannerBackground() {
	// 关闭其他所有背景
	isCeoBackground.value = false
	isCfoBackground.value = false
	isCooBackground.value = false
	isEngineerBackground.value = false
	isInteractionEngineerBackground.value = false
	isStructuralEngineerBackground.value = false
	// 切换当前成员状态
	isStrategicPlannerBackground.value = !isStrategicPlannerBackground.value
    syncMemberContent()
}

function syncMemberContent() {
    const key = getCurrentActiveMember()
    // 简单示例数据，可替换为真实内容
    const dataMap = {
        ceo: {
            work: '• Over 10 years of experience in ship design work\n• 2015-2017 Ferrari Group, Italy - Quality Control and After sales Manager\n• 2020/10-2022/10 School of Design and Art, China Academy of Art - Industrial Design Teacher\n• Hangzhou Yihai Ship Design Co., Ltd. - General Manager/Legal Representative\n• Yushui Flying (Shenzhen) Technology Co., Ltd. - General Manager',
            education: '• Undergraduate: China Academy of Art - Industrial Design\n• Graduate student: Genoa Milan Polytechnic Joint Training Master\'s Degree - Ship and Yacht Design\n• PhD: University of Kuala Lumpur - Ship and Ocean Engineering',
            worksImages: ['Delivered.png']
        },
        cfo: {
            work: '• Founding Partner of Micro Light Innovation Investment\n• Responsible for tax laws, investment and financing',
            education: '• Master of Law, China University of Political Science and Law\n• Master of Finance from Stanford University in the United States',
            worksImages: []
        },
        coo: { 
            work: '• Product development and delivery\n• Supply Chain Technology Management', 
            education: '', 
            worksImages: [] 
        },
        engineer: { 
            work: '• Responsible for performance testing and optimization\n• CNC structural engineer\n• Software and hardware embedded engineer\n• Material research and innovation', 
            education: '', 
            worksImages: [] 
        },
        interactionEngineer: { 
            work: '• Emotional Interaction Engine\n• Digital twin simulation\n• Compile level code optimization', 
            education: '', 
            worksImages: [] 
        },
        structuralEngineer: { 
            work: '• Multi physics modeling and simulation\n• Research and development of intelligent control algorithms\n• High end equipment system integration', 
            education: '', 
            worksImages: [] 
        },
        strategicPlanner: { 
            work: '• Analyze industry trends and competitor dynamics\n• Participate in business negotiations, sign sales contracts, and ensure their execution\n• Expand new customers, maintain key customer relationships, and promote long-term cooperation', 
            education: '', 
            worksImages: [] 
        }
    }

    if (key && dataMap[key]) {
        memberContent.value = dataMap[key]
    }
}


onMounted(() => {
	// 页面加载完成后的初始化逻辑
})

	onUnmounted(() => {
	// 页面清理
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
	/* background-color: rgba(0, 0, 0, 0.7); */
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
	cursor: pointer;
	transition: all 0.3s ease;
}

.work-card:hover {
	transform: scale(1.05);
	border-color: rgba(0, 212, 255, 0.4);
	box-shadow: 0 8px 25px rgba(0, 212, 255, 0.2);
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
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-bottom: 40px;
}

.info-item {
	flex: 1;
	margin: 0;
}

.info-frame {
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 12px;
	padding: 20px;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	transition: all 0.3s ease;
}

.info-frame:hover {
	background: rgba(255, 255, 255, 0.08);
	border-color: rgba(0, 212, 255, 0.3);
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
	cursor: pointer;
}

.info-title {
	font-size: 18px;
	font-weight: 500;
	color: #ffffff;
	text-align: center;
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


/* 蒙版内容显示样式 */
.overlay-content-display {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.7);
	backdrop-filter: blur(10px);
	z-index: 1000;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px;
	animation: overlayFadeIn 0.3s ease-out;
}

@keyframes overlayFadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.overlay-close-btn {
	position: absolute;
	top: 30px;
	right: 30px;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.3);
	color: #ffffff;
	cursor: pointer;
	padding: 12px;
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.3s ease;
}

.overlay-close-btn:hover {
	background: rgba(255, 255, 255, 0.2);
	color: #00d4ff;
	transform: scale(1.1);
}

.overlay-content {
	width: 95%;
	max-width: none;
	height: 85vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 2vw;
}

.presentation-title {
	font-size: clamp(1.8rem, 3vw, 3.5rem);
	font-weight: 700;
	color: #ffffff;
	margin: 0 0 clamp(1.5rem, 3vh, 2.5rem) 0;
	text-align: center;
}

.presentation-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: clamp(2rem, 4vw, 6rem);
	height: 100%;
	align-items: start;
}

.presentation-left,
.presentation-right {
	display: flex;
	flex-direction: column;
	gap: clamp(1.5rem, 3vh, 3rem);
	height: 100%;
}

.content-block {
	flex: 1;
	display: flex;
	flex-direction: column;
}

.block-title {
	font-size: clamp(1rem, 1.8vw, 2rem);
	font-weight: 600;
	color: #ffffff;
	margin: 0 0 clamp(0.6rem, 1vh, 1rem) 0;
	border-bottom: 2px solid rgba(255, 255, 255, 0.3);
	padding-bottom: clamp(0.3rem, 0.6vh, 0.6rem);
}

.block-text {
	font-size: clamp(0.8rem, 1.1vw, 1.3rem);
	color: #ffffff;
	line-height: 1.5;
	margin: 0 0 clamp(0.6rem, 1vh, 1rem) 0;
	opacity: 0.9;
}

.block-text:last-child {
	margin-bottom: 0;
}

.achievements-list {
	display: flex;
	flex-direction: column;
	gap: clamp(0.8rem, 1.2vh, 1.5rem);
}

.achievement-row {
	display: flex;
	align-items: flex-start;
	gap: clamp(0.8rem, 1.2vw, 1.5rem);
}

.year-label {
	background: rgba(255, 255, 255, 0.2);
	color: #ffffff;
	font-size: clamp(0.7rem, 1.1vw, 1.4rem);
	font-weight: 700;
	padding: clamp(0.2rem, 0.4vh, 0.5rem) clamp(0.6rem, 1vw, 1rem);
	border-radius: 15px;
	min-width: clamp(50px, 4vw, 80px);
	text-align: center;
	flex-shrink: 0;
}

.bullet {
	color: #ffffff;
	font-size: clamp(0.9rem, 1.4vw, 2rem);
	font-weight: bold;
	flex-shrink: 0;
	width: clamp(15px, 1.5vw, 25px);
}

.achievement-desc {
	font-size: clamp(0.7rem, 1vw, 1.2rem);
	color: #ffffff;
	line-height: 1.4;
	opacity: 0.9;
	flex: 1;
}

/* 针对不同屏幕尺寸的精确适配 */

/* 笔记本 (1366x768 - 1920x1080) */
@media (min-width: 1366px) and (max-width: 1920px) {
	.overlay-content {
		width: 90%;
		padding: 0 3vw;
	}
	
	.presentation-grid {
		gap: 4rem;
	}
}

/* 大台式机 (1920x1080 - 2560x1440) */
@media (min-width: 1921px) and (max-width: 2560px) {
	.overlay-content {
		width: 85%;
		padding: 0 4vw;
	}
	
	.presentation-title {
		font-size: clamp(3rem, 4vw, 5rem);
	}
	
	.block-title {
		font-size: clamp(1.8rem, 2.2vw, 2.8rem);
	}
	
	.block-text {
		font-size: clamp(1.2rem, 1.3vw, 1.8rem);
	}
}

/* 超大屏幕/投影仪 (2560px+) */
@media (min-width: 2561px) {
	.overlay-content {
		width: 80%;
		padding: 0 5vw;
	}
	
	.presentation-title {
		font-size: clamp(4rem, 3.5vw, 8rem);
		margin-bottom: clamp(3rem, 3vh, 5rem);
	}
	
	.block-title {
		font-size: clamp(2.2rem, 2vw, 4rem);
		margin-bottom: clamp(1.2rem, 1.5vh, 2rem);
	}
	
	.block-text {
		font-size: clamp(1.4rem, 1.2vw, 2.5rem);
		margin-bottom: clamp(1rem, 1.2vh, 1.8rem);
	}
	
	.achievement-desc {
		font-size: clamp(1.2rem, 1.1vw, 2.2rem);
	}
	
	.year-label {
		font-size: clamp(1rem, 1vw, 1.8rem);
		min-width: clamp(70px, 4vw, 100px);
	}
}

/* 平板和小屏幕适配 */
@media (max-width: 1024px) {
	.presentation-grid {
		grid-template-columns: 1fr;
		gap: 2rem;
	}
	
	.overlay-content {
		height: 90vh;
		overflow-y: auto;
	}
}

/* 极小屏幕 */
@media (max-width: 768px) {
	.overlay-content {
		width: 95%;
		padding: 0 1rem;
		height: 95vh;
	}
	
	.presentation-title {
		font-size: clamp(2rem, 6vw, 3rem);
		margin-bottom: 1.5rem;
	}
}

/* 超高分辨率显示器优化 */
@media (min-resolution: 192dpi), (min-resolution: 2dppx) {
	.block-text,
	.achievement-desc {
		font-weight: 400;
		letter-spacing: 0.02em;
	}
}

/* 全屏作品展示弹窗样式 */
.works-fullscreen-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(25px) saturate(180%);
	z-index: 2000;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: worksModalFadeIn 0.4s ease-out;
}

@keyframes worksModalFadeIn {
	from {
		opacity: 0;
		backdrop-filter: blur(0px);
	}
	to {
		opacity: 1;
		backdrop-filter: blur(20px);
	}
}

.works-modal-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	position: relative;
}

.works-close-btn {
	position: absolute;
	top: 30px;
	right: 30px;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.3);
	color: #ffffff;
	cursor: pointer;
	padding: 12px;
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.3s ease;
	backdrop-filter: blur(10px);
	z-index: 10;
}

.works-close-btn:hover {
	background: rgba(255, 255, 255, 0.2);
	color: #00d4ff;
	transform: scale(1.1);
	box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
}

.works-modal-content {
	width: 800px;
	height: 700px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 20px;
	backdrop-filter: blur(15px) saturate(180%);
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 
	            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.works-modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40px;
	padding-bottom: 20px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.works-modal-title {
	font-size: clamp(2rem, 4vw, 4rem);
	font-weight: 700;
	color: #ffffff;
	margin: 0;
	text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}

.works-close-btn {
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.2);
	color: #ffffff;
	cursor: pointer;
	padding: 15px;
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.3s ease;
	backdrop-filter: blur(10px);
}

.works-close-btn:hover {
	background: rgba(255, 255, 255, 0.2);
	color: #00d4ff;
	transform: scale(1.1);
	box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
}

.works-images-grid {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 10px;
	justify-content: center;
	align-content: center;
	padding: 20px;
}

.works-image-item {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.1);
	border-radius: 0;
	overflow: hidden;
	transition: all 0.3s ease;
	cursor: pointer;
}

.works-image-item:hover {
	transform: scale(1.02);
	border-color: rgba(0, 212, 255, 0.3);
	box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
}

.works-image {
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
	transition: all 0.3s ease;
}

.works-image-item:hover .works-image {
	transform: scale(1.05);
}

/* 简洁的文字覆盖层 */
.works-text-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	text-align: center;
	color: white;
	padding: 50px 10px 10px 10px;
}

.works-number {
	position: absolute;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	/* background: rgba(0, 212, 255, 0.9); */
	color: #ffffff;
	font-size: 18px;
	font-weight: bold;
	/* width: 35px;
	height: 35px; */
	/* border-radius: 50%; */
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(10px);
	/* border: 2px solid rgba(255, 255, 255, 0.3); */
	/* text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5); */
	/* box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4); */
}

.works-title {
	font-size: 12px;
	/* font-weight: bold; */
	margin-bottom: 6px;
	line-height: 1.2;
}

.works-project,
.works-date,
.works-location {
	font-size: 10px;
	margin-bottom: 3px;
}

.works-extra {
	font-size: 8px;
	margin-bottom: 1px;
	font-style: italic;
	color: white;
}

.works-image-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
	opacity: 0;
	transition: all 0.3s ease;
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	padding: 15px;
}

.works-image-item:hover .works-image-overlay {
	opacity: 1;
}

.works-image-number {
	background: rgba(0, 212, 255, 0.8);
	color: #ffffff;
	font-size: 18px;
	font-weight: 700;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(10px);
	border: 2px solid rgba(255, 255, 255, 0.3);
	text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* 第一张图片的文字覆盖层 */
.works-image-text {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%);
	color: #ffffff;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	opacity: 0;
	transition: all 0.4s ease;
	backdrop-filter: blur(5px);
}

.works-image-item:hover .works-image-text {
	opacity: 1;
}

.works-project-number {
	position: absolute;
	top: 15px;
	left: 15px;
	background: rgba(0, 212, 255, 0.9);
	color: #ffffff;
	font-size: 24px;
	font-weight: 700;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(10px);
	border: 2px solid rgba(255, 255, 255, 0.3);
	text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	box-shadow: 0 4px 15px rgba(0, 212, 255, 0.4);
}

/* .works-title {
	font-size: clamp(14px, 2.2vw, 22px);
	font-weight: 700;
	color: #ffffff;
	text-align: center;
	margin: 20px 0;
	line-height: 1.3;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
	text-transform: capitalize;
} */

.works-details {
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-top: auto;
	padding: 15px;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 10px;
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.works-project,
.works-launch,
.works-location {
	font-size: clamp(11px, 1.4vw, 14px);
	color: #ffffff;
	line-height: 1.4;
	text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	opacity: 0.9;
}

.works-project {
	/* font-weight: 600; */
	color: white;
}

.works-launch {
	font-weight: 500;
}

.works-location {
	font-weight: 500;
	color: white;
}

/* 响应式适配 */
@media (max-width: 1024px) {
	.works-modal-content {
		width: 98vw;
		height: 95vh;
		padding: 20px;
	}
	
	.works-images-grid {
		gap: 15px;
		padding: 15px 0;
	}
	
	.works-modal-title {
		font-size: clamp(1.5rem, 5vw, 3rem);
	}
}

@media (max-width: 768px) {
	.works-images-grid {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 10px;
	}
	
	.works-modal-content {
		padding: 15px;
	}
	
	.works-modal-header {
		margin-bottom: 20px;
		padding-bottom: 15px;
	}
	
	.works-modal-title {
		font-size: clamp(1.2rem, 6vw, 2.5rem);
	}
	
	.works-close-btn {
		width: 40px;
		height: 40px;
		padding: 10px;
	}
	
	/* 移动端文字适配 */
	.works-image-text {
		padding: 15px;
	}
	
	.works-project-number {
		width: 35px;
		height: 35px;
		font-size: 18px;
		top: 10px;
		left: 10px;
	}
	
	/* .works-title {
		font-size: clamp(12px, 3vw, 16px);
		margin: 15px 0;
	} */
	
	.works-details {
		padding: 10px;
		gap: 6px;
	}
	
	.works-project,
	.works-launch,
	.works-location {
		font-size: clamp(9px, 2.5vw, 12px);
	}
}

@media (max-width: 480px) {
	.works-images-grid {
		grid-template-columns: 1fr;
		grid-template-rows: repeat(6, 1fr);
		gap: 8px;
	}
	
	.works-modal-content {
		width: 100vw;
		height: 100vh;
		border-radius: 0;
		padding: 10px;
	}
}
</style>
