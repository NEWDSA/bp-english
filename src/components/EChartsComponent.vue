<template>
  <div ref="chartRef" class="w-full h-full bg-gray-900/50 rounded-xl" style="min-height: 240px;"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  chartType: {
    type: String,
    default: 'line'
  }
})

const chartRef = ref(null)
let chartInstance = null
let resizeObserver = null

const generateRandomData = (count = 6) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100) + 20)
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

  const baseTextStyle = { color: '#e5e7eb', fontSize: 12 }
  const gridStyle = { left: '10%', right: '10%', top: '15%', bottom: '15%' }

  switch (props.chartType) {
    case 'bar':
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
          data: ['2019', '2020', '2021', '2022'],
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
            data: [45, 52, 48, 58],
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
            data: [38, 45, 55, 65],
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
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
          data: data.slice(0, 6),
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
          data: data.slice(0, 15).map((value, index) => [index * 6 + Math.random() * 8, value]),
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
          radius: '70%',
          nameGap: 10,
          name: { color: '#e5e7eb', fontSize: 12 },
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
          data: data.slice(0, 6),
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