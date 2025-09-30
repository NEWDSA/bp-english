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
      detailed: ['hidden', -0.60, 12.83, -2.53, 6.67, 6.50],
      barData: [4.9, 4.9, 5.5, 5.4, 5.8, 6.1],
      xAxis: ['2019', '2020', '2021', '2022', '2023', '2024']
    },
    'Singapore': {
      detailed: ['hidden', 8.40, -9.10, 18.70, 7.60, 9.00],
      barData: [28.5, 35.2, 32.1, 48.6, 52.3, 57.0],
      xAxis: ['2015', '2018', '2020', '2022', '2023', '2024']
    },
    'Italy': {
      detailed: ['hidden', 17.66, 29.17, 4.50, 4.88, 4.90],
      barData: [11.5, 13.6, 17.5, 18.3, 19.2, 20.1],
      xAxis: ['2019', '2020', '2021', '2022', '2023', '2024']
    },
    'United States': {
      detailed: ['hidden', -3.30, 8.39, -5.12, 7.03, 5.82],
      barData: [89.9, 86.9, 94.2, 89.4, 95.7, 101.2],
      xAxis: ['2019', '2020', '2021', '2022', '2023', '2024']
    },
    'United Arab Emirates': {
      detailed: ['hidden', -3.30, 8.33, -5.13, 7.07, 7.00],
      barData: [48.4, 46.8, 50.7, 48.1, 51.5, 55.1],
      xAxis: ['2019', '2020', '2021', '2022', '2023', '2024']
    },
    'global': {
      detailed: ['hidden', -3.30, 8.40, -5.12, 7.03, 7.00],
      barData: [345.6, 334.3, 362.3, 343.8, 367.9, 393.7],
      xAxis: ['2019', '2020', '2021', '2022', '2023', '2024']
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
    data: selectedData.detailed,
    barData: selectedData.barData,
    xAxis: selectedData.xAxis
  }
}

const getChartOptions = () => {
  const regionData = generateRegionData()
  const axisVisible = props.isDetailed
  const dataCount = props.isDetailed ? 8 : 6
  const chartData = regionData.data

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
        {
          name: 'Growth rate',
          icon: 'line',
          itemStyle: {
            color: '#CFFAFD'
          }
        }
      ],
      itemWidth: 48,  // Width for icons
      itemHeight: 8   // Height for icons
    } : undefined,
    grid: {
      left: '3%',
      right: '3%',
      top: '20%',
      bottom: props.isDetailed ? '18%' : '14%',
    },
    graphic: props.isDetailed ? regionData.barData.map((value, index) => {
      return {
        type: 'text',
        left: `${9 + (80 / (regionData.barData.length - 1)) * index}%`, // 根据图表网格定位
        top: '5%',
        style: {
          text: Number(value).toFixed(1),
          fontSize: 20,
          fontWeight: 'normal',
          fill: '#ffffffff',
          textAlign: 'center',
          textVerticalAlign: 'bottom'
        },
        z: 100
      }
    }) : [],
    xAxis: {
      type: 'category',
      data: regionData.xAxis,
      axisLabel: {
        show: props.isDetailed,
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
        show: false,
        axisLabel: {
          show: props.isDetailed,
          color: '#ffffff',
          fontSize: 10
        },
        axisLine: { show: props.isDetailed, lineStyle: { color: '#374151' } },
        axisTick: { show: false },
        splitLine: {
          show: props.isDetailed,
          lineStyle: {
            color: 'rgba(100, 116, 139, 0.2)',
            type: 'dashed'
          }
        }
      },
      {
        type: 'value',
        show: false,
        axisLabel: {
          show: props.isDetailed,
          color: '#ffffff',
          fontSize: 10
        },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      }
    ],
    series: [
      // Bar chart data
      {
        name: 'Output value (in billions of US dollars)',
        type: 'bar',
        yAxisIndex: 1,
        data: regionData.barData,
        barWidth: 3,
        itemStyle: {
          color: '#ffffff',
          borderRadius: [2, 2, 0, 0]
        },
        z: 1,
        animationDuration: 1000,
        animationEasing: 'cubicOut'
      },
      // Dots on top of bars
      {
        name: 'Bar Top Dots',
        type: 'scatter',
        yAxisIndex: 1,
        data: regionData.barData.map((value, index) => [index, value]),
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: '#ffffff',
          shadowBlur: 6,
          shadowColor: 'rgba(149, 246, 255, 0.6)'
        },
        z: 4,
        animationDuration: 1000,
        animationEasing: 'cubicOut'
      },
      // Triangular filled area
      {
        name: 'Growth rate',
        type: 'line',
        data: chartData,
        areaStyle: {
          origin: 'start',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(2, 225, 212, 0.6)' },
              { offset: 0.5, color: 'rgba(2, 225, 212, 0.3)' },
              { offset: 1, color: 'rgba(2, 225, 212, 0)' }
            ]
          }
        },
        lineStyle: {
          color: '#00e1d4',
          width: 2
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#ffffff',
          borderColor: '#00e1d4',
          borderWidth: 2,
          shadowBlur: 8,
          shadowColor: 'rgba(0, 225, 212, 0.6)'
        },
        label: {
          show: props.isDetailed,
          position: 'top',
          color: '#ffffff',
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
            shadowBlur: 15,
            shadowColor: 'rgba(0, 225, 212, 0.9)',
            borderWidth: 3
          }
        },
        smooth: false,
        z: 2,
        animationDuration: 1500,
        animationEasing: 'cubicOut'
      },
      // Top connection points (for enhanced interaction)
      {
        name: 'Points',
        type: 'scatter',
        data: chartData.map((value, index) => [index, value]),
        symbolSize: 0, // Hidden in detailed mode since area chart already has points
        symbol: 'circle',
        itemStyle: {
          color: '#ffffff',
          borderColor: '#00e1d4',
          borderWidth: 2,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 225, 212, 0.7)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 18,
            shadowColor: 'rgba(0, 225, 212, 1)',
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
    // Use notMerge: false to merge options instead of replacing them
    chartInstance.setOption({
      xAxis: {
        data: newOptions.xAxis.data
      },
      series: [
        {
          data: newOptions.series[0].data
        },
        {
          data: newOptions.series[1].data
        },
        {
          data: newOptions.series[2].data
        },
        {
          data: newOptions.series[3].data
        }
      ]
    }, false)
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