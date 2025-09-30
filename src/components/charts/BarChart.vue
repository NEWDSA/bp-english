<template>
  <div
    ref="chartRef"
    class="w-full h-full bg-gray-900/50 rounded-xl relative overflow-hidden"
    :class="{ 'cursor-pointer': !isDetailed }"
  >
    <!-- 纯CSS悬停遮罩效果 -->
    <div
      class="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-300 rounded-xl pointer-events-none"
    >
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
    default: false,
  },
  selectedCity: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['chart-click'])

const chartRef = ref(null)
let chartInstance = null
let resizeObserver = null

const generateRegionData = (country) => {
  const dataCount = props.isDetailed ? 8 : 7  // 根据是否详情模式决定数据点数量

  // 为每个地区定义一致的数据
  const regionData = {
    China: {
      bar: [3.5, 4.3, 4.0, 4.5, 5.2, 6.0, 6.9],
      line: ['hidden', 23.0, -7.9, 13.9, 15.0, 15.5, 15.3],
      xAxis: ['2015', '2018', '2020', '2021', '2022', '2023', '2024'],
    },
    Singapore: {
      bar: [2.8, 4.2, 3.5, 4.6, 6.3, 7.1, 7.9],
      line: [5.3, 12.1, -16.7, 31.4, 11.2, 12.7, 12],
      xAxis: ['2015', '2018', '2020', '2021', '2022', '2023', '2024'],
    },
    Italy: {
      bar: [16.4, 30.2, 25.3, 49.1, 58.4, 52.5, 47.3],
      line: ['hidden', 22.7, -16.3, 94.4, 18.8, -10.0, -8.0],
      xAxis: ['2015', '2018', '2020', '2021', '2022', '2023', '2024'],
    },
    'United States': {
      bar: [28.5, 32.8, 37.5, 41.2, 44.8, 48.3, 51.6],
      line: ['hidden', 4.82, 6.9, 9.87, 8.87, 7.81, 6.83],
      xAxis: ['2015', '2018', '2020', '2021', '2022', '2023', '2024'],
    },
    'United Arab Emirates': {
      bar: [3.2, 4.4, 3.9, 4.6, 5.3, 5.9, 6.5],
      line: ['hidden', 37.5, -11.4, 17.9, 15.2, 11.3, 10.2],
      xAxis: ['2015', '2018', '2020', '2021', '2022', '2023', '2024'],
    },
    global: {
      bar: [170.4, 181.4, 244.1, 261.4, 303.5, 342.0, 303.8],
      line: [165.2, 175.8, 230.5, 248.7, 285.3, 325.4, 290.6],
      xAxis: ['2015', '2018', '2020', '2021', '2022', '2023', '2024'],
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

  const barData = selectedData.bar.slice(0, dataCount)
  const lineData = selectedData.line.slice(0, dataCount)

  const barMax = Math.max(...barData)
  const validLineData = lineData.filter(v => v !== 'hidden' && typeof v === 'number')
  const lineMax = Math.max(...validLineData)
  const lineMin = Math.min(...validLineData)

  return {
    bar: barData,
    line: lineData,
    xAxis: selectedData.xAxis.slice(0, dataCount),
    barMax,
    lineMax,
    lineMin,
    // 根据数据范围决定是否需要分离轴
    needSeparateAxis: Math.abs(barMax - lineMax) < barMax * 0.1 // 如果差距小于10%则需要分离
  }
}

const getChartOptions = () => {
  const regionData = generateRegionData()
  const axisVisible = props.isDetailed
  const hasRegionSelected = props.selectedCity && props.selectedCity.country

  // 如果选择了地区，显示垂直线条图表样式
  if (hasRegionSelected) {
    return {
      backgroundColor: 'transparent',
      legend: props.isDetailed ? {
        bottom: '3%',
        left: 'center',
        itemGap: 60,
        textStyle: {
          color: '#ffffff',
          fontSize: 12,
          padding: [0, 0, 0, 12]
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
        bottom: props.isDetailed ? '16%' : '14%',
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
          max: regionData.needSeparateAxis ? regionData.barMax * 1.2 : 'dataMax',
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
      graphic: props.isDetailed ? regionData.bar.map((value, index) => ({
        type: 'text',
        left: `${9 + (81 / (regionData.bar.length - 1)) * index}%`, // 根据图表网格定位
        top: '6%', // 固定在图表顶部位置
        style: {
          text: Number(value).toFixed(1),
          font: '20px Microsoft YaHei',  // 设置字体大小和字体族
          fill: '#ffffff',
          textAlign: 'center',
          textVerticalAlign: 'bottom'
        },
        z: 100
      })) : [],
      series: [
        // 区域填充
        {
          name: 'Output value (in billions of US dollars)',
          type: 'line',
          data: regionData.bar,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(89, 223, 215, 0.8)' },
                { offset: 0.5, color: 'rgba(89, 223, 215, 0.5)' },
                { offset: 1, color: 'rgba(89, 223, 215, 0.1)' },
              ],
            },
          },
          lineStyle: {
            color: '#30E0D6',
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
        {
          name: 'Vertical Dotted Lines',
          type: 'scatter',
          data: (() => {
            const lineData = []
            regionData.bar.forEach((value, index) => {
              const dotCount = 30
              const dotSpacing = value / dotCount
              for (let i = 0; i <= dotCount; i++) {
                lineData.push([index, i * dotSpacing])
              }
            })
            return lineData
          })(),
          symbol: 'circle',
          symbolSize: 2,
          itemStyle: {
            color: '#00E1D4',
            opacity: 0.7,
          },
          z: 1,
          silent: true,
          animation: false,
        },
        // 叠加的折线图
        {
          name: 'Growth rate',
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
              return Number(params.value).toFixed(2) + '%';
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

  // 未选择地区时的默认胶囊柱状图样式
  return {
    backgroundColor: 'transparent',
    title: props.isDetailed && !props.selectedCity ? {
      text: 'Output value (in billions of US dollars)',
      bottom: '2%',
      left: 'center',
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'normal'
      }
    } : undefined,
    grid: {
      left: '8%',
      right: '8%',
      top: '15%',
      bottom: props.isDetailed && !props.selectedCity ? '18%' : '15%',
    },
    xAxis: {
      type: 'category',
      data: regionData.xAxis,
      axisLabel: {
        show: axisVisible,
        color: '#ffffff',
        fontSize: 20,
        margin: 40,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      max: 'dataMax',
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    series: [
      {
        name: 'Capsule Bars',
        data: regionData.bar,
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
              { offset: 0, color: '#00364F' },
              { offset: 0.2, color: '#00606F' },
              { offset: 0.6, color: '#00A8A1' },
              { offset: 0.8, color: '#58FFEB' },
              { offset: 1, color: '#F6FFFD' },
            ],
          },
          borderRadius: [12, 12, 12, 12],
          shadowBlur: 10,
          shadowColor: 'rgba(56, 189, 248, 0.4)',
          shadowOffsetY: 0,
        },
        label: {
          show: props.isDetailed,
          position: 'top',
          color: '#ffffff',
          fontSize: 20,
          fontWeight: 'none',
          distance: 8,
          formatter: '{c}',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(56, 189, 248, 0.6)',
          },
        },
        animationDuration: 1500,
        animationEasing: 'elasticOut',
        z: 1,
      },
      // 分段线条系列（用于创建柱状图的分割线效果）
      {
        name: 'Segment Lines',
        type: 'scatter',
        data: (() => {
          const barData = regionData.bar
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
          opacity: 0.9,
        },
        z: 10,
        silent: true,
        animation: false,
      },
    ],
  }
}

onMounted(async () => {
  try {
    await nextTick()

    // 添加窗口大小调整监听器
    window.addEventListener('resize', handleResize)

    // 添加ResizeObserver以更准确地跟踪容器大小
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        handleResize()
      })
    }

    // 使用requestAnimationFrame确保DOM就绪
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
        // 检查元素是否有尺寸
        const rect = chartRef.value.getBoundingClientRect()
        console.log(`Chart container dimensions: ${rect.width}x${rect.height}`)
        if (rect.width === 0 || rect.height === 0) {
          console.warn('Chart container has zero dimensions, retrying...', attempts + 1)
          setTimeout(() => initWithRetry(attempts + 1), 150)
          return
        }

        // 初始化图表
        initChart()

        // 开始监听容器尺寸变化
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

    // 延迟一小段时间后开始初始化
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
    // 销毁已存在的图表实例
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
    }

    // 获取容器尺寸用于初始化
    const containerRect = chartRef.value.getBoundingClientRect()
    console.log(`Initializing chart with dimensions: ${containerRect.width}x${containerRect.height}`)

    // 初始化新的图表实例
    chartInstance = echarts.init(chartRef.value, null, {
      width: containerRect.width,
      height: containerRect.height,
    })

    if (!chartInstance) {
      console.error('Failed to create ECharts instance')
      return
    }

    const options = getChartOptions()
    chartInstance.setOption(options, true)

    // 仅为非详情图表添加点击事件监听器
    if (!props.isDetailed) {
      // 监听整个图表容器的点击事件
      chartInstance.getZr().on('click', (event) => {
        // 获取DOM元素位置
        const rect = chartRef.value.getBoundingClientRect()

        // 将点击坐标转换为图表坐标
        const pointInChart = chartInstance.convertFromPixel('grid', [
          event.offsetX - rect.left,
          event.offsetY - rect.top,
        ])

        // 无论是否点击在数据点上，都发出点击事件
        emit('chart-click', {
          chartType: 'bar',
          params: {
            event: event,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
            // 包含坐标以备不时之需
            pointInChart: pointInChart,
          },
        })
      })
    }

    // 强制立即调整大小以确保正确的尺寸
    setTimeout(() => {
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.resize()
      }
    }, 50)

    console.log('Bar chart initialized successfully')
  } catch (error) {
    console.error('Error in initChart:', error)

    // 出错时清理
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
  // 移除窗口大小调整监听器
  window.removeEventListener('resize', handleResize)

  // 断开ResizeObserver连接
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }

  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

// 处理窗口大小调整
const handleResize = () => {
  if (chartInstance && chartRef.value) {
    try {
      // 使用setTimeout确保DOM已完成更新
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

// 监听选中城市的变化并更新图表数据
watch(
  () => props.selectedCity,
  (newCity) => {
    if (chartInstance && !chartInstance.isDisposed()) {
      const newOptions = getChartOptions()
      chartInstance.setOption(newOptions, true)
      console.log(`Bar chart updated for city: ${newCity ? newCity.city : 'None'}`)
    }
  },
  { deep: true }
)
</script>

<style scoped>
/* 纯CSS悬停效果 */
.cursor-pointer {
  position: relative;
  transition: all 0.3s ease;
}

.cursor-pointer:hover {
  transform: scale(1.02);
}

/* 确保ECharts画布不会阻止鼠标事件 */
:deep(canvas) {
  pointer-events: none;
}
</style>
