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

const getChartOptions = () => {
  // 定义特定地区的年龄组数据
  const getRegionAgeData = () => {
    const regionAgeData = {
      'China': [
        { value: 25, name: '18-34', color: '#00E1D4' },
        { value: 45, name: '35-50', color: '#FF9600' },
        { value: 20, name: '51-65', color: '#FFDE00' },
        { value: 10, name: '≥65', color: '#008CFF' }
      ],
      'Singapore': [
        { value: 35, name: '18-34', color: '#00E1D4' },
        { value: 45, name: '35-50', color: '#FF9600' },
        { value: 15, name: '51-65', color: '#FFDE00' },
        { value: 5, name: '≥65', color: '#008CFF' }
      ],
      'Italy': [
        { value: 15, name: '18-34', color: '#00E1D4' },
        { value: 35, name: '35-50', color: '#FF9600' },
        { value: 30, name: '51-65', color: '#FFDE00' },
        { value: 20, name: '≥65', color: '#008CFF' }
      ],
      'United States': [
        { value: 25, name: '18-34', color: '#00E1D4' },
        { value: 50, name: '35-50', color: '#FF9600' },
        { value: 15, name: '51-65', color: '#FFDE00' },
        { value: 10, name: '≥65', color: '#008CFF' }
      ],
      'United Arab Emirates': [
        { value: 30, name: '18-34', color: '#00E1D4' },
        { value: 40, name: '35-50', color: '#FF9600' },
        { value: 20, name: '51-65', color: '#FFDE00' },
        { value: 10, name: '≥65', color: '#008CFF' }
      ],
      'global': [
        { value: 30, name: '18-34', color: '#00E1D4' },
        { value: 40, name: '35-50', color: '#FF9600' },
        { value: 20, name: '51-65', color: '#FFDE00' },
        { value: 10, name: '≥65', color: '#008CFF' }
      ]
    }

    if (props.selectedCity && props.selectedCity.country) {
      const country = props.selectedCity.country
      if (regionAgeData[country]) {
        return regionAgeData[country]
      } else if (country === 'Thailand' || country === 'Indonesia' || country === 'Malaysia') {
        return regionAgeData['Singapore'] // 东南亚地区使用新加坡数据
      }
    }

    return regionAgeData['global']
  }

  const ageGroups = getRegionAgeData()

  // 找到最大的扇区用于中心显示
  const maxSegment = ageGroups.reduce((max, current) =>
    current.value > max.value ? current : max
  )

  const vhSize = window.innerHeight * (props.isDetailed ? 0.05 : 0.025)
  const fontSize = Math.max(12, Math.min(vhSize, props.isDetailed ? 60 : 22))

  // 简单模式的基础配置
  let baseConfig = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'pie',
        roseType: 'area',
        radius: ['55%', '75%'],
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
          fontSize: fontSize,
          fontWeight: 'normal',
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
      bottom: '3%',
      data: ageGroups.map(item => ({
        name: item.name,
        icon: 'circle',
        textStyle: {
          color: '#ffffff'
        }
      })),
      textStyle: {
        color: '#ffffff',
        fontSize: 11
      },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 20
    }
  }

  // 详情模式的增强配置
  if (props.isDetailed) {
    // 添加标题
    // baseConfig.title = {
    //   text: 'Age structure of global shipowners',
    //   left: 'center',
    //   top: '5%',
    //   textStyle: {
    //     color: '#64748b',
    //     fontSize: 16,
    //     fontWeight: 'normal'
    //   }
    // }

    // 更新详情模式的系列，显示百分比标签
    baseConfig.series[0].label = {
      show: true,
      position: 'outside',
      formatter: '{c}%',
      color: '#ffffff',
      fontSize: 20,
      fontWeight: 'normal',
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

    // 更新详情模式的图例位置和样式
    baseConfig.legend = {
      orient: 'horizontal',
      left: 'center',
      bottom: '2%',
      data: ageGroups.map(item => ({
        name: item.name,
        icon: 'circle',
        textStyle: {
          color: '#ffffff',
          fontSize: 20
        }
      })),
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 80,
      textStyle: {
        color: '#ffffff',
        fontSize: 20,
        padding: [0, 0, 0, 4]
      }
    }

    // 调整中心位置以适应标题
    baseConfig.series[0].center = ['50%', '50%']
    baseConfig.series[0].radius = ['50%', '75%']

    // 更新图形文本位置和样式
    baseConfig.graphic[0].top = '46%'
    baseConfig.graphic[0].style = {
      text: maxSegment.name,
      fontSize: fontSize,
      fontWeight: 'normal',
      fill: '#ffffff',
      textAlign: 'center',
      textVerticalAlign: 'middle'
    }
  }

  return baseConfig
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
    chartInstance.setOption(options, true)

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
          chartType: 'pie',
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

    console.log('饼图初始化成功')

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
      console.log('饼图已调整大小')
    } catch (error) {
      console.error('调整图表大小出错:', error)
    }
  }
}

// 监听选中城市的变化并更新图表数据
watch(() => props.selectedCity, (newCity) => {
  if (chartInstance && !chartInstance.isDisposed()) {
    const newOptions = getChartOptions()
    chartInstance.setOption(newOptions, true)
    console.log(`饼图已更新，城市: ${newCity ? newCity.city : '无'}`)
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