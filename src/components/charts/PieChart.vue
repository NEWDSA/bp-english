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

const getChartOptions = () => {
  // Define region-specific age group data
  const getRegionAgeData = () => {
    const regionAgeData = {
      'China': [
        { value: 25, name: '18-34', color: '#22d3ee' },
        { value: 45, name: '35-50', color: '#f59e0b' },
        { value: 25, name: '51-65', color: '#fbbf24' },
        { value: 5, name: '≥65', color: '#3b82f6' }
      ],
      'Singapore': [
        { value: 35, name: '18-34', color: '#22d3ee' },
        { value: 38, name: '35-50', color: '#f59e0b' },
        { value: 22, name: '51-65', color: '#fbbf24' },
        { value: 5, name: '≥65', color: '#3b82f6' }
      ],
      'Italy': [
        { value: 28, name: '18-34', color: '#22d3ee' },
        { value: 42, name: '35-50', color: '#f59e0b' },
        { value: 20, name: '51-65', color: '#fbbf24' },
        { value: 10, name: '≥65', color: '#3b82f6' }
      ],
      'United States': [
        { value: 32, name: '18-34', color: '#22d3ee' },
        { value: 38, name: '35-50', color: '#f59e0b' },
        { value: 23, name: '51-65', color: '#fbbf24' },
        { value: 7, name: '≥65', color: '#3b82f6' }
      ],
      'United Arab Emirates': [
        { value: 40, name: '18-34', color: '#22d3ee' },
        { value: 35, name: '35-50', color: '#f59e0b' },
        { value: 20, name: '51-65', color: '#fbbf24' },
        { value: 5, name: '≥65', color: '#3b82f6' }
      ],
      'global': [
        { value: 30, name: '18-34', color: '#22d3ee' },
        { value: 40, name: '35-50', color: '#f59e0b' },
        { value: 20, name: '51-65', color: '#fbbf24' },
        { value: 10, name: '≥65', color: '#3b82f6' }
      ]
    }

    if (props.selectedCity && props.selectedCity.country) {
      const country = props.selectedCity.country
      if (regionAgeData[country]) {
        return regionAgeData[country]
      } else if (country === 'Thailand' || country === 'Indonesia' || country === 'Malaysia') {
        return regionAgeData['Singapore'] // Southeast Asia uses Singapore data
      }
    }

    return regionAgeData['global']
  }

  const ageGroups = getRegionAgeData()

  // Find the largest segment for center display
  const maxSegment = ageGroups.reduce((max, current) =>
    current.value > max.value ? current : max
  )

  // Base configuration for simple mode
  let baseConfig = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'pie',
        radius: ['52.5%', '67.5%'],
        center: ['50%', '45%'],
        startAngle: 90,
        data: ageGroups.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                { offset: 0, color: item.color },
                { offset: 1, color: item.color + '80' }
              ]
            },
            borderRadius: 5,
            shadowBlur: 10,
            shadowColor: item.color + '40'
          }
        })),
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(34, 211, 238, 0.8)'
          }
        },
        animationDuration: 2000,
        animationEasing: 'elasticOut'
      }
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '42%',
        style: {
          text: maxSegment.name,
          fontSize: 22,
          fontWeight: 'bold',
          fill: '#ffffff',
          textAlign: 'center',
          textVerticalAlign: 'middle'
        },
        z: 100
      }
    ],
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: '8%',
      data: ageGroups.map(item => ({
        name: item.name,
        icon: 'circle',
        textStyle: {
          color: '#64748b'
        }
      })),
      textStyle: {
        color: '#64748b',
        fontSize: 11
      },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 20
    }
  }

  // Enhanced configuration for detailed mode
  if (props.isDetailed) {
    // Add title
    baseConfig.title = {
      text: 'Age structure of global shipowners',
      left: 'center',
      top: '5%',
      textStyle: {
        color: '#64748b',
        fontSize: 16,
        fontWeight: 'normal'
      }
    }

    // Update series for detailed mode with percentage labels
    baseConfig.series[0].label = {
      show: true,
      position: 'outside',
      formatter: '{c}%',
      color: '#64748b',
      fontSize: 14,
      fontWeight: 'bold',
      lineHeight: 20
    }

    baseConfig.series[0].labelLine = {
      show: true,
      length: 15,
      length2: 20,
      lineStyle: {
        color: '#64748b',
        width: 1
      }
    }

    // Update legend position and style for detailed mode
    baseConfig.legend = {
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      data: ageGroups.map(item => ({
        name: item.name,
        icon: 'circle',
        textStyle: {
          color: '#64748b',
          fontSize: 12
        }
      })),
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 25,
      textStyle: {
        color: '#64748b',
        fontSize: 12
      }
    }

    // Adjust center position to accommodate title
    baseConfig.series[0].center = ['50%', '50%']
    baseConfig.series[0].radius = ['45%', '60%']

    // Update graphic text position
    baseConfig.graphic[0].top = '50%'
  }

  return baseConfig
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
          chartType: 'pie',
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

    console.log('Pie chart initialized successfully')

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
    console.log(`Pie chart updated for city: ${newCity ? newCity.city : 'None'}`)
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