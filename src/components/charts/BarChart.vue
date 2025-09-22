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

const generateRegionData = (country) => {
  const dataCount = props.isDetailed ? 8 : 7

  // Define consistent data for each region
  const regionData = {
    'China': [45, 52, 48, 65, 72, 68, 78, 82],
    'Singapore': [35, 42, 46, 55, 62, 58, 68, 75],
    'Italy': [42, 48, 44, 58, 65, 62, 72, 79],
    'United States': [38, 45, 49, 62, 69, 65, 75, 81],
    'United Arab Emirates': [33, 39, 43, 48, 55, 52, 61, 68],
    'global': [170.4, 181.4, 244.1, 261.4, 303.5, 342.0, 303.8]
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

  return selectedData.slice(0, dataCount)
}

const getChartOptions = () => {
  const data = generateRegionData()
  const axisVisible = props.isDetailed
  const hasRegionSelected = props.selectedCity && props.selectedCity.country

  // If region is selected, show vertical line chart style
  if (hasRegionSelected) {
    return {
      backgroundColor: 'transparent',
      grid: {
        left: '8%',
        right: '8%',
        top: '15%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: props.isDetailed
          ? ['2015', '2018', '2020', '2021', '2022', '2023', '2024']
          : ['', '', '', '', '', '', ''],
        axisLabel: {
          show: axisVisible,
          color: '#ffffff',
          fontSize: 10
        },
        axisLine: {
          show: axisVisible,
          lineStyle: { color: '#374151' }
        },
        axisTick: { show: false },
        splitLine: { show: false }
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: {
          show: axisVisible,
          color: '#ffffff',
          fontSize: 10
        },
        axisLine: {
          show: axisVisible,
          lineStyle: { color: '#374151' }
        },
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
        // Vertical bars as lines
        {
          name: 'Vertical Lines',
          type: 'bar',
          data: data,
          barWidth: 2,
          itemStyle: {
            color: '#22d3ee',
            borderRadius: [1, 1, 0, 0]
          },
          z: 1,
          animationDuration: 1000,
          animationEasing: 'cubicOut'
        },
        // Area fill
        {
          name: 'Area',
          type: 'line',
          data: data,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(34, 211, 238, 0.6)' },
                { offset: 0.5, color: 'rgba(34, 211, 238, 0.3)' },
                { offset: 1, color: 'rgba(34, 211, 238, 0.05)' }
              ]
            }
          },
          lineStyle: {
            color: '#22d3ee',
            width: 2,
            shadowBlur: 6,
            shadowColor: 'rgba(34, 211, 238, 0.3)'
          },
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            color: '#ffffff',
            borderColor: '#22d3ee',
            borderWidth: 2,
            shadowBlur: 8,
            shadowColor: 'rgba(34, 211, 238, 0.6)'
          },
          label: {
            show: props.isDetailed,
            position: 'top',
            color: '#ffffff',
            fontSize: 11,
            fontWeight: 'bold',
            distance: 8,
            formatter: '{c}'
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
        }
      ]
    }
  }

  // Default capsule bar style when no region is selected
  return {
    backgroundColor: 'transparent',
    grid: {
      left: '8%',
      right: '8%',
      top: '15%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: props.isDetailed
        ? ['2015', '2018', '2020', '2021', '2022', '2023', '2024']
        : ['', '', '', '', '', '', ''],
      axisLabel: {
        show: axisVisible,
        color: '#ffffff',
        fontSize: 10
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: [
      {
        name: 'Capsule Bars',
        data: data,
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
              { offset: 1, color: '#7dd3fc' }
            ]
          },
          borderRadius: [12, 12, 12, 12],
          shadowBlur: 10,
          shadowColor: 'rgba(56, 189, 248, 0.4)',
          shadowOffsetY: 0
        },
        label: {
          show: props.isDetailed,
          position: 'top',
          color: '#ffffff',
          fontSize: 12,
          fontWeight: 'bold',
          distance: 8,
          formatter: '{c}'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(56, 189, 248, 0.6)'
          }
        },
        animationDuration: 1500,
        animationEasing: 'elasticOut',
        z: 1
      },
      // 分段线条系列
      {
        name: 'Segment Lines',
        type: 'scatter',
        data: (() => {
          const barData = data
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
          opacity: 0.9
        },
        z: 10,
        silent: true,
        animation: false
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
          chartType: 'bar',
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

    console.log('Bar chart initialized successfully')

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
    console.log(`Bar chart updated for city: ${newCity ? newCity.city : 'None'}`)
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