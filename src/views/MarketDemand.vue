<script setup>
import { ref } from 'vue'
import Navigation from '../components/Navigation.vue';

const navItems = ref([
  { id: 1, name: 'Industry Background', path: '/industry-background', active: false },
  { id: 2, name: 'Market Demand', path: '/market-demand', active: true },
  { id: 3, name: 'Business Model', path: '/business-model', active: false },
  { id: 4, name: 'Team Composition', path: '/team-composition', active: false },
  { id: 5, name: 'Product Introduction', path: '/product-introduction', active: false }
])
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative">
    <!-- navItems: 导航栏 -->
    <Navigation :nav-items="navItems" />

  </div>
</template>

