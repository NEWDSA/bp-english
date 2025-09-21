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

const generateRegionData = () => {
  const dataCount = props.isDetailed ? 8 : 6

  // Define consistent data for each region
  const regionData = {
    'China': {
      detailed: [55, 62, 68, 75, 82, 78, 85, 92],
      simple: [58, 65, 72, 78, 85, 91]
    },
    'Singapore': {
      detailed: [48, 54, 60, 66, 72, 68, 75, 82],
      simple: [50, 56, 62, 68, 74, 80]
    },
    'Italy': {
      detailed: [52, 58, 64, 70, 76, 72, 79, 86],
      simple: [54, 60, 66, 72, 78, 84]
    },
    'United States': {
      detailed: [46, 52, 58, 65, 72, 68, 75, 82],
      simple: [48, 54, 60, 67, 74, 80]
    },
    'United Arab Emirates': {
      detailed: [42, 48, 54, 60, 66, 62, 69, 76],
      simple: [44, 50, 56, 62, 68, 74]
    },
    'global': {
      detailed: [50, 56, 62, 68, 74, 70, 77, 84],
      simple: [52, 58, 64, 70, 76, 82]
    }
  }

  let selectedData = regionData['global'] // default

  if (props.selectedCity && props.selectedCity.country) {
    const country = props.selectedCity.country
    if (regionData[country]) {
      selectedData = regionData[country]
    } else if (country === 'Thailand' || country === 'Indonesia' || country === 'Malaysia') {
      selectedData = regionData['Singapore'] // Southeast Asia uses Singapore data
    }
  }

  return props.isDetailed ? selectedData.detailed : selectedData.simple
}

const getChartOptions = () => {
  const data = generateRegionData()
  const axisVisible = props.isDetailed
  const dataCount = props.isDetailed ? 8 : 6

  // Normalize data to percentages for progress bars
  const maxValue = Math.max(...data)
  const normalizedData = data.map(value => value / maxValue * 100)

  return {
    backgroundColor: 'transparent',
    grid: {
      left: '8%',
      right: '12%',
      top: '8%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        show: props.isDetailed,
        color: '#64748b',
        fontSize: 10,
        formatter: '{value}%'
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
      data: props.isDetailed
        ? ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
        : Array.from({ length: dataCount }, (_, i) => ``),
      axisLabel: {
        show: props.isDetailed,
        color: '#64748b',
        fontSize: 10,
        margin: 12
      },
      axisLine: {
        show: props.isDetailed,
        lineStyle: { color: '#374151' }
      },
      axisTick: { show: false },
      splitLine: { show: false },
      inverse: true
    },
    series: [
      // Single series combining background and progress
      {
        name: 'Progress Bars',
        type: 'bar',
        data: normalizedData.map((value, index) => ({
          value: value,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#0891b2' },
                { offset: 1, color: '#22d3ee' }
              ]
            },
            borderRadius: [3, 3, 3, 3],
            shadowBlur: 8,
            shadowColor: 'rgba(34, 211, 238, 0.4)'
          }
        })),
        barWidth: 8,
        backgroundStyle: {
          color: 'rgba(30, 41, 59, 0.6)',
          borderRadius: [3, 3, 3, 3]
        },
        showBackground: true,
        z: 1,
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        markPoint: {
          symbol: 'circle',
          symbolSize: 12,
          itemStyle: {
            color: '#ffffff',
            borderColor: '#22d3ee',
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(34, 211, 238, 0.6)'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 18,
              shadowColor: 'rgba(34, 211, 238, 0.9)',
              borderWidth: 3
            }
          },
          data: normalizedData.map((value, index) => ({
            coord: [value, index],
            value: Math.round(value) + '%'
          })),
          label: {
            show: props.isDetailed,
            position: 'right',
            color: '#374151',
            fontSize: 11,
            fontWeight: 'bold',
            distance: 15,
            formatter: '{c}'
          },
          z: 3,
          animationDuration: 2000,
          animationEasing: 'elasticOut'
        }
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
          chartType: 'scatter',
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

    console.log('Scatter chart initialized successfully')

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
    console.log(`Scatter chart updated for city: ${newCity ? newCity.city : 'None'}`)
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