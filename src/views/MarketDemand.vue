<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navigation from '../components/Navigation.vue'

const navItems = ref([
  { id: 1, name: 'Industry Background', path: '/industry-background', active: false },
  { id: 2, name: 'Market Demand', path: '/market-demand', active: true },
  { id: 3, name: 'Business Model', path: '/business-model', active: false },
  { id: 4, name: 'Team Composition', path: '/team-composition', active: false },
  { id: 5, name: 'Product Introduction', path: '/product-introduction', active: false }
])

const rotation = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const startRotation = ref(0)

const countries = ref([
  { id: 1, name: 'USA', image: '/countries/usa.png', angle: 0 },
  { id: 2, name: 'UK', image: '/countries/uk.png', angle: 30 },
  { id: 3, name: 'Germany', image: '/countries/germany.png', angle: 60 },
  { id: 4, name: 'France', image: '/countries/france.png', angle: 90 },
  { id: 5, name: 'Japan', image: '/countries/japan.png', angle: 120 },
  { id: 6, name: 'Australia', image: '/countries/australia.png', angle: 150 },
  { id: 7, name: 'Canada', image: '/countries/canada.png', angle: 180 },
  { id: 8, name: 'Brazil', image: '/countries/brazil.png', angle: 210 },
  { id: 9, name: 'India', image: '/countries/india.png', angle: 240 },
  { id: 10, name: 'China', image: '/countries/china.png', angle: 270 },
  { id: 11, name: 'South Korea', image: '/countries/south-korea.png', angle: 300 },
  { id: 12, name: 'Singapore', image: '/countries/singapore.png', angle: 330 }
])

const isHighlighted = (angle) => {
  const normalizedAngle = ((angle + rotation.value) % 360 + 360) % 360
  return normalizedAngle >= 45 && normalizedAngle <= 135
}

const isCollapsed = (angle) => {
  const normalizedAngle = ((angle + rotation.value) % 360 + 360) % 360
  return (normalizedAngle >= 0 && normalizedAngle <= 30) || (normalizedAngle >= 150 && normalizedAngle <= 210)
}

const shouldHide = (angle) => {
  const normalizedAngle = ((angle + rotation.value) % 360 + 360) % 360
  return normalizedAngle > 180 && normalizedAngle < 360
}

const handleWheel = (e) => {
  e.preventDefault()
  const delta = e.deltaY > 0 ? 15 : -15
  const newRotation = rotation.value + delta

  // 限制旋转范围：逆时针最大到-180度，顺时针最大到180度
  if (newRotation >= -180 && newRotation <= 180) {
    rotation.value = newRotation
  }
}

const handleMouseDown = (e) => {
  isDragging.value = true
  startX.value = e.clientX
  startRotation.value = rotation.value
}

const handleMouseMove = (e) => {
  if (!isDragging.value) return

  const deltaX = e.clientX - startX.value
  const newRotation = startRotation.value + deltaX * 0.5

  // 限制旋转范围：逆时针最大到-180度，顺时针最大到180度
  if (newRotation >= -180 && newRotation <= 180) {
    rotation.value = newRotation
  }
}

const handleMouseUp = () => {
  isDragging.value = false
}

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative overflow-hidden">
    <!-- Navigation -->
    <Navigation :nav-items="navItems" />

    <!-- Main Content Container -->
    <div class="flex h-screen pt-16">
      <!-- Left Content: Circular Country Display (33.33% width) -->
      <div
        class="w-1/3 flex items-center justify-center relative cursor-grab"
        :class="{ 'cursor-grabbing': isDragging }"
        @mousedown="handleMouseDown"
      >
        <div class="relative w-96 h-96">
          <!-- Center Circle -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full shadow-2xl border-4 border-blue-400"></div>

          <!-- Countries positioned around the circle -->
          <div
            v-for="country in countries"
            :key="country.id"
            class="absolute top-1/2 left-1/2 origin-center transition-all duration-300 ease-out"
            :style="{
              transform: `translate(-50%, -50%) rotate(${country.angle + rotation}deg) translateY(-160px) rotate(-${country.angle + rotation}deg)`,
              transformOrigin: 'center center',
              visibility: shouldHide(country.angle) ? 'hidden' : 'visible',
              opacity: shouldHide(country.angle) ? 0 : 1
            }"
          >
            <div
              class="text-center transition-all duration-300 ease-out"
              :class="[
                isCollapsed(country.angle)
                  ? 'scale-50 opacity-50'
                  : isHighlighted(country.angle)
                    ? 'scale-125 brightness-125 drop-shadow-lg'
                    : 'scale-100 brightness-90 hover:scale-110'
              ]"
            >
              <!-- Country Image -->
              <div class="w-16 h-16 mx-auto mb-2 bg-white rounded-lg overflow-hidden shadow-lg border-2"
                   :class="isHighlighted(country.angle) ? 'border-yellow-400' : 'border-gray-300'">
                <img
                  :src="country.image"
                  :alt="country.name"
                  class="w-full h-full object-cover"
                  onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzM3NDE1MSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj7pgq7nvaI8L3RleHQ+Cjwvc3ZnPg=='"
                />
              </div>

              <!-- Country Name -->
              <div
                class="text-sm font-semibold px-2 py-1 rounded-full backdrop-blur-sm"
                :class="[
                  isHighlighted(country.angle)
                    ? 'bg-yellow-400 text-gray-900 shadow-lg'
                    : 'bg-white/80 text-gray-800 shadow-md'
                ]"
              >
                {{ country.name }}
              </div>
            </div>
          </div>

          <!-- Center decoration -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
            <div class="text-white text-xs font-bold text-center px-2">GLOBAL<br/>MARKET</div>
          </div>
        </div>
      </div>

      <!-- Middle Content: Introduction (33.33% width) -->
      <div class="w-1/3 flex items-center justify-center p-8">
        <div class="text-white max-w-md">
          <h1 class="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Market Demand Analysis
          </h1>
          <div class="space-y-4 text-gray-300">
            <p class="leading-relaxed">
              Our comprehensive market analysis reveals growing demand for English language education across 12 key global markets.
            </p>
            <p class="leading-relaxed">
              The interactive visualization shows our target countries, with highlighted regions representing our primary focus areas for expansion.
            </p>
            <div class="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <h3 class="text-xl font-semibold mb-3 text-blue-300">Key Insights:</h3>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center"><span class="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>5 primary target markets identified</li>
                <li class="flex items-center"><span class="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>Combined population of 2.8 billion</li>
                <li class="flex items-center"><span class="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>$47B annual market opportunity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content: Team/Additional Info (33.33% width) -->
      <div class="w-1/3 flex items-center justify-center p-8">
        <div class="text-white max-w-md">
          <h2 class="text-3xl font-bold mb-6 text-center">Market Opportunities</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-4 rounded-lg backdrop-blur-sm border border-white/20">
              <div class="text-2xl font-bold text-blue-300">2.8B</div>
              <div class="text-sm text-gray-300">Total Addressable Market</div>
            </div>
            <div class="bg-gradient-to-br from-green-600/20 to-blue-600/20 p-4 rounded-lg backdrop-blur-sm border border-white/20">
              <div class="text-2xl font-bold text-green-300">$47B</div>
              <div class="text-sm text-gray-300">Annual Revenue</div>
            </div>
            <div class="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-4 rounded-lg backdrop-blur-sm border border-white/20">
              <div class="text-2xl font-bold text-purple-300">15%</div>
              <div class="text-sm text-gray-300">CAGR Growth</div>
            </div>
            <div class="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 p-4 rounded-lg backdrop-blur-sm border border-white/20">
              <div class="text-2xl font-bold text-yellow-300">12</div>
              <div class="text-sm text-gray-300">Target Countries</div>
            </div>
          </div>

          <div class="mt-8 text-center">
            <div class="inline-flex items-center space-x-2 text-sm text-gray-400">
              <span>← Scroll to rotate</span>
              <span class="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>Drag to navigate</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Content: Scenic Images (Optional) -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
  </div>
</template>

<style scoped>
.country-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.country-item:hover {
  z-index: 10;
}

/* Smooth scrolling for the rotation */
.circular-container {
  transition: transform 0.1s ease-out;
}

/* Custom cursor for dragging */
.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing;
}
</style>