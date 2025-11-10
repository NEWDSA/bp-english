<template>
	<!-- 顶部导航栏 -->
	<nav :class="route.path == '/business-model' ? `top-nav flex-shrink-0 bg-black/80 backdrop-blur-[10px] z-40 py-[15px] font-['Arial',sans-serif]` : `flex-shrink-0 bg-black/80 backdrop-blur-[10px] z-40 py-[15px] font-['Arial',sans-serif]`">
		<div class="flex justify-center items-center gap-3 max-w-[1200px] mx-auto px-3 flex-wrap lg:gap-5 lg:px-5 lg:flex-nowrap md:gap-[10px] md:flex-nowrap">
			<!-- 返回首页按钮 -->
			<div class="cursor-pointer transition-all duration-300 p-[5px] rounded-full backdrop-blur-[10px] hover:bg-[rgba(0,212,255,0.2)] hover:scale-110" @click="goHome">
				<div class="w-[25px] h-[25px] flex items-center justify-center">
					<img src="@/assets/nav_back.png" alt="Home" class="w-full h-full object-contain" />
				</div>
			</div>
			<div class="w-px h-5 bg-white/30"></div>

			<router-link to="/product-introduction" :class="['px-3 py-2 cursor-pointer transition-all duration-300 relative text-lg font-medium no-underline text-center whitespace-nowrap lg:px-5 lg:py-[10px] md:px-[15px] md:py-2 hover:text-[#00d4ff]', isActive('/product-introduction') ? 'text-[#00d4ff] after:content-[\'\'] after:absolute after:-bottom-[5px] after:left-0 after:right-0 after:h-0.5 after:bg-[#00d4ff]' : 'text-white']">Product Introduction</router-link>
			<div class="w-px h-5 bg-white/30 flex-shrink-0"></div>
			<router-link to="/industry-background" :class="['px-3 py-2 cursor-pointer transition-all duration-300 relative text-lg font-medium no-underline text-center whitespace-nowrap lg:px-5 lg:py-[10px] md:px-[15px] md:py-2 hover:text-[#00d4ff]', isActive('/industry-background') ? 'text-[#00d4ff] after:content-[\'\'] after:absolute after:-bottom-[5px] after:left-0 after:right-0 after:h-0.5 after:bg-[#00d4ff]' : 'text-white']">Industry Background</router-link>
			<div class="w-px h-5 bg-white/30 flex-shrink-0"></div>
			<router-link to="/market-demand" :class="['px-3 py-2 cursor-pointer transition-all duration-300 relative text-lg font-medium no-underline text-center whitespace-nowrap lg:px-5 lg:py-[10px] md:px-[15px] md:py-2 hover:text-[#00d4ff]', isActive('/market-demand') ? 'text-[#00d4ff] after:content-[\'\'] after:absolute after:-bottom-[5px] after:left-0 after:right-0 after:h-0.5 after:bg-[#00d4ff]' : 'text-white']">Market Demand</router-link>
			<div class="w-px h-5 bg-white/30 flex-shrink-0"></div>
			<router-link to="/business-model" :class="['px-3 py-2 cursor-pointer transition-all duration-300 relative text-lg font-medium no-underline text-center whitespace-nowrap lg:px-5 lg:py-[10px] md:px-[15px] md:py-2 hover:text-[#00d4ff]', isActive('/business-model') ? 'text-[#00d4ff] after:content-[\'\'] after:absolute after:-bottom-[5px] after:left-0 after:right-0 after:h-0.5 after:bg-[#00d4ff]' : 'text-white']">Business Model</router-link>
			<div class="w-px h-5 bg-white/30 flex-shrink-0"></div>
			<router-link to="/team-composition" :class="['px-3 py-2 cursor-pointer transition-all duration-300 relative text-lg font-medium no-underline text-center whitespace-nowrap lg:px-5 lg:py-[10px] md:px-[15px] md:py-2 hover:text-[#00d4ff]', isActive('/team-composition') ? 'text-[#00d4ff] after:content-[\'\'] after:absolute after:-bottom-[5px] after:left-0 after:right-0 after:h-0.5 after:bg-[#00d4ff]' : 'text-white']">Team Composition</router-link>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 导航到首页
const goHome = () => {
	router.push('/')
}

// 判断导航项是否激活
const isActive = (path: string) => {
	return route.path === path
}
</script>

<style scoped>
.top-nav {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 10000;
}
</style>
