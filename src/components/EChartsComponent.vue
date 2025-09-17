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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  chartType: {
    type: String,
    default: 'line'
  },
  isDetailed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['chart-click'])

const chartRef = ref(null)
let chartInstance = null
let resizeObserver = null

const generateRandomData = (count = 6) => {
  const dataCount = props.isDetailed ? 12 : count
  return Array.from({ length: dataCount }, () => Math.floor(Math.random() * 100) + 20)
}

const getChartOptions = () => {
  const data = generateRandomData()
  const colors = ['#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  const gradientColors = [
    { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#06b6d4' }, { offset: 1, color: '#0891b2' }] },
    { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#10b981' }, { offset: 1, color: '#059669' }] },
    { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#f59e0b' }, { offset: 1, color: '#d97706' }] },
    { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ef4444' }, { offset: 1, color: '#dc2626' }] }
  ]

  const baseTextStyle = { color: '#e5e7eb', fontSize: props.isDetailed ? 14 : 12 }
  const gridStyle = props.isDetailed
    ? { left: '5%', right: '5%', top: '8%', bottom: '8%' }
    : { left: '8%', right: '8%', top: '12%', bottom: '12%' }

  switch (props.chartType) {
    case 'bar':
      return {
        backgroundColor: 'transparent',
        grid: {
          left: '6%',
          right: '6%',
          top: '10%',
          bottom: '10%'
        },
        xAxis: {
          type: 'category',
          data: props.isDetailed
            ? ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
            : ['2019', '2020', '2021', '2022'],
          axisLabel: {
            color: '#e5e7eb',
            fontSize: 12,
            fontWeight: 500
          },
          axisLine: {
            lineStyle: {
              color: '#374151',
              width: 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#e5e7eb',
            fontSize: 12,
            fontWeight: 500
          },
          axisLine: {
            lineStyle: {
              color: '#374151',
              width: 1
            }
          },
          splitLine: {
            lineStyle: {
              color: '#374151',
              type: 'dashed',
              opacity: 0.5
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: 'Series 1',
            data: props.isDetailed
              ? data.slice(0, 8)
              : [45, 52, 48, 58],
            type: 'bar',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#06b6d4' },
                  { offset: 1, color: '#0891b2' }
                ]
              },
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#10b981' },
                    { offset: 1, color: '#059669' }
                  ]
                }
              }
            },
            barWidth: '15%',
            barGap: '30%',
            animationDuration: 1000
          },
          {
            name: 'Series 2',
            data: props.isDetailed
              ? data.slice(8, 16)
              : [38, 45, 55, 65],
            type: 'bar',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#8b5cf6' },
                  { offset: 1, color: '#7c3aed' }
                ]
              },
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#a855f7' },
                    { offset: 1, color: '#9333ea' }
                  ]
                }
              }
            },
            barWidth: '15%',
            barGap: '30%',
            animationDuration: 1000
          }
        ]
      }

    case 'pie':
      return {
        backgroundColor: 'transparent',
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          data: data.slice(0, 4).map((value, index) => ({
            value,
            name: `Segment ${index + 1}`,
            itemStyle: {
              color: gradientColors[index] || colors[index],
              borderColor: '#1f2937',
              borderWidth: 2
            }
          })),
          label: {
            color: '#e5e7eb',
            fontSize: 11,
            formatter: '{b}: {c}%'
          },
          emphasis: {
            itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' }
          },
          animationDuration: 1000
        }]
      }

    case 'area':
      return {
        backgroundColor: 'transparent',
        grid: gridStyle,
        xAxis: {
          type: 'category',
          data: props.isDetailed
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          axisLabel: baseTextStyle,
          axisLine: { lineStyle: { color: '#374151' } },
          splitLine: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLabel: baseTextStyle,
          axisLine: { lineStyle: { color: '#374151' } },
          splitLine: { lineStyle: { color: '#374151', type: 'dashed' } }
        },
        series: [{
          data: props.isDetailed ? data.slice(0, 12) : data.slice(0, 6),
          type: 'line',
          areaStyle: {
            color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
              { offset: 0, color: 'rgba(6, 182, 212, 0.8)' },
              { offset: 1, color: 'rgba(6, 182, 212, 0.1)' }
            ]}
          },
          lineStyle: { color: '#06b6d4', width: 3 },
          itemStyle: { color: '#06b6d4', borderColor: '#fff', borderWidth: 2 },
          smooth: true,
          animationDuration: 1000
        }]
      }

    case 'scatter':
      return {
        backgroundColor: 'transparent',
        grid: gridStyle,
        xAxis: {
          type: 'value',
          axisLabel: baseTextStyle,
          axisLine: { lineStyle: { color: '#374151' } },
          splitLine: { lineStyle: { color: '#374151', type: 'dashed' } }
        },
        yAxis: {
          type: 'value',
          axisLabel: baseTextStyle,
          axisLine: { lineStyle: { color: '#374151' } },
          splitLine: { lineStyle: { color: '#374151', type: 'dashed' } }
        },
        series: [{
          type: 'scatter',
          data: data.slice(0, props.isDetailed ? 30 : 15).map((value, index) => [index * 6 + Math.random() * 8, value]),
          itemStyle: {
            color: '#f59e0b',
            shadowBlur: 5,
            shadowColor: 'rgba(245, 158, 11, 0.5)'
          },
          symbolSize: 8,
          animationDuration: 1000
        }]
      }

    case 'radar':
      return {
        backgroundColor: 'transparent',
        radar: {
          indicator: [
            { name: 'Sales', max: 100 },
            { name: 'Marketing', max: 100 },
            { name: 'Development', max: 100 },
            { name: 'Support', max: 100 },
            { name: 'Technology', max: 100 }
          ],
          radius: '65%',
          nameGap: 8,
          name: { color: '#e5e7eb', fontSize: 11 },
          splitLine: { lineStyle: { color: '#374151' } },
          splitArea: { show: false },
          axisLine: { lineStyle: { color: '#374151' } }
        },
        series: [{
          type: 'radar',
          data: [{
            value: data.slice(0, 5),
            itemStyle: { color: '#8b5cf6' },
            areaStyle: {
              color: 'rgba(139, 92, 246, 0.3)',
              shadowBlur: 10,
              shadowColor: 'rgba(139, 92, 246, 0.5)'
            },
            lineStyle: { color: '#8b5cf6', width: 2 }
          }],
          animationDuration: 1000
        }]
      }

    default: // line
      return {
        backgroundColor: 'transparent',
        grid: gridStyle,
        xAxis: {
          type: 'category',
          data: props.isDetailed
            ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12']
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          axisLabel: baseTextStyle,
          axisLine: { lineStyle: { color: '#374151' } },
          splitLine: { show: false }
        },
        yAxis: {
          type: 'value',
          axisLabel: baseTextStyle,
          axisLine: { lineStyle: { color: '#374151' } },
          splitLine: { lineStyle: { color: '#374151', type: 'dashed' } }
        },
        series: [{
          data: props.isDetailed ? data.slice(0, 12) : data.slice(0, 6),
          type: 'line',
          smooth: true,
          itemStyle: { color: '#10b981', borderColor: '#fff', borderWidth: 2 },
          lineStyle: { color: '#10b981', width: 3 },
          symbol: 'circle',
          symbolSize: 6,
          animationDuration: 1000
        }]
      }
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
          chartType: props.chartType,
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

    console.log(`Chart ${props.chartType} initialized successfully`)

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

// Listen for window resize - moved to the main onMounted hook
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