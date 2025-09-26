<template>
  <div
    ref="chartRef"
    class="w-full h-full bg-gray-900/50 rounded-xl relative overflow-hidden"
    :class="{ 'cursor-pointer': !isDetailed }"
    >
    <!-- CSS-only hover overlay -->
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
  },
  chartType: {
    type: String,
    default: 'line'
  },
})

console.log("props.chartType", props.chartType);

const emit = defineEmits(['chart-click'])

const chartRef = ref(null)
let chartInstance = null
let resizeObserver = null

const generateRegionData = () => {
  // 为每个地区定义一致的数据
  const regionData = {
    China: {
      area: [9.25, 10.26, 11.49, 12.99, 14.81, 17.03],
      line: ['hidden', 10.90, 11.90, 13.00, 14.00, 14.90],
      xAxis: ['2018', '2019', '2020', '2021', '2022', '2023'],
    },
    Singapore: {
      area: [2.8, 4.2, 3.5, 4.6, 6.3, 7.1],
      line: ['hidden', 12.1, -16.7, 31.4, 11.2, 12.7],
      xAxis: ['2015','2018', '2020', '2021', '2023', '2024'],
    },
    Italy: {
      area: [28.3, 38.1, 24.9, 32.6, 37.6, 43.4],
      line: ['hidden', 34.6, -34.6, 30.9, 15.3, 15.4],
      xAxis: ['2015', '2018', '2020', '2022', '2023', '2024'],
    },
    'United States': {
      area: [29.2, 30.4, 31.1, 32.8, 34.6, 40.3, 45.5, 48.1, 52.2, 54.9],
      line: ['hidden', 4.1, 2.3, 5.4, 5.5, 16.5, 12.9, 5.7, 8.5, 5.2],
      xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    },
    'United Arab Emirates': {
      area: [16.8, 17.6, 18.4, 19.3, 20.0, 19.7, 20.8, 22.0, 22.9, 24.0],
      line: ['hidden', 4.9, 4.4, 5.0, 4.0, -2.0, 5.7, 5.8, 4.2, 5.0],
      xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    },
    'global': {
      area: [320, 350, 380, 430, 450, 494, 470, 510, 550],
      line: ['hidden', 9.40, 8.60, 13.20, 4.70, 9.80, -4.90, 8.50, 7.80],
      xAxis: ['2015', '2016', '2017','2018', '2019', '2020', '2021', '2022', '2023'],
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

  const areaData = selectedData.area
  const lineData = selectedData.line

  const areaMax = Math.max(...areaData)
  const validLineData = lineData.filter(v => v !== 'hidden' && typeof v === 'number')
  const lineMax = Math.max(...validLineData)
  const lineMin = Math.min(...validLineData)

  return {
    area: areaData,
    line: lineData,
    xAxis: selectedData.xAxis,
    areaMax,
    lineMax,
    lineMin,
    // 根据数据范围决定是否需要分离轴
    needSeparateAxis: Math.abs(areaMax - lineMax) < areaMax * 0.1 // 如果差距小于10%则需要分离
  }
}

const getChartOptions = () => {
  const regionData = generateRegionData()
  const axisVisible = props.isDetailed

  return {
    backgroundColor: 'transparent',
    grid: {
      left: '3%',
      right: '3%',
      top: '20%',
      bottom: '14%',
    },
    xAxis: {
      type: 'category',
      data: props.isDetailed
        ? regionData.xAxis
        : regionData.xAxis.map(() => ''),
      axisLabel: {
        show: axisVisible,
        color: '#ffffff',
        fontSize: 20,
        margin: 40
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: [
      {
        type: 'value',
        max: regionData.needSeparateAxis ? regionData.areaMax * 1.2 : 'dataMax',
        show: false,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      {
        type: 'value',
        position: 'right',
        max: regionData.needSeparateAxis ? regionData.lineMax * 1.3 : 'dataMax',
        min: regionData.needSeparateAxis ?
          (regionData.lineMin < 0 ? regionData.lineMin * 1.3 : regionData.lineMin * 0.7) :
          'dataMin',
        axisLabel: {
          show: axisVisible,
          color: '#ffffff',
          fontSize: 10,
          formatter: '{value}%',
        },
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    graphic: props.isDetailed ? regionData.area.map((value, index) => ({
      type: 'text',
      left: `${9 + (81 / (regionData.area.length - 1)) * index}%`, // 根据图表网格定位
      top: '6%', // 固定在图表顶部位置
      style: {
        text:  Number(value) % 1 === 0 ? value.toString() :
           + Number(value).toFixed(1),
        fontSize: 20,
        fontWeight: 'none',
        fill: '#ffffff',
        textAlign: 'center',
        textVerticalAlign: 'bottom'
      },
      z: 100
    })) : [],
    series: [
      // 区域填充 - 渐变蓝色
      {
        name: 'Area',
        type: 'line',
        data: regionData.area,
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
      // 白色折线图
      {
        name: 'Line',
        type: 'line',
        yAxisIndex: 1,
        data: regionData.line,
        lineStyle: {
          color: '#c4c4c4ff',
          width: 2,
          shadowBlur: 8,
          shadowColor: 'rgba(255, 255, 255, 0.4)',
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#c4c4c4ff',
          borderColor: '#c4c4c4ff',
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: 'rgba(255, 255, 255, 0.7)',
        },
        label: {
          show: props.isDetailed,
          position: 'top',
          color: '#c4c4c4ff',
          fontSize: 20,
          fontWeight: 'none',
          distance: 8,
          formatter: (params) => {
            if (params.value === 'hidden') return '';
            return params.value + '%';
          },
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

onMounted(async () => {
  try {
    await nextTick()

    // Add resize listener
    window.addEventListener('resize', handleResize)

    // Add ResizeObserver for more accurate container size tracking
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        handleResize()
      })
    }

    // Use requestAnimationFrame for better DOM readiness
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
        // Check if the element has dimensions
        const rect = chartRef.value.getBoundingClientRect()
        console.log(`Chart container dimensions: ${rect.width}x${rect.height}`)
        if (rect.width === 0 || rect.height === 0) {
          console.warn('Chart container has zero dimensions, retrying...', attempts + 1)
          setTimeout(() => initWithRetry(attempts + 1), 150)
          return
        }

        // Initialize the chart
        initChart()

        // Start observing container size changes
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

    // Start initialization with a small delay
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
    // Dispose any existing chart instance
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
    }

    // Get container dimensions for initialization
    const containerRect = chartRef.value.getBoundingClientRect()
    console.log(`Initializing chart with dimensions: ${containerRect.width}x${containerRect.height}`)

    // Initialize new chart instance
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

    // Add click event listener only for non-detailed charts
    if (!props.isDetailed) {
      // Listen to click events on the entire chart container
      chartInstance.getZr().on('click', (event) => {
        // Get the DOM element position
        const rect = chartRef.value.getBoundingClientRect()

        // Convert click coordinates to chart coordinates
        const pointInChart = chartInstance.convertFromPixel('grid', [event.offsetX - rect.left, event.offsetY - rect.top])

        // Emit click event regardless of whether it's on a data point
        emit('chart-click', {
          chartType: 'area',
          params: {
            event: event,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
            // Include coordinates in case needed
            pointInChart: pointInChart
          }
        })
      })
    }

    // Force immediate resize to ensure proper sizing
    setTimeout(() => {
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.resize()
      }
    }, 50)

    console.log('Area chart initialized successfully')

  } catch (error) {
    console.error('Error in initChart:', error)

    // Clean up on error
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
  // Remove resize listener
  window.removeEventListener('resize', handleResize)

  // Disconnect ResizeObserver
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }

  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

// Handle resize
const handleResize = () => {
  if (chartInstance && chartRef.value) {
    try {
      // Use setTimeout to ensure DOM has finished updating
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

// Watch for selected city changes and update chart data
watch(() => props.selectedCity, (newCity) => {
  if (chartInstance && !chartInstance.isDisposed()) {
    const newOptions = getChartOptions()
    chartInstance.setOption(newOptions, true)
    console.log(`Area chart updated for city: ${newCity ? newCity.city : 'None'}`)
  }
}, { deep: true })
</script>

<style scoped>
/* CSS-only hover effects */
.cursor-pointer {
  position: relative;
  transition: all 0.3s ease;
}

.cursor-pointer:hover {
  transform: scale(1.02);
}

/* Ensure ECharts canvas doesn't block mouse events */
:deep(canvas) {
  pointer-events: none;
}
</style>