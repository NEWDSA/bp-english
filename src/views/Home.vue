<template>
	<!-- 根据 MasterGo 封面设计还原（FRAME 名称：封面） -->
	<section class="relative min-h-screen flex items-center justify-center bg-[#3B4756] overflow-hidden">
		<!-- 视频背景 -->
		<video
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-full h-full object-cover z-[1]"
			autoplay
			muted
			loop
			playsinline
		>
			<source :src="homeVideo" type="video/mp4">
		</video>
		<!-- 视频背景黑色遮罩 -->
		<div class="absolute top-0 left-0 w-full h-full bg-black/10 z-[2] pointer-events-none"></div>
		
		<!-- 背景音乐 -->
		<audio
			ref="audioRef"
			:src="bgMusic"
			loop
			preload="auto"
			:volume="0.5"
		></audio>
		
		<!-- 音乐控制按钮 -->
		<p
			class="absolute bottom-[30px] right-[30px] w-[26px] h-[26px] rounded-full bg-white/50 border-2 border-white/30 cursor-pointer transition-all duration-300 z-20 flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:scale-110 hover:bg-white/50 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] active:scale-95 md:bottom-5 md:right-5 md:w-10 md:h-10"
			@click="toggleMusic"
			:class="{ 'animate-pulse': isPlaying }"
			:aria-label="isPlaying ? 'Pause Music' : 'Play Music'"
		>
			<span class="text-xs leading-none md:text-base">{{ isPlaying ? '🔊' : '🔇' }}</span>
		</p>
		
		<!-- 左上：CATALOGUE 块（标题与子项为一个整体） -->
		<div 
			class="absolute top-[8%] left-[8%] text-[#DCDCDC] z-20"
			:class="{ 
				'bg-white/15 backdrop-blur-[10px] rounded-2xl p-6 pb-3 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]': showCatalogue 
			}"
		>
			<div 
				class="text-[#DCDCDC] text-[28px] tracking-[0.08em] uppercase bg-transparent border-none cursor-pointer relative transition-all duration-300 py-2 px-4 rounded-lg font-bold drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,255,255,0.2)] md:py-1.5 md:px-3"
				:class="{ 'after:w-0': showCatalogue }"
				@click="toggleCatalogue" 
				:aria-expanded="showCatalogue ? 'true' : 'false'"
			>
				CATALOGUE
			</div>
			<transition name="slide-down">
				<ul v-if="showCatalogue" class="list-none m-0 p-0 flex flex-col gap-3 mt-3 md:gap-2" role="list">
					<li
						class="text-[#DCDCDC] text-[18px] leading-[36px] py-2.5 px-3 border-b border-[#DCDCDC]/35 whitespace-nowrap cursor-pointer transition-all duration-300 rounded-lg relative overflow-hidden font-bold drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)] hover:text-white hover:bg-white/10 hover:translate-x-1 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#646cff] before:to-[#535bf2] before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 last:border-b-0 last:pb-2.5 md:py-2 md:px-2.5" 
						@click="navigateToProduct"
					>
						Product Introduction
					</li>
					<li
						class="text-[#DCDCDC] text-[18px] leading-[36px] py-2.5 px-3 border-b border-[#DCDCDC]/35 whitespace-nowrap cursor-pointer transition-all duration-300 rounded-lg relative overflow-hidden font-bold drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)] hover:text-white hover:bg-white/10 hover:translate-x-1 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#646cff] before:to-[#535bf2] before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 last:border-b-0 last:pb-2.5 md:py-2 md:px-2.5" 
						@click="navigateToIndustry"
					>
						Industry Background
					</li>
					<li
						class="text-[#DCDCDC] text-[18px] leading-[36px] py-2.5 px-3 border-b border-[#DCDCDC]/35 whitespace-nowrap cursor-pointer transition-all duration-300 rounded-lg relative overflow-hidden font-bold drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)] hover:text-white hover:bg-white/10 hover:translate-x-1 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#646cff] before:to-[#535bf2] before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 last:border-b-0 last:pb-2.5 md:py-2 md:px-2.5" 
						@click="navigateToMarket"
					>
						Market Demand
					</li>
					<li
						class="text-[#DCDCDC] text-[18px] leading-[36px] py-2.5 px-3 border-b border-[#DCDCDC]/35 whitespace-nowrap cursor-pointer transition-all duration-300 rounded-lg relative overflow-hidden font-bold drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)] hover:text-white hover:bg-white/10 hover:translate-x-1 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#646cff] before:to-[#535bf2] before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 last:border-b-0 last:pb-2.5 md:py-2 md:px-2.5" 
						@click="navigateToBusiness"
					>
						Business Model
					</li>
					<li
						class="text-[#DCDCDC] text-[18px] leading-[36px] py-2.5 px-3 border-b border-[#DCDCDC]/35 whitespace-nowrap cursor-pointer transition-all duration-300 rounded-lg relative overflow-hidden font-bold drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)] hover:text-white hover:bg-white/10 hover:translate-x-1 before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#646cff] before:to-[#535bf2] before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 last:border-b-0 last:pb-2.5 md:py-2 md:px-2.5" 
						@click="navigateToTeam"
					>
						Team Composition
					</li>
				</ul>
			</transition>
		</div>

		<!-- 右上：圆形按钮（白底），覆盖一张图作为图标 -->
		<div 
			class="absolute top-[6%] right-[10%] w-[70px] h-[70px] bg-white border-none bg-transparent p-0 cursor-pointer outline-none transition-all duration-300 z-20 hover:scale-110 active:scale-95 focus:outline-none focus-visible:outline-none !rounded-full overflow-hidden" 
			style="border-radius: 100% !important;"
			aria-label="version" 
			@click="toggleCompanyInfo"
		>
			<img 
				class="absolute top-0 left-0 w-full h-full object-cover rounded-full transition-transform duration-300 hover:rotate-[10deg] z-10" 
				alt="version" 
				:src="yihaiLogo" 
			/>
		</div>

		<!-- 中心区域：公司信息内容 -->
		<transition name="fade">
			<div
				v-if="showCompanyInfo"
				class="fixed top-0 left-0 w-screen h-screen z-10 bg-black/50 flex items-center justify-center p-4 md:p-6 lg:p-8"
				@click="hideCompanyInfo"
			>
				<div class="bg-white/[0.01] backdrop-blur-[10px] rounded-[15px] [@media(min-width:1920px)]:p-20 p-10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] text-white text-center font-bold drop-shadow-[2px_2px_6px_rgba(0,0,0,0.9)]">
					<div class="mb-6 sm:mb-8 md:mb-10 lg:mb-12 [@media(min-width:1920px)]:mb-[50px] last:mb-0">
						<p class="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] [@media(min-width:1920px)]:text-[30px] font-semibold text-white mb-2 sm:mb-3 md:mb-4 [@media(min-width:1920px)]:mb-[15px] uppercase tracking-[0.3px] sm:tracking-[0.4px] [@media(min-width:1920px)]:tracking-[0.5px]">Company Mission:</p>
						<p class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] [@media(min-width:1920px)]:text-[24px] leading-relaxed text-white mb-2 sm:mb-3 [@media(min-width:1920px)]:mb-4 last:mb-0">Leading the innovation of water transportation</p>
						<p class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] [@media(min-width:1920px)]:text-[24px] leading-relaxed text-white mb-2 sm:mb-3 [@media(min-width:1920px)]:mb-4 last:mb-0">Build a globally leading marine technology brand</p>
					</div>

					<div class="mb-6 sm:mb-8 md:mb-10 lg:mb-12 [@media(min-width:1920px)]:mb-[50px] last:mb-0">
						<p class="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] [@media(min-width:1920px)]:text-[30px] font-semibold text-white mb-2 sm:mb-3 md:mb-4 [@media(min-width:1920px)]:mb-[15px] uppercase tracking-[0.3px] sm:tracking-[0.4px] [@media(min-width:1920px)]:tracking-[0.5px]">Company Vision:</p>
						<p class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] [@media(min-width:1920px)]:text-[24px] leading-relaxed text-white mb-2 sm:mb-3 [@media(min-width:1920px)]:mb-4 last:mb-0">The most rock-solid water operation platform</p>
						<p class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] [@media(min-width:1920px)]:text-[24px] leading-relaxed text-white mb-2 sm:mb-3 [@media(min-width:1920px)]:mb-4 last:mb-0">Become the definer of the most energy-efficient and high-performance water economy</p>
						<p class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] [@media(min-width:1920px)]:text-[24px] leading-relaxed text-white mb-2 sm:mb-3 [@media(min-width:1920px)]:mb-4 last:mb-0">Deliver the most superior watercraft in terms of performance</p>
					</div>

					<div class="mb-6 sm:mb-8 md:mb-10 lg:mb-12 [@media(min-width:1920px)]:mb-[50px] last:mb-0">
						<p class="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] [@media(min-width:1920px)]:text-[30px] font-semibold text-white mb-2 sm:mb-3 md:mb-4 [@media(min-width:1920px)]:mb-[15px] uppercase tracking-[0.3px] sm:tracking-[0.4px] [@media(min-width:1920px)]:tracking-[0.5px]">Core Values:</p>
						<p class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] [@media(min-width:1920px)]:text-[24px] leading-relaxed text-white mb-2 sm:mb-3 [@media(min-width:1920px)]:mb-4 last:mb-0">Cooperation, innovation, and foresight</p>
					</div>

					<div class="mb-6 sm:mb-8 md:mb-10 lg:mb-12 [@media(min-width:1920px)]:mb-[50px] last:mb-0">
						<p class="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] [@media(min-width:1920px)]:text-[30px] font-semibold text-white mb-2 sm:mb-3 md:mb-4 [@media(min-width:1920px)]:mb-[15px] uppercase tracking-[0.3px] sm:tracking-[0.4px] [@media(min-width:1920px)]:tracking-[0.5px]">Management Philosophy:</p>
						<p class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] [@media(min-width:1920px)]:text-[24px] leading-relaxed text-white mb-2 sm:mb-3 [@media(min-width:1920px)]:mb-4 last:mb-0">People-oriented, customer-first</p>
						<p class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] [@media(min-width:1920px)]:text-[24px] leading-relaxed text-white mb-2 sm:mb-3 [@media(min-width:1920px)]:mb-4 last:mb-0">Progressing hand in hand for mutual benefit and win-win cooperation</p>
					</div>
				</div>
			</div>
		</transition>
	</section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import homeVideo from '../assets/home_compressed.mp4'
import yihaiLogo from '../assets/logoh20.png'
import bgMusic from '../assets/video/music.mp3'

const router = useRouter()
const route = useRoute()

const showCatalogue = ref(false)
const showCompanyInfo = ref(false)
const audioRef = ref(null)
const isPlaying = ref(false)

// 页面相关状态

function onKeydown(e) {
	if (e.key === 'Escape') {
		showCatalogue.value = false
		showCompanyInfo.value = false
	}
}

function toggleCatalogue() {
	showCatalogue.value = !showCatalogue.value
	// 如果展开catalogue，关闭公司信息
	if (showCatalogue.value) {
		showCompanyInfo.value = false
	}
}

function toggleCompanyInfo() {
	showCompanyInfo.value = !showCompanyInfo.value
	// 如果显示公司信息，关闭catalogue
	if (showCompanyInfo.value) {
		showCatalogue.value = false
	}
}

function hideCompanyInfo() {
	showCompanyInfo.value = false
}

function stopMusic() {
	if (audioRef.value) {
		audioRef.value.pause()
		audioRef.value.currentTime = 0
		isPlaying.value = false
	}
}

function toggleMusic() {
	if (audioRef.value) {
		if (audioRef.value.paused) {
			audioRef.value.volume = 0.5
			audioRef.value.play().then(() => {
				isPlaying.value = true
				console.log('音乐开始播放')
			}).catch(error => {
				console.log('播放失败:', error)
			})
		} else {
			audioRef.value.pause()
			isPlaying.value = false
		}
	}
}

function navigateToIndustry() {
	showCatalogue.value = false
	stopMusic()
	router.push('/industry-background')
}

function navigateToMarket() {
	showCatalogue.value = false
	stopMusic()
	router.push('/market-demand')
}

function navigateToBusiness() {
	showCatalogue.value = false
	stopMusic()
	router.push('/business-model')
}

function navigateToTeam() {
	showCatalogue.value = false
	stopMusic()
	router.push('/team-composition')
}

function navigateToProduct() {
	showCatalogue.value = false
	stopMusic()
	router.push('/product-introduction')
}

onMounted(() => {
	document.addEventListener('keydown', onKeydown)

	// 尝试播放音乐
	const tryPlayMusic = () => {
		if (audioRef.value) {
			audioRef.value.volume = 0.5
			audioRef.value.play().then(() => {
				isPlaying.value = true
				console.log('音乐播放成功')
			}).catch(() => {
				// 静默处理自动播放失败，用户可以手动点击播放按钮
				isPlaying.value = false
			})
		}
	}

	// 立即尝试播放
	tryPlayMusic()

	// 监听页面可见性变化
	document.addEventListener('visibilitychange', () => {
		if (!document.hidden && audioRef.value && audioRef.value.paused) {
			tryPlayMusic()
		}
	})
})

// 监听路由变化
watch(() => route.path, (newPath) => {
	// 如果不是首页，停止音乐
	if (newPath !== '/' && audioRef.value) {
		stopMusic()
	}
	// 如果回到首页，尝试播放音乐
	else if (newPath === '/' && audioRef.value) {
		tryPlayMusic()
	}
})

onBeforeUnmount(() => {
	document.removeEventListener('keydown', onKeydown)
	// 清理音频
	if (audioRef.value) {
		audioRef.value.pause()
		audioRef.value.currentTime = 0
		isPlaying.value = false
	}
})
</script>

<style scoped>
/* fade transition */
.fade-enter-active, .fade-leave-active { 
	transition: opacity .01s ease; 
}
.fade-enter-from, .fade-leave-to { 
	opacity: 0; 
}

/* slide-down transition */
.slide-down-enter-active {
	animation: slideDown 0.3s ease-out;
}
.slide-down-leave-active {
	animation: slideDown 0.3s ease-out reverse;
}

@keyframes slideDown {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>

