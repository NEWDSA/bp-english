<template>
	<!-- Revenue Model 弹窗 -->
	<div class="revenue-modal" v-if="visible" @click="handleClose">
		<div class="revenue-modal-content bg-gray-900 border border-cyan-500/30 rounded-xl shadow-2xl" @click.stop>
			<button
				@click="handleClose"
				class="absolute z-2 right-6 top-6 text-gray-400 transition-colors p-2 hover:bg-gray-800 rounded-lg"
				>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>

			<!-- 页面导航 - 上一页按钮 (左侧) -->
			<p
				class="nav-btn prev-btn nav-btn-left"
				:class="{ 'disabled': currentPage === 1 }"
				@click="prevPage"
				:disabled="currentPage === 1">
				<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
					<polyline points="15 18 9 12 15 6"></polyline>
				</svg>
			</p>

			<!-- 页面导航 - 下一页按钮 (右侧) -->
			<p
				class="nav-btn next-btn nav-btn-right"
				:class="{ 'disabled': currentPage === 4 }"
				@click="nextPage"
				:disabled="currentPage === 4">
				<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
					<polyline points="9 18 15 12 9 6"></polyline>
				</svg>
			</p>

			<!-- 页面指示器 (底部中心) -->
			<div class="page-indicators">
				<span
					v-for="page in 4"
					:key="page"
					class="page-dot"
					:class="{ 'active': currentPage === page }"
					@click="goToPage(page)">
				</span>
			</div>

			<!-- 页面1: 现有的图表1和图表2 -->
			<div v-if="currentPage === 1" class="charts-grid charts-grid-two">
				<div class="chart-item">
					<div ref="chart1Ref" class="modal-chart"></div>
				</div>
				<div class="chart-item">
					<div ref="chart2Ref" class="modal-chart"></div>
				</div>
			</div>

			<!-- 页面2: 新增图表3和图表4 -->
			<div v-if="currentPage === 2" class="charts-grid charts-grid-two">
				<div class="chart-item">
					<!-- 各年销售情况 -->
					<div ref="chart3NewRef" class="modal-chart"></div>
				</div>
				<div class="chart-item">
					<!--  Profit Statement / 利润表 -->
					<div ref="chart4NewRef" class="modal-chart"></div>
				</div>
			</div>

			<!-- 页面3: 新增图表5和图表6 -->
			<div v-if="currentPage === 3" class="charts-grid charts-grid-two">
				<!-- 投资回报分析 (基于500万欧元总投资) -->
				<div class="chart-item">
					<div ref="chart5NewRef" class="modal-chart"></div>
				</div>
				<!-- Cash Flow Analysis / 现金流分析 -->
				<div class="chart-item">
					<div ref="chart6NewRef" class="modal-chart"></div>
				</div>
			</div>

			<!-- 页面4: 左侧图表7，右侧文字 -->
			<div v-if="currentPage === 4" class="charts-grid charts-grid-mixed">
				<!-- 关键绩效指标 -->
				<div class="chart-item">
					<div ref="chart7NewRef" class="modal-chart"></div>
				</div>
				<!-- 投资亮点 -->
				<div class="text-content">
					<h2 class="text-title">Investment Highlights</h2>
					<div class="text-body investment-highlights">
						<div class="highlight-section">
							<h3><strong>1. Extremely High Profitability</strong></h3>
							<ul>
								<li>a. Stable 88.6% gross margin across three years</li>
								<li>b. Total net profit reaches €125.62 million in three years</li>
							</ul>
						</div>

						<div class="highlight-section">
							<h3><strong>2. Outstanding Investment Returns</strong></h3>
							<ul>
								<li>a. First-year ROI reaches 223.5%, recovering initial investment</li>
								<li>b. Cumulative ROI exceeds 25x by the third year</li>
							</ul>
						</div>

						<div class="highlight-section">
							<h3><strong>3. Strong Cash Flow Generation</strong></h3>
							<ul>
								<li>a. Operating cash flow reaches €126.5 million in three years</li>
								<li>b. Positive cash flow from the first year</li>
							</ul>
						</div>

						<div class="highlight-section">
							<h3><strong>4. Significant Growth Potential</strong></h3>
							<ul>
								<li>a. Revenue grows exponentially from €16.8M to €104M</li>
								<li>b. Clear economies of scale demonstrated</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, nextTick, watch, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

// Props
const props = defineProps({
	visible: {
		type: Boolean,
		default: false
	}
})

// Emits
const emit = defineEmits(['close'])

// Page navigation
const currentPage = ref(1)

// Chart refs
const chart1Ref = ref(null)
const chart2Ref = ref(null)
const chart3NewRef = ref(null)
const chart4NewRef = ref(null)
const chart5NewRef = ref(null)
const chart6NewRef = ref(null)
const chart7NewRef = ref(null)

// Chart instances
let chart1Instance = null
let chart2Instance = null
let chart3NewInstance = null
let chart4NewInstance = null
let chart5NewInstance = null
let chart6NewInstance = null
let chart7NewInstance = null

// Methods
function handleClose() {
	currentPage.value = 1 // Reset to first page
	emit('close')
}

function prevPage() {
	if (currentPage.value > 1) {
		currentPage.value--
		nextTick(() => {
			renderCharts()
		})
	}
}

function nextPage() {
	if (currentPage.value < 4) {
		currentPage.value++
		nextTick(() => {
			renderCharts()
		})
	}
}

function goToPage(page) {
	if (page >= 1 && page <= 4) {
		currentPage.value = page
		nextTick(() => {
			renderCharts()
		})
	}
}

// 创建斜线纹理图案
function createDiagonalPattern(color) {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	canvas.width = 20
	canvas.height = 20

	// 设置背景色
	ctx.fillStyle = color
	ctx.fillRect(0, 0, 20, 20)

	// 绘制斜线
	ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
	ctx.lineWidth = 1
	ctx.beginPath()
	for (let i = -20; i <= 40; i += 5) {
		ctx.moveTo(i, 0)
		ctx.lineTo(i + 20, 20)
	}
	ctx.stroke()

	return canvas
}

// Responsive font size functions
function getTitleFontSize() {
	const screenWidth = window.innerWidth
	if (screenWidth <= 1440) return 12
	if (screenWidth <= 1680) return 13
	if (screenWidth <= 1920) return 16
	return 20
}

function getSubtitleFontSize() {
	const screenWidth = window.innerWidth
	if (screenWidth <= 1440) return 10
	if (screenWidth <= 1680) return 11
	if (screenWidth <= 1920) return 12
	return 16
}

function getAxisLabelFontSize() {
	const screenWidth = window.innerWidth
	if (screenWidth <= 1440) return 10
	if (screenWidth <= 1680) return 12
	if (screenWidth <= 1920) return 14
	return 16
}

function getSeriesLabelFontSize() {
	const screenWidth = window.innerWidth
	if (screenWidth <= 1440) return 12
	if (screenWidth <= 1680) return 12
	if (screenWidth <= 1920) return 16
	return 18
}

function getLegendFontSize() {
	const screenWidth = window.innerWidth
	if (screenWidth <= 1440) return 10
	if (screenWidth <= 1680) return 10
	if (screenWidth <= 1920) return 11
	return 12
}

function getGraphicFontSize() {
	const screenWidth = window.innerWidth
	if (screenWidth <= 1440) return 10
	if (screenWidth <= 1680) return 10
	if (screenWidth <= 1920) return 11
	return 12
}

// Render charts based on current page
function renderCharts() {
	// Page 1 charts
	if (currentPage.value === 1) {
		renderChart1()
		renderChart2()
	}
	// Page 2 charts
	else if (currentPage.value === 2) {
		renderChart3New()
		renderChart4New()
	}
	// Page 3 charts
	else if (currentPage.value === 3) {
		renderChart5New()
		renderChart6New()
	}
	// Page 4 chart
	else if (currentPage.value === 4) {
		renderChart7New()
	}

	// Resize all charts after rendering
	setTimeout(() => {
		chart1Instance?.resize()
		chart2Instance?.resize()
		chart3NewInstance?.resize()
		chart4NewInstance?.resize()
		chart5NewInstance?.resize()
		chart6NewInstance?.resize()
		chart7NewInstance?.resize()
	}, 100)
}

// Chart 1: 左上角 - 年度数据柱状图
function renderChart1() {
	if (!chart1Ref.value) return

	if (chart1Instance) {
		chart1Instance.dispose()
	}
	chart1Instance = echarts.init(chart1Ref.value)

	const screenWidth = window.innerWidth
	const titleFontSize = getTitleFontSize()
	const axisLabelFontSize = getAxisLabelFontSize()
	const seriesLabelFontSize = getSeriesLabelFontSize()
	const legendFontSize = getLegendFontSize()
	const graphicFontSize = getGraphicFontSize()

	const option = {
		title: {
			text: 'When the cost of three single-unit ships is €21,000, the break-even sales volume is reached',
			textStyle: { fontSize: titleFontSize, color: '#333', fontWeight: 'normal' },
			top: screenWidth <= 1280 ? 30 : 50,
			left: 'center'
		},
		grid: {
			top: screenWidth <= 1280 ? 80 : 100,
			bottom: screenWidth <= 1280 ? 120 : 160,
			left: screenWidth <= 1280 ? 40 : 50,
			right: screenWidth <= 1280 ? 40 : 50
		},
		legend: {
			data: ['Annual breakeven sales volume (units)', 'Gross profit margin'],
			bottom: screenWidth <= 1920 ? '10%' : '6%',
			textStyle: { fontSize: legendFontSize },
			left: 'center',
			itemGap: screenWidth <= 1920 ? 20 : 40
		},
		graphic: {
			type: 'text',
			left: '40',
			bottom: screenWidth <= 1920 ? '10%' : '7%',
			style: {
				text: 'Horizontal axis (Price: Euro)',
				fontSize: graphicFontSize,
				color: '#666',
				textAlign: 'left',
				textVerticalAlign: 'middle'
			}
		},
		xAxis: {
			type: 'category',
			data: ['145,000', '140,000', '135,000', '130,000', '125,000', '120,000', '115,000', '110,000', '105,000', '100,000', '95,000'],
			axisLabel: {
				color: '#666',
				fontSize: axisLabelFontSize,
				show: true,
				margin: screenWidth <= 1280 ? 15 : 20,
				interval: 0,
				rotate: screenWidth <= 1280 ? 45 : 0,
				formatter: function(value, index) {
					if (index === 5) {
						return '{highlight|' + value + '}'
					}
					return value
				},
				rich: {
					highlight: {
						color: '#00d3f3',
						fontSize: axisLabelFontSize,
					}
				}
			},
			axisTick: { show: false },
			axisLine: { show: false },
			splitLine: { show: false }
		},
		yAxis: [
			{
				type: 'value',
				position: 'left',
				min: 0,
				max: 30,
				show: false,
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			{
				type: 'value',
				position: 'right',
				min: 60,
				max: 80,
				show: false,
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			}
		],
		series: [
			{
				name: 'Annual breakeven sales volume (units)',
				type: 'bar',
				yAxisIndex: 0,
				data: [4.4, 4.6, 4.8, 5.1, 5.3, 5.6, 5.9, 6.2, 6.6, 7.1, 7.6],
				itemStyle: { color: '#00d4ff' },
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						if (params.dataIndex === 5) {
							return '{highlight|' + params.value + '}'
						}
						return params.value
					},
					rich: {
						highlight: {
							color: '#00d3f3',
							fontSize: seriesLabelFontSize,
						}
					}
				}
			},
			{
				name: 'Gross profit margin',
				type: 'bar',
				yAxisIndex: 1,
				data: [75.5, 75.0, 74.4, 73.8, 73.2, 72.5, 71.7, 70.9, 70.0, 69.0, 67.9],
				itemStyle: { color: '#FFC27A' },
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						if (params.dataIndex === 5) {
							return '{highlight|' + params.value + '%}'
						}
						return params.value + '%'
					},
					rich: {
						highlight: {
							color: '#00d3f3',
							fontSize: seriesLabelFontSize,
						}
					}
				}
			}
		]
	}

	chart1Instance.setOption(option)
	setTimeout(() => chart1Instance?.resize(), 50)
}

// Chart 2: 右上角 - 年度数据柱状图
function renderChart2() {
	if (!chart2Ref.value) return

	if (chart2Instance) {
		chart2Instance.dispose()
	}
	chart2Instance = echarts.init(chart2Ref.value)

	const screenWidth = window.innerWidth
	const titleFontSize = getTitleFontSize()
	const axisLabelFontSize = getAxisLabelFontSize()
	const seriesLabelFontSize = getSeriesLabelFontSize()
	const legendFontSize = getLegendFontSize()
	const graphicFontSize = getGraphicFontSize()

	const option = {
		title: {
			text: 'When the cost of a five-seat version single boat is €36,500, the break-even sales volume is reached',
			textStyle: { fontSize: titleFontSize, color: '#333', fontWeight: 'normal' },
			top: screenWidth <= 1280 ? 30 : 50,
			left: 'center'
		},
		grid: {
			top: screenWidth <= 1280 ? 80 : 100,
			bottom: screenWidth <= 1280 ? 120 : 160,
			left: screenWidth <= 1280 ? 40 : 50,
			right: screenWidth <= 1280 ? 40 : 50
		},
		legend: {
			data: ['Annual breakeven sales volume (units)', 'Gross profit margin'],
			bottom: screenWidth <= 1920 ? '10%' : '6%',
			textStyle: { fontSize: legendFontSize },
			left: 'center',
			itemGap: screenWidth <= 1920 ? 20 : 40
		},
		graphic: {
			type: 'text',
			left: '40',
			bottom: screenWidth <= 1920 ? '10%' : '7%',
			style: {
				text: 'Horizontal axis (Price: Euro)',
				fontSize: graphicFontSize,
				color: '#666',
				textAlign: 'left',
				textVerticalAlign: 'middle'
			}
		},
		xAxis: {
			type: 'category',
			data: ['225,000', '220,000', '215,000', '210,000', '205,000', '200,000', '195,000', '190,000', '185,000', '180,000', '175,000'],
			axisLabel: {
				color: '#666',
				fontSize: axisLabelFontSize,
				show: true,
				margin: screenWidth <= 1280 ? 15 : 20,
				interval: 0,
				rotate: screenWidth <= 1280 ? 45 : 0,
				formatter: function(value, index) {
					if (index === 5) {
						return '{highlight|' + value + '}'
					}
					return value
				},
				rich: {
					highlight: {
						color: '#00d3f3',
						fontSize: axisLabelFontSize,
					}
				}
			},
			axisTick: { show: false },
			axisLine: { show: false },
			splitLine: { show: false }
		},
		yAxis: [
			{
				type: 'value',
				position: 'left',
				min: 0,
				max: 20,
				show: false,
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			},
			{
				type: 'value',
				position: 'right',
				min: 65,
				max: 75,
				show: false,
				axisLabel: { show: false },
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			}
		],
		series: [
			{
				name: 'Annual breakeven sales volume (units)',
				type: 'bar',
				yAxisIndex: 0,
				data: [2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.9, 4.0],
				itemStyle: { color: '#00d4ff' },
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						if (params.dataIndex === 5) {
							return '{highlight|' + params.value + '}'
						}
						return params.value
					},
					rich: {
						highlight: {
							color: '#00d3f3',
							fontSize: seriesLabelFontSize,
						}
					}
				}
			},
			{
				name: 'Gross profit margin',
				type: 'bar',
				yAxisIndex: 1,
				data: [73.8, 73.4, 73.0, 72.6, 72.2, 71.8, 71.3, 70.8, 70.3, 69.7, 69.1],
				itemStyle: { color: '#FFC27A' },
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						if (params.dataIndex === 5) {
							return '{highlight|' + params.value + '%}'
						}
						return params.value + '%'
					},
					rich: {
						highlight: {
							color: '#00d3f3',
							fontSize: seriesLabelFontSize,
						}
					}
				}
			}
		]
	}

	chart2Instance.setOption(option)
	setTimeout(() => chart2Instance?.resize(), 50)
}

// Chart 3 New: 各年销售情况
function renderChart3New() {
	if (!chart3NewRef.value) return

	if (chart3NewInstance) {
		chart3NewInstance.dispose()
	}
	chart3NewInstance = echarts.init(chart3NewRef.value)

	const screenWidth = window.innerWidth
	const titleFontSize = getTitleFontSize()
	const axisLabelFontSize = getAxisLabelFontSize()
	const legendFontSize = getLegendFontSize()
	const seriesLabelFontSize = getSeriesLabelFontSize()

	const option = {
		title: {
			text: 'Annual Sales Situation',
			textStyle: { fontSize: titleFontSize, color: '#333333' },
			top: screenWidth <= 1280 ? 30 : 50,
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' },
			formatter: function(params) {
				let result = params[0].axisValue + '<br/>'
				params.forEach(function(item) {
					if (item.seriesName.includes('Sales Volume')) {
						result += item.marker + item.seriesName + ': ' + item.value + ' units<br/>'
					} else if (item.seriesName.includes('Sales Revenue') || item.seriesName.includes('Total Revenue')) {
						result += item.marker + item.seriesName + ': €' + (item.value / 1000000).toFixed(1) + 'M<br/>'
					}
				})
				return result
			}
		},
		legend: {
			data: ['Product 1 Sales Volume', 'Product 2 Sales Volume', 'Product 1 Sales Revenue', 'Product 2 Sales Revenue', 'Total Revenue'],
			bottom: 5,
			textStyle: { fontSize: legendFontSize },
			itemGap: 15
		},
		grid: {
			left: screenWidth <= 1280 ? '8%' : '8%',
			right: screenWidth <= 1280 ? '8%' : '8%',
			top: screenWidth <= 1280 ? '20%' : '15%',
			bottom: screenWidth <= 1280 ? '15%' : '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['2026', '2027', '2028'],
			axisLabel: { fontSize: axisLabelFontSize, color: '#666' },
			axisLine: { lineStyle: { color: '#ddd' } }
		},
		yAxis: [
			{
				type: 'value',
				name: 'Sales Volume',
				position: 'left',
				axisLabel: {
					formatter: '{value}',
					fontSize: axisLabelFontSize,
					color: '#666'
				},
				nameTextStyle: {
					fontSize: axisLabelFontSize,
					padding: [0, 0, 10, 0]
				},
				axisLine: { lineStyle: { color: '#00d4ff' } },
				splitLine: { lineStyle: { color: '#f0f0f0' } }
			},
			{
				type: 'value',
				name: 'Sales (€)',
				position: 'right',
				axisLabel: {
					formatter: function(value) {
						return '€' + (value / 1000000).toFixed(0) + 'M'
					},
					fontSize: axisLabelFontSize,
					color: '#666'
				},
				nameTextStyle: {
					fontSize: axisLabelFontSize,
					color: '#fe7878',
					padding: [0, 0, 10, 60]
				},
				axisLine: { lineStyle: { color: '#FFC27A' } },
				min: 1000000,
				max: 110000000,
			}
		],
		series: [
			{
				name: 'Product 1 Sales Volume',
				type: 'bar',
				yAxisIndex: 0,
				data: [40, 120, 248],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00d4ff' },
						{ offset: 1, color: '#0099cc' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: '{c}',
					offset: [0, -12],
					color: '#000000',
				}
			},
			{
				name: 'Product 2 Sales Volume',
				type: 'bar',
				yAxisIndex: 0,
				data: [60, 180, 371],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#67E0DC' },
						{ offset: 1, color: '#4db3aa' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: '{c}',
					offset: [0, -12],
					color: '#000000',
				}
			},
			{
				name: 'Product 1 Sales Revenue',
				type: 'line',
				yAxisIndex: 1,
				data: [4800000, 14400000, 29714286],
				lineStyle: {
					color: '#FFC27A',
					width: 3,
					type: 'dashed'
				},
				itemStyle: { color: '#FFC27A' },
				symbol: 'circle',
				symbolSize: 6,
				label: {
					show: true,
					position: 'bottom',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					offset: [30, -2],
					color: '#FFC27A',
				}
			},
			{
				name: 'Product 2 Sales Revenue',
				type: 'line',
				yAxisIndex: 1,
				data: [12000000, 36000000, 74285714],
				lineStyle: {
					color: '#f57f17',
					width: 3,
					type: 'dashed'
				},
				itemStyle: { color: '#f57f17' },
				symbol: 'diamond',
				symbolSize: 6,
				label: {
					show: true,
					position: 'bottom',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					offset: [40, -4],
					color: '#f57f17',
				}
			},
			{
				name: 'Total Revenue',
				type: 'line',
				yAxisIndex: 1,
				data: [16800000, 50400000, 104000000],
				lineStyle: {
					color: '#FF6B6B',
					width: 3,
				},
				itemStyle: {
					color: '#FF6B6B',
					borderWidth: 2,
					borderColor: '#fff'
				},
				symbol: 'rect',
				symbolSize: 8,
				label: {
					show: true,
					position: 'bottom',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					offset: [40, -6],
					color: '#FF6B6B'
				}
			}
		]
	}

	chart3NewInstance.setOption(option)
	setTimeout(() => chart3NewInstance?.resize(), 50)
}

// Chart 4 New: Profit Statement
function renderChart4New() {
	if (!chart4NewRef.value) return

	if (chart4NewInstance) {
		chart4NewInstance.dispose()
	}
	chart4NewInstance = echarts.init(chart4NewRef.value)

	const screenWidth = window.innerWidth
	const titleFontSize = getTitleFontSize()
	const axisLabelFontSize = getAxisLabelFontSize()
	const legendFontSize = getLegendFontSize()
	const seriesLabelFontSize = getSeriesLabelFontSize()

	const option = {
		title: {
			text: 'Profit Statement',
			textStyle: { fontSize: titleFontSize, color: '#333333' },
			top: screenWidth <= 1280 ? 30 : 50,
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			formatter: function(params) {
				let result = params[0].axisValue + '<br/>'
				const totalRevenueData = [16800000, 50400000, 104000000]
				const grossProfitData = [14890000, 44670000, 92100000]
				const contributionMarginData = [11965000, 37155000, 79250000]
				const ebitData = [11756667, 36821667, 78791666]
				const yearIndex = params[0].dataIndex

				params.forEach(function(item) {
					if (item.seriesName.endsWith('2')) {
						return
					}
					if (item.seriesName === 'Total Revenue') {
						result += item.marker + item.seriesName + ': €' + (totalRevenueData[yearIndex] / 1000000).toFixed(1) + 'M<br/>'
					} else if (item.seriesName === 'Gross Profit') {
						result += item.marker + item.seriesName + ': €' + (grossProfitData[yearIndex] / 1000000).toFixed(1) + 'M<br/>'
					} else if (item.seriesName === 'Contribution Margin') {
						result += item.marker + item.seriesName + ': €' + (contributionMarginData[yearIndex] / 1000000).toFixed(1) + 'M<br/>'
					} else if (item.seriesName === 'EBIT') {
						result += item.marker + item.seriesName + ': €' + (ebitData[yearIndex] / 1000000).toFixed(1) + 'M<br/>'
					} else if (item.seriesName.includes('Gross Margin')) {
						result += item.marker + item.seriesName + ': ' + item.value + '%<br/>'
					} else if (item.value !== null && item.value !== undefined) {
						result += item.marker + item.seriesName + ': €' + (Math.abs(item.value) / 1000000).toFixed(1) + 'M<br/>'
					}
				})
				return result
			}
		},
		legend: {
			data: ['Total Revenue', 'Gross Profit', 'Contribution Margin', 'EBIT', 'Gross Margin'],
			bottom: 5,
			textStyle: { fontSize: legendFontSize },
			itemGap: 12
		},
		grid: {
			left: screenWidth <= 1280 ? '8%' : '8%',
			right: screenWidth <= 1280 ? '8%' : '8%',
			top: screenWidth <= 1280 ? '20%' : '15%',
			bottom: screenWidth <= 1280 ? '15%' : '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['2026', '2027', '2028'],
			axisLabel: { fontSize: axisLabelFontSize, color: '#666' },
			axisLine: { lineStyle: { color: '#ddd' } }
		},
		yAxis: [
			{
				type: 'value',
				name: 'Amount (€)',
				position: 'left',
				min: 0,
				max: 110000000,
				axisLabel: {
					formatter: function(value) {
						return '€' + (value / 1000000).toFixed(0) + 'M'
					},
					fontSize: axisLabelFontSize,
					color: '#666'
				},
				nameTextStyle: {
					fontSize: axisLabelFontSize,
					padding: [0, 20, 10, 0]
				},
				axisLine: { lineStyle: { color: '#00d4ff' } },
				splitLine: { lineStyle: { color: '#f0f0f0' } }
			},
			{
				type: 'value',
				name: 'Gross Margin (%)',
				position: 'right',
				min: 85,
				max: 92,
				axisLabel: {
					formatter: '{value}%',
					fontSize: axisLabelFontSize,
					color: '#666'
				},
				nameTextStyle: {
					fontSize: axisLabelFontSize,
					padding: [0, 0, 10, 0]
				},
				axisLine: { lineStyle: { color: '#FF6B6B' } },
				splitLine: { show: false }
			}
		],
		series: [
			{
				name: 'Total Revenue',
				type: 'bar',
				stack: 'revenue',
				yAxisIndex: 0,
				data: [14890000, 44670000, 92100000],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00d4ff' },
						{ offset: 1, color: '#0099cc' }
					])
				},
				barWidth: '20%',
				label: {
					show: false
				}
			},
			{
				name: 'Less: Cost of Goods Sold (COGS)',
				type: 'bar',
				stack: 'revenue',
				yAxisIndex: 0,
				data: [1910000, 5730000, 11900000],
				itemStyle: {
					color: {
						type: 'pattern',
						image: createDiagonalPattern('#0099cc'),
						repeat: 'repeat'
					}
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'inside',
					fontSize: 12,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#ffffff',
					fontWeight: 'bold',
					textShadowColor: 'rgba(0, 0, 0, 0.6)',
					textShadowBlur: 4,
					textShadowOffsetX: 1,
					textShadowOffsetY: 1
				}
			},
			{
				name: 'Total Revenue2',
				type: 'bar',
				stack: 'revenue',
				yAxisIndex: 0,
				data: [10, 10, 10],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00d4ff' },
						{ offset: 1, color: '#0099cc' }
					])
				},
				barWidth: '0%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						const totalRevenueData = [16800000, 50400000, 104000000]
						return '€' + (totalRevenueData[params.dataIndex] / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					offset: [0, -2]
				}
			},
			{
				name: 'Gross Profit',
				type: 'bar',
				stack: 'profit',
				yAxisIndex: 0,
				data: [11965000, 37155000, 79250000],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#67E0DC' },
						{ offset: 1, color: '#4db3aa' }
					])
				},
				barWidth: '20%',
				label: {
					show: false
				}
			},
			{
				name: 'Less: Other Variable Costs',
				type: 'bar',
				stack: 'profit',
				yAxisIndex: 0,
				data: [2925000, 7515000, 12850000],
				itemStyle: {
					color: {
						type: 'pattern',
						image: createDiagonalPattern('#4db3aa'),
						repeat: 'repeat'
					}
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'inside',
					fontSize: 12,
					formatter: function(params) {
						const grossProfitData = [2925000, 7515000, 12850000]
						return '€' + (grossProfitData[params.dataIndex] / 1000000).toFixed(1) + 'M'
					},
					color: '#ffffff',
					fontWeight: 'bold',
					textShadowColor: 'rgba(0, 0, 0, 0.6)',
					textShadowBlur: 4,
					textShadowOffsetX: 1,
					textShadowOffsetY: 1
				}
			},
			{
				name: 'Gross Profit2',
				type: 'bar',
				stack: 'profit',
				yAxisIndex: 0,
				data: [10, 10, 10],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#67E0DC' },
						{ offset: 1, color: '#4db3aa' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						const totalRevenueData = [14890000, 44670000, 92100000]
						return '€' + (totalRevenueData[params.dataIndex] / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					offset: [0, -2]
				}
			},
			{
				name: 'Contribution Margin',
				type: 'bar',
				stack: 'margin',
				yAxisIndex: 0,
				data: [11465000, 36530000, 78500000],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#ffc27a' },
						{ offset: 1, color: '#ffc27a' }
					])
				},
				barWidth: '20%',
				label: {
					show: false
				}
			},
			{
				name: 'Less: Annual Fixed Costs',
				type: 'bar',
				stack: 'margin',
				yAxisIndex: 0,
				data: [500000, 625000, 750000],
				itemStyle: {
					color: {
						type: 'pattern',
						image: createDiagonalPattern('#ce9d63'),
						repeat: 'repeat'
					}
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'inside',
					fontSize: 12,
					formatter: function(params) {
						const grossProfitData = [500000, 625000, 750000]
						return '€' + (grossProfitData[params.dataIndex] / 1000000).toFixed(1) + 'M'
					},
					color: '#ffffff',
					fontWeight: 'bold',
					textShadowColor: 'rgba(0, 0, 0, 0.6)',
					textShadowBlur: 4,
					textShadowOffsetX: 1,
					textShadowOffsetY: 1
				}
			},
			{
				name: 'Contribution Margin2',
				type: 'bar',
				stack: 'margin',
				yAxisIndex: 0,
				data: [10, 10, 10],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#FFC107' },
						{ offset: 0.5, color: '#F57F17' }
					])
				},
				barWidth: '0%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						const totalRevenueData = [11965000, 37155000, 79250000]
						return '€' + (totalRevenueData[params.dataIndex] / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					offset: [0, -2]
				}
			},
			{
				name: 'EBIT',
				type: 'bar',
				stack: 'ebit',
				yAxisIndex: 0,
				data: [11465000, 36530000, 78500000],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#f17c7c' },
						{ offset: 1, color: '#ff6b6b' }
					])
				},
				barWidth: '20%',
				label: {
					show: false
				}
			},
			{
				name: 'Less: Mold Amortization',
				type: 'bar',
				stack: 'ebit',
				yAxisIndex: 0,
				data: [291667, 291667, 291666],
				itemStyle: {
					color: {
						type: 'pattern',
						image: createDiagonalPattern('#f17c7c'),
						repeat: 'repeat'
					}
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'inside',
					fontSize: 12,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#ffffff',
					fontWeight: 'bold',
					textShadowColor: 'rgba(0, 0, 0, 0.6)',
					textShadowBlur: 4,
					textShadowOffsetX: 1,
					textShadowOffsetY: 1
				}
			},
			{
				name: 'EBIT2',
				type: 'bar',
				stack: 'ebit',
				yAxisIndex: 0,
				data: [10, 10, 10],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#f17c7c' },
						{ offset: 1, color: '#ff6b6b' }
					])
				},
				barWidth: '0%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						const ebitData = [11465000, 36530000, 78500000]
						return '€' + (ebitData[params.dataIndex] / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					offset: [0, -2]
				}
			},
			{
				name: 'Gross Margin',
				type: 'line',
				yAxisIndex: 1,
				data: [88.6, 88.6, 88.6],
				lineStyle: {
					color: '#4db3aa',
					width: 3,
				},
				itemStyle: {
					color: '#4db3aa',
					borderWidth: 2,
					borderColor: '#fff'
				},
				symbol: 'diamond',
				symbolSize: 6,
				label: {
					show: true,
					position: 'bottom',
					fontSize: seriesLabelFontSize,
					formatter: '{c}%',
					color: '#4db3aa',
					offset: [0, 8]
				}
			}
		]
	}

	chart4NewInstance.setOption(option)
	setTimeout(() => chart4NewInstance?.resize(), 50)
}

// Chart 5 New: Investment Return Analysis
function renderChart5New() {
	if (!chart5NewRef.value) return

	if (chart5NewInstance) {
		chart5NewInstance.dispose()
	}
	chart5NewInstance = echarts.init(chart5NewRef.value)

	const screenWidth = window.innerWidth
	const titleFontSize = getTitleFontSize()
	const subtitleFontSize = getSubtitleFontSize()
	const axisLabelFontSize = getAxisLabelFontSize()
	const legendFontSize = getLegendFontSize()
	const seriesLabelFontSize = getSeriesLabelFontSize()

	const option = {
		title: {
			text: 'Investment Return Analysis',
			subtext: 'Based on €5M Total Investment',
			textStyle: { fontSize: titleFontSize, color: '#333333' },
			subtextStyle: { fontSize: subtitleFontSize, color: '#666' },
			top: screenWidth <= 1280 ? '5%' : '3%',
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' },
			formatter: function(params) {
				let result = params[0].axisValue + '<br/>'
				params.forEach(function(item) {
					if (item.seriesName.includes('ROI')) {
						result += item.marker + item.seriesName + ': ' + item.value + '%<br/>'
					} else {
						result += item.marker + item.seriesName + ': €' + (item.value / 1000000).toFixed(1) + 'M<br/>'
					}
				})
				return result
			}
		},
		legend: {
			data: ['Annual Net Profit', 'Cumulative Net Profit', 'Annual ROI', 'Cumulative ROI'],
			bottom: '5%',
			textStyle: { fontSize: legendFontSize },
			itemGap: 15
		},
		grid: {
			left: screenWidth <= 1280 ? '8%' : '8%',
			right: screenWidth <= 1280 ? '8%' : '8%',
			top: screenWidth <= 1280 ? '20%' : '15%',
			bottom: screenWidth <= 1280 ? '15%' : '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['2026', '2027', '2028'],
			axisLabel: { fontSize: axisLabelFontSize, color: '#666' },
			axisLine: { lineStyle: { color: '#ddd' } }
		},
		yAxis: [
			{
				type: 'value',
				name: 'Net Profit (€)',
				position: 'left',
				axisLabel: {
					formatter: function(value) {
						return '€' + (value / 1000000).toFixed(0) + 'M'
					},
					fontSize: axisLabelFontSize,
					color: '#666'
				},
				nameTextStyle: {
					fontSize: axisLabelFontSize,
					padding: [0, 20, 10, 0]
				},
				axisLine: { lineStyle: { color: '#00d4ff' } },
				splitLine: { lineStyle: { color: '#f0f0f0' } }
			},
			{
				type: 'value',
				name: 'ROI (%)',
				position: 'right',
				min: 0,
				max: 6000,
				axisLabel: {
					formatter: '{value}%',
					fontSize: axisLabelFontSize,
					color: '#666'
				},
				nameTextStyle: {
					fontSize: axisLabelFontSize,
					padding: [0, 0, 10, 60]
				},
				axisLine: { lineStyle: { color: '#FF6B6B' } },
				splitLine: { show: false }
			}
		],
		series: [
			{
				name: 'Annual Net Profit',
				type: 'bar',
				yAxisIndex: 0,
				data: [11173333, 36238333, 78208334],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00d4ff' },
						{ offset: 1, color: '#0099cc' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					offset: [0, -8]
				}
			},
			{
				name: 'Cumulative Net Profit',
				type: 'bar',
				yAxisIndex: 0,
				data: [11173333, 47411666, 125620000],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#67E0DC' },
						{ offset: 1, color: '#4db3aa' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					offset: [0, -8]
				}
			},
			{
				name: 'Annual ROI',
				type: 'line',
				yAxisIndex: 1,
				data: [223.5, 724.8, 1564.2],
				lineStyle: {
					color: '#FF6B6B',
					width: 4
				},
				itemStyle: {
					color: '#FF6B6B',
					borderWidth: 3,
					borderColor: '#fff'
				},
				symbol: 'circle',
				symbolSize: 8,
				label: {
					show: true,
					position: 'bottom',
					fontSize: seriesLabelFontSize,
					formatter: '{c}%',
					color: '#FF6B6B',
					fontWeight: 'bold',
					offset: [30, 2]
				}
			},
			{
				name: 'Cumulative ROI',
				type: 'line',
				yAxisIndex: 1,
				data: [223.5, 948.2, 2512.4],
				lineStyle: {
					color: '#FFC107',
					width: 4,
					type: 'dashed'
				},
				itemStyle: {
					color: '#FFC107',
					borderWidth: 3,
					borderColor: '#fff'
				},
				symbol: 'diamond',
				symbolSize: 8,
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: '{c}%',
					color: '#FFC107',
					fontWeight: 'bold',
					offset: [-10, -2]
				}
			}
		],
		graphic: {
			type: 'text',
			left: 'center',
			bottom: '1%',
			style: {
				text: 'Investment Amount: €5M | Cumulative Return Over Three Years: €125.6M | Total Return Rate: 2512.4%',
				fontSize: axisLabelFontSize,
				color: '#666',
				backgroundColor: '#f8f9fa',
				padding: [8, 16],
				borderRadius: 8
			}
		}
	}

	chart5NewInstance.setOption(option)
	setTimeout(() => chart5NewInstance?.resize(), 50)
}

// Chart 6 New: Cash Flow Analysis
function renderChart6New() {
	if (!chart6NewRef.value) return

	if (chart6NewInstance) {
		chart6NewInstance.dispose()
	}
	chart6NewInstance = echarts.init(chart6NewRef.value)

	const screenWidth = window.innerWidth
	const titleFontSize = getTitleFontSize()
	const axisLabelFontSize = getAxisLabelFontSize()
	const legendFontSize = getLegendFontSize()
	const seriesLabelFontSize = getSeriesLabelFontSize()

	const option = {
		title: {
			text: 'Cash Flow Analysis',
			textStyle: { fontSize: titleFontSize, color: '#333333' },
			top: screenWidth <= 1280 ? '5%' : '3%',
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' },
			formatter: function(params) {
				let result = params[0].axisValue + '<br/>'
				params.forEach(function(item) {
					if (item.seriesName === 'Operating Cash Flow Label') {
						return
					}
					if (item.seriesType === 'line') {
						result += item.marker + item.seriesName + ': €' + (item.value / 1000000).toFixed(2) + 'M<br/>'
					} else {
						result += item.marker + item.seriesName + ': €' + (item.value / 1000000).toFixed(2) + 'M<br/>'
					}
				})
				return result
			}
		},
		legend: {
			data: ['Pre-tax Net Profit', 'Add: Non-cash Amortization', 'Operating Cash Flow', 'Cumulative Cash Flow'],
			bottom: 5,
			textStyle: { fontSize: legendFontSize },
			itemGap: 10
		},
		grid: {
			left: screenWidth <= 1280 ? '8%' : '8%',
			right: screenWidth <= 1280 ? '8%' : '8%',
			top: screenWidth <= 1280 ? '20%' : '15%',
			bottom: screenWidth <= 1280 ? '15%' : '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['2026', '2027', '2028'],
			axisLabel: { fontSize: axisLabelFontSize, color: '#666' },
			axisLine: { lineStyle: { color: '#ddd' } }
		},
		yAxis: [
			{
				type: 'value',
				name: 'Cash Flow (€)',
				position: 'left',
				min: 0,
				max: 90000000,
				axisLabel: {
					formatter: function(value) {
						return (value / 1000000).toFixed(0) + 'M'
					},
					fontSize: axisLabelFontSize,
					color: '#666'
				},
				nameTextStyle: {
					fontSize: axisLabelFontSize,
					padding: [0, 0, 10, 0],
					color: '#00d4ff'
				},
				axisLine: { lineStyle: { color: '#4CAF50' } },
				splitLine: { lineStyle: { color: '#f0f0f0' } }
			},
			{
				type: 'value',
				name: 'Cumulative (€)',
				position: 'right',
				min: 0,
				max: 130000000,
				axisLabel: {
					formatter: function(value) {
						return (value / 1000000).toFixed(0) + 'M'
					},
					fontSize: axisLabelFontSize,
					color: '#666'
				},
				nameTextStyle: {
					fontSize: axisLabelFontSize,
					padding: [0, 0, 10, 0]
				},
				axisLine: { lineStyle: { color: '#FF6B6B' } },
				splitLine: { show: false }
			}
		],
		series: [
			{
				name: 'Pre-tax Net Profit',
				type: 'bar',
				stack: 'cashflow',
				yAxisIndex: 0,
				data: [11173333, 36238333, 78208334],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00d4ff' },
						{ offset: 1, color: '#0099cc' }
					])
				},
				barWidth: '20%',
				label: {
					show: false
				}
			},
			{
				name: 'Add: Non-cash Amortization',
				type: 'bar',
				stack: 'cashflow',
				yAxisIndex: 0,
				data: [291667, 291667, 291666],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#67E0DC' },
						{ offset: 1, color: '#4db3aa' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'inside',
					fontSize: 12,
					formatter: function(params) {
						return '€' + (params.value / 1000).toFixed(0) + 'K'
					},
					color: '#ffffff',
					fontWeight: 'bold',
					textShadowColor: 'rgba(0, 0, 0, 0.6)',
					textShadowBlur: 4,
					textShadowOffsetX: 1,
					textShadowOffsetY: 1
				}
			},
			{
				name: 'Operating Cash Flow Label',
				type: 'bar',
				stack: 'cashflow',
				yAxisIndex: 0,
				data: [10, 10, 10],
				itemStyle: {
					color: 'transparent'
				},
				barWidth: '0%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						const stackedTotal = [11173333, 36238333, 78208334]
						return '€' + (stackedTotal[params.dataIndex] / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
					offset: [0, -2]
				}
			},
			{
				name: 'Operating Cash Flow',
				type: 'bar',
				yAxisIndex: 0,
				data: [11465000, 36530000, 78500000],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#ffc27a' },
						{ offset: 1, color: '#ffc27a' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#000000',
				}
			},
			{
				name: 'Cumulative Cash Flow',
				type: 'line',
				yAxisIndex: 1,
				data: [11465000, 47995000, 126495000],
				itemStyle: {
					color: '#FF6B6B'
				},
				lineStyle: {
					width: 3,
					color: '#FF6B6B'
				},
				symbol: 'circle',
				symbolSize: 8,
				label: {
					show: true,
					position: 'bottom',
					fontSize: seriesLabelFontSize,
					formatter: function(params) {
						return '€' + (params.value / 1000000).toFixed(1) + 'M'
					},
					color: '#FF6B6B',
					offset: [30, 4]
				}
			}
		]
	}

	chart6NewInstance.setOption(option)
	setTimeout(() => chart6NewInstance?.resize(), 50)
}

// Chart 7 New: Key Performance Indicators
function renderChart7New() {
	if (!chart7NewRef.value) return

	if (chart7NewInstance) {
		chart7NewInstance.dispose()
	}
	chart7NewInstance = echarts.init(chart7NewRef.value)

	const screenWidth = window.innerWidth
	const titleFontSize = getTitleFontSize()
	const axisLabelFontSize = getAxisLabelFontSize()
	const legendFontSize = getLegendFontSize()
	const seriesLabelFontSize = getSeriesLabelFontSize()

	const option = {
		title: {
			text: 'Key Performance Indicators',
			textStyle: { fontSize: titleFontSize, color: '#333333' },
			top: screenWidth <= 1280 ? '5%' : '3%',
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' },
			formatter: function(params) {
				let result = params[0].axisValue + '<br/>'
				params.forEach(function(item) {
					if (item.seriesName.includes('ROI') && item.value > 100) {
						result += item.marker + item.seriesName + ': ' + item.value.toFixed(1) + '%<br/>'
					} else if (item.value !== null && item.value !== undefined) {
						result += item.marker + item.seriesName + ': ' + item.value + '%<br/>'
					}
				})
				return result
			}
		},
		legend: {
			data: ['Gross Margin', 'Contribution Margin Ratio', 'Net Profit Margin', 'Annual ROI'],
			bottom: 5,
			textStyle: { fontSize: legendFontSize },
			itemGap: 15
		},
		grid: {
			left: screenWidth <= 1280 ? '8%' : '8%',
			right: screenWidth <= 1280 ? '8%' : '8%',
			top: screenWidth <= 1280 ? '20%' : '15%',
			bottom: screenWidth <= 1280 ? '15%' : '10%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			data: ['2026', '2027', '2028'],
			axisLabel: { fontSize: axisLabelFontSize, color: '#666' },
			axisLine: { lineStyle: { color: '#ddd' } }
		},
		yAxis: [
			{
				type: 'value',
				name: 'Profit Margin (%)',
				position: 'left',
				min: 0,
				max: 100,
				axisLabel: {
					formatter: '{value}%',
					fontSize: axisLabelFontSize,
					color: '#666666'
				},
				nameTextStyle: {
					fontSize: axisLabelFontSize,
					padding: [0, 0, 10, 0]
				},
				axisLine: { lineStyle: { color: '#00d4ff'} },
				splitLine: { lineStyle: { color: '#f0f0f0' } }
			},
			{
				type: 'value',
				name: 'ROI (%)',
				position: 'right',
				min: 0,
				max: 1600,
				axisLabel: {
					formatter: '{value}%',
					fontSize: axisLabelFontSize,
					color: '#666666'
				},
				nameGap: 10,
				nameTextStyle: {
					fontSize: axisLabelFontSize,
					padding: [0, 0, 10, 60]
				},
				axisLine: { lineStyle: { color: '#FF6B6B' } },
				splitLine: { show: false }
			}
		],
		series: [
			{
				name: 'Gross Margin',
				type: 'bar',
				yAxisIndex: 0,
				data: [88.6, 88.6, 88.6],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#00d4ff' },
						{ offset: 1, color: '#0099cc' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: '{c}%',
					color: '#000000',
					offset: [0, -8]
				}
			},
			{
				name: 'Contribution Margin Ratio',
				type: 'bar',
				yAxisIndex: 0,
				data: [71.2, 73.7, 76.2],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#67E0DC' },
						{ offset: 1, color: '#4db3aa' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: '{c}%',
					color: '#000000',
					offset: [0, -8]
				}
			},
			{
				name: 'Net Profit Margin',
				type: 'bar',
				yAxisIndex: 0,
				data: [66.5, 71.9, 75.2],
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: '#ffc27a' },
						{ offset: 1, color: '#ffc27a' }
					])
				},
				barWidth: '20%',
				label: {
					show: true,
					position: 'top',
					fontSize: seriesLabelFontSize,
					formatter: '{c}%',
					color: '#000000',
					offset: [0, -8]
				}
			},
			{
				name: 'Annual ROI',
				type: 'line',
				yAxisIndex: 1,
				data: [223.5, 724.8, 1564.2],
				lineStyle: {
					color: '#FF6B6B',
					width: 3,
					type: 'solid'
				},
				itemStyle: {
					color: '#FF6B6B',
					borderWidth: 4,
					borderColor: '#fff'
				},
				symbol: 'circle',
				symbolSize: 10,
				label: {
					show: true,
					position: 'bottom',
					fontSize: seriesLabelFontSize,
					formatter: '{c}%',
					color: '#FF6B6B',
					offset: [30, 16]
				}
			}
		]
	}

	chart7NewInstance.setOption(option)
	setTimeout(() => chart7NewInstance?.resize(), 50)
}

// Watch for visibility changes
watch(() => props.visible, (newVal) => {
	if (newVal) {
		nextTick(() => {
			renderCharts()
		})
	}
})

// Cleanup
onBeforeUnmount(() => {
	if (chart1Instance) {
		chart1Instance.dispose()
		chart1Instance = null
	}
	if (chart2Instance) {
		chart2Instance.dispose()
		chart2Instance = null
	}
	if (chart3NewInstance) {
		chart3NewInstance.dispose()
		chart3NewInstance = null
	}
	if (chart4NewInstance) {
		chart4NewInstance.dispose()
		chart4NewInstance = null
	}
	if (chart5NewInstance) {
		chart5NewInstance.dispose()
		chart5NewInstance = null
	}
	if (chart6NewInstance) {
		chart6NewInstance.dispose()
		chart6NewInstance = null
	}
	if (chart7NewInstance) {
		chart7NewInstance.dispose()
		chart7NewInstance = null
	}
})
</script>

<style scoped>
.revenue-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(10px);
	z-index: 10002;
	display: flex;
	justify-content: center;
	align-items: center;
}

@media (min-width: 1024px) {
	.revenue-modal {
		padding: 60px 40px;
	}
}

.revenue-modal-content {
	width: 100%;
	height: 100%;
	padding: 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	position: relative;
}

.nav-btn {
	background: rgba(255, 255, 255, 0.8);
	border: none;
	border-radius: 50%;
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.3s ease;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	position: absolute;
	z-index: 10;
}

.nav-btn:hover:not(.disabled) {
	background: rgba(255, 255, 255, 1);
	transform: scale(1.1);
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.nav-btn.disabled {
	opacity: 0.4;
	cursor: not-allowed;
	background: rgba(255, 255, 255, 0.5);
}

.nav-btn-left {
	left: 20px;
	top: 50%;
	transform: translateY(-50%);
	font-size: 12px !important;
}

.nav-btn-left:hover:not(.disabled) {
	transform: translateY(-50%) scale(1.1);
}

.nav-btn-right {
	right: 20px;
	top: 50%;
	transform: translateY(-50%);
	font-size: 12px !important;
}

.nav-btn-right:hover:not(.disabled) {
	transform: translateY(-50%) scale(1.1);
}

.page-indicators {
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	gap: 12px;
	align-items: center;
	z-index: 20;
	background: rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(10px);
	padding: 8px 16px;
	border-radius: 24px;
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.page-dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.4);
	cursor: pointer;
	transition: all 0.3s ease;
}

.page-dot:hover {
	background: rgba(255, 255, 255, 0.6);
	transform: scale(1.2);
}

.page-dot.active {
	background: linear-gradient(135deg, #00d4ff, #0099cc);
	width: 24px;
	border-radius: 12px;
	box-shadow: 0 2px 8px rgba(0, 212, 255, 0.4);
}

.charts-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 20px;
	width: 100%;
	height: 100%;
	position: relative;
	padding: 20px;
	box-sizing: border-box;
}

.charts-grid.charts-grid-two {
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
}

.charts-grid.charts-grid-mixed {
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr;
	gap: 30px;
}

.charts-grid.charts-grid-two::after {
	content: '';
	position: absolute;
	top: 100px;
	bottom: 120px;
	left: 50%;
	width: 1px;
	background-color: #e0e0e0;
	transform: translateX(-50%);
	z-index: 1;
}

.chart-item {
	background: rgba(255, 255, 255, 0.98);
	border-radius: 15px;
	padding: 20px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	border: 1px solid rgba(255, 255, 255, 0.3);
	overflow: hidden;
	position: relative;
	z-index: 2;
}

.charts-grid-two .chart-item {
	padding: 0;
}

.modal-chart {
	width: 100%;
	height: 100%;
	min-height: 200px;
}

.charts-grid-two .modal-chart {
	min-height: 100%;
}

.text-content {
	background: rgba(255, 255, 255, 0.9);
	padding: 30px;
	border-radius: 15px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	overflow-y: auto;
	max-height: 100%;
}

.text-title {
	font-size: 24px;
	font-weight: bold;
	color: #2c3e50;
	margin-bottom: 24px;
	text-align: center;
}

.text-body {
	font-size: 18px;
	line-height: 1.8;
	color: #34495e;
}

.investment-highlights .highlight-section {
	margin-bottom: 24px;
}

.investment-highlights .highlight-section h3 {
	font-size: 20px;
	color: #2c3e50;
	margin-bottom: 12px;
	line-height: 1.4;
}

.investment-highlights .highlight-section ul {
	margin-left: 20px;
}

.investment-highlights .highlight-section li {
	font-size: 18px;
	line-height: 1.7;
	margin-bottom: 10px;
	color: #34495e;
	padding-left: 8px;
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
</style>