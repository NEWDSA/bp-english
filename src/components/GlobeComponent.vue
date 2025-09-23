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
import * as satellite from '../assets/satellite.mjs'
import { csvParseRows } from '../assets/d3-dsv.mjs'

const emit = defineEmits(['city-click'])

const globeContainer = ref(null)
const timeLog = ref(null)
const satelliteCount = ref(null)
let globe = null
let animationId = null
let currentWidth = 0
let currentHeight = 0
let customMarkers = []

// Constants like reference code
const EARTH_RADIUS_KM = 6371
const TIME_STEP = 3 * 1000 // 3 seconds per frame

onMounted(async () => {
  try {
    await nextTick()

    // Add resize listener
    window.addEventListener('resize', handleResize)

    // Wait for DOM to be fully ready with multiple checks
    setTimeout(async () => {
      if (!globeContainer.value || !(globeContainer.value instanceof HTMLElement)) {
        console.error('Globe container not found or invalid')
        return
      }

      try {
        // Clear any existing content
        globeContainer.value.innerHTML = ''

        // Calculate responsive size (100% of container)
        const containerRect = globeContainer.value.getBoundingClientRect()
        console.log(containerRect)

        // Initialize Globe like the simple version first
        globe = Globe()
          .width(containerRect.width)
          .height(containerRect.height)
          .backgroundColor('rgba(0,0,0,0)')
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
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
            emit('city-click', {
              city: point.city,
              country: point.country,
              name: point.name,
              lat: point.lat,
              lng: point.lng
            })
          })
          .htmlElementsData([])
          .htmlLat('lat')
          .htmlLng('lng')
          .htmlElement(d => {
            const el = document.createElement('div')
            el.innerHTML = d.label
            el.style.pointerEvents = 'auto'
            el.style.cursor = 'pointer'
            el.addEventListener('click', () => {
              emit('city-click', {
                city: d.city,
                country: d.country,
                name: d.name,
                lat: d.lat,
                lng: d.lng
              })
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

        // Mount to container
        globe(globeContainer.value)

        // Set point of view and controls like reference (with delay)
        setTimeout(() => {
          globe.pointOfView({ altitude: 1.66 })

          // Configure controls after globe is fully initialized
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

          // Add render listener after globe is initialized
          addRenderListener()
        }, 500)

        console.log('Globe initialized, loading satellite data...')

        // Load satellite data like reference code
        loadSatelliteData()

        // Load airline data
        loadAirlineData()

      } catch (error) {
        console.error('Error initializing globe:', error)
        // Fallback: try alternative mounting approach
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
  // Remove resize listener
  window.removeEventListener('resize', handleResize)

  // Stop animation
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  // Clear custom markers
  customMarkers.forEach(marker => {
    if (marker.element && marker.element.parentNode) {
      marker.element.parentNode.removeChild(marker.element)
    }
  })

  if (globe) {
    globe._destructor()
  }
})

// Handle resize
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

// Load satellite data function like reference code
const loadSatelliteData = () => {
  // Create mock TLE data for demonstration (in real app, would fetch from API)
  const mockTleData = [
    [
      'ISS (ZARYA)',
      '1 25544U 98067A   23001.00000000  .00001234  00000-0  12345-3 0  9992',
      '2 25544  51.6400 339.3900 0008440 288.1300  71.9000 15.49030996123456'
    ],
    // Add more mock satellites...
    ...Array.from({ length: 399 }, (_, i) => [
      `SATELLITE-${i + 1}`,
      `1 ${(40000 + i).toString().padStart(5, '0')}U 23001A   23001.00000000  .00001234  00000-0  12345-3 0  999${i % 10}`,
      `2 ${(40000 + i).toString().padStart(5, '0')}  ${(51 + (i % 50)).toFixed(4)} ${(Math.random() * 360).toFixed(4)} ${(Math.random() * 0.01).toFixed(7)} ${(Math.random() * 360).toFixed(4)} ${(Math.random() * 360).toFixed(4)} ${(15.49 + Math.random()).toFixed(8)}${(100000 + i).toString().padStart(6, '0')}`
    ])
  ]

  try {
    // Process TLE data like reference code
    const satData = mockTleData.map(([name, line1, line2]) => ({
      satrec: satellite.twoline2satrec(line1, line2),
      name: name.trim().replace(/^0 /, '')
    }))
    // Filter out satellites that can't be propagated
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

    // Start time ticker like reference code
    startTimeAnimation(satData)

  } catch (error) {
    console.error('Error loading satellite data:', error)
  }
}

// Time animation function like reference code
const startTimeAnimation = (satData) => {
  let time = new Date()

  function frameTicker() {
    animationId = requestAnimationFrame(frameTicker)

    time = new Date(+time + TIME_STEP)
    if (timeLog.value) {
      timeLog.value.textContent = time.toString()
    }

    // Update satellite positions like reference code
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
          // Explicitly handle invalid position
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

    // Update globe particles like reference code
    const validSatData = satData.filter(d => !isNaN(d.lat) && !isNaN(d.lng) && !isNaN(d.alt))
    console.log('Valid satellite count:', validSatData.length, 'Sample:', validSatData[0])

    // Temporarily disabled particles due to compatibility issues
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

// Load airline data function like reference code
const loadAirlineData = () => {
  // Create mock airport data for specific regions
  const mockAirports = [
    // China
    { name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China', region: 'Asia', lat: 40.0799, lng: 116.6031 },

    // Southeast Asia
    { name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', region: 'Southeast Asia', lat: 1.3644, lng: 103.9915 },

    // Italy
    { name: 'Rome Fiumicino Airport', city: 'Rome', country: 'Italy', region: 'Europe', lat: 41.8003, lng: 12.2389 },

    // America
    { name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States', region: 'America', lat: 33.9425, lng: -118.4081 },

    // Middle East
    { name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates', region: 'Middle East', lat: 25.2532, lng: 55.3657 },

    // Europe
    { name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom', region: 'Europe', lat: 51.4700, lng: -0.4543 }
  ]

  // Create mock route data for the selected regions
  const mockRoutes = [
    // Southeast Asia routes
    { airline: 'Singapore Airlines', srcAirport: 'Singapore Changi Airport', dstAirport: 'Kuala Lumpur International Airport' },
    { airline: 'Thai Airways', srcAirport: 'Bangkok Suvarnabhumi Airport', dstAirport: 'Singapore Changi Airport' },
    { airline: 'Garuda Indonesia', srcAirport: 'Jakarta Soekarno-Hatta Airport', dstAirport: 'Singapore Changi Airport' },
    { airline: 'Philippine Airlines', srcAirport: 'Manila Ninoy Aquino Airport', dstAirport: 'Beijing Capital International Airport' },

    // America routes
    { airline: 'United Airlines', srcAirport: 'Los Angeles International Airport', dstAirport: 'Mexico City International Airport' },
    { airline: 'LATAM Airlines', srcAirport: 'São Paulo–Guarulhos International Airport', dstAirport: 'Los Angeles International Airport' },

    // Middle East routes
    { airline: 'Emirates', srcAirport: 'Dubai International Airport', dstAirport: 'Doha Hamad International Airport' },
    { airline: 'Qatar Airways', srcAirport: 'Doha Hamad International Airport', dstAirport: 'Riyadh King Khalid International Airport' },
    { airline: 'El Al', srcAirport: 'Tel Aviv Ben Gurion Airport', dstAirport: 'London Heathrow Airport' },

    // Intercontinental routes
    { airline: 'Emirates', srcAirport: 'Dubai International Airport', dstAirport: 'London Heathrow Airport' },
    { airline: 'Cathay Pacific', srcAirport: 'Beijing Capital International Airport', dstAirport: 'London Heathrow Airport' },
    { airline: 'Air France', srcAirport: 'London Heathrow Airport', dstAirport: 'Los Angeles International Airport' },
    { airline: 'Singapore Airlines', srcAirport: 'Singapore Changi Airport', dstAirport: 'London Heathrow Airport' },
    { airline: 'Qatar Airways', srcAirport: 'Doha Hamad International Airport', dstAirport: 'Rome Fiumicino Airport' },
    { airline: 'Turkish Airlines', srcAirport: 'London Heathrow Airport', dstAirport: 'Beijing Capital International Airport' },
    { airline: 'British Airways', srcAirport: 'London Heathrow Airport', dstAirport: 'Los Angeles International Airport' },
    { airline: 'Lufthansa', srcAirport: 'London Heathrow Airport', dstAirport: 'Rome Fiumicino Airport' }
  ]

  try {
    // Create airport lookup map
    const airportByName = {}
    mockAirports.forEach(d => {
      airportByName[d.name] = d
    })

    // Process routes and create arcs data like reference code
    const arcsData = mockRoutes
      .filter(d => airportByName[d.srcAirport] && airportByName[d.dstAirport])
      .map(d => ({
        startLat: +airportByName[d.srcAirport].lat,
        startLng: +airportByName[d.srcAirport].lng,
        endLat: +airportByName[d.dstAirport].lat,
        endLng: +airportByName[d.dstAirport].lng,
        color: 'white'
      }))

    // Process airports for points data with native point styling
    const pointsData = mockAirports.map(d => ({
      lat: +d.lat,
      lng: +d.lng,
      size: 0.8, // Larger base size
      color: 'red', // Red color for the main point
      city: d.city,
      country: d.country,
      name: d.name,
      altitude: 0.005
    }))

    // Process airports for custom text labels
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

    // Update globe with airline data like reference code
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

// Create custom markers for airport points
const createCustomMarkers = (pointsData) => {
  // Clear existing markers
  customMarkers.forEach(marker => {
    if (marker.element && marker.element.parentNode) {
      marker.element.parentNode.removeChild(marker.element)
    }
  })
  customMarkers = []

  console.log('Creating custom markers for points:', pointsData.length)

  pointsData.forEach((point, index) => {
    // Create marker container
    const markerElement = document.createElement('div')
    markerElement.style.position = 'absolute'
    markerElement.style.transform = 'translate(-50%, -50%)'
    markerElement.style.pointerEvents = 'auto'
    markerElement.style.cursor = 'pointer'
    markerElement.style.zIndex = '1000'

    // Create icon image element
    const iconElement = document.createElement('img')
    iconElement.src = icon2
    iconElement.style.width = '40px'
    iconElement.style.height = '40px'
    iconElement.style.position = 'relative'
    iconElement.style.display = 'block'
    iconElement.alt = `${point.city} airport icon`

    // Create label with black semi-transparent background and cyan border
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

    // Add click event
    markerElement.addEventListener('click', () => {
      emit('city-click', {
        city: point.city,
        country: point.country,
        name: point.name,
        lat: point.lat,
        lng: point.lng
      })
    })

    // Build the marker structure
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

  // Update marker positions
  updateMarkerPositions()
}

// Update marker positions based on globe projection
const updateMarkerPositions = () => {
  if (!globe || !globeContainer.value) return

  const containerRect = globeContainer.value.getBoundingClientRect()

  customMarkers.forEach((marker, index) => {
    try {
      // Get coordinates from globe using 3D projection
      const vector = globe.getPointPos(marker.point.lat, marker.point.lng, 0.01)

      if (vector) {
        // Get camera and project 3D to 2D
        const camera = globe.camera()
        vector.project(camera)

        // Convert to screen coordinates
        const x = (vector.x + 1) * containerRect.width / 2
        const y = (-vector.y + 1) * containerRect.height / 2

        // Only show if in front of camera
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

// Update markers on globe rotation
const onGlobeRender = () => {
  updateMarkerPositions()
}

// Add render listener to update markers continuously
const addRenderListener = () => {
  if (globe) {
    // Add animation loop to continuously update markers
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