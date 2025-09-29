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
  const dataCount = props.isDetailed ? 16 : 12

  // Define consistent data for each region
  const regionData = {
    'China': {
      detailed: [13.0, 13.4, 14.1, 14.8, 15.5, 14.3, 16.4, 18.3, 19.3, 21.0, 24.3],
      simple: [13.0, 13.4, 14.1, 14.8, 15.5, 14.3, 16.4, 18.3, 19.3, 21.0, 24.3],
      xAxis: {
        detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
      }
    },
    'Singapore': {
      detailed: [22.4, 23.2, 24.3, 25.6, 26.7, 24.6, 28.3, 31.7, 33.2, 36.2, 41.9],
      simple: [22.4, 23.2, 24.3, 25.6, 26.7, 24.6, 28.3, 31.7, 33.2, 36.2, 41.9],
      xAxis: {
        detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
      }
    },
    'Italy': {
      detailed: [26.9, 27.8, 29.2, 30.7, 32.0, 29.5, 33.9, 38.0, 39.9, 43.5, 50.2],
      simple: [26.9, 27.8, 29.2, 30.7, 32.0, 29.5, 33.9, 38.0, 39.9, 43.5, 50.2],
      xAxis: {
        detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
      }
    },
    'United States': {
      detailed: [35.1, 36.3, 38.1, 40.1, 41.9, 38.5, 44.3, 49.6, 52.1, 56.8, 65.6],
      simple: [20, 26, 32, 38, 44, 50, 56, 63, 70, 76, 83, 90],
      xAxis: {
        detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
      }
    },
    'United Arab Emirates': {
      detailed: [4.5, 4.6, 4.9, 5.1, 5.3, 4.9, 5.7, 6.3, 6.6, 7.2, 8.4],
      simple: [4.5, 4.6, 4.9, 5.1, 5.3, 4.9, 5.7, 6.3, 6.6, 7.2, 8.4],
      xAxis: {
        detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
      }
    },
    'global': {
      detailed: [89.6, 92.7, 97.3, 102.2, 106.8, 98.3, 113, 126.6, 132.9, 144.9, 167.4],
      simple: [89.6, 92.7, 97.3, 102.2, 106.8, 98.3, 113, 126.6, 132.9, 144.9, 167.4],
      xAxis: {
        detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
      }
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

  return {
    data: props.isDetailed ? selectedData.detailed : selectedData.simple,
    xAxis: props.isDetailed ? selectedData.xAxis.detailed : selectedData.xAxis.simple
  }
}

const getChartOptions = () => {
  const regionData = generateRegionData()
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
      data: regionData.xAxis,
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
    yAxis: {
      type: 'value',
      show: false,
      axisLabel: {
        show: axisVisible,
        color: '#ffffff',
        fontSize: 20
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
        data: regionData.data,
        type: 'bar',
        barWidth: '60%',
        barGap: '10%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              { offset: 1, color: '#45D9D8' },
              { offset: 0, color: 'rgba(224, 247, 247, 0.1)' }
            ]
          },
          borderColor: '#45D9D8',
          borderWidth: 2,
          borderRadius: [2, 2, 0, 0],
          shadowBlur: 15,
          shadowColor: 'rgba(69, 217, 216, 0.5)',
          shadowOffsetY: 0
        },
        label: {
          show: props.isDetailed,
          position: 'top',
          color: '#ffffff',
          fontSize: 20,
          fontWeight: 'none',
          distance: 8,
          formatter: '{c}',
          textBorderColor: '#1e293b',
          textBorderWidth: 2,
          textShadowColor: 'rgba(0, 0, 0, 0.5)',
          textShadowBlur: 2
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 25,
            shadowColor: 'rgba(69, 217, 216, 0.8)'
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
    // Use notMerge: false to merge options instead of replacing them
    chartInstance.setOption({
      xAxis: {
        data: newOptions.xAxis.data
      },
      series: [{
        data: newOptions.series[0].data
      }]
    }, false)
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