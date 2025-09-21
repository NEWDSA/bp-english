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
  }
})

const emit = defineEmits(['chart-click'])

const chartRef = ref(null)
let chartInstance = null
let resizeObserver = null

const generateRandomData = (count = 6) => {
  const dataCount = props.isDetailed ? 12 : count

  // If a city is selected, generate data based on city characteristics
  if (props.selectedCity) {
    const citySeed = props.selectedCity.city.length + props.selectedCity.country.length
    const baseValue = (citySeed * 7) % 50 + 30 // Base value between 30-80

    return Array.from({ length: dataCount }, (_, index) => {
      // Generate data with some variance based on city and position
      const variance = Math.sin(index * 0.5 + citySeed) * 20
      const trend = index * 2 // Slight upward trend
      return Math.floor(baseValue + variance + trend + Math.random() * 10)
    })
  }

  // Default random data
  return Array.from({ length: dataCount }, () => Math.floor(Math.random() * 100) + 20)
}

const getChartOptions = () => {
  const data = generateRandomData()
  const axisVisible = props.isDetailed
  const dataCount = props.isDetailed ? 8 : 6
  const chartData = data.slice(0, dataCount)

  return {
    backgroundColor: 'transparent',
    grid: {
      left: '8%',
      right: '8%',
      top: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: dataCount }, (_, i) => ``),
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: [
      // Vertical lines from bottom
      {
        name: 'Vertical Lines',
        type: 'bar',
        data: chartData,
        barWidth: 2,
        itemStyle: {
          color: '#ffffff',
          borderRadius: [1, 1, 0, 0]
        },
        z: 1,
        animationDuration: 1000,
        animationEasing: 'cubicOut'
      },
      // Triangular filled area
      {
        name: 'Area',
        type: 'line',
        data: chartData,
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
              { offset: 1, color: 'rgba(34, 211, 238, 0.1)' }
            ]
          }
        },
        lineStyle: {
          color: '#22d3ee',
          width: 2
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#ffffff',
          borderColor: '#22d3ee',
          borderWidth: 2,
          shadowBlur: 8,
          shadowColor: 'rgba(34, 211, 238, 0.6)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowColor: 'rgba(34, 211, 238, 0.9)',
            borderWidth: 3
          }
        },
        smooth: false,
        z: 2,
        animationDuration: 1500,
        animationEasing: 'cubicOut'
      },
      // Top connection points
      {
        name: 'Points',
        type: 'scatter',
        data: chartData.map((value, index) => [index, value]),
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
          color: '#ffffff',
          borderColor: '#22d3ee',
          borderWidth: 2,
          shadowBlur: 10,
          shadowColor: 'rgba(34, 211, 238, 0.7)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 18,
            shadowColor: 'rgba(34, 211, 238, 1)',
            borderWidth: 3
          }
        },
        z: 3,
        animationDuration: 2000,
        animationEasing: 'elasticOut'
      }
    ]
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
    chartInstance.setOption(options, true)

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
          chartType: 'line',
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

    console.log('Line chart initialized successfully')

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
    console.log(`Line chart updated for city: ${newCity ? newCity.city : 'None'}`)
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