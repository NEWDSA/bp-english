<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  navItems: {
    type: Array,
    required: true
  }
})

const router = useRouter()

const setActiveNav = (itemId) => {
  props.navItems.forEach(item => {
    item.active = item.id === itemId
  })

  const navItem = props.navItems.find(item => item.id === itemId)
  if (navItem) {
    router.push(navItem.path)
  }
}
</script>

<template>
  <div class="absolute top-8 left-8 z-20">
    <div class="">
      <div class="flex items-center space-x-1">
        <!-- Logo -->
        <img src="../assets/nav_back.png" alt="Logo" class="w-6 h-6 mr-4 cursor-pointer" @click="router.push('/')" />

        <!-- Navigation Items -->
        <div class="flex items-center space-x-0 bg-gray-800/30 backdrop-blur-md rounded-lg border-gray-700/50 border-t border-b h-[52px]">
          <div v-for="(item, index) in navItems" :key="item.id" class="flex items-center">
            <span
              @click="setActiveNav(item.id)"
              :class="[
                'px-3 py-1 cursor-pointer text-[18px] transition-all duration-200 flex items-center h-[52px] block text-center',
                item.active
                  ? 'text-white font-medium bg-[#3CC8C8]/30 border-t border-b border-[#3CC8C8]'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
              ]">
              {{ item.name }}
            </span>
            <span v-if="index < navItems.length - 1" class="text-gray-600 mx-2">|</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>