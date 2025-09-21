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
				<div class="chart-card revenue-hover-card" :class="{ 'revenue-selected': isRevenueSelected }"
					@click="showContent('revenue')">
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
				<div class="map-container" @click="showContent('lake')">
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
							<!-- <h2 class="modal-title">Revenue Model Analysis</h2> -->
							<button class="close-btn" @click="hideContent">×</button>
						</div>
						<div class="charts-grid">
							<div class="chart-item">
								<!-- <h3 class="chart-item-title">Annual Revenue Growth</h3> -->
								<div ref="chart1Ref" class="modal-chart"></div>
							</div>
							<div class="chart-item">
								<!-- <h3 class="chart-item-title">Revenue by Product Line</h3> -->
								<div ref="chart2Ref" class="modal-chart"></div>
							</div>
							<div class="chart-item">
								<!-- <h3 class="chart-item-title">Market Share Distribution</h3> -->
								<div ref="chart3Ref" class="modal-chart"></div>
							</div>
							<div class="chart-item">
								<!-- <h3 class="chart-item-title">Profit Margin Trends</h3> -->
								<div ref="chart4Ref" class="modal-chart"></div>
							</div>
						</div>
					</div>
				</div>
				<!-- 内容面板 -->
				<div class="content-panel" v-if="activeContent && activeContent !== 'revenue'">

					<!-- Lake Como 案例内容 -->
					<div v-if="activeContent === 'lake' && !showLakeDetail" class="lake-content"
						@click="showLakeDetailPanel">
						<div class="content-title">The case of Lake Como</div>
						<div class="content-subtitle">Daily average number of tourists</div>

						<!-- ECharts 圆环图 -->
						<div class="pie-chart-container">
							<div ref="pieChartRef" class="pie-chart-echarts"></div>
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

					<!-- Lake详情面板 -->
					<div v-if="activeContent === 'lake' && showLakeDetail" class="lake-content" @click="hideContent">
						<!-- Transportation Demand 部分 -->
						<div class="transportation-demand-section">
							<div class="main-title">Daily average number of boat tourists</div>
							<div class="section-title">Transportation Demand</div>

							<!-- ECharts 半环形图 -->
							<div class="demand-chart-container">
								<div ref="demandChartRef" class="demand-chart-echarts"></div>
								<!-- 引导线连接的文字 -->
								<div class="chart-labels">
									<div class="chart-label-left">
										<div class="label-text">Daily transportation demand</div>
										<div class="label-text">in the lake area</div>
									</div>
									<div class="chart-label-right">
										<div class="label-text">Connection Requirements</div>
									</div>
									<div class="chart-label-bottom">
										<div class="label-text">Other Requirements</div>
									</div>
								</div>
							</div>

							<!-- 描述文字 -->
							<div class="demand-description">
								<p>Each ship has a passenger capacity of 4 people</p>
								<p>The total demand for hydrofoil boats is 25-38</p>
							</div>
						</div>

						<!-- 游客数据部分 -->
						<div class="tourist-data-section">
							<div class="section-title">The daily average number of tourists taking boats on Lake Como,
								calculated based on the peak and off peak seasons</div>

							<!-- 柱状图 -->
							<div class="bar-charts">
								<!-- 第一行：11个filled + 4个empty = 15个方块 -->
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
								</div>
							</div>

							<!-- 详细数据列表 -->
							<div class="data-list">
								<div class="data-item">
									<span class="data-label">Proportion of boat tourists during the off-season
										(7.5%)</span>
									<span class="data-value">750 people</span>
								</div>
								<div class="data-item">
									<span class="data-label">During the off-season, tourists staying overnight use boats
										(75%)</span>
									<span class="data-value">450 people</span>
								</div>
								<div class="data-item">
									<span class="data-label">Proportion of boat tourists during peak season
										(7.5%)</span>
									<span class="data-value">1312 people</span>
								</div>
								<div class="data-item">
									<span class="data-label">Tourists staying overnight during peak season use boats
										(75%)</span>
									<span class="data-value">900 people</span>
								</div>
								<div class="data-item">
									<span class="data-label">Average daily number of boat tourists during the
										off-season</span>
									<span class="data-value">1200 people</span>
								</div>
								<div class="data-item">
									<span class="data-label">Average daily number of boat tourists during peak
										season</span>
									<span class="data-value">2212 people</span>
								</div>
							</div>
						</div>
					</div>

					<!-- 其他内容面板可以在这里添加 -->
					<div v-if="activeContent === 'tourists'" class="tourists-content">
						<div class="content-title">Daily average number of boat tourists</div>
						<p>Tourist data content will be displayed here.</p>
					</div>

					<div v-if="activeContent === 'profit'" class="profit-content">
						<div class="content-title">Operating profit and loss statement</div>
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
const showLakeDetail = ref(false)
const isRevenueSelected = ref(false)

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

	// 设置选中状态
	if (contentType === 'revenue') {
		isRevenueSelected.value = true
	} else {
		isRevenueSelected.value = false
	}

	// 等待DOM更新
	await nextTick()

	// 如果是revenue类型，渲染模态框图表
	if (contentType === 'revenue') {
		renderModalCharts()
	}
	// 如果是lake类型，渲染饼图
	else if (contentType === 'lake') {
		renderPieChart()
		// 如果显示详情面板，也渲染需求图表
		if (showLakeDetail.value) {
			renderDemandChart()
		}
	}
}

// 隐藏内容面板
function hideContent() {
	activeContent.value = null
	showLakeDetail.value = false
	isRevenueSelected.value = false
}

// 显示Lake详情面板
function showLakeDetailPanel() {
	showLakeDetail.value = true
	// 等待DOM更新后渲染需求图表
	nextTick(() => {
		renderDemandChart()
	})
}

// 隐藏Lake详情面板
function hideLakeDetailPanel() {
	showLakeDetail.value = false
}

// ECharts: Revenue Model
const revenueChartRef = ref(null)
let revenueChartInstance = null

// Lake Como Pie Chart
const pieChartRef = ref(null)
let pieChartInstance = null

// Transportation Demand Chart
const demandChartRef = ref(null)
let demandChartInstance = null

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
				text: 'When the cost of a single ship is 28,000$,break even sales volume is achieved',
				textStyle: { fontSize: 10, color: '#333' },
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
				// data: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'],
				axisLabel: { color: '#666', fontSize: 10 },
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			// xAxis: {
			// 	type: 'value',
			// 	axisLabel: { show: false },
			// 	axisTick: { show: false },
			// 	axisLine: { show: false },
			// 	splitLine: { show: false }
			// },
			yAxis: {
				type: 'value',
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			series: [
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'bar',
					data: [45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92, 95, 98, 102, 105, 108],
					itemStyle: { color: '#00d4ff' },
					label: {
						show: true,
						position: 'top',
						fontSize: 8,
						color: '#333',
						formatter: '{c}'
					}
				},
				{
					name: 'Gross profit margin',
					type: 'bar',
					data: [25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88],
					itemStyle: { color: '#FFC27A' },
					label: {
						show: true,
						position: 'top',
						fontSize: 8,
						color: '#333',
						formatter: '{c}%'
					}
				}
			]
		}
		chart1Instance.setOption(option1)
		// 确保图表正确显示
		setTimeout(() => {
			chart1Instance?.resize()
		}, 50)
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
				text: 'When the cost of a single ship is 31,000$, break even sales volume is achieved',
				textStyle: { fontSize: 10, color: '#333' },
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
				// data: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			yAxis: {
				type: 'value',
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			series: [
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'bar',
					data: [18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55],
					itemStyle: { color: '#00d4ff' },
					label: {
						show: true,
						position: 'top',
						fontSize: 8,
						color: '#333',
						formatter: '{c}'
					}
				},
				{
					name: 'Gross profit margin',
					type: 'bar',
					data: [12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48],
					itemStyle: { color: '#FFC27A' },
					label: {
						show: true,
						position: 'top',
						fontSize: 8,
						color: '#333',
						formatter: '{c}%'
					}
				}
			]
		}
		chart2Instance.setOption(option2)
		// 确保图表正确显示
		setTimeout(() => {
			chart2Instance?.resize()
		}, 50)
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
				text: 'When the cost of a single ship is 35,000$,break even sales volume is achieved',
				textStyle: { fontSize: 10, color: '#333' },
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
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			yAxis: {
				type: 'value',
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			series: [
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'line',
					data: [42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92, 95, 98, 102, 105],
					smooth: true,
					symbol: 'circle',
					symbolSize: 6,
					lineStyle: {
						color: '#00d4ff',
						width: 3
					},
					itemStyle: {
						color: '#00d4ff',
						borderWidth: 2,
						borderColor: '#ffffff'
					},
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
					symbol: 'circle',
					symbolSize: 6,
					lineStyle: {
						color: '#FFC27A',
						width: 3
					},
					itemStyle: {
						color: '#FFC27A',
						borderWidth: 2,
						borderColor: '#ffffff'
					},
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
		// 确保图表正确显示
		setTimeout(() => {
			chart3Instance?.resize()
		}, 50)
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
				text: 'When the cost of a single ship is 41,000$,break even sales volume is achieved',
				textStyle: { fontSize: 10, color: '#333' },
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
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			yAxis: {
				type: 'value',
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			series: [
				{
					name: 'Annual breakeven sales volume (units)',
					type: 'line',
					data: [15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52],
					smooth: true,
					symbol: 'circle',
					symbolSize: 6,
					lineStyle: {
						color: '#00d4ff',
						width: 3
					},
					itemStyle: {
						color: '#00d4ff',
						borderWidth: 2,
						borderColor: '#ffffff'
					},
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
					symbol: 'circle',
					symbolSize: 6,
					lineStyle: {
						color: '#FFC27A',
						width: 3
					},
					itemStyle: {
						color: '#FFC27A',
						borderWidth: 2,
						borderColor: '#ffffff'
					},
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
		// 确保图表正确显示
		setTimeout(() => {
			chart4Instance?.resize()
		}, 50)
	}

	// 自适应调整
	setTimeout(() => {
		chart1Instance?.resize()
		chart2Instance?.resize()
		chart3Instance?.resize()
		chart4Instance?.resize()
	}, 100)
}

// Lake Como Pie Chart
function renderPieChart() {
	if (!pieChartRef.value) return

	// 如果实例已存在，先销毁（因为DOM可能已经被v-if销毁了）
	if (pieChartInstance) {
		pieChartInstance.dispose()
		pieChartInstance = null
	}

	// 重新创建实例
	pieChartInstance = echarts.init(pieChartRef.value)

	const option = {
		tooltip: {
			trigger: 'item',
			formatter: '{b}: {d}%'
		},
		series: [
			{
				name: 'Tourist Distribution',
				type: 'pie',
				radius: '50%', // 圆环图，调整内外半径
				center: ['50%', '50%'],
				startAngle: 90, // 从12点钟位置开始
				avoidLabelOverlap: false,
				itemGap: 10, // 扇形之间的间隔
				data: [
					{
						value: 35,
						name: 'Peak Season',
						itemStyle: {
							color: '#FF9A4E' // 橙色
						},
						label: {
							show: true,
							position: 'outside',
							formatter: 'Peak Season\nJune-September\nDaily average number of tourists\n15000-20000 people/time',
							fontSize: 8,
							// fontWeight: 'bold',
							color: '#ffffff',
							lineHeight: 12
						},
						labelLine: {
							show: true,
							length: 10,
							length2: 5,
							lineStyle: {
								color: '#FF9A4E',
								width: 1
							}
						}
					},
					{
						value: 65,
						name: 'Off-Season',
						itemStyle: {
							color: '#00d4ff' // 青色
						},
						label: {
							show: true,
							position: 'outside',
							formatter: 'Off-Season\nOctober-May\nDaily average number of tourists\n5000-10000 people/time',
							fontSize: 8,
							// fontWeight: 'bold',
							color: '#ffffff',
							lineHeight: 12
						},
						labelLine: {
							show: true,
							length: 10,
							length2: 5,
							lineStyle: {
								color: '#00d4ff',
								width: 1
							}
						}
					}
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 15,
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowColor: 'rgba(0, 0, 0, 0.8)',
						borderWidth: 3,
						borderColor: '#ffffff'
					},
					label: {
						show: true,
						fontSize: 12,
						fontWeight: 'bold',
						color: '#ffffff'
					}
				}
			}
		]
	}

	pieChartInstance.setOption(option)

	// 确保图表正确显示
	setTimeout(() => {
		if (pieChartInstance) {
			pieChartInstance.resize()
		}
	}, 100)
}

// Transportation Demand Chart
function renderDemandChart() {
	if (!demandChartRef.value) return

	// 如果实例已存在，先销毁（因为DOM可能已经被v-if销毁了）
	if (demandChartInstance) {
		demandChartInstance.dispose()
		demandChartInstance = null
	}

	// 重新创建实例
	demandChartInstance = echarts.init(demandChartRef.value)

	const option = {
		tooltip: {
			trigger: 'item',
			formatter: '{b}: {d}%'
		},
		series: [
			{
				name: 'Transportation Demand',
				type: 'pie',
				radius: ['30%', '60%'], // 环形图
				center: ['50%', '80%'], // 调整中心点位置，让图表显示在下半部分
				startAngle: 180, // 从180度开始，实现半圆
				endAngle: 360, // 到360度结束，实现半圆
				avoidLabelOverlap: false,
				itemGap: 8,
				data: [
					{
						value: 35,
						name: '15-20',
						itemStyle: {
							color: '#00d4ff' // 青色
						},
						label: {
							show: true,
							position: 'inside',
							formatter: '15-20',
							fontSize: 10,
							color: '#ffffff',
							fontWeight: 'bold'
						},
						labelLine: {
							show: true,
							length: 15,
							length2: 8,
							lineStyle: {
								color: '#00d4ff',
								width: 1
							}
						}
					},
					{
						value: 25,
						name: '10-25',
						itemStyle: {
							color: '#FF9A4E' // 橙色
						},
						label: {
							show: true,
							position: 'inside',
							formatter: '10-25',
							fontSize: 10,
							color: '#ffffff',
							fontWeight: 'bold'
						},
						labelLine: {
							show: true,
							length: 15,
							length2: 8,
							lineStyle: {
								color: '#FF9A4E',
								width: 1
							}
						}
					},
					{
						value: 40,
						name: 'Other Requirements',
						itemStyle: {
							color: '#ffffff' // 白色
						},
						label: {
							show: true,
							position: 'inside',
							formatter: '',
							fontSize: 10,
							color: '#ffffff',
							fontWeight: 'bold'
						},
						labelLine: {
							show: true,
							length: 15,
							length2: 8,
							lineStyle: {
								color: '#ffffff',
								width: 1
							}
						}
					}
				],
				emphasis: {
					itemStyle: {
						shadowBlur: 15,
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowColor: 'rgba(0, 0, 0, 0.8)',
						borderWidth: 3,
						borderColor: '#ffffff'
					},
					label: {
						show: true,
						fontSize: 12,
						fontWeight: 'bold',
						color: '#ffffff'
					}
				}
			}
		]
	}

	demandChartInstance.setOption(option)

	// 确保图表正确显示
	setTimeout(() => {
		if (demandChartInstance) {
			demandChartInstance.resize()
		}
	}, 100)
}

onMounted(() => {
	renderRevenueChart()
	renderPieChart()
	window.addEventListener('resize', onWindowResize)
})

function onWindowResize() {
	if (revenueChartInstance) revenueChartInstance.resize()
	if (pieChartInstance) pieChartInstance.resize()
	if (demandChartInstance) demandChartInstance.resize()
}

onBeforeUnmount(() => {
	window.removeEventListener('resize', onWindowResize)
	if (revenueChartInstance) {
		revenueChartInstance.dispose()
		revenueChartInstance = null
	}
	if (pieChartInstance) {
		pieChartInstance.dispose()
		pieChartInstance = null
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
	if (demandChartInstance) {
		demandChartInstance.dispose()
		demandChartInstance = null
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
	gap: 15px;
	overflow: hidden;
	padding-left: 10px;
	padding-right: 10px;
}

/* 左侧面板：Revenue Model + Channel Strategy */
.left-panel {
	flex: 0 0 280px;
	min-width: 280px;
	max-width: 320px;
	padding: 15px;
	display: flex;
	flex-direction: column;
	gap: 12px;
	overflow: hidden;
	height: calc(100vh - 80px);
}

/* 中间面板：Lake Como 地图 */
.middle-panel {
	flex: 1;
	min-width: 400px;
	padding: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.map-container {
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -40%);
	width: min(100px, 80vw);
	height: min(100px, 80vw);
	max-width: 100px;
	max-height: 100px;

	overflow: hidden;
	cursor: pointer;
}



/* 右侧面板：详细内容 */
.right-panel {
	flex: 0 0 280px;
	min-width: 280px;
	max-width: 320px;
	padding: 15px;
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
	border-radius: 12px;
	padding: 15px;
	border: 1px solid rgba(255, 255, 255, 0.15);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	flex-shrink: 0;
	overflow: hidden;
	margin-bottom: 8px;
	transition: all 0.3s ease;
	cursor: pointer;
	position: relative;
}

/* Revenue Model 选中状态 */
.revenue-selected {
	border: 2px solid #00d4ff;
	background: rgba(0, 212, 255, 0.1);
	box-shadow:
		0 8px 32px rgba(0, 0, 0, 0.3),
		0 0 20px rgba(0, 212, 255, 0.4),
		0 0 40px rgba(0, 212, 255, 0.2),
		inset 0 0 20px rgba(0, 212, 255, 0.1);
	transform: scale(1.02);
}

/* Revenue Model 选中时的光晕效果 */
.revenue-selected::before {
	content: '';
	position: absolute;
	top: -2px;
	left: -2px;
	right: -2px;
	bottom: -2px;
	background: linear-gradient(45deg,
			rgba(0, 212, 255, 0.3) 0%,
			rgba(0, 212, 255, 0.1) 25%,
			rgba(0, 212, 255, 0.3) 50%,
			rgba(0, 212, 255, 0.1) 75%,
			rgba(0, 212, 255, 0.3) 100%);
	border-radius: 14px;
	z-index: -1;
	animation: revenueGlow 2s ease-in-out infinite;
}

/* Revenue Model 悬停效果 */
.revenue-hover-card:hover {
	border: 1px solid rgba(0, 212, 255, 0.5);
	background: rgba(0, 212, 255, 0.05);
	box-shadow:
		0 8px 32px rgba(0, 0, 0, 0.3),
		0 0 15px rgba(0, 212, 255, 0.2);
	transform: translateY(-2px);
}

/* Revenue Model 选中时的标题效果 */
.revenue-selected .chart-title {
	color: #00d4ff;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
	animation: titleGlow 1.5s ease-in-out infinite alternate;
}

/* Revenue Model 点击效果 */
.revenue-hover-card:active {
	transform: scale(0.98);
	transition: transform 0.1s ease;
}

/* Revenue Model 选中时的图表容器效果 */
.revenue-selected .chart-container {
	position: relative;
}

.revenue-selected .chart-container::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient(45deg,
			transparent 0%,
			rgba(0, 212, 255, 0.1) 50%,
			transparent 100%);
	border-radius: 8px;
	animation: chartShimmer 2s ease-in-out infinite;
	pointer-events: none;
}

/* 图表闪烁效果 */
@keyframes chartShimmer {
	0% {
		opacity: 0;
		transform: translateX(-100%);
	}

	50% {
		opacity: 1;
		transform: translateX(0%);
	}

	100% {
		opacity: 0;
		transform: translateX(100%);
	}
}

.chart-title {
	font-size: 16px;
	font-weight: 700;
	margin-bottom: 12px;
	color: #ffffff;
	text-align: center;
	letter-spacing: 0.5px;
}

.chart-container {
	height: 100px;
	display: flex;
	align-items: end;
	gap: 5px;
	padding: 5px 0;
	overflow: hidden;
}

.revenue-echart {
	width: 100%;
	height: 90px;
}

/* 策略卡片 */
.strategy-card {
	padding: 10px;
	flex: 1;
	overflow-y: auto;
	max-height: calc(100vh - 280px);
}

.strategy-title {
	font-size: clamp(16px, 1.4vw, 20px);
	font-weight: 600;
	margin-bottom: clamp(8px, 1vh, 12px);
	color: #ffffff;
}

.strategy-section {
	margin-bottom: clamp(12px, 1.5vh, 18px);
}

.strategy-section:last-child {
	margin-bottom: 0;
}

.strategy-subtitle {
	font-size: clamp(14px, 1.3vw, 17px);
	font-weight: 500;
	color: #ffffff;
	margin-bottom: clamp(6px, 0.8vh, 10px);
	line-height: 1.3;
}

.strategy-content {
	margin-left: 0;
}

.strategy-label {
	font-size: clamp(13px, 1.2vw, 16px);
	font-weight: 600;
	color: #ffffff;
	margin: clamp(5px, 0.6vh, 7px) 0 clamp(3px, 0.4vh, 4px) 0;
}

.strategy-text {
	font-size: clamp(11px, 1vw, 14px);
	line-height: 1.4;
	color: #cccccc;
	margin: clamp(3px, 0.4vh, 4px) 0;
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

/* Revenue Model 光晕动画 */
@keyframes revenueGlow {
	0% {
		opacity: 0.3;
		transform: scale(1);
	}

	50% {
		opacity: 0.6;
		transform: scale(1.01);
	}

	100% {
		opacity: 0.3;
		transform: scale(1);
	}
}

/* 标题发光动画 */
@keyframes titleGlow {
	0% {
		text-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
	}

	100% {
		text-shadow: 0 0 20px rgba(0, 212, 255, 0.9), 0 0 30px rgba(0, 212, 255, 0.6);
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
	color: #00d4ff;
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
	width: 480px;
	/* height: 520px; */
	/* backdrop-filter: blur(15px); */
	/* border-radius: 15px; */
	/* padding: 25px; */
	/* overflow-y: auto; */
	/* animation: slideIn 0.5s ease-out; */
	border: 1px solid rgba(0, 212, 255, 0.3);
	background: rgba(255, 255, 255, 0.005);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
	padding: 10px;
	margin: 5px;
	position: fixed;
	top: 50%;
	right: 20px;
	transform: translateY(-50%);
	z-index: 1000;
}



.main-title {
	font-size: 13px;
	font-weight: 600;
	color: #ffffff;
	margin-bottom: 8px;
}

.section-title {
	font-size: 11px;
	/* font-weight: 600; */
	color: #ffffff;
	margin-bottom: 10px;
	/* text-align: center; */
	/* background: rgba(0, 212, 255, 0.8); */
	padding: 6px 10px;
	/* border-radius: 4px; */
}

/* 需求图表容器 */
.demand-chart-container {
	position: relative;
	display: flex;
	justify-content: center;
	margin: 20px 0;
}

.demand-chart-container .demand-chart-echarts {
	width: 100%;
	height: 160px;
}

.chart-labels {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.chart-label-left {
	position: absolute;
	left: 20px;
	top: 40%;
	transform: translateY(-50%);
}

.chart-label-right {
	position: absolute;
	right: 20px;
	top: 20%;
}

.chart-label-bottom {
	position: absolute;
	right: 20px;
	bottom: 20px;
}

.label-text {
	color: #ffffff;
	font-size: 12px;
	line-height: 1.2;
	margin: 2px 0;
}

/* 需求描述 */
.demand-description {
	margin-top: 8px;
}

.demand-description p {
	font-size: 9px;
	color: #cccccc;
	line-height: 1.3;
	margin: 3px 0;
	text-align: center;
}

/* 游客数据部分 */
.tourist-data-section {
	margin-top: 12px;
}

/* 数据列表 */
.data-list {
	margin-top: 12px;
}

.data-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 6px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.data-item:last-child {
	border-bottom: none;
}

.data-label {
	font-size: 9px;
	color: #ffffff;
	flex: 1;
	line-height: 1.2;
}

.data-value {
	font-size: 9px;
	font-weight: 600;
	color: #00d4ff;
	margin-left: 8px;
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
	font-size: 13px;
	/* font-weight: 700; */
	color: #ffffff;
	margin-bottom: 8px;
	text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.content-subtitle {
	font-size: 13px;
	font-weight: 500;
	color: #cccccc;
	margin-bottom: 20px;
}

/* ECharts 圆环图样式 */
.pie-chart-container {
	display: flex;
	justify-content: center;
	margin: 20px 0;
}

.pie-chart-echarts {
	width: 120%;
	height: 120px;
}

.description-text {
	font-size: 12px;
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
	/* padding: 10px 0; */
	/* border-bottom: 1px solid rgba(255, 255, 255, 0.1); */
}

.legend-item:last-child {
	border-bottom: none;
}

.legend-label {
	font-size: 12px;
	color: #cccccc;
}

.legend-value {
	font-size: 12px;
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
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(25px) saturate(180%);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 20px;
	width: 95vw;
	max-width: 1400px;
	height: 80vh;
	max-height: 700px;
	padding: 25px;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 
	            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
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
	/* border-bottom: 2px solid #f0f0f0; */
}

.modal-title {
	font-size: 28px;
	font-weight: 700;
	color: #333333;
	margin: 0;
}

.close-btn {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.2);
	font-size: 32px;
	color: rgba(255, 255, 255, 0.8);
	cursor: pointer;
	padding: 0;
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: all 0.3s ease;
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.close-btn:hover {
	background: rgba(255, 255, 255, 0.2);
	color: rgba(255, 255, 255, 1);
	transform: scale(1.1);
}

.charts-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 20px;
	flex: 1;
	overflow: hidden;
}

.chart-item {
	background: rgba(255, 255, 255, 0.2);
	backdrop-filter: blur(15px) saturate(180%);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 15px;
	padding: 15px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	min-height: 200px;
	width: 100%;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
	            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
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
	min-height: 150px;
	max-height: 200px;
	width: 100%;
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
/* 大屏幕 (1920px+) */
@media (min-width: 1920px) {
	.main-content {
		gap: 25px;
		padding-left: 20px;
		padding-right: 20px;
	}

	.left-panel,
	.right-panel {
		flex: 0 0 350px;
		min-width: 350px;
		max-width: 400px;
		padding: 20px;
	}

	.middle-panel {
		min-width: 600px;
		padding: 20px;
	}

	.chart-card {
		padding: 20px;
		margin-bottom: 12px;
	}

	.chart-title {
		font-size: 20px;
		margin-bottom: 15px;
	}

	.chart-container {
		height: 130px;
	}

	.revenue-echart {
		height: 120px;
	}

	.strategy-title {
		font-size: clamp(17px, 1.4vw, 22px);
		margin-bottom: clamp(8px, 1vh, 12px);
	}

	.strategy-subtitle {
		font-size: clamp(15px, 1.2vw, 19px);
		margin-bottom: clamp(8px, 1vh, 12px);
		line-height: 1.3;
	}

	.strategy-label {
		font-size: clamp(14px, 1.1vw, 17px);
		margin: clamp(6px, 0.8vh, 8px) 0 clamp(3px, 0.4vh, 5px) 0;
	}

	.strategy-text {
		font-size: clamp(12px, 1vw, 15px);
		line-height: 1.4;
		margin: clamp(3px, 0.4vh, 5px) 0;
	}

	.content-panel {
		width: 510px;
		/* height: 580px; */
		right: 25px;
	}

	/* 大屏幕下的 Revenue Model 效果优化 */
	.revenue-selected {
		transform: scale(1.03);
	}

	.revenue-selected::before {
		animation: revenueGlow 1.5s ease-in-out infinite;
	}
}

/* 中等屏幕 (1400px-1919px) */
@media (min-width: 1400px) and (max-width: 1919px) {
	.main-content {
		gap: 18px;
		padding-left: 15px;
		padding-right: 15px;
	}

	.left-panel,
	.right-panel {
		flex: 0 0 300px;
		min-width: 300px;
		max-width: 340px;
		padding: 18px;
	}

	.middle-panel {
		min-width: 500px;
		padding: 18px;
	}

	.strategy-title {
		font-size: clamp(16px, 1.3vw, 19px);
		margin-bottom: clamp(7px, 0.8vh, 10px);
	}

	.strategy-subtitle {
		font-size: clamp(14px, 1.1vw, 16px);
		margin-bottom: clamp(6px, 0.8vh, 9px);
		line-height: 1.3;
	}

	.strategy-label {
		font-size: clamp(13px, 1vw, 15px);
		margin: clamp(5px, 0.6vh, 7px) 0 clamp(2px, 0.3vh, 4px) 0;
	}

	.strategy-text {
		font-size: clamp(11px, 0.9vw, 13px);
		line-height: 1.4;
		margin: clamp(2px, 0.3vh, 4px) 0;
	}

	.content-panel {
		width: 420px;
		/* height: 500px; */
		right: 18px;
	}

	/* 中等屏幕下的 Revenue Model 效果 */
	.revenue-selected {
		transform: scale(1.02);
	}
}

/* 小屏幕 (1200px-1399px) */
@media (min-width: 1200px) and (max-width: 1399px) {
	.main-content {
		gap: 12px;
		padding-left: 10px;
		padding-right: 10px;
	}

	.left-panel,
	.right-panel {
		flex: 0 0 260px;
		min-width: 260px;
		max-width: 280px;
		padding: 12px;
	}

	.middle-panel {
		min-width: 400px;
		padding: 12px;
	}

	.chart-card {
		padding: 12px;
		margin-bottom: 6px;
	}

	.chart-title {
		font-size: 16px;
		margin-bottom: 10px;
	}

	.chart-container {
		height: 80px;
	}

	.revenue-echart {
		height: 70px;
	}

	.strategy-title {
		font-size: clamp(15px, 1.2vw, 18px);
		margin-bottom: clamp(6px, 0.8vh, 9px);
	}

	.strategy-subtitle {
		font-size: clamp(13px, 1vw, 15px);
		margin-bottom: clamp(5px, 0.6vh, 7px);
		line-height: 1.3;
	}

	.strategy-label {
		font-size: clamp(12px, 0.9vw, 14px);
		margin: clamp(4px, 0.5vh, 6px) 0 clamp(2px, 0.3vh, 3px) 0;
	}

	.strategy-text {
		font-size: clamp(10px, 0.8vw, 12px);
		line-height: 1.3;
		margin: clamp(2px, 0.3vh, 3px) 0;
	}

	.content-panel {
		width: 390px;
		/* height: 480px; */
		right: 12px;
	}

	/* 小屏幕下的 Revenue Model 效果 */
	.revenue-selected {
		transform: scale(1.01);
	}

	.revenue-selected::before {
		animation: revenueGlow 2.5s ease-in-out infinite;
	}
}

/* 平板和小笔记本 (992px-1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
	.main-content {
		flex-direction: column;
		gap: 15px;
		height: auto;
		max-height: none;
		padding: 80px 15px 20px;
	}

	.left-panel,
	.right-panel,
	.middle-panel {
		flex: none;
		width: 100%;
		min-width: auto;
		max-width: none;
		padding: 15px;
	}

	.left-panel {
		order: 1;
		max-height: 300px;
		overflow-y: auto;
	}

	.middle-panel {
		order: 2;
		height: 400px;
	}

	.right-panel {
		order: 3;
		max-height: 400px;
		overflow-y: auto;
	}

	.map-container {
		max-height: 350px;
	}

	.strategy-title {
		font-size: clamp(13px, 1.1vw, 16px);
		margin-bottom: clamp(5px, 0.6vh, 7px);
	}

	.strategy-subtitle {
		font-size: clamp(11px, 0.9vw, 13px);
		margin-bottom: clamp(4px, 0.5vh, 6px);
		line-height: 1.3;
	}

	.strategy-label {
		font-size: clamp(10px, 0.8vw, 12px);
		margin: clamp(3px, 0.4vh, 5px) 0 clamp(1px, 0.2vh, 2px) 0;
	}

	.strategy-text {
		font-size: clamp(9px, 0.7vw, 10px);
		line-height: 1.3;
		margin: clamp(1px, 0.2vh, 2px) 0;
	}

	.content-panel {
		width: 350px;
		/* height: 420px; */
		right: 15px;
	}

	/* 平板下的 Revenue Model 效果 */
	.revenue-selected {
		transform: scale(1.01);
	}

	.revenue-selected::before {
		animation: revenueGlow 3s ease-in-out infinite;
	}
}

/* 手机屏幕 (768px以下) */
@media (max-width: 991px) {
	.main-content {
		flex-direction: column;
		gap: 10px;
		height: auto;
		max-height: none;
		padding: 80px 10px 20px;
	}

	.left-panel,
	.right-panel,
	.middle-panel {
		flex: none;
		width: 100%;
		min-width: auto;
		max-width: none;
		padding: 10px;
	}

	.left-panel {
		order: 1;
		max-height: 250px;
		overflow-y: auto;
	}

	.middle-panel {
		order: 2;
		height: 300px;
	}

	.right-panel {
		order: 3;
		max-height: 300px;
		overflow-y: auto;
	}

	.nav-container {
		flex-wrap: wrap;
		gap: 8px;
		padding: 0 10px;
	}

	.nav-item {
		font-size: 12px;
		padding: 6px 12px;
	}

	.chart-container {
		height: 100px;
	}

	.map-container {
		max-height: 250px;
		border-radius: 10px;
	}

	.content-panel {
		width: 320px;
		/* height: 380px; */
		padding: 15px;
		border-radius: 10px;
		right: 10px;
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
	}

	.chart-card {
		padding: 10px;
		border-radius: 8px;
		margin-bottom: 5px;
	}

	.chart-title {
		font-size: 13px;
		margin-bottom: 8px;
	}

	.strategy-title {
		font-size: clamp(11px, 1vw, 14px);
		margin-bottom: clamp(4px, 0.5vh, 6px);
	}

	.strategy-subtitle {
		font-size: clamp(9px, 0.8vw, 11px);
		margin-bottom: clamp(3px, 0.4vh, 5px);
		line-height: 1.3;
	}

	.strategy-label {
		font-size: clamp(8px, 0.7vw, 10px);
		margin: clamp(2px, 0.3vh, 4px) 0 clamp(1px, 0.1vh, 1px) 0;
	}

	.strategy-text {
		font-size: clamp(7px, 0.6vw, 9px);
		line-height: 1.3;
		margin: clamp(1px, 0.1vh, 2px) 0;
	}

	/* 手机下的 Revenue Model 效果 */
	.revenue-selected {
		transform: scale(1.005);
	}

	.revenue-selected::before {
		animation: revenueGlow 3.5s ease-in-out infinite;
	}

	.revenue-selected .chart-title {
		animation: titleGlow 2s ease-in-out infinite alternate;
	}
}

/* 超小屏幕 (480px以下) */
@media (max-width: 480px) {
	.content-panel {
		width: 90vw;
		max-width: 300px;
		/* height: 70vh; */
		/* max-height: 380px; */
		right: 5px;
		left: 5px;
		transform: translateY(-50%);
	}

	/* 超小屏幕下的 Revenue Model 效果 */
	.revenue-selected {
		transform: scale(1.002);
	}

	.revenue-selected::before {
		animation: revenueGlow 4s ease-in-out infinite;
	}
}
</style>
