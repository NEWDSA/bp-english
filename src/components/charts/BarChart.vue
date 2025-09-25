<template>
  <div
    ref="chartRef"
    class="w-full h-full bg-gray-900/50 rounded-xl relative overflow-hidden"
    :class="{ 'cursor-pointer': !isDetailed }"
  >
    <!-- 纯CSS悬停遮罩效果 -->
    <div
      class="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-300 rounded-xl pointer-events-none"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl"></div>
      <div class="absolute inset-0 rounded-xl border-2 border-cyan-400/30 shadow-lg shadow-cyan-400/20"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-400/40 shadow-lg">
          <span class="text-cyan-300 text-sm font-medium">Click to view details</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  isDetailed: {
    type: Boolean,
    default: false,
  },
  selectedCity: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['chart-click'])

const chartRef = ref(null)
let chartInstance = null
let resizeObserver = null

const generateRegionData = (country) => {
  const dataCount = props.isDetailed ? 8 : 7  // 根据是否详情模式决定数据点数量

  // 为每个地区定义一致的数据
  const regionData = {
    China: {
      bar: [3.5, 4.3, 4.0, 4.5, 5.2, 6.0, 6.9],
      line: ['hidden', 23.00, -7.90, 13.90, 15.00, 15.50, 15.30],
    },
    Singapore: {
      bar: [35, 42, 46, 55, 62, 58, 68, 75],
      line: [32, 38, 42, 48, 55, 62, 65, 70],
    },
    Italy: {
      bar: [42, 48, 44, 58, 65, 62, 72, 79],
      line: [40, 44, 48, 52, 60, 65, 68, 73],
    },
    'United States': {
      bar: [38, 45, 49, 62, 69, 65, 75, 81],
      line: [35, 42, 46, 58, 65, 70, 73, 78],
    },
    'United Arab Emirates': {
      bar: [33, 39, 43, 48, 55, 52, 61, 68],
      line: [30, 36, 40, 45, 52, 56, 58, 63],
    },
    global: {
      bar: [170.4, 181.4, 244.1, 261.4, 303.5, 342.0, 303.8],
      line: [165.2, 175.8, 230.5, 248.7, 285.3, 325.4, 290.6],
    },
  }

  let selectedData = regionData['global'] // 默认使用全球数据

  if (props.selectedCity && props.selectedCity.country) {
    const country = props.selectedCity.country
    if (regionData[country]) {
      selectedData = regionData[country]
    } else if (country === 'Thailand' || country === 'Indonesia' || country === 'Malaysia') {
      selectedData = regionData['Singapore'] // 东南亚地区使用新加坡数据
    }
  }

  return {
    bar: selectedData.bar.slice(0, dataCount),
    line: selectedData.line.slice(0, dataCount),
  }
}

const getChartOptions = () => {
  const regionData = generateRegionData()
  const axisVisible = props.isDetailed
  const hasRegionSelected = props.selectedCity && props.selectedCity.country

  // 如果选择了地区，显示垂直线条图表样式
  if (hasRegionSelected) {
    return {
      backgroundColor: 'transparent',
      grid: {
        left: '8%',
        right: '8%',
        top: '15%',
        bottom: '15%',
      },
      xAxis: {
        type: 'category',
        data: props.isDetailed
          ? ['2015', '2018', '2020', '2021', '2022', '2023', '2024']
          : ['', '', '', '', '', '', ''],
        axisLabel: {
          show: axisVisible,
          color: '#ffffff',
          fontSize: 20,
        },
        axisLine: {
          show: axisVisible,
          lineStyle: { color: '#374151' },
        },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      yAxis: [
        {
          type: 'value',
          max: 'dataMax',
          show: false,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
        {
          type: 'value',
          position: 'right',
          max: 'dataMax',
          axisLabel: {
            show: axisVisible,
            color: '#ffffff',
            fontSize: 10,
            formatter: '{value}%',
          },
          axisLine: {
            show: axisVisible,
            lineStyle: { color: '#374151' },
          },
          axisTick: { show: false },
          splitLine: { show: false },
        },
      ],
      graphic: regionData.bar.map((value, index) => ({
        type: 'text',
        left: `${8 + (84 / (regionData.bar.length - 1)) * index}%`, // 根据图表网格定位
        top: '15%', // 固定在图表顶部位置
        style: {
          text: value.toString(),
          fontSize: 16,
          fontWeight: 'bold',
          fill: '#ffffff',
          textAlign: 'center',
          textVerticalAlign: 'bottom'
        },
        z: 100
      })),
      series: [
        // 区域填充
        {
          name: 'Area',
          type: 'line',
          data: regionData.bar,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(34, 211, 238, 0.8)' },
                { offset: 0.5, color: 'rgba(34, 211, 238, 0.5)' },
                { offset: 1, color: 'rgba(34, 211, 238, 0.1)' },
              ],
            },
          },
          lineStyle: {
            color: '#22d3ee',
            width: 2,
            shadowBlur: 6,
            shadowColor: 'rgba(34, 211, 238, 0.3)',
          },
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            color: '#ffffff',
            borderColor: '#22d3ee',
            borderWidth: 2,
            shadowBlur: 8,
            shadowColor: 'rgba(34, 211, 238, 0.6)',
          },
          label: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 15,
              shadowColor: 'rgba(34, 211, 238, 0.9)',
              borderWidth: 3,
            },
          },
          smooth: false,
          z: 2,
          animationDuration: 1500,
          animationEasing: 'cubicOut',
        },
        // 从数据点延伸的垂直线
        {
          name: 'Vertical Lines',
          type: 'scatter',
          data: (() => {
            const lineData = []
            regionData.bar.forEach((value, index) => {
              // 创建多个点来形成垂直线
              for (let i = 0; i <= value; i += value / 20) {
                lineData.push([index, i])
              }
            })
            return lineData
          })(),
          symbol: 'rect',
          symbolSize: [1, 2],
          itemStyle: {
            color: '#22d3ee',
            opacity: 0.6,
          },
          z: 1,
          silent: true,
          animation: false,
        },
        // 叠加的折线图
        {
          name: 'Line',
          type: 'line',
          yAxisIndex: 1,
          data: regionData.line,
          lineStyle: {
            color: '#ffffff',
            width: 3,
            shadowBlur: 8,
            shadowColor: 'rgba(255, 255, 255, 0.4)',
          },
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#ffffff',
            borderColor: '#ffffff',
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: 'rgba(255, 255, 255, 0.7)',
          },
          label: {
            show: true,
            position: 'top',
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
            distance: 8,
            formatter: '{c}%',
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 18,
              shadowColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 4,
            },
          },
          smooth: false,
          z: 3,
          animationDuration: 2000,
          animationEasing: 'cubicOut',
        },
      ],
    }
  }

  // 未选择地区时的默认胶囊柱状图样式
  return {
    backgroundColor: 'transparent',
    grid: {
      left: '8%',
      right: '8%',
      top: '15%',
      bottom: '15%',
    },
    xAxis: {
      type: 'category',
      data: props.isDetailed
        ? ['2015', '2018', '2020', '2021', '2022', '2023', '2024']
        : ['2015', '2018', '2020', '2021', '2022', '2023', '2024'],
      axisLabel: {
        show: axisVisible,
        color: '#ffffff',
        fontSize: 20,
        margin: 40,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      max: 'dataMax',
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        name: 'Capsule Bars',
        data: regionData.bar,
        type: 'bar',
        barWidth: '24px',
        barGap: '20%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#0c4a6e' },
              { offset: 0.2, color: '#0369a1' },
              { offset: 0.4, color: '#0284c7' },
              { offset: 0.6, color: '#0ea5e9' },
              { offset: 0.8, color: '#38bdf8' },
              { offset: 1, color: '#7dd3fc' },
            ],
          },
          borderRadius: [12, 12, 12, 12],
          shadowBlur: 10,
          shadowColor: 'rgba(56, 189, 248, 0.4)',
          shadowOffsetY: 0,
        },
        label: {
          show: props.isDetailed,
          position: 'top',
          color: '#ffffff',
          fontSize: 20,
          fontWeight: 'none',
          distance: 8,
          formatter: '{c}',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(56, 189, 248, 0.6)',
          },
        },
        animationDuration: 1500,
        animationEasing: 'elasticOut',
        z: 1,
      },
      // 分段线条系列（用于创建柱状图的分割线效果）
      {
        name: 'Segment Lines',
        type: 'scatter',
        data: (() => {
          const barData = regionData.bar
          const lineData = []

          barData.forEach((value, barIndex) => {
            const segmentCount = Math.floor(value / 10)
            for (let i = 1; i < segmentCount; i++) {
              lineData.push([barIndex, i * 10])
            }
          })

          return lineData
        })(),
        symbol: 'rect',
        symbolSize: [20, 1],
        itemStyle: {
          color: '#1e293b',
          opacity: 0.9,
        },
        z: 10,
        silent: true,
        animation: false,
      },
    ],
  }
}

onMounted(async () => {
  try {
    await nextTick()

    // 添加窗口大小调整监听器
    window.addEventListener('resize', handleResize)

    // 添加ResizeObserver以更准确地跟踪容器大小
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        handleResize()
      })
    }

    // 使用requestAnimationFrame确保DOM就绪
    const initWithRetry = (attempts = 0, maxAttempts = 5) => {
      if (attempts >= maxAttempts) {
        console.error('Failed to initialize chart after', maxAttempts, 'attempts')
        return
      }

      if (!chartRef.value || !(chartRef.value instanceof HTMLElement)) {
        console.warn('Chart container not ready, retrying...', attempts + 1)
        setTimeout(() => initWithRetry(attempts + 1), 100)
        return
      }

      try {
        // 检查元素是否有尺寸
        const rect = chartRef.value.getBoundingClientRect()
        console.log(`Chart container dimensions: ${rect.width}x${rect.height}`)
        if (rect.width === 0 || rect.height === 0) {
          console.warn('Chart container has zero dimensions, retrying...', attempts + 1)
          setTimeout(() => initWithRetry(attempts + 1), 150)
          return
        }

        // 初始化图表
        initChart()

        // 开始监听容器尺寸变化
        if (resizeObserver && chartRef.value) {
          resizeObserver.observe(chartRef.value)
        }
      } catch (error) {
        console.error('Error in chart initialization attempt', attempts + 1, ':', error)
        if (attempts < maxAttempts - 1) {
          setTimeout(() => initWithRetry(attempts + 1), 200)
        }
      }
    }

    // 延迟一小段时间后开始初始化
    setTimeout(() => initWithRetry(), 100)
  } catch (error) {
    console.error('Error in chart mount hook:', error)
  }
})

const initChart = () => {
  if (!chartRef.value || !(chartRef.value instanceof HTMLElement)) {
    console.error('Chart reference is not a valid HTML element')
    return
  }

  try {
    // 销毁已存在的图表实例
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
    }

    // 获取容器尺寸用于初始化
    const containerRect = chartRef.value.getBoundingClientRect()
    console.log(`Initializing chart with dimensions: ${containerRect.width}x${containerRect.height}`)

    // 初始化新的图表实例
    chartInstance = echarts.init(chartRef.value, null, {
      width: containerRect.width,
      height: containerRect.height,
    })

    if (!chartInstance) {
      console.error('Failed to create ECharts instance')
      return
    }

    const options = getChartOptions()
    chartInstance.setOption(options, true)

    // 仅为非详情图表添加点击事件监听器
    if (!props.isDetailed) {
      // 监听整个图表容器的点击事件
      chartInstance.getZr().on('click', (event) => {
        // 获取DOM元素位置
        const rect = chartRef.value.getBoundingClientRect()

        // 将点击坐标转换为图表坐标
        const pointInChart = chartInstance.convertFromPixel('grid', [
          event.offsetX - rect.left,
          event.offsetY - rect.top,
        ])

        // 无论是否点击在数据点上，都发出点击事件
        emit('chart-click', {
          chartType: 'bar',
          params: {
            event: event,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
            // 包含坐标以备不时之需
            pointInChart: pointInChart,
          },
        })
      })
    }

    // 强制立即调整大小以确保正确的尺寸
    setTimeout(() => {
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.resize()
      }
    }, 50)

    console.log('Bar chart initialized successfully')
  } catch (error) {
    console.error('Error in initChart:', error)

    // 出错时清理
    if (chartInstance) {
      try {
        chartInstance.dispose()
      } catch (disposeError) {
        console.error('Error disposing chart:', disposeError)
      }
      chartInstance = null
    }
  }
}

onUnmounted(() => {
  // 移除窗口大小调整监听器
  window.removeEventListener('resize', handleResize)

  // 断开ResizeObserver连接
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }

  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

// 处理窗口大小调整
const handleResize = () => {
  if (chartInstance && chartRef.value) {
    try {
      // 使用setTimeout确保DOM已完成更新
      setTimeout(() => {
        if (chartInstance && !chartInstance.isDisposed()) {
          chartInstance.resize()
        }
      }, 100)
    } catch (error) {
      console.error('Error resizing chart:', error)
    }
  }
}

// 监听选中城市的变化并更新图表数据
watch(
  () => props.selectedCity,
  (newCity) => {
    if (chartInstance && !chartInstance.isDisposed()) {
      const newOptions = getChartOptions()
      chartInstance.setOption(newOptions, true)
      console.log(`Bar chart updated for city: ${newCity ? newCity.city : 'None'}`)
    }
  },
  { deep: true }
)
</script>

<style scoped>
/* 纯CSS悬停效果 */
.cursor-pointer {
  position: relative;
  transition: all 0.3s ease;
}

.cursor-pointer:hover {
  transform: scale(1.02);
}

/* 确保ECharts画布不会阻止鼠标事件 */
:deep(canvas) {
  pointer-events: none;
}
</style>
