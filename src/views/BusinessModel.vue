<template>
	<div class="business-model">
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
				<div class="nav-item active">Business Model</div>
				<div class="nav-divider"></div>
				<router-link to="/team-composition" class="nav-item">Team Composition</router-link>
				<div class="nav-divider"></div>
				<router-link to="/product-introduction" class="nav-item">Product Introduction</router-link>
			</div>
		</nav>

		<!-- 主要内容区域 -->
		<div class="main-content">
			<!-- 左侧面板：Revenue Model + Channel Strategy -->
			<div class="left-panel">
				<!-- 收入模型图表 -->
				<div class="chart-card" @click="showContent('revenue')">
					<h3 class="chart-title">Revenue Model</h3>
					<div class="chart-container">
						<div ref="revenueChartRef" class="revenue-echart"></div>
					</div>
				</div>


				<!-- 渠道策略 -->
				<div class="strategy-card">
					<h3 class="strategy-title">Channel Strategy</h3>

					<div class="strategy-section">
						<!-- <h4 class="strategy-subtitle">Domestic (B-end water area operator)</h4> -->
						<div class="strategy-subtitle">Domestic (B-end water area operator)</div>
						<div class="strategy-content">
							<p class="strategy-label">Positioning:</p>
							<p class="strategy-text">To provide a full cycle hydrofoil operation solution for scenic
								spots, passenger transport companies, and hotels.</p>

							<p class="strategy-label">Core module:</p>
							<p class="strategy-text">Fleet operation and maintenance (equipment support)+safety
								management (real-time monitoring)</p>
							<p class="strategy-text">Product operation (leasing system)+dock support (infrastructure
								support)</p>
						</div>
					</div>

					<div class="strategy-section">
						<h4 class="strategy-subtitle">Overseas business (C-end private enterprises/private berth users)
						</h4>
						<div class="strategy-content">
							<p class="strategy-label">Positioning:</p>
							<p class="strategy-text">To build an intelligent hydrofoil boat lifestyle ecosystem for
								middle-class private berth users.</p>

							<p class="strategy-label">Core module:</p>
							<p class="strategy-text">Map service (navigation planning)+APP service (remote control)</p>
							<p class="strategy-text">Additional services (customized maintenance/social functions)</p>
						</div>
					</div>
				</div>
			</div>

			<!-- 中间面板：Lake Como 地图 -->
			<div class="middle-panel">
				<div class="map-container">
					<!-- SVG 覆盖层用于精确标记点定位 -->
					<!-- <svg class="map-overlay" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
						<circle cx="25" cy="20" r="2" class="marker-svg marker-1" />
						<circle cx="65" cy="45" r="2" class="marker-svg marker-2" />
						<circle cx="80" cy="70" r="2" class="marker-svg marker-3" />
					</svg> -->

					<!-- 文字标签 -->
					<div class="map-overlays">
						<div class="overlay-text overlay-1" @click="showContent('profit')">Operating profit and loss
							statement</div>
						<div class="overlay-text overlay-2" @click="showContent('lake')">The case of Lake Como</div>
						<div class="overlay-text overlay-3" @click="showContent('tourists')">Daily average number of
							boat tourists</div>
					</div>
				</div>
			</div>
			<!-- 右侧面板：详细内容 -->
			<div class="right-panel">
				<!-- 默认显示内容 -->
				<!-- <div v-if="!activeContent" class="default-content">
					<h2 class="panel-title">Business Model Details</h2>
					<p class="panel-subtitle">Click on the map markers to view detailed information</p>
				</div> -->

				<!-- Revenue Model 弹窗 -->
			<div class="revenue-modal" v-if="activeContent === 'revenue'" @click="hideContent">
				<div class="revenue-modal-content" @click.stop>
					<div class="modal-header">
						<h2 class="modal-title">Revenue Model Analysis</h2>
						<button class="close-btn" @click="hideContent">×</button>
					</div>
					<div class="charts-grid">
						<div class="chart-item">
							<h3 class="chart-item-title">Annual Revenue Growth</h3>
							<div ref="chart1Ref" class="modal-chart"></div>
						</div>
						<div class="chart-item">
							<h3 class="chart-item-title">Revenue by Product Line</h3>
							<div ref="chart2Ref" class="modal-chart"></div>
						</div>
						<div class="chart-item">
							<h3 class="chart-item-title">Market Share Distribution</h3>
							<div ref="chart3Ref" class="modal-chart"></div>
						</div>
						<div class="chart-item">
							<h3 class="chart-item-title">Profit Margin Trends</h3>
							<div ref="chart4Ref" class="modal-chart"></div>
						</div>
					</div>
				</div>
			</div>

				<!-- 内容面板 -->
			<div class="content-panel" v-if="activeContent && activeContent !== 'revenue'">
				<!-- 返回按钮 -->
				<!-- <div class="back-btn" @click="hideContent">
					<div class="back-icon">←</div>
					<span>Back to Map</span>
			</div> -->

				<!-- Lake Como 案例内容 -->
					<div v-if="activeContent === 'lake'" class="lake-content">
						<h2 class="content-title">The case of Lake Como</h2>
						<h3 class="content-subtitle">Daily average number of tourists</h3>

						<!-- 饼图 -->
						<div class="pie-chart-container">
							<div class="pie-chart">
								<div class="pie-segment peak-season">
									<div class="segment-label">Peak Season<br>June-September<br>Daily average number of
										tourists<br>15000-20000 people/time</div>
								</div>
								<div class="pie-segment off-season">
									<div class="segment-label">Off-Season<br>October-May<br>Daily average number of
										tourists<br>5000-10000 people/time</div>
								</div>
							</div>
						</div>

						<!-- 描述文字 -->
						<p class="description-text">
							Each hotel has an average of 100 rooms, totaling 400 rooms, calculated based on the number
							of tourists during the off-season.
						</p>

						<!-- 柱状图 -->
						<div class="bar-charts">
							<div class="bar-row">
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
							</div>
							<div class="bar-row">
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
							</div>
							<div class="bar-row">
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item filled"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
								<div class="bar-item empty"></div>
							</div>
						</div>

						<!-- 图例 -->
						<div class="legend">
							<div class="legend-item">
								<span class="legend-label">Daily average number of tourists</span>
								<span class="legend-value">10000 people</span>
							</div>
							<div class="legend-item">
								<span class="legend-label">Hotel load capacity</span>
								<span class="legend-value">1200 people</span>
							</div>
							<div class="legend-item">
								<span class="legend-label">Overnight tourists (50% occupancy rate)</span>
								<span class="legend-value">400-600 people</span>
							</div>
						</div>
					</div>

					<!-- 其他内容面板可以在这里添加 -->
					<div v-if="activeContent === 'tourists'" class="tourists-content">
						<h2 class="content-title">Daily average number of boat tourists</h2>
						<p>Tourist data content will be displayed here.</p>
					</div>

					<div v-if="activeContent === 'profit'" class="profit-content">
						<h2 class="content-title">Operating profit and loss statement</h2>
						<p>Profit and loss data will be displayed here.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'

const router = useRouter()

// 内容面板状态
const activeContent = ref(null)

// 图表数据
const chartData = ref([
	// { orange: 70, teal: 65 },
	// { orange: 75, teal: 70 },
	// { orange: 80, teal: 75 },
	// { orange: 85, teal: 85 },
	// { orange: 90, teal: 90 },
	// { orange: 95, teal: 95 },
	{ orange: 100, teal: 100 },
	{ orange: 95, teal: 65 },
	{ orange: 100, teal: 70 },
	{ orange: 105, teal: 75 },
	{ orange: 110, teal: 80 },
	{ orange: 120, teal: 90 }
])

// 显示内容面板
async function showContent(contentType) {
	console.log('点击了内容类型:', contentType)
	activeContent.value = contentType
	console.log('activeContent 现在是:', activeContent.value)
	
	// 如果是revenue类型，渲染模态框图表
	if (contentType === 'revenue') {
		await nextTick()
		renderModalCharts()
	}
}

// 隐藏内容面板
function hideContent() {
	activeContent.value = null
}

// ECharts: Revenue Model
const revenueChartRef = ref(null)
let revenueChartInstance = null

// Revenue Modal Charts
const chart1Ref = ref(null)
const chart2Ref = ref(null)
const chart3Ref = ref(null)
const chart4Ref = ref(null)
let chart1Instance = null
let chart2Instance = null
let chart3Instance = null
let chart4Instance = null

function renderRevenueChart() {
	if (!revenueChartRef.value) return
	if (!revenueChartInstance) {
		revenueChartInstance = echarts.init(revenueChartRef.value)
	}

	const oranges = chartData.value.map(d => d.orange)
	const teals = chartData.value.map(d => d.teal)

	const option = {
		animation: true,
		grid: { top: 10, bottom: 8, containLabel: false },
		xAxis: {
			type: 'category',
			data: new Array(chartData.value.length).fill(''),
			axisLine: { show: false },
			axisTick: { show: false },
			axisLabel: { show: false },
			splitLine: { show: false }
		},
		yAxis: { type: 'value', show: false },
		tooltip: { show: false },
		series: [
			{
				name: 'Orange',
				type: 'bar',
				data: oranges,
				barWidth: 15,
				// barGap: '5%',
				itemStyle: {
					// borderRadius: [6, 6, 0, 0],
					shadowColor: 'rgba(0,0,0,0.35)',
					shadowBlur: 10,
					shadowOffsetY: 4,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#FFC27A' },
						{ offset: 0.35, color: '#FF9A4E' },
						{ offset: 1, color: 'rgba(140, 98, 64, 0.65)' }
					])
				}
			},
			{
				name: 'Teal',
				type: 'bar',
				data: teals,
				barWidth: 15,
				// barGap: '5%',
				itemStyle: {
					// borderRadius: [6, 6, 0, 0],
					shadowColor: 'rgba(0,0,0,0.35)',
					shadowBlur: 10,
					shadowOffsetY: 4,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#3FF4FF' },
						{ offset: 0.35, color: '#19D8F3' },
						{ offset: 1, color: 'rgba(22, 79, 96, 0.65)' }
					])
				}
			}
		]
	}

	revenueChartInstance.setOption(option)
	// 自适应
	setTimeout(() => { revenueChartInstance?.resize() }, 0)
}

// 渲染模态框图表
function renderModalCharts() {
	// Chart 1: 左上角 - 年度数据柱状图（蓝色和橙色）
	if (chart1Ref.value) {
		// 销毁旧实例
		if (chart1Instance) {
			chart1Instance.dispose()
		}
		// 重新创建实例
		chart1Instance = echarts.init(chart1Ref.value)
		const option1 = {
			title: {
				text: 'What the cost of a single ship is 200000 yuan, Profit when each sales volume is achieved',
				textStyle: { fontSize: 12, color: '#333' },
				top: 10
			},
			grid: { top: 60, bottom: 60, left: 40, right: 40 },
			legend: {
				data: ['Annual breakeven sales volume (units)', 'Gross profit margin'],
				bottom: 10,
				textStyle: { fontSize: 10 }
			},
			xAxis: {
				type: 'category',
				data: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
				axisLabel: { color: '#666', fontSize: 10 }
			},
			yAxis: {
				type: 'value',
				axisLabel: { color: '#666', fontSize: 10 }
			},
			series: [
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'bar',
					data: [45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92, 95, 98, 102, 105, 108],
					itemStyle: { color: '#00d4ff' }
				},
				{
					name: 'Gross profit margin',
					type: 'bar',
					data: [25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88],
					itemStyle: { color: '#FFC27A' }
				}
			]
		}
		chart1Instance.setOption(option1)
	}

	// Chart 2: 右上角 - 年度数据柱状图（蓝色和橙色）
	if (chart2Ref.value) {
		// 销毁旧实例
		if (chart2Instance) {
			chart2Instance.dispose()
		}
		// 重新创建实例
		chart2Instance = echarts.init(chart2Ref.value)
		const option2 = {
			title: {
				text: 'What the cost of a single ship is 200000 yuan, Profit when each sales volume is achieved',
				textStyle: { fontSize: 12, color: '#333' },
				top: 10
			},
			grid: { top: 60, bottom: 60, left: 40, right: 40 },
			legend: {
				data: ['Annual breakeven sales volume (units)', 'Gross profit margin'],
				bottom: 10,
				textStyle: { fontSize: 10 }
			},
			xAxis: {
				type: 'category',
				data: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
				axisLabel: { color: '#666', fontSize: 10 }
			},
			yAxis: {
				type: 'value',
				axisLabel: { color: '#666', fontSize: 10 }
			},
			series: [
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'bar',
					data: [18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55],
					itemStyle: { color: '#00d4ff' }
				},
				{
					name: 'Gross profit margin',
					type: 'bar',
					data: [12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48],
					itemStyle: { color: '#FFC27A' }
				}
			]
		}
		chart2Instance.setOption(option2)
	}

	// Chart 3: 左下角 - 面积图
	if (chart3Ref.value) {
		// 销毁旧实例
		if (chart3Instance) {
			chart3Instance.dispose()
		}
		// 重新创建实例
		chart3Instance = echarts.init(chart3Ref.value)
		const option3 = {
			title: {
				text: 'What the cost of a single ship is 200000 yuan, Profit when each sales volume is achieved',
				textStyle: { fontSize: 12, color: '#333' },
				top: 10
			},
			grid: { top: 60, bottom: 60, left: 40, right: 40 },
			legend: {
				data: ['Annual breakeven sales volume (units)', 'Gross profit margin'],
				bottom: 10,
				textStyle: { fontSize: 10 }
			},
			xAxis: {
				type: 'category',
				data: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
				axisLabel: { color: '#666', fontSize: 10 }
			},
			yAxis: {
				type: 'value',
				axisLabel: { color: '#666', fontSize: 10, formatter: '{value}%' }
			},
			series: [
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'line',
					data: [42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92, 95, 98, 102, 105],
					smooth: true,
					lineStyle: { color: '#00d4ff' },
					itemStyle: { color: '#00d4ff' },
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: 'rgba(0, 212, 255, 0.6)' },
							{ offset: 1, color: 'rgba(0, 212, 255, 0.1)' }
						])
					}
				},
				{
					name: 'Gross profit margin',
					type: 'line',
					data: [22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85],
					smooth: true,
					lineStyle: { color: '#FFC27A' },
					itemStyle: { color: '#FFC27A' },
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: 'rgba(255, 194, 122, 0.6)' },
							{ offset: 1, color: 'rgba(255, 194, 122, 0.1)' }
						])
					}
				}
			]
		}
		chart3Instance.setOption(option3)
	}

	// Chart 4: 右下角 - 面积图
	if (chart4Ref.value) {
		// 销毁旧实例
		if (chart4Instance) {
			chart4Instance.dispose()
		}
		// 重新创建实例
		chart4Instance = echarts.init(chart4Ref.value)
		const option4 = {
			title: {
				text: 'What the cost of a single ship is 200000 yuan, Profit when each sales volume is achieved',
				textStyle: { fontSize: 12, color: '#333' },
				top: 10
			},
			grid: { top: 60, bottom: 60, left: 40, right: 40 },
			legend: {
				data: ['Annual breakeven sales volume (units)', 'Gross profit margin'],
				bottom: 10,
				textStyle: { fontSize: 10 }
			},
			xAxis: {
				type: 'category',
				data: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
				axisLabel: { color: '#666', fontSize: 10 }
			},
			yAxis: {
				type: 'value',
				axisLabel: { color: '#666', fontSize: 10, formatter: '{value}%' }
			},
			series: [
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'line',
					data: [15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52],
					smooth: true,
					lineStyle: { color: '#00d4ff' },
					itemStyle: { color: '#00d4ff' },
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: 'rgba(0, 212, 255, 0.6)' },
							{ offset: 1, color: 'rgba(0, 212, 255, 0.1)' }
						])
					}
				},
				{
					name: 'Gross profit margin',
					type: 'line',
					data: [8, 12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45],
					smooth: true,
					lineStyle: { color: '#FFC27A' },
					itemStyle: { color: '#FFC27A' },
					areaStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{ offset: 0, color: 'rgba(255, 194, 122, 0.6)' },
							{ offset: 1, color: 'rgba(255, 194, 122, 0.1)' }
						])
					}
				}
			]
		}
		chart4Instance.setOption(option4)
	}

	// 自适应调整
	setTimeout(() => {
		chart1Instance?.resize()
		chart2Instance?.resize()
		chart3Instance?.resize()
		chart4Instance?.resize()
	}, 100)
}

onMounted(() => {
	renderRevenueChart()
	window.addEventListener('resize', onWindowResize)
})

function onWindowResize() {
	if (revenueChartInstance) revenueChartInstance.resize()
}

onBeforeUnmount(() => {
	window.removeEventListener('resize', onWindowResize)
	if (revenueChartInstance) {
		revenueChartInstance.dispose()
		revenueChartInstance = null
	}
	if (chart1Instance) {
		chart1Instance.dispose()
		chart1Instance = null
	}
	if (chart2Instance) {
		chart2Instance.dispose()
		chart2Instance = null
	}
	if (chart3Instance) {
		chart3Instance.dispose()
		chart3Instance = null
	}
	if (chart4Instance) {
		chart4Instance.dispose()
		chart4Instance = null
	}
})

// 若数据变化，重绘
watchEffect(() => {
	if (revenueChartInstance) renderRevenueChart()
})

function goHome() {
	router.push('/')
}

onMounted(() => {
	// 页面加载完成后的初始化逻辑
})
</script>

<style scoped>
.business-model {
	min-height: 100vh;
	background: url('../assets/bs_bg.png') center/contain;
	/* 背景色为#000000 */
	background-color: #000000;
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
	height: calc(100vh - 80px);
	max-height: calc(100vh - 80px);
	padding-top: 80px;
	gap: 20px;
	overflow: hidden;
}

/* 左侧面板：Revenue Model + Channel Strategy */
.left-panel {
	flex: 1;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 15px;
	overflow-y: auto;
}

/* 中间面板：Lake Como 地图 */
.middle-panel {
	flex: 1.8;
	/* padding: 40px; */
	display: flex;
	/* align-items: center; */
	justify-content: center;
}

/* 右侧面板：详细内容 */
.right-panel {
	flex: 1;
	/* padding: 40px; */
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

/* 默认内容样式 */
.default-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	text-align: center;
}

.panel-title {
	font-size: 24px;
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 15px;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.panel-subtitle {
	font-size: 16px;
	color: #cccccc;
	line-height: 1.6;
}

/* 图表卡片 */
.chart-card {
	background: rgba(255, 255, 255, 0.08);
	backdrop-filter: blur(15px);
	border-radius: 15px;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.15);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	flex-shrink: 0;
	overflow: hidden;
}

.chart-title {
	font-size: 18px;
	font-weight: 700;
	margin-bottom: 15px;
	color: #ffffff;
	text-align: center;
	letter-spacing: 0.5px;
}

.chart-container {
	height: 120px;
	display: flex;
	align-items: end;
	gap: 6px;
	padding: 5px 0;
	overflow: hidden;
}

.revenue-echart {
	width: 100%;
	height: 110px;
}

/* 策略卡片 */
.strategy-card {
	/* background: rgba(255, 255, 255, 0.08); */
	/* backdrop-filter: blur(15px); */
	/* border-radius: 20px; */
	padding: 15px;
	/* border: 1px solid rgba(255, 255, 255, 0.15); */
	/* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); */
	flex: 1;
	overflow-y: auto;
}

.strategy-title {
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 15px;
	color: #ffffff;
}

.strategy-section {
	margin-bottom: 15px;
}

.strategy-section:last-child {
	margin-bottom: 0;
}

.strategy-subtitle {
	font-size: 14px;
	/* font-weight: 600; */
	/* color: #00d4ff; */
	margin-bottom: 10px;
}

.strategy-content {
	/* margin-left: 20px; */
}

.strategy-label {
	font-size: 12px;
	font-weight: 600;
	color: #ffffff;
	margin: 8px 0 3px 0;
}

.strategy-text {
	font-size: 11px;
	line-height: 1.4;
	color: #cccccc;
	margin: 3px 0;
}

/* 地图容器 */
.map-container {
	position: relative;
	width: 100%;
	height: 100%;
	max-height: calc(100vh - 160px);
	background: url('../assets/bs_map.png') center/cover no-repeat;
	border-radius: 20px;
	overflow: hidden;

	/* border: 2px solid rgba(0, 212, 255, 0.4); */
	/* 动画效果 */
	/* animation: mapGlow 3s ease-in-out infinite alternate; */
}

/* SVG 覆盖层 */
.map-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 2;
}

/* SVG 标记点样式 */
.marker-svg {
	fill: #00d4ff;
	filter: drop-shadow(0 0 20px rgba(0, 212, 255, 1)) drop-shadow(0 0 40px rgba(0, 212, 255, 0.8)) drop-shadow(0 0 60px rgba(0, 212, 255, 0.6));
	/* animation: svgMarkerPulse 2s ease-in-out infinite; */
}

.marker-svg.marker-1 {
	animation-delay: 0s;
}

.marker-svg.marker-2 {
	animation-delay: 0.3s;
}

.marker-svg.marker-3 {
	animation-delay: 0.6s;
}

.map-background {
	position: relative;
	width: 100%;
	height: 100%;
	background: radial-gradient(circle at 30% 40%, rgba(0, 212, 255, 0.1) 0%, transparent 50%);
}

/* .lake-outline {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	height: 60%;
	background: linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.3) 50%, transparent 70%);
	border-radius: 50% 30% 50% 30%;
	box-shadow:
		0 0 20px rgba(0, 212, 255, 0.5),
		inset 0 0 20px rgba(0, 212, 255, 0.2);
	animation: glow 3s ease-in-out infinite alternate;
} */

@keyframes glow {
	from {
		box-shadow:
			0 0 20px rgba(0, 212, 255, 0.5),
			inset 0 0 20px rgba(0, 212, 255, 0.2);
	}

	to {
		box-shadow:
			0 0 30px rgba(0, 212, 255, 0.8),
			inset 0 0 30px rgba(0, 212, 255, 0.4);
	}
}

.map-markers {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.marker {
	position: absolute;
	width: 18px;
	height: 18px;
	background: radial-gradient(circle, #00d4ff 0%, #0099cc 60%, #006699 100%);
	border-radius: 50%;
	box-shadow:
		inset 0 0 8px rgba(255, 255, 255, 0.4),
		0 0 25px rgba(0, 212, 255, 1),
		0 0 50px rgba(0, 212, 255, 0.9),
		0 0 75px rgba(0, 212, 255, 0.7),
		0 0 100px rgba(0, 212, 255, 0.5),
		0 0 125px rgba(0, 212, 255, 0.3);
	animation: markerPulse 2s ease-in-out infinite;
	border: 2px solid rgba(255, 255, 255, 0.6);
}

.marker-1 {
	top: 20%;
	left: 25%;
	transform: translate(-50%, -50%);
}

.marker-2 {
	top: 45%;
	left: 65%;
	transform: translate(-50%, -50%);
}

.marker-3 {
	top: 70%;
	left: 80%;
	transform: translate(-50%, -50%);
}

@keyframes markerPulse {

	0%,
	100% {
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
		box-shadow:
			inset 0 0 8px rgba(255, 255, 255, 0.4),
			0 0 25px rgba(0, 212, 255, 1),
			0 0 50px rgba(0, 212, 255, 0.9),
			0 0 75px rgba(0, 212, 255, 0.7),
			0 0 100px rgba(0, 212, 255, 0.5),
			0 0 125px rgba(0, 212, 255, 0.3);
	}

	50% {
		transform: translate(-50%, -50%) scale(1.3);
		opacity: 0.95;
		box-shadow:
			inset 0 0 12px rgba(255, 255, 255, 0.6),
			0 0 40px rgba(0, 212, 255, 1),
			0 0 80px rgba(0, 212, 255, 0.95),
			0 0 120px rgba(0, 212, 255, 0.8),
			0 0 160px rgba(0, 212, 255, 0.6),
			0 0 200px rgba(0, 212, 255, 0.4);
	}
}

@keyframes svgMarkerPulse {

	0%,
	100% {
		transform: scale(1);
		filter: drop-shadow(0 0 20px rgba(0, 212, 255, 1)) drop-shadow(0 0 40px rgba(0, 212, 255, 0.8)) drop-shadow(0 0 60px rgba(0, 212, 255, 0.6));
	}

	50% {
		transform: scale(1.3);
		filter: drop-shadow(0 0 30px rgba(0, 212, 255, 1)) drop-shadow(0 0 60px rgba(0, 212, 255, 0.9)) drop-shadow(0 0 90px rgba(0, 212, 255, 0.7));
	}
}

@keyframes pulse {

	0%,
	100% {
		transform: scale(1);
		opacity: 1;
	}

	50% {
		transform: scale(1.2);
		opacity: 0.8;
	}
}

.map-overlays {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: auto;
}

.overlay-text {
	position: absolute;
	font-size: 13px;
	font-weight: 600;
	color: #ffffff;
	background: transparent;
	padding: 8px 12px;
	white-space: nowrap;
	cursor: pointer;
	z-index: 10;
	pointer-events: auto;
}

.overlay-text:hover {
	/* 移除所有hover效果 */
}

.overlay-1 {
	top: 70%;
	left: 20%;
	transform: translate(-50%, -50%);
}

.overlay-2 {
	top: 40%;
	left: 54%;
	transform: translate(-50%, -50%);
}

.overlay-3 {
	top: 65%;
	left: 70%;
	transform: translate(-50%, -50%);
}

/* 内容面板样式 */
.content-panel {
	/* width: 100%; */
	max-height: 70vh;
	/* background: rgba(0, 0, 0, 0.9); */
	backdrop-filter: blur(15px);
	border-radius: 20px;
	padding: 25px;
	overflow: hidden;
	animation: slideIn 0.5s ease-out;
	border: 1px solid rgba(0, 212, 255, 0.3);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
	margin: 10px 5px;
}

@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateX(100%);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}

.back-btn {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 30px;
	cursor: pointer;
	color: #00d4ff;
	font-size: 16px;
	font-weight: 600;
	transition: all 0.3s ease;
}

.back-btn:hover {
	color: #ffffff;
	transform: translateX(-5px);
}

.back-icon {
	font-size: 20px;
}

.content-title {
	font-size: 24px;
	font-weight: 700;
	color: #ffffff;
	margin-bottom: 8px;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.content-subtitle {
	font-size: 16px;
	font-weight: 500;
	color: #cccccc;
	margin-bottom: 20px;
}

/* 饼图样式 */
.pie-chart-container {
	display: flex;
	justify-content: center;
	margin: 20px 0;
}

.pie-chart {
	width: 150px;
	height: 150px;
	border-radius: 50%;
	position: relative;
	overflow: hidden;
}

.pie-segment {
	position: absolute;
	width: 100%;
	height: 100%;
	clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%);
	display: flex;
	align-items: center;
	justify-content: center;
}

.peak-season {
	background: linear-gradient(45deg, #FF9A4E, #FFC27A);
	clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%);
}

.off-season {
	background: linear-gradient(45deg, #19D8F3, #3FF4FF);
	clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 0% 100%, 0% 50%);
}

.segment-label {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	font-size: 12px;
	font-weight: 600;
	color: #ffffff;
	text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
	line-height: 1.3;
}

.description-text {
	font-size: 14px;
	color: #cccccc;
	line-height: 1.6;
	margin: 20px 0;
	text-align: center;
}

/* 柱状图样式 */
.bar-charts {
	margin: 20px 0;
}

.bar-row {
	display: flex;
	gap: 2px;
	margin-bottom: 10px;
	justify-content: center;
}

.bar-item {
	width: 12px;
	height: 12px;
	border-radius: 2px;
}

.bar-item.filled {
	background: #19D8F3;
}

.bar-item.empty {
	background: rgba(255, 255, 255, 0.2);
}

/* 图例样式 */
.legend {
	margin-top: 20px;
}

.legend-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.legend-item:last-child {
	border-bottom: none;
}

.legend-label {
	font-size: 14px;
	color: #cccccc;
}

.legend-value {
	font-size: 14px;
	font-weight: 600;
	color: #00d4ff;
}


/* Revenue Modal 样式 */
.revenue-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(10px);
	z-index: 1000;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: fadeIn 0.3s ease-out;
}

.revenue-modal-content {
	background: #ffffff;
	border-radius: 20px;
	width: 90vw;
	max-width: 1200px;
	height: 80vh;
	max-height: 800px;
	padding: 30px;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
	padding-bottom: 20px;
	border-bottom: 2px solid #f0f0f0;
}

.modal-title {
	font-size: 28px;
	font-weight: 700;
	color: #333333;
	margin: 0;
}

.close-btn {
	background: none;
	border: none;
	font-size: 32px;
	color: #999999;
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
	background: #f5f5f5;
	color: #333333;
}

.charts-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 30px;
	flex: 1;
	overflow: hidden;
}

.chart-item {
	background: #fafafa;
	border-radius: 15px;
	padding: 20px;
	border: 1px solid #e0e0e0;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.chart-item-title {
	font-size: 16px;
	font-weight: 600;
	color: #333333;
	margin: 0 0 15px 0;
	text-align: center;
}

.modal-chart {
	flex: 1;
	min-height: 0;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: scale(0.9);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
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
	.right-section {
		padding: 20px;
	}

	.chart-container {
		height: 150px;
	}

	.map-container {
		height: 300px;
	}
}
</style>
