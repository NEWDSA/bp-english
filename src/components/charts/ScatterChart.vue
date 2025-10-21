<template>
  <div
    ref="chartRef"
    class="w-full h-full bg-gray-900/50 rounded-xl relative overflow-hidden"
    :class="{ 'cursor-pointer': !isDetailed }"
    >
    <!-- 纯CSS悬停遮罩效果 -->
    <div class="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-300 rounded-xl pointer-events-none">
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
    default: false
  },
  selectedCity: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['chart-click'])

const chartRef = ref(null)
let chartInstance = null
let resizeObserver = null

const generateRegionData = () => {
  const dataCount = props.isDetailed ? 8 : 6

  // 为每个地区定义一致的数据
  const regionData = {
    'China': {
      detailed: [2.143, 3.143, 4.00, 4.857, 5.429 ],
      yAxis: ['2020', '2021', '2022', '2023', '2024']
    },
    'Singapore': {
      detailed: [1.52, 1.78, 2.15, 2.56, 3.03],
      yAxis: ['2020', '2021', '2022', '2023', '2024']
    },
    'Italy': {
      detailed: [5.031, 7.839, 9.126, 9.746, 10.062],
      yAxis: ['2020', '2021', '2022', '2023', '2024']
    },
    'United States': {
      detailed: [4.619, 6.232, 7.779, 8.557, 8.34],
      yAxis: ['2020', '2021', '2022', '2023', '2024']
    },
    'United Arab Emirates': {
      detailed: [6.8, 7.5, 8.9, 10.2, 12.1],
      yAxis: ['2020', '2021', '2022', '2023', '2024']
    },
    'global': {
      detailed: [39.16, 40.54, 42.30, 44.21, 46.29],
      yAxis: ['2020', '2021', '2022', '2023', '2024']
    }
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
    data: selectedData.detailed,
    yAxis: selectedData.yAxis
  }
}

const getChartOptions = () => {
  const regionData = generateRegionData()
  const axisVisible = props.isDetailed
  const dataCount = props.isDetailed ? 8 : 6

  // 直接使用原始数值（不进行百分比标准化）
  const maxValue = Math.max(...regionData.data)

  // 调试日志
  console.log('ScatterChart data:', regionData.data)
  console.log('ScatterChart yAxis:', regionData.yAxis)
  console.log('Is detailed:', props.isDetailed)
  console.log('Selected city:', props.selectedCity)

  return {
    backgroundColor: 'transparent',
    legend: props.isDetailed ? {
      bottom: '3%',
      left: 'center',
      itemGap: 80,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
        padding: [0, 0, 0, 4]
      },
      data: [
        {
          name: 'Output value (in billions of US dollars)',
          icon: 'circle',
          itemStyle: {
            color: '#14E1D5'
          }
        },
      ],
      itemWidth: 48,  // Width for icons
      itemHeight: 8   // Height for icons
    } : undefined,
    grid: {
      left: '8%',
      right: '12%',
      top: props.isDetailed ? '5%' : '8%',
      bottom: props.isDetailed ? '-2%' : '8%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 50,
      show: false,
      axisLabel: {
        show: props.isDetailed,
        color: '#ffffff',
        fontSize: 20,
        // 显示原始数值
      },
      axisLine: {
        show: props.isDetailed,
        lineStyle: { color: '#374151' }
      },
      axisTick: { show: false },
      splitLine: {
        show: props.isDetailed,
        lineStyle: {
          color: 'rgba(100, 116, 139, 0.2)',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: regionData.yAxis,
      axisLabel: {
        show: props.isDetailed,
        color: '#ffffff',
        fontSize: 20,
        margin: 12
      },
      axisLine: {
        show: props.isDetailed,
        lineStyle: { color: '#374151' }
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      inverse: true
    },
    series: [
      // 进度条
      {
        name: 'Output value (in billions of US dollars)',
        type: 'bar',
        data: regionData.data.map((value, index) => ({
          value: value,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#4FD1EB' },
                { offset: 0.6, color: '#9AE4F3' },
                { offset: 1, color: '#F7FCFE' }
              ]
            },
            borderRadius: [10, 10, 10, 10],
            shadowBlur: 8,
            shadowColor: 'rgba(34, 211, 238, 0.4)'
          }
        })),
        barWidth: props.isDetailed ? 12 : 8 ,
        backgroundStyle: {
          color: 'rgba(30, 41, 59, 0.6)',
          borderRadius: [10, 10, 10, 10]
        },
        showBackground: true,
        z: 1,
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        label: {
          show: props.isDetailed,
          position: 'right',
          color: '#ffffff',
          fontSize: 20,
          fontWeight: 'none',
          distance: 15,
          formatter: '{c}'
        }
      }
    ]
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
      height: containerRect.height
    })

    if (!chartInstance) {
      console.error('Failed to create ECharts instance')
      return
    }

    const options = getChartOptions()
    chartInstance.setOption(options, false)

    // 仅为非详情图表添加点击事件监听器
    if (!props.isDetailed) {
      // 监听整个图表容器的点击事件
      chartInstance.getZr().on('click', (event) => {
        // 获取DOM元素位置
        const rect = chartRef.value.getBoundingClientRect()

        // 将点击坐标转换为图表坐标
        const pointInChart = chartInstance.convertFromPixel('grid', [event.offsetX - rect.left, event.offsetY - rect.top])

        // 无论是否点击在数据点上，都发出点击事件
        emit('chart-click', {
          chartType: 'scatter',
          params: {
            event: event,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
            // 包含坐标以备不时之需
            pointInChart: pointInChart
          }
        })
      })
    }

    // 强制立即调整大小以确保正确的尺寸
    setTimeout(() => {
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.resize()
      }
    }, 50)

    console.log('Scatter chart initialized successfully')

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
watch(() => props.selectedCity, (newCity) => {
  if (chartInstance && !chartInstance.isDisposed()) {
    const newOptions = getChartOptions()
    // 使用notMerge: false来合并选项而不是替换它们
    chartInstance.setOption({
      yAxis: {
        data: newOptions.yAxis.data
      },
      series: [{
        data: newOptions.series[0].data
      }]
    }, false)
    console.log(`Scatter chart updated for city: ${newCity ? newCity.city : 'None'}`)
  }
}, { deep: true })
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