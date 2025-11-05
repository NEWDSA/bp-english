<template>
  <div class="relative w-full h-full flex items-center justify-center">
    <div ref="globeContainer" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Globe from 'globe.gl'
import * as THREE from 'three'
import icon2 from '../assets/icon-2.png'
import earthPhoto from '../assets/earth-blue-marble.jpg';
import * as satellite from '../assets/satellite.mjs'
import { csvParseRows } from '../assets/d3-dsv.mjs'

const props = defineProps({
  loadData: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['city-click', 'globe-click'])

const globeContainer = ref(null)
const timeLog = ref(null)
const satelliteCount = ref(null)
let globe = null
let animationId = null
let currentWidth = 0
let currentHeight = 0
let customMarkers = []
let isClickingCity = false // 标记是否正在点击城市

// 常量定义
const EARTH_RADIUS_KM = 6371
const TIME_STEP = 3 * 1000 // 每帧3秒

onMounted(async () => {
  try {
    await nextTick()

    // 添加窗口大小变化监听器
    window.addEventListener('resize', handleResize)

    // 等待DOM完全准备就绪，多次检查
    setTimeout(async () => {
      if (!globeContainer.value || !(globeContainer.value instanceof HTMLElement)) {
        console.error('Globe container not found or invalid')
        return
      }

      try {
        // 清除任何现有内容
        globeContainer.value.innerHTML = ''

        // 计算响应式尺寸（容器的100%）
        const containerRect = globeContainer.value.getBoundingClientRect()
        console.log(containerRect)

        // 初始化地球组件
        globe = Globe()
          .width(containerRect.width)
          .height(containerRect.height)
          .backgroundColor('rgba(0,0,0,0)')
          .globeImageUrl(earthPhoto)
          .particleLat('lat')
          .particleLng('lng')
          .particleAltitude('alt')
          .arcStroke(0.5)
          .particlesColor(() => 'palegreen')
          .arcsData([])
          .arcColor('color')
          .arcDashLength(0.4)
          .arcDashGap(2)
          .arcDashInitialGap(() => Math.random() * 5)
          .arcDashAnimateTime(2000)
          .pointsData([])
          .pointAltitude(d => d.altitude || 0.01)
          .pointColor('color')
          .pointRadius(d => d.size || 0.3)
          .pointLabel('')
          .onPointClick(point => {
            isClickingCity = true
            emit('city-click', {
              city: point.city,
              country: point.country,
              name: point.name,
              lat: point.lat,
              lng: point.lng
            })
            // 延迟重置标记
            setTimeout(() => {
              isClickingCity = false
            }, 100)
            return true
          })
          .onGlobeClick(() => {
            // 点击地球背景时，触发切换到Global数据
            // 只有当没有点击到城市时才触发
            setTimeout(() => {
              if (!isClickingCity) {
                emit('globe-click')
              }
            }, 50)
          })
          .htmlElementsData([])
          .htmlLat('lat')
          .htmlLng('lng')
          .htmlElement(d => {
            const el = document.createElement('div')
            el.innerHTML = d.label
            el.style.pointerEvents = 'auto'
            el.style.cursor = 'pointer'
            // 添加mousedown事件来更早地捕获点击
            el.addEventListener('mousedown', (e) => {
              e.stopPropagation()
              e.preventDefault()
              isClickingCity = true
            })
            el.addEventListener('click', (e) => {
              e.stopPropagation() // 阻止事件冒泡
              e.preventDefault()
              isClickingCity = true
              emit('city-click', {
                city: d.city,
                country: d.country,
                name: d.name,
                lat: d.lat,
                lng: d.lng
              })
              // 延迟重置标记
              setTimeout(() => {
                isClickingCity = false
              }, 100)
            })
            // Add hover events to control globe rotation
            el.addEventListener('mouseenter', () => {
              const controls = globe.controls()
              if (controls) {
                controls.autoRotate = false
              }
            })
            el.addEventListener('mouseleave', () => {
              const controls = globe.controls()
              if (controls) {
                controls.autoRotate = true
              }
            })
            return el
          })
          .htmlAltitude(d => d.altitude || 0.01)

        // 挂载到容器
        globe(globeContainer.value)

        // 设置视角和控制器（延迟执行）
        setTimeout(() => {
          globe.pointOfView({ altitude: 1.66 })

          // 地球完全初始化后配置控制器
          try {
            const controls = globe.controls()
            if (controls) {
              controls.autoRotate = true
              controls.autoRotateSpeed = 0.5
              controls.enableZoom = false
              controls.enablePan = false
              console.log('Controls configured successfully')
            }
          } catch (error) {
            console.warn('Could not configure controls:', error)
          }

          // 地球初始化后添加渲染监听器
          addRenderListener()
        }, 500)

        console.log('Globe initialized, loading satellite data...')

        // 根据 props.loadData 决定是否加载数据
        if (props.loadData) {
          // 加载卫星数据
          loadSatelliteData()

          // 加载航空数据
          loadAirlineData()
        }

      } catch (error) {
        console.error('Error initializing globe:', error)
        // 备用方案：尝试替代挂载方法
        setTimeout(() => {
          try {
            if (globeContainer.value && globe) {
              globe(globeContainer.value)
              console.log('Globe fallback initialization successful')
            }
          } catch (fallbackError) {
            console.error('Globe fallback failed:', fallbackError)
          }
        }, 500)
      }
    }, 300)
  } catch (error) {
    console.error('Error in globe mount hook:', error)
  }
})

onUnmounted(() => {
  // 移除窗口大小变化监听器
  window.removeEventListener('resize', handleResize)

  // 停止动画
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  // 清除自定义标记
  customMarkers.forEach(marker => {
    if (marker.element && marker.element.parentNode) {
      marker.element.parentNode.removeChild(marker.element)
    }
  })

  if (globe) {
    globe._destructor()
  }
})

// 处理窗口大小变化
const handleResize = () => {
  if (globe && globeContainer.value) {
    const containerRect = globeContainer.value.getBoundingClientRect()
    const newWidth = containerRect.width
    const newHeight = containerRect.height

    if (newWidth !== currentWidth || newHeight !== currentHeight) {
      currentWidth = newWidth
      currentHeight = newHeight
      globe.width(currentWidth).height(currentHeight)
    }
  }
}

// 加载卫星数据函数
const loadSatelliteData = () => {
  // 创建模拟TLE数据用于演示（实际应用中应从API获取）
  const mockTleData = [
    [
      'ISS (ZARYA)',
      '1 25544U 98067A   23001.00000000  .00001234  00000-0  12345-3 0  9992',
      '2 25544  51.6400 339.3900 0008440 288.1300  71.9000 15.49030996123456'
    ],
    // 添加更多模拟卫星...
    ...Array.from({ length: 399 }, (_, i) => [
      `SATELLITE-${i + 1}`,
      `1 ${(40000 + i).toString().padStart(5, '0')}U 23001A   23001.00000000  .00001234  00000-0  12345-3 0  999${i % 10}`,
      `2 ${(40000 + i).toString().padStart(5, '0')}  ${(51 + (i % 50)).toFixed(4)} ${(Math.random() * 360).toFixed(4)} ${(Math.random() * 0.01).toFixed(7)} ${(Math.random() * 360).toFixed(4)} ${(Math.random() * 360).toFixed(4)} ${(15.49 + Math.random()).toFixed(8)}${(100000 + i).toString().padStart(6, '0')}`
    ])
  ]

  try {
    // 处理TLE数据
    const satData = mockTleData.map(([name, line1, line2]) => ({
      satrec: satellite.twoline2satrec(line1, line2),
      name: name.trim().replace(/^0 /, '')
    }))
    // 过滤掉无法传播的卫星
    .filter(d => {
      try {
        return !!satellite.propagate(d.satrec, new Date())?.position
      } catch (e) {
        return false
      }
    })

    console.log(`Loaded ${satData.length} satellites`)
    if (satelliteCount.value) {
      satelliteCount.value.textContent = `Satellites: ${satData.length}`
    }

    // 启动时间动画
    startTimeAnimation(satData)

  } catch (error) {
    console.error('Error loading satellite data:', error)
  }
}

// 时间动画函数
const startTimeAnimation = (satData) => {
  let time = new Date()

  function frameTicker() {
    animationId = requestAnimationFrame(frameTicker)

    time = new Date(+time + TIME_STEP)
    if (timeLog.value) {
      timeLog.value.textContent = time.toString()
    }

    // 更新卫星位置
    const gmst = satellite.gstime(time)
    satData.forEach(d => {
      try {
        const eci = satellite.propagate(d.satrec, time)
        if (eci?.position) {
          const gdPos = satellite.eciToGeodetic(eci.position, gmst)
          d.lat = satellite.radiansToDegrees(gdPos.latitude)
          d.lng = satellite.radiansToDegrees(gdPos.longitude)
          d.alt = gdPos.height / EARTH_RADIUS_KM
        } else {
          // 显式处理无效位置
          d.lat = NaN
          d.lng = NaN
          d.alt = NaN
        }
      } catch (error) {
        d.lat = NaN
        d.lng = NaN
        d.alt = NaN
      }
    })

    // 更新地球粒子
    const validSatData = satData.filter(d => !isNaN(d.lat) && !isNaN(d.lng) && !isNaN(d.alt))
    // console.log('Valid satellite count:', validSatData.length, 'Sample:', validSatData[0])

    // 由于兼容性问题暂时禁用粒子效果
    // try {
    //   if (globe && Array.isArray(validSatData)) {
    //     globe.particlesData(validSatData)
    //   }
    // } catch (error) {
    //   console.error('Error updating particles:', error)
    // }
  }

  frameTicker()
}

// 加载航空数据函数
const loadAirlineData = () => {
  // 为特定地区创建模拟机场数据
  const mockAirports = [
    // 中国
    { name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China', region: 'Asia', lat: 40.0799, lng: 116.6031 },

    // 东南亚
    { name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', region: 'Southeast Asia', lat: 1.3644, lng: 103.9915 },

    // 意大利
    { name: 'Rome Fiumicino Airport', city: 'Rome', country: 'Italy', region: 'Europe', lat: 41.8003, lng: 12.2389 },

    // 美国
    { name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States', region: 'America', lat: 33.9425, lng: -118.4081 },

    // 中东
    { name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates', region: 'Middle East', lat: 25.2532, lng: 55.3657 },

    // 欧洲
    // { name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom', region: 'Europe', lat: 51.4700, lng: -0.4543 }
  ]

  // 为选定地区创建模拟航线数据
  const mockRoutes = [
    // 东南亚航线
    { airline: 'Singapore Airlines', srcAirport: 'Singapore Changi Airport', dstAirport: 'Kuala Lumpur International Airport' },
    { airline: 'Thai Airways', srcAirport: 'Bangkok Suvarnabhumi Airport', dstAirport: 'Singapore Changi Airport' },
    { airline: 'Garuda Indonesia', srcAirport: 'Jakarta Soekarno-Hatta Airport', dstAirport: 'Singapore Changi Airport' },
    { airline: 'Philippine Airlines', srcAirport: 'Manila Ninoy Aquino Airport', dstAirport: 'Beijing Capital International Airport' },

    // 美国航线
    { airline: 'United Airlines', srcAirport: 'Los Angeles International Airport', dstAirport: 'Mexico City International Airport' },
    { airline: 'LATAM Airlines', srcAirport: 'São Paulo–Guarulhos International Airport', dstAirport: 'Los Angeles International Airport' },

    // 中东航线
    { airline: 'Emirates', srcAirport: 'Dubai International Airport', dstAirport: 'Doha Hamad International Airport' },
    { airline: 'Qatar Airways', srcAirport: 'Doha Hamad International Airport', dstAirport: 'Riyadh King Khalid International Airport' },

    // 洲际航线
    { airline: 'Emirates', srcAirport: 'Dubai International Airport', dstAirport: 'Rome Fiumicino Airport' },
    { airline: 'Cathay Pacific', srcAirport: 'Beijing Capital International Airport', dstAirport: 'Singapore Changi Airport' },
    { airline: 'Air France', srcAirport: 'Rome Fiumicino Airport', dstAirport: 'Los Angeles International Airport' },
    { airline: 'Singapore Airlines', srcAirport: 'Singapore Changi Airport', dstAirport: 'Dubai International Airport' },
    { airline: 'Qatar Airways', srcAirport: 'Doha Hamad International Airport', dstAirport: 'Rome Fiumicino Airport' },
    { airline: 'Turkish Airlines', srcAirport: 'Dubai International Airport', dstAirport: 'Beijing Capital International Airport' },
    { airline: 'British Airways', srcAirport: 'Rome Fiumicino Airport', dstAirport: 'Los Angeles International Airport' },
    { airline: 'Lufthansa', srcAirport: 'Dubai International Airport', dstAirport: 'Rome Fiumicino Airport' }
  ]

  try {
    // 创建机场查找映射
    const airportByName = {}
    mockAirports.forEach(d => {
      airportByName[d.name] = d
    })

    // 处理航线并创建弧线数据
    const arcsData = mockRoutes
      .filter(d => airportByName[d.srcAirport] && airportByName[d.dstAirport])
      .map(d => ({
        startLat: +airportByName[d.srcAirport].lat,
        startLng: +airportByName[d.srcAirport].lng,
        endLat: +airportByName[d.dstAirport].lat,
        endLng: +airportByName[d.dstAirport].lng,
        color: 'white'
      }))

    // 处理机场为点数据，使用原生点样式
    const pointsData = mockAirports.map(d => ({
      lat: +d.lat,
      lng: +d.lng,
      size: 0.8, // 较大的基础尺寸
      color: 'red', // 主点使用红色
      city: d.city,
      country: d.country,
      name: d.name,
      altitude: 0.005
    }))

    // 为机场处理自定义文本标签
    const labelsData = mockAirports.map(d => ({
      lat: +d.lat,
      lng: +d.lng,
      city: d.city,
      country: d.country,
      name: d.name,
      altitude: 0.01,
      label: `
        <div style="margin-top: 84px; padding: 4px 8px; background-color: rgba(0, 0, 0, 0.8); border: 2px solid #06b6d4; border-radius: 4px; color: white; font-size: 16px; white-space: nowrap; font-family: system-ui, -apple-system, sans-serif;">
          ${d.country}
        </div>
      `
    }))

    console.log(`Loaded ${arcsData.length} flight routes, ${pointsData.length} airports, and ${labelsData.length} labels`)

    // 使用航空数据更新地球
    globe
      .arcsData(arcsData)
      .arcStartLat('startLat')
      .arcStartLng('startLng')
      .arcEndLat('endLat')
      .arcEndLng('endLng')
      .pointsData(pointsData)
      .htmlElementsData(labelsData)

  } catch (error) {
    console.error('Error loading airline data:', error)
  }
}

// 为机场点创建自定义标记
const createCustomMarkers = (pointsData) => {
  // 清除现有标记
  customMarkers.forEach(marker => {
    if (marker.element && marker.element.parentNode) {
      marker.element.parentNode.removeChild(marker.element)
    }
  })
  customMarkers = []

  console.log('Creating custom markers for points:', pointsData.length)

  pointsData.forEach((point, index) => {
    // 创建标记容器
    const markerElement = document.createElement('div')
    markerElement.style.position = 'absolute'
    markerElement.style.transform = 'translate(-50%, -50%)'
    markerElement.style.pointerEvents = 'auto'
    markerElement.style.cursor = 'pointer'
    markerElement.style.zIndex = '1000'

    // 创建图标图像元素
    const iconElement = document.createElement('img')
    iconElement.src = icon2
    iconElement.style.width = '40px'
    iconElement.style.height = '40px'
    iconElement.style.position = 'relative'
    iconElement.style.display = 'block'
    iconElement.alt = `${point.city} airport icon`

    // 创建带有黑色半透明背景和青色边框的标签
    const labelElement = document.createElement('div')
    labelElement.textContent = point.country
    labelElement.style.position = 'absolute'
    labelElement.style.top = '50px'
    labelElement.style.left = '50%'
    labelElement.style.transform = 'translateX(-50%)'
    labelElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    labelElement.style.border = '2px solid #06b6d4'
    labelElement.style.borderRadius = '4px'
    labelElement.style.color = 'white'
    labelElement.style.padding = '2px 6px'
    labelElement.style.fontSize = '10px'
    labelElement.style.whiteSpace = 'nowrap'
    labelElement.style.fontFamily = 'system-ui, -apple-system, sans-serif'

    // 添加点击事件
    markerElement.addEventListener('click', (e) => {
      e.stopPropagation() // 阻止事件冒泡
      emit('city-click', {
        city: point.city,
        country: point.country,
        name: point.name,
        lat: point.lat,
        lng: point.lng
      })
    })

    // 构建标记结构
    markerElement.appendChild(iconElement)
    markerElement.appendChild(labelElement)
    globeContainer.value.appendChild(markerElement)

    console.log(`Created marker for ${point.city} at index ${index}`)

    customMarkers.push({
      element: markerElement,
      point: point,
      index: index
    })
  })

  // 更新标记位置
  updateMarkerPositions()
}

// 基于地球投影更新标记位置
const updateMarkerPositions = () => {
  if (!globe || !globeContainer.value) return

  const containerRect = globeContainer.value.getBoundingClientRect()

  customMarkers.forEach((marker, index) => {
    try {
      // 使用3D投影从地球获取坐标
      const vector = globe.getPointPos(marker.point.lat, marker.point.lng, 0.01)

      if (vector) {
        // 获取相机并将3D投影到2D
        const camera = globe.camera()
        vector.project(camera)

        // 转换为屏幕坐标
        const x = (vector.x + 1) * containerRect.width / 2
        const y = (-vector.y + 1) * containerRect.height / 2

        // 只有在相机前方时才显示
        if (vector.z < 1) {
          marker.element.style.left = `${x}px`
          marker.element.style.top = `${y}px`
          marker.element.style.display = 'block'
        } else {
          marker.element.style.display = 'none'
        }
      } else {
        marker.element.style.display = 'none'
      }
    } catch (error) {
      marker.element.style.display = 'none'
    }
  })
}

// 地球旋转时更新标记
const onGlobeRender = () => {
  updateMarkerPositions()
}

// 添加渲染监听器以持续更新标记
const addRenderListener = () => {
  if (globe) {
    // 添加动画循环以持续更新标记
    const animate = () => {
      updateMarkerPositions()
      requestAnimationFrame(animate)
    }
    animate()
  }
}
</script>


<style scoped>
</style>