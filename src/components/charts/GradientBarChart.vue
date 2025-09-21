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

const generateRandomData = (count = 12) => {
  const dataCount = props.isDetailed ? 16 : count

  // If a city is selected, generate data based on city characteristics
  if (props.selectedCity) {
    const citySeed = props.selectedCity.city.length + props.selectedCity.country.length
    const baseValue = (citySeed * 7) % 30 + 20 // Base value between 20-50

    return Array.from({ length: dataCount }, (_, index) => {
      // Generate ascending data with some variance
      const trend = index * 5 // Strong upward trend
      const variance = Math.sin(index * 0.3 + citySeed) * 10
      return Math.floor(baseValue + trend + variance + Math.random() * 8)
    })
  }

  // Default ascending data
  return Array.from({ length: dataCount }, (_, index) => {
    const baseValue = 15 + index * 6 // Ascending trend
    return Math.floor(baseValue + Math.random() * 10)
  })
}

const getChartOptions = () => {
  const data = generateRandomData()
  const axisVisible = props.isDetailed

  return {
    backgroundColor: 'transparent',
    grid: {
      left: '5%',
      right: '5%',
      top: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: props.isDetailed
        ? Array.from({ length: 16 }, (_, i) => `${i + 1}`)
        : Array.from({ length: 12 }, (_, i) => `${i + 1}`),
      axisLabel: {
        show: axisVisible,
        color: '#64748b',
        fontSize: 10
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: axisVisible,
        color: '#64748b',
        fontSize: 10
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: axisVisible,
        lineStyle: {
          color: 'rgba(100, 116, 139, 0.2)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'Gradient Bars',
        data: data,
        type: 'bar',
        barWidth: '60%',
        barGap: '10%',
        itemStyle: {
          color: (params) => {
            // Create dynamic gradient based on value height
            const maxValue = Math.max(...data)
            const ratio = params.value / maxValue

            // Gradient from dark blue-teal to bright cyan-green
            const colorStops = [
              { offset: 0, color: '#1e3a8a' },      // Dark blue
              { offset: 0.2, color: '#1e40af' },   // Blue
              { offset: 0.4, color: '#0891b2' },   // Teal
              { offset: 0.6, color: '#06b6d4' },   // Cyan
              { offset: 0.8, color: '#22d3ee' },   // Light cyan
              { offset: 1, color: '#10b981' }      // Green
            ]

            return {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: colorStops
            }
          },
          borderRadius: [2, 2, 0, 0],
          shadowBlur: 15,
          shadowColor: (params) => {
            const maxValue = Math.max(...data)
            const ratio = params.value / maxValue

            // Shadow color changes based on height
            if (ratio > 0.8) return 'rgba(16, 185, 129, 0.6)'      // Green glow
            else if (ratio > 0.6) return 'rgba(34, 211, 238, 0.5)' // Cyan glow
            else if (ratio > 0.4) return 'rgba(6, 182, 212, 0.4)'  // Teal glow
            else return 'rgba(30, 64, 175, 0.3)'                   // Blue glow
          },
          shadowOffsetY: 0
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 25,
            shadowColor: 'rgba(16, 185, 129, 0.8)'
          }
        },
        animationDuration: 2000,
        animationEasing: 'elasticOut',
        z: 1
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
          chartType: 'gradientBar',
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

    console.log('Gradient bar chart initialized successfully')

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
    console.log(`Gradient bar chart updated for city: ${newCity ? newCity.city : 'None'}`)
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