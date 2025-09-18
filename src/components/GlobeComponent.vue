<template>
  <div class="relative w-full h-full flex items-center justify-center">
    <div ref="globeContainer" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Globe from 'globe.gl'
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
          .particlesColor(() => 'palegreen')
          .arcsData([])
          .arcColor('color')
          .arcDashLength(0.4)
          .arcDashGap(2)
          .arcDashInitialGap(() => Math.random() * 5)
          .arcDashAnimateTime(2000)
          .pointsData([])
          .pointAltitude('size')
          .pointColor('color')
          .onPointClick(point => {
            emit('city-click', {
              city: point.city,
              country: point.country,
              name: point.name,
              lat: point.lat,
              lng: point.lng
            })
          })
          .labelsData([])
          .labelLat('lat')
          .labelLng('lng')
          .labelText('label')
          .labelSize(1.8)
          .labelDotRadius(0.1)
          .labelColor(() => 'rgba(255, 255, 255, 0.95)')
          .labelResolution(4)
          .labelAltitude(0.05)
          .labelIncludeDot(false)

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
    globe.particlesData([satData.filter(d => !isNaN(d.lat) && !isNaN(d.lng) && !isNaN(d.alt))])
  }

  frameTicker()
}

// Load airline data function like reference code
const loadAirlineData = () => {
  // Create mock airport data (in real app, would fetch from airports.dat)
  const mockAirports = [
    { name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States', lat: 33.9425, lng: -118.4081 },
    { name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States', lat: 40.6413, lng: -73.7781 },
    // { name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom', lat: 51.4700, lng: -0.4543 },
    { name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', lat: 49.0097, lng: 2.5479 },
    { name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan', lat: 35.5494, lng: 139.7798 },
    { name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates', lat: 25.2532, lng: 55.3657 },
    { name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', lat: 1.3644, lng: 103.9915 },
    { name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia', lat: -33.9399, lng: 151.1753 },
    // { name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', lat: 50.0379, lng: 8.5622 },
    { name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China', lat: 40.0799, lng: 116.6031 },
    { name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'China', lat: 22.3080, lng: 113.9185 },
    { name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands', lat: 52.3105, lng: 4.7683 },
    // { name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', lat: 47.4647, lng: 8.5492 },
    { name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada', lat: 43.6777, lng: -79.6248 },
    { name: 'São Paulo–Guarulhos International Airport', city: 'São Paulo', country: 'Brazil', lat: -23.4356, lng: -46.4731 }
  ]

  // Create mock route data (in real app, would fetch from routes.dat)
  const mockRoutes = [
    { airline: 'American Airlines', srcAirport: 'Los Angeles International Airport', dstAirport: 'John F. Kennedy International Airport' },
    { airline: 'British Airways', srcAirport: 'London Heathrow Airport', dstAirport: 'John F. Kennedy International Airport' },
    { airline: 'Air France', srcAirport: 'Charles de Gaulle Airport', dstAirport: 'Los Angeles International Airport' },
    { airline: 'Japan Airlines', srcAirport: 'Tokyo Haneda Airport', dstAirport: 'Los Angeles International Airport' },
    { airline: 'Emirates', srcAirport: 'Dubai International Airport', dstAirport: 'London Heathrow Airport' },
    { airline: 'Singapore Airlines', srcAirport: 'Singapore Changi Airport', dstAirport: 'Tokyo Haneda Airport' },
    { airline: 'Qantas', srcAirport: 'Sydney Kingsford Smith Airport', dstAirport: 'Los Angeles International Airport' },
    { airline: 'Lufthansa', srcAirport: 'Frankfurt Airport', dstAirport: 'John F. Kennedy International Airport' },
    { airline: 'Air China', srcAirport: 'Beijing Capital International Airport', dstAirport: 'Los Angeles International Airport' },
    { airline: 'Cathay Pacific', srcAirport: 'Hong Kong International Airport', dstAirport: 'London Heathrow Airport' },
    { airline: 'KLM', srcAirport: 'Amsterdam Airport Schiphol', dstAirport: 'John F. Kennedy International Airport' },
    { airline: 'Swiss International Air Lines', srcAirport: 'Zurich Airport', dstAirport: 'Singapore Changi Airport' },
    { airline: 'Air Canada', srcAirport: 'Toronto Pearson International Airport', dstAirport: 'London Heathrow Airport' },
    { airline: 'LATAM Airlines', srcAirport: 'São Paulo–Guarulhos International Airport', dstAirport: 'John F. Kennedy International Airport' },
    { airline: 'Emirates', srcAirport: 'Dubai International Airport', dstAirport: 'Sydney Kingsford Smith Airport' },
    { airline: 'Singapore Airlines', srcAirport: 'Singapore Changi Airport', dstAirport: 'Frankfurt Airport' },
    { airline: 'British Airways', srcAirport: 'London Heathrow Airport', dstAirport: 'Dubai International Airport' },
    { airline: 'Air France', srcAirport: 'Charles de Gaulle Airport', dstAirport: 'Tokyo Haneda Airport' },
    { airline: 'Lufthansa', srcAirport: 'Frankfurt Airport', dstAirport: 'Beijing Capital International Airport' },
    { airline: 'Cathay Pacific', srcAirport: 'Hong Kong International Airport', dstAirport: 'Sydney Kingsford Smith Airport' }
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
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
      }))

    // Process airports for points data like reference code
    const pointsData = mockAirports.map(d => ({
      lat: +d.lat,
      lng: +d.lng,
      size: 0.05,
      color: 'orange',
      city: d.city,
      country: d.country,
      name: d.name
    }))

    // Process airports for labels data
    const labelsData = mockAirports.map(d => ({
      lat: +d.lat,
      lng: +d.lng,
      label: d.city
    }))

    console.log(`Loaded ${arcsData.length} flight routes, ${pointsData.length} airports, and ${labelsData.length} labels`)

    // Update globe with airline data like reference code
    globe
      .arcsData(arcsData)
      // .pointsData(pointsData)
      .labelsData(labelsData)

    // Create custom markers for airports
    createCustomMarkers(pointsData)

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

    // Create icon image
    const iconImage = document.createElement('img')
    iconImage.src = '/src/assets/icon-2.png'
    iconImage.style.width = '20px'
    iconImage.style.height = '20px'
    iconImage.style.display = 'block'
    iconImage.style.objectFit = 'contain'
    iconImage.style.marginLeft = '2px'
    iconImage.style.marginTop = '2px'

    // Create label with black semi-transparent background and cyan border
    const labelElement = document.createElement('div')
    labelElement.textContent = point.city
    labelElement.style.position = 'absolute'
    labelElement.style.top = '30px'
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

    markerElement.appendChild(iconImage)
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