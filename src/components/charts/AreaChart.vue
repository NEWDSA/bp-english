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
  },
  chartType: {
    type: String,
    default: 'line'
  },
})

console.log("props.chartType", props.chartType);

const emit = defineEmits(['chart-click'])

const chartRef = ref(null)
let chartInstance = null
let resizeObserver = null

const generateRegionData = () => {
  // 为每个地区定义一致的数据
  const regionData = {
    China: {
      area: [0.56, 0.62, 0.69, 0.78, 0.89, 1.02, 1.15],
      line: ['hidden', 10.90, 11.90, 13.00, 14.00, 14.90, 13.00],
      xAxis: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    },
    Singapore: {
      area: [0.17, 0.25, 0.21, 0.28, 0.38, 0.43],
      line: ['hidden', 12.1, -16.7, 31.4, 11.2, 12.7],
      xAxis: ['2015','2018', '2020', '2021', '2023', '2024'],
    },
    Italy: {
      area: [1.98, 2.66, 1.74, 2.28, 2.63, 3.04],
      line: ['hidden', 34.6, -34.6, 30.9, 15.3, 15.4],
      xAxis: ['2015', '2018', '2020', '2022', '2023', '2024'],
    },
    'United States': {
      area: [ 1.17, 1.22, 1.24, 1.31, 1.38, 1.61, 1.82, 1.92, 2.09, 2.20 ],
      line: ['hidden', 4.1, 2.3, 5.4, 5.5, 16.5, 12.9, 5.7, 8.5, 5.2],
      xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    },
    'United Arab Emirates': {
      area: [1.01, 1.06, 1.10, 1.16, 1.20, 1.18, 1.25, 1.32, 1.37, 1.44 ],
      line: ['hidden', 4.9, 4.4, 5.0, 4.0, -2.0, 5.7, 5.8, 4.2, 5.0],
      xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    },
    'global': {
      area: [7.2, 7.4, 7.6, 7.8, 8.0, 8.25, 8.38, 8.45, 8.51, 8.87],
      line: ['hidden', 2.78, 2.70, 2.63, 2.56, 3.13, 1.58, 0.84, 0.71, 4.23],
      xAxis: ['2015', '2016', '2017','2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    },

    // 10.21 备份数据
    // China: {
    //   area: [9.25, 10.26, 11.49, 12.99, 14.81, 17.03, 19.2],
    //   line: ['hidden', 10.90, 11.90, 13.00, 14.00, 14.90, 13.00],
    //   xAxis: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    // },
    // Singapore: {
    //   area: [2.8, 4.2, 3.5, 4.6, 6.3, 7.1],
    //   line: ['hidden', 12.1, -16.7, 31.4, 11.2, 12.7],
    //   xAxis: ['2015','2018', '2020', '2021', '2023', '2024'],
    // },
    // Italy: {
    //   area: [28.3, 38.1, 24.9, 32.6, 37.6, 43.4],
    //   line: ['hidden', 34.6, -34.6, 30.9, 15.3, 15.4],
    //   xAxis: ['2015', '2018', '2020', '2022', '2023', '2024'],
    // },
    // 'United States': {
    //   area: [29.2, 30.4, 31.1, 32.8, 34.6, 40.3, 45.5, 48.1, 52.2, 54.9],
    //   line: ['hidden', 4.1, 2.3, 5.4, 5.5, 16.5, 12.9, 5.7, 8.5, 5.2],
    //   xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    // },
    // 'United Arab Emirates': {
    //   area: [16.8, 17.6, 18.4, 19.3, 20.0, 19.7, 20.8, 22.0, 22.9, 24.0],
    //   line: ['hidden', 4.9, 4.4, 5.0, 4.0, -2.0, 5.7, 5.8, 4.2, 5.0],
    //   xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    // },
    // 'global': {
    //   area: [320, 350, 380, 430, 450, 494, 470, 510, 550, 588],
    //   line: ['hidden', 9.40, 8.60, 13.20, 4.70, 9.80, -4.90, 8.50, 7.80, 7.00],
    //   xAxis: ['2015', '2016', '2017','2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    // },
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

  const areaData = selectedData.area
  const lineData = selectedData.line

  const areaMax = Math.max(...areaData)
  const validLineData = lineData.filter(v => v !== 'hidden' && typeof v === 'number')
  const lineMax = Math.max(...validLineData)
  const lineMin = Math.min(...validLineData)

  return {
    area: areaData,
    line: lineData,
    xAxis: selectedData.xAxis,
    areaMax,
    lineMax,
    lineMin,
    // 根据数据范围决定是否需要分离轴
    needSeparateAxis: Math.abs(areaMax - lineMax) < areaMax * 0.1 // 如果差距小于10%则需要分离
  }
}

const getChartOptions = () => {
  const regionData = generateRegionData()
  const axisVisible = props.isDetailed

  return {
    backgroundColor: 'transparent',
    legend: props.isDetailed ? {
      bottom: '1%',
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
      bottom: props.isDetailed ? '19%' : '14%',
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
        max: regionData.needSeparateAxis ? regionData.areaMax * 1.2 : 'dataMax',
        show: false,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      {
        type: 'value',
        position: 'right',
        max: (!props.selectedCity || !props.selectedCity.country) ? 8 :
             (regionData.needSeparateAxis ? regionData.lineMax * 1.3 : 'dataMax'),
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
    graphic: props.isDetailed ? regionData.area.map((value, index) => ({
      type: 'text',
      left: `${7 + (84 / (regionData.area.length - 1)) * index}%`, // 根据图表网格定位
      top: '6%', // 固定在图表顶部位置
      style: {
        text:  Number(value).toFixed(2),
        font: '20px Microsoft YaHei',  // 设置字体大小和字体族
        fill: '#ffffff',
        textAlign: 'center',
        textVerticalAlign: 'bottom'
      },
      z: 100
    })) : [],
    series: [
      // 区域填充 - 渐变蓝色
      {
        name: 'Output value (in billions of US dollars)',
        type: 'line',
        data: regionData.area,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 225, 212, 0.8)' },
              { offset: 0.5, color: 'rgba(0, 225, 212, 0.5)' },
              { offset: 1, color: 'rgba(0, 225, 212, 0.1)' },
            ],
          },
        },
        lineStyle: {
          color: '#66DFD8',
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
      // 白色折线图
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
            return params.value + '%';
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
          chartType: 'area',
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

    console.log('面积图初始化成功')

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
      console.log('Area chart resized')
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
    console.log(`面积图已更新，城市: ${newCity ? newCity.city : '无'}`)
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