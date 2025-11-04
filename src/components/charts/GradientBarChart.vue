<template>
  <div
    ref="chartRef"
    class="w-full h-full bg-gray-900/50 rounded-xl relative overflow-hidden"
    :class="{ 'cursor-pointer': !isDetailed }"
    >
    <!-- 纯CSS悬停遮罩效果 -->
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

  // 定义每个地区的一致性数据
  const regionData = {
    'China': {
      detailed: [1.30, 1.34, 1.41, 1.48, 1.55, 1.43, 1.64, 1.83, 1.93, 2.10, 2.43],
      xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    },
    'Singapore': {
      detailed: [2.24, 2.32, 2.43, 2.56, 2.67, 2.46, 2.83, 3.17, 3.32, 3.62, 4.19],
      xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    },
    'Italy': {
      detailed: [2.69, 2.78, 2.92, 3.07, 3.20, 2.95, 3.39, 3.80, 3.99, 4.35, 5.02],
      xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    },
    'United States': {
      detailed: [3.51, 3.63, 3.81, 4.01, 4.19, 3.85, 4.43, 4.96, 5.21, 5.68, 6.56],
      xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    },
    'United Arab Emirates': {
      detailed: [0.45, 0.46, 0.49, 0.51, 0.53, 0.49, 0.57, 0.63, 0.66, 0.72, 0.84],
      xAxis:['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    },
    'global': {
      detailed: [8.96, 9.27, 9.73, 10.22, 10.68, 9.83, 11.3, 12.66, 13.29, 14.49, 16.74],
      xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    }

    // 10.21数据备份
    // 'China': {
    //   detailed: [13.0, 13.4, 14.1, 14.8, 15.5, 14.3, 16.4, 18.3, 19.3, 21.0, 24.3],
    //   simple: [13.0, 13.4, 14.1, 14.8, 15.5, 14.3, 16.4, 18.3, 19.3, 21.0, 24.3],
    //   xAxis: {
    //     detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    //     simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
    //   }
    // },
    // 'Singapore': {
    //   detailed: [22.4, 23.2, 24.3, 25.6, 26.7, 24.6, 28.3, 31.7, 33.2, 36.2, 41.9],
    //   simple: [22.4, 23.2, 24.3, 25.6, 26.7, 24.6, 28.3, 31.7, 33.2, 36.2, 41.9],
    //   xAxis: {
    //     detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    //     simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
    //   }
    // },
    // 'Italy': {
    //   detailed: [26.9, 27.8, 29.2, 30.7, 32.0, 29.5, 33.9, 38.0, 39.9, 43.5, 50.2],
    //   simple: [26.9, 27.8, 29.2, 30.7, 32.0, 29.5, 33.9, 38.0, 39.9, 43.5, 50.2],
    //   xAxis: {
    //     detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    //     simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
    //   }
    // },
    // 'United States': {
    //   detailed: [35.1, 36.3, 38.1, 40.1, 41.9, 38.5, 44.3, 49.6, 52.1, 56.8, 65.6],
    //   simple: [20, 26, 32, 38, 44, 50, 56, 63, 70, 76, 83, 90],
    //   xAxis: {
    //     detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    //     simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
    //   }
    // },
    // 'United Arab Emirates': {
    //   detailed: [4.5, 4.6, 4.9, 5.1, 5.3, 4.9, 5.7, 6.3, 6.6, 7.2, 8.4],
    //   simple: [4.5, 4.6, 4.9, 5.1, 5.3, 4.9, 5.7, 6.3, 6.6, 7.2, 8.4],
    //   xAxis: {
    //     detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    //     simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
    //   }
    // },
    // 'global': {
    //   detailed: [89.6, 92.7, 97.3, 102.2, 106.8, 98.3, 113, 126.6, 132.9, 144.9, 167.4],
    //   simple: [89.6, 92.7, 97.3, 102.2, 106.8, 98.3, 113, 126.6, 132.9, 144.9, 167.4],
    //   xAxis: {
    //     detailed: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    //     simple: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
    //   }
    // }
  }

  let selectedData = regionData['global'] // 默认

  if (props.selectedCity && props.selectedCity.country) {
    const country = props.selectedCity.country
    if (regionData[country]) {
      selectedData = regionData[country]
    } else if (country === 'Thailand' || country === 'Indonesia' || country === 'Malaysia') {
      selectedData = regionData['Singapore'] // 东南亚地区使用新加坡数据
    }
  }

  return {
    data: selectedData.detailed,
    xAxis: selectedData.xAxis
  }
}

const getChartOptions = () => {
  const regionData = generateRegionData()
  const axisVisible = props.isDetailed

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
      ],
      itemWidth: 48,  // Width for icons
      itemHeight: 8   // Height for icons
    } : undefined,
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
      min: 0,
      max: 20,
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
        name: 'Output value (in billions of US dollars)',
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

    // 添加窗口大小调整监听器
    window.addEventListener('resize', handleResize)

    // 添加ResizeObserver以更准确地跟踪容器大小
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === chartRef.value) {
            // 使用requestAnimationFrame以获得平滑的调整
            requestAnimationFrame(() => {
              handleResize()
            })
          }
        }
      })
    }

    // 使用requestAnimationFrame确保DOM就绪
    const initWithRetry = (attempts = 0, maxAttempts = 5) => {
      if (attempts >= maxAttempts) {
        console.error('初始化图表失败，尝试次数：', maxAttempts)
        return
      }

      if (!chartRef.value || !(chartRef.value instanceof HTMLElement)) {
        console.warn('图表容器未就绪，重试中...', attempts + 1)
        setTimeout(() => initWithRetry(attempts + 1), 100)
        return
      }

      try {
        // 检查元素是否有尺寸
        const rect = chartRef.value.getBoundingClientRect()
        console.log(`图表容器尺寸: ${rect.width}x${rect.height}`)
        if (rect.width === 0 || rect.height === 0) {
          console.warn('图表容器尺寸为零，重试中...', attempts + 1)
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
        console.error('图表初始化尝试出错', attempts + 1, ':', error)
        if (attempts < maxAttempts - 1) {
          setTimeout(() => initWithRetry(attempts + 1), 200)
        }
      }
    }

    // 延迟一小段时间后开始初始化
    setTimeout(() => initWithRetry(), 100)

  } catch (error) {
    console.error('图表挂载钩子出错:', error)
  }
})

const initChart = () => {
  if (!chartRef.value || !(chartRef.value instanceof HTMLElement)) {
    console.error('图表引用不是有效的HTML元素')
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
    console.log(`初始化图表尺寸: ${containerRect.width}x${containerRect.height}`)

    // 初始化新的图表实例，使用自动尺寸
    chartInstance = echarts.init(chartRef.value, null, {
      renderer: 'canvas',
      width: 'auto',
      height: 'auto'
    })

    if (!chartInstance) {
      console.error('创建ECharts实例失败')
      return
    }

    const options = getChartOptions()
    chartInstance.setOption(options, false)

    // 仅为非详情图表添加点击事件监听器
    if (!props.isDetailed) {
      // 监听整个图表容器的点击事件
      chartInstance.getZr().on('click', (event) => {
        // 获取DOM元素位置
        const rect = chartRef.value.getBoundingClientRect()

        // 将点击坐标转换为图表坐标
        const pointInChart = chartInstance.convertFromPixel('grid', [event.offsetX - rect.left, event.offsetY - rect.top])

        // 无论是否点击在数据点上，都发出点击事件
        emit('chart-click', {
          chartType: 'gradientBar',
          params: {
            event: event,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
            // 包含坐标以备不时之需
            pointInChart: pointInChart
          }
        })
      })
    }

    // 强制立即调整大小以确保正确的尺寸
    setTimeout(() => {
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.resize()
      }
    }, 50)

    console.log('渐变柱状图初始化成功')

  } catch (error) {
    console.error('initChart出错:', error)

    // 出错时清理
    if (chartInstance) {
      try {
        chartInstance.dispose()
      } catch (disposeError) {
        console.error('销毁图表出错:', disposeError)
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
  if (chartInstance && chartRef.value && !chartInstance.isDisposed()) {
    try {
      // 立即调整大小以提高响应性
      chartInstance.resize()
      console.log('渐变柱状图已调整大小')
    } catch (error) {
      console.error('调整图表大小出错:', error)
    }
  }
}

// 监听选中城市的变化并更新图表数据
watch(() => props.selectedCity, (newCity) => {
  if (chartInstance && !chartInstance.isDisposed()) {
    const newOptions = getChartOptions()
    // 使用notMerge: false来合并选项而不是替换它们
    chartInstance.setOption({
      xAxis: {
        data: newOptions.xAxis.data
      },
      series: [{
        data: newOptions.series[0].data
      }]
    }, false)
    console.log(`渐变柱状图已更新，城市: ${newCity ? newCity.city : '无'}`)
  }
}, { deep: true })
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