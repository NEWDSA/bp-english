<template>
	<div class="product-introduction">
		<!-- 背景视频 -->
		<div class="video-background">
			<video autoplay muted loop playsinline class="background-video">
				<source src="../assets/sea_wave.mp4" type="video/mp4">
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
					<!-- 动态连接线 -->
					<div class="main-vertical-line" :style="{
						top: lineTop,
						height: lineHeight
					}"></div>

					<div class="left-nav-item product-advantages-item" @mouseenter="showTooltip('advantages')"
						@mouseleave="hideTooltip">
						<span class="nav-text">Product advantages</span>
						<!-- 悬停时显示的详细信息 -->
						<div v-if="activeTooltip === 'advantages'" class="advantages-tooltip">
							<div class="tooltip-content">
								<p><strong>Positioned within 5 meters, driving qualification exemption for entertainment
										powered boats, using hydrofoil and control algorithms to significantly reduce
										player entry barriers and enhance entertainment experience</strong></p>
								<p><strong>Y-H2O Product Introduction</strong></p>
								<p><strong>Selling point:</strong></p>
								<p>1. No need for a license to drive, low threshold for getting started</p>
								<p>2. The purchase cost is equivalent to the price of a motorboat</p>
								<p>3. Intelligentization</p>
								<p>4. High safety factor</p>
								<p>5. Low usage cost</p>
								<p>6. Better experience</p>
							</div>
						</div>
					</div>
					<div class="left-nav-item" @click="showComparisonModal">
						<span class="nav-text">Compared to traditional ferries</span>
					</div>
					<div class="left-nav-item" @click="showDesignModal = true">
						<span class="nav-text">Design&Simulation Technology</span>
					</div>
					<div class="left-nav-item color-price-section">
						<span class="nav-text">Color and Price</span>
						<!-- 颜色选择区域 -->
						<div class="color-price-content">
							<div class="color-options">
								<div class="color-swatch white" @click="changeBoatColor('white')"
									:class="{ active: selectedColor === 'white' }"
									:style="{ backgroundImage: `url(${colorBackgrounds.white})` }"></div>
								<div class="color-swatch green" @click="changeBoatColor('green')"
									:class="{ active: selectedColor === 'green' }"
									:style="{ backgroundImage: `url(${colorBackgrounds.green})` }"></div>
								<div class="color-swatch blue" @click="changeBoatColor('blue')"
									:class="{ active: selectedColor === 'blue' }"
									:style="{ backgroundImage: `url(${colorBackgrounds.blue})` }"></div>
								<div class="color-swatch purple" @click="changeBoatColor('purple')"
									:class="{ active: selectedColor === 'purple' }"
									:style="{ backgroundImage: `url(${colorBackgrounds.purple})` }"></div>
								<div class="color-swatch red" @click="changeBoatColor('red')"
									:class="{ active: selectedColor === 'red' }"
									:style="{ backgroundImage: `url(${colorBackgrounds.red})` }"></div>
								<div class="color-swatch black" @click="changeBoatColor('black')"
									:class="{ active: selectedColor === 'black' }"
									:style="{ backgroundImage: `url(${colorBackgrounds.black})` }"></div>
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
								<div class="highlight-card unmanned-systems" @mouseenter="showTooltip('unmanned')"
									@mouseleave="hideTooltip">
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
								<div class="highlight-card team-members" @mouseenter="showTooltip('team')"
									@mouseleave="hideTooltip">
									<div v-if="activeTooltip !== 'team'">
										<img :src="wheel2Img" alt="Team Members" class="highlight-icon" />
										<div class="highlight-title">Team Members</div>
									</div>
									<!-- 悬停时显示的详细信息 -->
									<div v-if="activeTooltip === 'team'" class="card-content">
										<p><strong>U/C-shaped wing design:</strong></p>
										<p>The front wing (U-shaped) and rear wing (C-shaped) feature streamlined
											surfaces optimized for fluid dynamics.</p>
										<p><strong>Resistance quick assembly system:</strong></p>
										<p>Reduced transportation volume, with on-site assembly efficiency increased by
											50%.</p>
									</div>
								</div>
								<div class="highlight-card adaptive-algorithm" @mouseenter="showTooltip('adaptive')"
									@mouseleave="hideTooltip">
									<div v-if="activeTooltip !== 'adaptive'">
										<img :src="AutoSettingImg" alt="Adaptive hydrofoil" class="highlight-icon" />
										<div class="highlight-title">Adaptive hydrofoil control algorithm</div>
									</div>
									<!-- 悬停时显示的详细信息 -->
									<div v-if="activeTooltip === 'adaptive'" class="card-content">
										<p><strong>Advanced control system:</strong></p>
										<p>Real-time adjustment of hydrofoil angles based on water conditions and vessel
											performance.</p>
										<p><strong>Machine learning integration:</strong></p>
										<p>Continuous optimization through AI-powered analysis of operational data.</p>
									</div>
								</div>
								<div class="highlight-card modular-hull" @mouseenter="showTooltip('modular')"
									@mouseleave="hideTooltip">
									<div v-if="activeTooltip !== 'modular'">
										<img :src="modularImg" alt="Modular detachable hull" class="highlight-icon" />
										<div class="highlight-title">Modular detachable hull</div>
									</div>
									<!-- 悬停时显示的详细信息 -->
									<div v-if="activeTooltip === 'modular'" class="card-content">
										<p><strong>Quick assembly design:</strong></p>
										<p>Modular components allow for rapid assembly and disassembly in under 30
											minutes.</p>
										<p><strong>Transportation efficiency:</strong></p>
										<p>Reduced shipping costs by 60% through compact modular packaging.</p>
									</div>
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

		<!-- 对比表格模态框 -->
		<div v-if="showComparison" class="modal-overlay" @click="hideComparisonModal">
			<div class="comparison-modal" @click.stop>
				<div class="comparison-container">
					<!-- 左侧：指标列表区域 -->
					<div class="metrics-section">
						<div class="metrics-list">
							<div class="metric-title">How can the new generation of water taxis address the pain points
								of traditional water transportation</div>
							<div class="metric-item">Speed (of a ship or aircraft)</div>
							<div class="metric-item">Power-to-speed ratio (kw/kt)</div>
							<div class="metric-item">Voyage (nautical miles)</div>
							<div class="metric-item">Trim angle control</div>
							<div class="metric-item">Stability</div>
							<div class="metric-item">Noise level</div>
							<div class="metric-item">Procurement cost (per vessel)</div>
							<div class="metric-item">Payback period</div>
							<div class="metric-item">Economic benefits (annual)</div>
						</div>
					</div>

					<!-- 右侧：智能水翼船区域 -->
					<div class="hydrofoil-section">
						<div class="section-header">
							<h3>Intelligent hydrofoil boat</h3>
							<div class="boat-image">
								<img :src="currentBoatImage" alt="Intelligent hydrofoil boat" />
							</div>
						</div>
						<div class="data-list">
							<div class="data-item">
								<div class="data-value">20kt</div>
							</div>
							<div class="data-item">
								<div class="data-value">1:1</div>
							</div>
							<div class="data-item">
								<div class="data-value">75</div>
							</div>
							<div class="data-item">
								<div class="data-value">≤1°</div>
							</div>
							<div class="data-item">
								<div class="data-value">excellent</div>
							</div>
							<div class="data-item">
								<div class="data-value">65dB</div>
							</div>
							<div class="data-item">
								<div class="data-value">100,000 $</div>
							</div>
							<div class="data-item">
								<div class="data-value">0.86 years</div>
							</div>
							<div class="data-item">
								<div class="data-value">46,000 $</div>
							</div>
						</div>
					</div>

					<!-- 中间：VS分隔区域 -->
					<div class="vs-section">
						<div class="vs-icon">VS</div>
					</div>

					<!-- 右侧：传统渡轮区域 -->
					<div class="traditional-section">
						<div class="section-header">
							<h3>Traditional ferry</h3>
						</div>
						<div class="data-list">
							<div class="data-item">
								<div class="data-value">Sections 10-20</div>
							</div>
							<div class="data-item">
								<div class="data-value">0.35-0.40</div>
							</div>
							<div class="data-item">
								<div class="data-value">
									<100 (short distance) / 2000+ (long distance)</div>
								</div>
								<div class="data-item">
									<div class="data-value">±2.5°</div>
								</div>
								<div class="data-item">
									<div class="data-value">Bumpiness</div>
								</div>
								<div class="data-item">
									<div class="data-value">65-85 dB (inside the cabin)</div>
								</div>
								<div class="data-item">
									<div class="data-value">844,000-2,108,000 $</div>
								</div>
								<div class="data-item">
									<div class="data-value">3-7 years</div>
								</div>
								<div class="data-item">
									<div class="data-value">281,000 $ (200 passenger seats)</div>
								</div>
							</div>
						</div>
					</div>

					<!-- 底部对勾图标 -->
					<div class="comparison-footer">
						<div class="checkmark">✓</div>
					</div>
				</div>
			</div>

			<!-- Design&Simulation Technology 视频弹窗 -->
			<div v-if="showDesignModal" class="modal-overlay" @click="hideDesignModal">
				<div class="design-modal" @click.stop>
					<div class="design-modal-header">
						<h2 class="modal-title" @click="showSimulationModalFunc">Design & Simulation Technology</h2>
						<button class="close-btn" @click="hideDesignModal">×</button>
					</div>
					<div class="videos-grid">
						<div class="video-container">
							<video autoplay muted loop playsinline class="simulation-video">
								<source src="../assets/1.1.mp4" type="video/mp4">
							</video>
						</div>
						<div class="video-container">
							<video autoplay muted loop playsinline class="simulation-video">
								<source src="../assets/1.2.mp4" type="video/mp4">
							</video>
						</div>
						<div class="video-container">
							<video autoplay muted loop playsinline class="simulation-video">
								<source src="../assets/1.3.mp4" type="video/mp4">
							</video>
						</div>
						<div class="video-container">
							<video autoplay muted loop playsinline class="simulation-video">
								<source src="../assets/1.4.mp4" type="video/mp4">
							</video>
						</div>
						<div class="video-container">
							<video autoplay muted loop playsinline class="simulation-video">
								<source src="../assets/1.5.mp4" type="video/mp4">
							</video>
						</div>
						<div class="video-container">
							<video autoplay muted loop playsinline class="simulation-video">
								<source src="../assets/1.6.mp4" type="video/mp4">
							</video>
						</div>
					</div>
				</div>
			</div>

			<!-- Design&Simulation Technology 第二个弹窗 -->
			<div v-if="showSimulationModal" class="modal-overlay" @click="hideSimulationModal">
				<div class="simulation-modal" @click.stop>
					<div class="simulation-modal-header">
						<h2 class="simulation-title">Breakthrough verification of energy efficiency and stability of hydrofoil system</h2>
						<button class="close-btn" @click="hideSimulationModal">×</button>
					</div>
					<div class="simulation-content">
						<div class="simulation-grid">
							<!-- 第一行 -->
							<!-- 左上：视频 -->
							<div class="simulation-item video-item">
								<video autoplay muted loop playsinline class="sim-video">
									<source src="../assets/2.1.mp4" type="video/mp4">
								</video>
							</div>
							
							<!-- 中上：参数信息区域 -->
							<div class="simulation-item text-panel">
								<div class="text-content">
									<div class="parameter-info">
										<div class="param-row">Speed: 18kt</div>
										<div class="param-row">Wave Length: 5.0m</div>
										<div class="param-row">Wave Height: 0.5m</div>
										<div class="param-row">Wave Angle: 45°</div>
									</div>
								</div>
							</div>
							
							<!-- 第三列第一行：视频 -->
							<div class="simulation-item video-item">
								<video autoplay muted loop playsinline class="sim-video">
									<source src="../assets/2.2.mp4" type="video/mp4">
								</video>
							</div>
							
							<!-- 第四列：结论面板（跨3行） -->
							<div class="simulation-item conclusion-panel">
								<div class="conclusion-content">
									<div class="conclusion-title">Conclusion:</div>
									<div class="conclusion-text">
										<div class="conclusion-point">
											<strong>1. Energy efficiency reduction:</strong>
											At a speed of 18kt, the hydrofoil boat exhibits a 55% reduction in water resistance and a 75% reduction in propulsion power compared to a conventional hull.
										</div>
										<div class="conclusion-point">
											<strong>2. Stability improvement:</strong>
											With a simulated wave height of 0.5m and an angle of 45°, the hydrofoil boat maintains a more stable and comfortable navigation posture, with the crew barely feeling the vessel's trim. In contrast, conventional boats experience a trim of up to 8° under these sea conditions, making the crew extremely uncomfortable.
										</div>
									</div>
								</div>
							</div>
							
							<!-- 第二行 -->
							<!-- 左中：波点图表 -->
							<div class="simulation-item chart-panel">
								<div ref="waveChartRef" class="chart-container"></div>
							</div>
							
							<!-- 中中：Trim Angle信息区域 -->
							<div class="simulation-item text-panel">
								<div class="text-content">
									<div class="parameter-info">
										<div class="param-title">Trim Angle</div>
										<div class="param-value">-1.25°~0.85°</div>
										<div class="vs-divider">VS</div>
										<div class="param-value">-7°~-8.5°</div>
									</div>
								</div>
							</div>
							
							<!-- 第三列第二行：Trim Angle图表 -->
							<div class="simulation-item chart-panel">
								<div ref="trimAngleChartRef" class="chart-container"></div>
								<div class="chart-label">
									<div>Trim Angle</div>
									<div>-1.25°~0.85°</div>
									<div class="vs-text">VS</div>
									<div>-7°~-8.5°</div>
								</div>
							</div>
							
							<!-- 第三行 -->
							<!-- 左下：图表 -->
							<div class="simulation-item chart-panel">
								<div ref="trimAngleChart2Ref" class="chart-container"></div>
							</div>
							
							<!-- 中下：Effective Power信息区域 -->
							<div class="simulation-item text-panel">
								<div class="text-content">
									<div class="parameter-info">
										<div class="param-title">Effective Power</div>
										<div class="param-value">25kw</div>
										<div class="vs-divider">VS</div>
										<div class="param-value">90kw</div>
									</div>
								</div>
							</div>
							
							<!-- 第三列第三行：Effective Power图表 -->
							<div class="simulation-item chart-panel">
								<div ref="powerChartRef" class="chart-container"></div>
								<div class="chart-label">
									<div>Effective Power</div>
									<div>25kw</div>
									<div class="vs-text">VS</div>
									<div>90kw</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
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
import modularImg from '../assets/modular.png'
import AutoSettingImg from '../assets/auto_setting.png'

const router = useRouter()

// 颜色选择状态
const selectedColor = ref('white')

// 悬停提示状态
const activeTooltip = ref(null)

// 对比表格模态框状态
const showComparison = ref(false)

// Design&Simulation Technology 弹窗状态
const showDesignModal = ref(false)
const showSimulationModal = ref(false)

// 连接线高度计算
const lineHeight = ref('calc(100% - 60px)')
const lineTop = ref('30px')

// ECharts图表引用
const trimAngleChartRef = ref(null)
const trimAngleChart2Ref = ref(null)
const powerChartRef = ref(null)
const waveChartRef = ref(null)
const chart4Ref = ref(null)
const chart5Ref = ref(null)
let trimAngleChartInstance = null
let trimAngleChart2Instance = null
let powerChartInstance = null
let waveChartInstance = null
let chart4Instance = null
let chart5Instance = null

// 动态计算连接线位置
const calculateLinePosition = () => {
	nextTick(() => {
		const navList = document.querySelector('.left-nav-list')
		if (!navList) return

		const items = navList.querySelectorAll('.left-nav-item')
		if (items.length < 2) return

		const firstItem = items[0]
		const lastItem = items[items.length - 1]

		const firstItemRect = firstItem.getBoundingClientRect()
		const lastItemRect = lastItem.getBoundingClientRect()
		const navListRect = navList.getBoundingClientRect()

		// 计算第一个项目的水平线位置相对于导航列表的位置
		const firstItemTop = firstItemRect.top - navListRect.top + firstItemRect.height / 2

		// 计算最后一个项目的水平线位置相对于导航列表的位置
		const lastItemTop = lastItemRect.top - navListRect.top + lastItemRect.height / 2

		// 设置连接线的起始位置和高度
		lineTop.value = `${firstItemTop}px`
		lineHeight.value = `${lastItemTop - firstItemTop}px`
	})
}

// 监听窗口大小变化
const handleResize = () => {
	calculateLinePosition()
}

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

// 显示对比表格模态框
function showComparisonModal() {
	showComparison.value = true
}

// 隐藏对比表格模态框
function hideComparisonModal() {
	showComparison.value = false
}

// 显示仿真技术弹窗
function showSimulationModalFunc() {
	showDesignModal.value = false
	showSimulationModal.value = true
	// 等待DOM更新后渲染图表
	nextTick(() => {
		renderSimulationCharts()
	})
}

// 渲染仿真图表
function renderSimulationCharts() {
	// 渲染Trim Angle图表
	if (trimAngleChartRef.value) {
		if (trimAngleChartInstance) {
			trimAngleChartInstance.dispose()
		}
		trimAngleChartInstance = echarts.init(trimAngleChartRef.value)
		
		const trimAngleOption = {
			grid: { top: 20, bottom: 20, left: 30, right: 30 },
			xAxis: {
				type: 'category',
				data: ['0', '5', '10', '15', '20', '25', '30'],
				axisLine: { lineStyle: { color: '#666' } },
				axisLabel: { color: '#666', fontSize: 10 }
			},
			yAxis: {
				type: 'value',
				axisLine: { lineStyle: { color: '#666' } },
				axisLabel: { color: '#666', fontSize: 10 },
				splitLine: { lineStyle: { color: '#eee' } }
			},
			series: [
				{
					name: 'Hydrofoil',
					type: 'line',
					data: [-1.25, -1.1, -0.8, -0.5, -0.2, 0.2, 0.85],
					smooth: true,
					lineStyle: { color: '#00d4ff', width: 2 },
					itemStyle: { color: '#00d4ff' }
				},
				{
					name: 'Traditional',
					type: 'line',
					data: [-7, -7.2, -7.8, -8.1, -8.3, -8.4, -8.5],
					smooth: true,
					lineStyle: { color: '#ff6b6b', width: 2 },
					itemStyle: { color: '#ff6b6b' }
				}
			]
		}
		trimAngleChartInstance.setOption(trimAngleOption)
	}
	
	// 渲染Power图表
	if (powerChartRef.value) {
		if (powerChartInstance) {
			powerChartInstance.dispose()
		}
		powerChartInstance = echarts.init(powerChartRef.value)
		
		const powerOption = {
			grid: { top: 20, bottom: 20, left: 30, right: 30 },
			xAxis: {
				type: 'category',
				data: ['0', '5', '10', '15', '20', '25', '30'],
				axisLine: { lineStyle: { color: '#666' } },
				axisLabel: { color: '#666', fontSize: 10 }
			},
			yAxis: {
				type: 'value',
				axisLine: { lineStyle: { color: '#666' } },
				axisLabel: { color: '#666', fontSize: 10 },
				splitLine: { lineStyle: { color: '#eee' } }
			},
			series: [
				{
					name: 'Hydrofoil',
					type: 'line',
					data: [25, 24, 23, 24, 25, 26, 25],
					smooth: true,
					lineStyle: { color: '#00d4ff', width: 2 },
					itemStyle: { color: '#00d4ff' }
				},
				{
					name: 'Traditional',
					type: 'line',
					data: [90, 88, 92, 95, 93, 94, 90],
					smooth: true,
					lineStyle: { color: '#ff6b6b', width: 2 },
					itemStyle: { color: '#ff6b6b' }
				}
			]
		}
		powerChartInstance.setOption(powerOption)
	}
	
	// 渲染第二个Trim Angle图表
	if (trimAngleChart2Ref.value) {
		if (trimAngleChart2Instance) {
			trimAngleChart2Instance.dispose()
		}
		trimAngleChart2Instance = echarts.init(trimAngleChart2Ref.value)
		
		const trimAngle2Option = {
			grid: { top: 20, bottom: 20, left: 30, right: 30 },
			xAxis: {
				type: 'category',
				data: ['0', '5', '10', '15', '20', '25', '30'],
				axisLine: { lineStyle: { color: '#666' } },
				axisLabel: { color: '#666', fontSize: 10 }
			},
			yAxis: {
				type: 'value',
				axisLine: { lineStyle: { color: '#666' } },
				axisLabel: { color: '#666', fontSize: 10 },
				splitLine: { lineStyle: { color: '#eee' } }
			},
			series: [
				{
					name: 'Power Efficiency',
					type: 'line',
					data: [85, 87, 89, 92, 94, 96, 98],
					smooth: true,
					lineStyle: { color: '#4CAF50', width: 2 },
					itemStyle: { color: '#4CAF50' },
					areaStyle: {
						color: {
							type: 'linear',
							x: 0, y: 0, x2: 0, y2: 1,
							colorStops: [
								{ offset: 0, color: 'rgba(76, 175, 80, 0.3)' },
								{ offset: 1, color: 'rgba(76, 175, 80, 0.1)' }
							]
						}
					}
				}
			]
		}
		trimAngleChart2Instance.setOption(trimAngle2Option)
	}
	
	// 渲染波点图表
	if (waveChartRef.value) {
		if (waveChartInstance) {
			waveChartInstance.dispose()
		}
		waveChartInstance = echarts.init(waveChartRef.value)
		
		const waveOption = {
			grid: { top: 20, bottom: 20, left: 30, right: 30 },
			xAxis: {
				type: 'value',
				min: 0,
				max: 20,
				axisLine: { lineStyle: { color: '#666' } },
				axisLabel: { color: '#666', fontSize: 10 },
				splitLine: { lineStyle: { color: '#eee' } }
			},
			yAxis: {
				type: 'value',
				min: 0,
				max: 6,
				axisLine: { lineStyle: { color: '#666' } },
				axisLabel: { color: '#666', fontSize: 10 },
				splitLine: { lineStyle: { color: '#eee' } }
			},
			series: [
				{
					name: 'Hydrofoil Wave Pattern',
					type: 'scatter',
					data: [
						[1, 2.5], [2, 3.1], [3, 2.8], [4, 3.5], [5, 2.9],
						[6, 3.8], [7, 3.2], [8, 4.1], [9, 3.6], [10, 4.3],
						[11, 3.9], [12, 4.5], [13, 4.0], [14, 4.8], [15, 4.2],
						[16, 5.1], [17, 4.6], [18, 5.3], [19, 4.9], [20, 5.5]
					],
					symbolSize: 6,
					itemStyle: {
						color: '#00d4ff',
						borderColor: '#ffffff',
						borderWidth: 1
					}
				},
				{
					name: 'Traditional Wave Pattern',
					type: 'scatter',
					data: [
						[1, 1.8], [2, 2.3], [3, 2.0], [4, 2.7], [5, 2.1],
						[6, 2.9], [7, 2.4], [8, 3.2], [9, 2.8], [10, 3.5],
						[11, 3.1], [12, 3.7], [13, 3.3], [14, 4.0], [15, 3.6],
						[16, 4.2], [17, 3.8], [18, 4.5], [19, 4.1], [20, 4.7]
					],
					symbolSize: 6,
					itemStyle: {
						color: '#ff6b6b',
						borderColor: '#ffffff',
						borderWidth: 1
					}
				}
			]
		}
		waveChartInstance.setOption(waveOption)
	}
	
	
	if (chart4Ref.value) {
		if (chart4Instance) chart4Instance.dispose()
		chart4Instance = echarts.init(chart4Ref.value)
		chart4Instance.setOption({
			grid: { top: 20, bottom: 20, left: 30, right: 30 },
			xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'], axisLabel: { fontSize: 10 } },
			yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
			series: [{ type: 'line', data: [15, 25, 35, 40], smooth: true, lineStyle: { color: '#FF9800' } }]
		})
	}
	
	if (chart5Ref.value) {
		if (chart5Instance) chart5Instance.dispose()
		chart5Instance = echarts.init(chart5Ref.value)
		chart5Instance.setOption({
			series: [{
				type: 'pie',
				radius: '60%',
				data: [
					{ value: 35, name: 'Efficiency', itemStyle: { color: '#2196F3' } },
					{ value: 25, name: 'Performance', itemStyle: { color: '#4CAF50' } },
					{ value: 40, name: 'Stability', itemStyle: { color: '#FF9800' } }
				]
			}]
		})
	}
}

// 隐藏设计弹窗
function hideDesignModal() {
	showDesignModal.value = false
}

// 隐藏仿真技术弹窗
function hideSimulationModal() {
	showSimulationModal.value = false
}

function goHome() {
	router.push('/')
}

onMounted(() => {
	// 页面加载完成后的初始化逻辑
	calculateLinePosition()

	// 监听窗口大小变化
	window.addEventListener('resize', handleResize)

	// 监听浏览器缩放
	window.addEventListener('wheel', (e) => {
		if (e.ctrlKey) {
			// 延迟执行，等待缩放完成
			setTimeout(calculateLinePosition, 100)
		}
	})
})

// 组件卸载时清理事件监听器
onUnmounted(() => {
	window.removeEventListener('resize', handleResize)
	// 清理图表实例
	if (trimAngleChartInstance) {
		trimAngleChartInstance.dispose()
		trimAngleChartInstance = null
	}
	if (trimAngleChart2Instance) {
		trimAngleChart2Instance.dispose()
		trimAngleChart2Instance = null
	}
	if (powerChartInstance) {
		powerChartInstance.dispose()
		powerChartInstance = null
	}
	if (waveChartInstance) {
		waveChartInstance.dispose()
		waveChartInstance = null
	}
	if (chart4Instance) {
		chart4Instance.dispose()
		chart4Instance = null
	}
	if (chart5Instance) {
		chart5Instance.dispose()
		chart5Instance = null
	}
})
</script>

<style scoped>
.product-introduction {
	min-height: 100vh;
	height: auto;
	color: #ffffff;
	font-family: 'Arial', sans-serif;
	position: relative;
	overflow: hidden;
}

/* 视频背景样式 */
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
	height: 100vh;
	padding-top: 80px;
	z-index: 1;
	overflow: hidden;
}

/* 左侧导航列表定位 */
.left-nav-list {
	position: absolute;
	left: 100px;
	top: 50%;
	transform: translateY(-50%) translateY(100px);
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
	gap: 60px;
	padding-left: 20px;
	padding-top: 30px;
	padding-bottom: 30px;
	min-height: 60vh;
	justify-content: flex-start;
	z-index: 9999;
}

/* 动态连接线样式 */
.main-vertical-line {
	position: absolute;
	left: 0;
	width: 2px;
	background: rgba(255, 255, 255, 0.8);
	z-index: 1;
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
	z-index: 3;
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
}

/* 产品亮点区域特殊样式 */
.product-highlights-section {
	flex-direction: column;
	align-items: flex-start;
	gap: 15px;
	position: relative;
}

.highlights-content {
	position: absolute;
	left: 200px;
	top: 50%;
	transform: translateY(-50%);
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
	left: -20px;
	/* 保持与文字的正常距离 */
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
	background: rgba(255, 255, 255, 0.4);
	border-radius: 12px;
	padding: 12px;
	text-align: center;
	transition: all 0.3s ease;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
	min-width: 140px;
	height: 120px;
	transform: scale(0.8);
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.highlight-card:hover {
	background: rgba(255, 255, 255, 0.6);
	transform: scale(0.8) translateY(-8px);
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
	border-color: rgba(0, 212, 255, 0.3);
}

.highlight-icon {
	width: 120px;
	height: 80px;
	margin-bottom: 8px;
	object-fit: contain;
	border-radius: 8px;
	background: rgba(255, 255, 255, 0.1);
	padding: 8px;
}

.highlight-title {
	font-size: 11px;
	font-weight: 600;
	color: #333333;
	margin-bottom: 4px;
	text-align: center;
	line-height: 1.3;
	text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.highlight-desc {
	font-size: 8px;
	color: #666666;
	line-height: 1.2;
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
	box-sizing: border-box;
	overflow: hidden;
}

/* 产品优势悬停提示样式 */
.product-advantages-item {
	position: relative;
}

.advantages-tooltip {
	position: absolute;
	left: 200px;
	top: 50%;
	transform: translateY(-50%);
	z-index: 1000;
	width: 400px;
	background: rgba(255, 255, 255, 0.9);
	backdrop-filter: blur(10px);
	border-radius: 12px;
	padding: 20px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	border: 1px solid rgba(255, 255, 255, 0.3);
	/* animation: fadeInUp 0.3s ease-out; */
}

.tooltip-content p {
	margin: 0;
	padding: 4px 0;
	font-size: 12px;
	color: #333333;
	line-height: 1.4;
	text-align: left;
	width: 100%;
	word-wrap: break-word;
	overflow-wrap: break-word;
}

.tooltip-content p strong {
	color: #000000;
	font-weight: 600;
}

/* 对比表格模态框样式 */
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	/* background: rgba(0, 0, 0, 0.8); */
	backdrop-filter: blur(5px);
	z-index: 10000;
	display: flex;
	justify-content: center;
	align-items: center;
}

.comparison-modal {
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(20px);
	border-radius: 20px;
	padding: 20px;
	max-width: 85vw;
	/* max-height: 52vh; */
	height: 440px;
	overflow: visible;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.3);
	position: relative;
	width: auto;
	min-width: 320px;
}

/* 响应式媒体查询 */
@media (max-width: 1400px) {
	.comparison-modal {
		max-width: 90vw;
		max-height: 60vh;
		padding: 15px;
	}
}

@media (max-width: 1200px) {
	.comparison-modal {
		max-width: 95vw;
		max-height: 65vh;
		padding: 12px;
	}
}

@media (max-width: 992px) {
	.comparison-modal {
		max-width: 98vw;
		max-height: 70vh;
		padding: 10px;
		border-radius: 15px;
	}
}

.modal-header {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-bottom: 20px;
}

.close-btn {
	background: none;
	border: none;
	font-size: 32px;
	color: #666666;
	cursor: pointer;
	padding: 0;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.3s ease;
}

.close-btn:hover {
	background: rgba(0, 0, 0, 0.1);
	color: #000000;
}

/* 三个独立div的对比容器 */
.comparison-container {
	display: flex;
	gap: 20px;
	align-items: flex-start;
	/* margin-bottom: 20px; */
}

/* 响应式布局调整 */
@media (max-width: 1400px) {
	.comparison-container {
		gap: 15px;
	}
}

@media (max-width: 1200px) {
	.comparison-container {
		gap: 12px;
	}
}

@media (max-width: 992px) {
	.comparison-container {
		gap: 8px;
		flex-direction: column;
		align-items: center;
	}
}

/* 左侧：指标列表区域 */
.metrics-section {
	width: 200px;
	display: flex;
	flex-direction: column;
}

/* 中间：智能水翼船区域 */
.hydrofoil-section {
	width: 250px;
	display: flex;
	flex-direction: column;
	background: rgba(255, 255, 255, 0.1);
	/* border: 1px solid rgba(255, 255, 255, 0.3); */
	background: #ffffff;
	border-radius: 15px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	padding: 15px 15px 20px 15px;
	transform: translateY(-50px);
	z-index: 10;
}

/* 右侧：传统渡轮区域 */
.traditional-section {
	width: 200px;
	display: flex;
	flex-direction: column;
}

/* 响应式宽度调整 */
@media (max-width: 1400px) {

	.metrics-section,
	.traditional-section {
		width: 180px;
	}

	.hydrofoil-section {
		width: 220px;
		padding: 12px;
	}
}

@media (max-width: 1200px) {

	.metrics-section,
	.traditional-section {
		width: 160px;
	}

	.hydrofoil-section {
		width: 200px;
		padding: 10px;
	}
}

@media (max-width: 992px) {

	.metrics-section,
	.traditional-section {
		width: 100%;
		max-width: 300px;
	}

	.hydrofoil-section {
		width: 100%;
		max-width: 320px;
		transform: translateY(0);
		margin: 10px 0;
	}
}

.metrics-list {
	display: flex;
	flex-direction: column;
}

.metric-title {
	font-size: 14px;
	font-weight: 600;
	color: #333333;
	padding: 10px 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	text-align: center;
	margin-bottom: 8px;
	line-height: 1.3;
}

.metric-item {
	font-size: 12px;
	font-weight: 600;
	color: #333333;
	padding: 8px 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	text-align: center;
}

.metric-item:last-child {
	border-bottom: none;
}

.section-header {
	text-align: center;
	margin-bottom: 15px;
}

.section-header h3 {
	font-size: 14px;
	font-weight: 600;
	color: #333333;
	margin: 0 0 10px 0;
}

.hydrofoil-section .section-header h3 {
	color: #20B2AA;
}

.boat-image {
	width: 80px;
	height: 60px;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
}

.boat-image img {
	/* width: 100%; */
	width: 150px;
	height: 100%;
	object-fit: contain;
}

.data-list {
	display: flex;
	flex-direction: column;
	gap: 0;
}

.data-item {
	padding: 8px 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	text-align: center;
}

.data-item:last-child {
	border-bottom: none;
}

.data-value {
	font-size: 12px;
	font-weight: 600;
	color: #333333;
}

/* 中间：VS分隔区域 */
.vs-section {
	position: absolute;
	width: 35px;
	height: 35px;
	z-index: 20;
	left: calc(200px + 250px + 20px);
	/* top: calc(50% - 30px); */
	top: 10%;
	transform: translateY(-50%);
}

/* VS分隔区域响应式调整 */
@media (max-width: 1400px) {
	.vs-section {
		left: calc(180px + 220px + 15px);
		width: 30px;
		height: 30px;
	}
}

@media (max-width: 1200px) {
	.vs-section {
		left: calc(160px + 200px + 12px);
		width: 28px;
		height: 28px;
	}
}

@media (max-width: 992px) {
	.vs-section {
		position: relative;
		left: auto;
		top: auto;
		transform: none;
		margin: 10px auto;
		width: 35px;
		height: 35px;
	}
}

.vs-icon {
	position: absolute;
	background: #20B2AA;
	color: white;
	font-size: 12px;
	font-weight: bold;
	border-radius: 50%;
	width: 35px;
	height: 35px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 2px 8px rgba(32, 178, 170, 0.3);
	left: 0;
	top: 0;
}

/* 右侧：传统渡轮区域 */
.traditional-section {
	width: 200px;
	display: flex;
	flex-direction: column;
}

.traditional-section .data-value {
	color: #666666;
}

/* 底部对勾图标 */
.comparison-footer {
	display: flex;
	justify-content: center;
	margin-top: -70px;
	padding-top: -70px;
	z-index: 1000;
	/* border-top: 2px solid rgba(0, 0, 0, 0.1); */
}

.checkmark {
	background: #4CAF50;
	color: white;
	font-size: 20px;
	font-weight: bold;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1000;
}

.card-content p {
	margin: 0;
	padding: 3px 0;
	font-size: 11px;
	color: #333333;
	line-height: 1.4;
	text-align: left;
	width: 100%;
	word-wrap: break-word;
	overflow-wrap: break-word;
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

/* Design&Simulation Technology 视频弹窗样式 */
.design-modal {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(25px) saturate(180%);
	-webkit-backdrop-filter: blur(25px) saturate(180%);
	border-radius: 20px;
	padding: 40px;
	max-width: 95vw;
	max-height: 90vh;
	overflow: hidden;
	box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 
				0 0 0 1px rgba(255, 255, 255, 0.1),
				inset 0 1px 0 rgba(255, 255, 255, 0.2);
	border: 1px solid rgba(255, 255, 255, 0.2);
	position: relative;
	width: auto;
	min-width: 1200px;
}

.design-modal-header {
	text-align: center;
	margin-bottom: 30px;
	position: relative;
	padding: 20px;
}

.modal-title {
	font-size: clamp(24px, 3vw, 36px);
	font-weight: 600;
	color: #ffffff;
	margin: 0;
	cursor: pointer;
	transition: all 0.3s ease;
}

.modal-title:hover {
	color: #00d4ff;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
	transform: scale(1.02);
}

.close-btn {
	position: absolute;
	top: 15px;
	right: 15px;
	background: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	font-size: 20px;
	color: #ffffff;
	cursor: pointer;
	padding: 8px;
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.3s ease;
}

.close-btn:hover {
	background: rgba(255, 255, 255, 0.25);
	border-color: rgba(0, 212, 255, 0.5);
	color: #00d4ff;
	transform: scale(1.1);
}

.videos-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(2, auto);
	gap: 15px;
	max-height: 70vh;
}

.video-container {
	position: relative;
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(15px);
	border-radius: 12px;
	overflow: hidden;
	aspect-ratio: 16/9;
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 
				inset 0 1px 0 rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.2);
	transition: all 0.3s ease;
}

.video-container:hover {
	transform: translateY(-2px);
	box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 
				inset 0 1px 0 rgba(255, 255, 255, 0.15);
	border-color: rgba(0, 212, 255, 0.3);
}

.simulation-video {
	width: 100%;
	height: 100%;
	object-fit: cover;
	opacity: 0.9;
	border-radius: 12px;
	transition: all 0.3s ease;
}

.video-container:hover .simulation-video {
	opacity: 1;
	transform: scale(1.02);
}

/* 仿真技术对比弹窗样式 */
.simulation-modal {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(25px) saturate(180%);
	-webkit-backdrop-filter: blur(25px) saturate(180%);
	border-radius: 20px;
	padding: 0;
	max-width: 95vw;
	max-height: 90vh;
	overflow: hidden;
	box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4), 
				0 0 0 1px rgba(255, 255, 255, 0.1),
				inset 0 1px 0 rgba(255, 255, 255, 0.2);
	border: 1px solid rgba(255, 255, 255, 0.2);
	position: relative;
	width: auto;
	min-width: 1200px;
}

.simulation-modal-header {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 25px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.15);
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(10px);
	position: relative;
}

.simulation-title {
	font-size: clamp(18px, 2vw, 24px);
	font-weight: 600;
	color: #333333;
	margin: 0;
	line-height: 1.3;
}

.simulation-modal .close-btn {
	position: absolute;
	top: 20px;
	right: 25px;
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	font-size: 24px;
	color: #333333;
	cursor: pointer;
	padding: 8px;
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.3s ease;
}

.simulation-modal .close-btn:hover {
	background: rgba(255, 255, 255, 0.3);
	border-color: rgba(0, 212, 255, 0.5);
	color: #00d4ff;
	transform: scale(1.1);
}

.simulation-content {
	padding: 25px;
}

.simulation-grid {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 2fr;
	grid-template-rows: 1fr 1fr 1fr;
	gap: 15px;
	height: calc(90vh - 200px);
}

.simulation-item {
	background: rgba(255, 255, 255, 0.15);
	backdrop-filter: blur(15px);
	border-radius: 12px;
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2), 
				inset 0 1px 0 rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;
}

.simulation-item:hover {
	background: rgba(255, 255, 255, 0.2);
	border-color: rgba(255, 255, 255, 0.3);
	transform: translateY(-2px);
}

.sim-video {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.data-panel {
	display: flex;
	align-items: center;
	justify-content: center;
}

.data-content {
	text-align: center;
	padding: 20px;
}

.data-title {
	font-size: 16px;
	font-weight: 600;
	color: #333333;
	margin-bottom: 15px;
}

.data-row {
	font-size: 14px;
	color: #666666;
	margin: 8px 0;
}

.text-panel {
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f8f9fa;
}

.text-content {
	width: 100%;
	height: 100%;
	padding: 20px;
}

.text-area {
	width: 100%;
	height: 100%;
	border: 2px dashed #ddd;
	border-radius: 8px;
	padding: 15px;
	font-size: 14px;
	color: #666;
	background: #fff;
	outline: none;
	min-height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	cursor: text;
}

.text-area:empty::before {
	content: "Click here to add text...";
	color: #999;
	font-style: italic;
}

.text-area:focus {
	border-color: #00d4ff;
	box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
}

.parameter-info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	padding: 20px;
}

.param-row {
	font-size: 16px;
	color: #333333;
	margin: 8px 0;
	font-weight: 500;
	text-align: center;
}

.param-title {
	font-size: 18px;
	color: #333333;
	font-weight: 600;
	margin-bottom: 15px;
	text-align: center;
}

.param-value {
	font-size: 16px;
	color: #333333;
	margin: 8px 0;
	font-weight: 500;
	text-align: center;
}

.vs-divider {
	font-size: 18px;
	color: #ff6b6b;
	font-weight: bold;
	margin: 12px 0;
	text-align: center;
}

.chart-panel {
	display: flex;
	flex-direction: column;
	padding: 15px;
}

.chart-container {
	flex: 1;
	min-height: 120px;
}

.chart-label {
	text-align: center;
	padding: 10px;
	background: rgba(0, 0, 0, 0.05);
	border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.chart-label div {
	font-size: 12px;
	color: #333333;
	margin: 2px 0;
}

.vs-text {
	font-weight: bold;
	color: #ff6b6b;
	margin: 5px 0;
}

.conclusion-panel {
	grid-column: 4;
	grid-row: 1 / 4;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	padding: 20px;
}

.conclusion-content {
	text-align: left;
}

.conclusion-title {
	font-size: 18px;
	font-weight: 600;
	color: #333333;
	margin-bottom: 15px;
}

.conclusion-point {
	font-size: 16px;
	color: #666666;
	line-height: 1.6;
	margin-bottom: 15px;
}

.conclusion-point strong {
	color: #333333;
	font-weight: 600;
}

.simulation-modal-content {
	width: 100%;
	height: 100%;
}

.simulation-title {
	font-size: 20px;
	/* font-weight: 600; */
	color: #ffffff;
	text-align: center;
	margin-bottom: 25px;
	line-height: 1.3;
}

.simulation-comparison {
	display: grid;
	grid-template-columns: repeat(4, 200px);
	grid-template-rows: repeat(3, 200px);
	gap: 15px;
	height: 100%;
	/* width: 680px; */
	/* border: 2px solid #ff0000; */
	border-radius: 10px;
	padding: 20px;
	background: rgba(255, 255, 255, 0.95);
}

/* 左侧区域：水翼船数据 */
.left-section {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 15px;
}

/* 右侧区域：传统船数据 */
.right-section {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 15px;
}

/* 中间VS分隔 */
.vs-divider {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	flex-shrink: 0;
}

.vs-text {
	font-size: 18px;
	font-weight: bold;
	color: #20B2AA;
	background: rgba(32, 178, 170, 0.1);
	padding: 10px;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* 中间分隔区域 - 显示参数信息 */
.middle-divider {
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 40px;
	flex-shrink: 0;
	gap: 8px;
	height: 100%;
	min-height: 100%;
}

.divider-item {
	font-size: 10px;
	font-weight: 500;
	color: #000000;
	/* background: rgba(255, 255, 255, 0.2); */
	padding: 4px 8px;
	/* border-radius: 4px; */
	text-align: center;
	white-space: nowrap;
	backdrop-filter: blur(5px);
	/* border: 1px solid rgba(255, 255, 255, 0.3); */
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* 仿真视频容器 */
.simulation-video-container {
	background: rgba(240, 248, 255, 0.8);
	border-radius: 15px;
	padding: 15px;
	border: 1px solid rgba(0, 212, 255, 0.3);
	text-align: center;
}

.simulation-label {
	font-size: 16px;
	font-weight: 600;
	color: #333333;
	margin-bottom: 10px;
}

.simulation-video {
	width: 100%;
	height: 200px;
	object-fit: cover;
	border-radius: 10px;
	margin-bottom: 10px;
}

/* .video-params {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	justify-content: center;
} */

.param-item {
	font-size: 11px;
	color: #666666;
	background: rgba(255, 255, 255, 0.7);
	padding: 4px 8px;
	border-radius: 4px;
}

/* 图表图片容器 */
.chart-image-container {
	background: rgba(245, 245, 245, 0.8);
	border-radius: 15px;
	padding: 15px;
	border: 1px solid rgba(0, 0, 0, 0.1);
}

.chart-title {
	font-size: 14px;
	font-weight: 600;
	color: #333333;
	margin-bottom: 10px;
	text-align: center;
}

.chart-image {
	width: 100%;
	height: 150px;
	margin-bottom: 10px;
}

.chart-image img {
	width: 100%;
	height: 100%;
	object-fit: contain;
	border-radius: 8px;
}

.chart-comparison {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 11px;
	color: #666666;
}

.chart-comparison .vs-text {
	font-size: 12px;
	font-weight: bold;
	color: #20B2AA;
	background: none;
	padding: 0;
	width: auto;
	height: auto;
}

/* 结论部分 */
.conclusion-section {
	flex: 1;
	background: rgba(245, 245, 245, 0.8);
	border-radius: 15px;
	padding: 20px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	max-width: 300px;
}

.conclusion-title {
	font-size: 16px;
	font-weight: 600;
	color: #333333;
	margin-bottom: 15px;
}

.conclusion-item {
	margin-bottom: 15px;
	font-size: 11px;
	line-height: 1.4;
	color: #666666;
}

.conclusion-item strong {
	color: #333333;
	font-weight: 600;
}

/* 响应式调整 */
@media (max-width: 1200px) {
	.simulation-comparison {
		flex-direction: column;
		gap: 15px;
	}

	.left-section,
	.right-section {
		flex-direction: row;
		gap: 10px;
	}

	.vs-divider {
		width: 100%;
		height: 40px;
	}

	.conclusion-section {
		max-width: 100%;
	}
}

@media (max-width: 768px) {

	.design-modal,
	.simulation-modal {
		max-width: 95vw;
		max-height: 90vh;
		padding: 15px;
	}

	.simulation-title {
		font-size: 18px;
		margin-bottom: 20px;
	}

	.left-section,
	.right-section {
		flex-direction: column;
		gap: 10px;
	}

	.simulation-video {
		height: 150px;
	}

	.chart-image {
		height: 120px;
	}

	.conclusion-section {
		padding: 15px;
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
