<template>
	<!-- 根据 MasterGo 封面设计还原（FRAME 名称：封面） -->
	<section class="cover" :style="coverStyle">
		<!-- 左上：CATALOGUE 块（标题与子项为一个整体） -->
		<div class="catalogue-wrap" :class="{ 'is-open': showCatalogue }">
			<!-- <button class="catalogue-head" type="button" @click="toggleCatalogue" :aria-expanded="showCatalogue ? 'true' : 'false'">CATALOGUE</button> -->
			<div class="catalogue-head" @click="toggleCatalogue" :aria-expanded="showCatalogue ? 'true' : 'false'">CATALOGUE</div>
			<ul v-if="showCatalogue" class="catalogue-list" role="list">
				<li class="catalogue-item" @click="navigateToIndustry">Industry Background</li>
				<li class="catalogue-item" @click="navigateToMarket">Market Demand</li>
				<li class="catalogue-item" @click="navigateToBusiness">Business Model</li>
				<li class="catalogue-item" @click="navigateToTeam">Team Composition</li>
				<li class="catalogue-item" @click="navigateToProduct">Product Introduction</li>
			</ul>
		</div>

		<!-- 右上：圆形按钮（白底），覆盖一张图作为图标 -->
		<button class="corner-btn" aria-label="version" @click="toggleCompanyInfo">
			<img class="corner-btn__icon" alt="version" :src="yihaiLogo" />
		</button>

		<!-- 中心区域：公司信息内容 -->
		<transition name="fade">
			<div v-if="showCompanyInfo" class="company-info">
				<div class="company-info__content">
					<div class="company-info__section">
						<!-- <h3 class="company-info__title">Company Mission</h3> -->
						 <p class="company-info__title">Company Mission:</p>
						<p class="company-info__text">Leading the innovation of water transportation</p>
						<p class="company-info__text">Build a globally leading marine technology brand</p>
					</div>
					
					<div class="company-info__section">
						<!-- <h3 class="company-info__title">Company Vision:</h3> -->
						<p class="company-info__title">Company Vision:</p>
						<p class="company-info__text">The most rock-solid water operation platform</p>
						<p class="company-info__text">Become the definer of the most energy-efficient and high-performance water economy</p>
						<p class="company-info__text">Deliver the most superior watercraft in terms of performance</p>
					</div>
					
					<div class="company-info__section">
						<!-- <h3 class="company-info__title">Core Values</h3> -->
						<p class="company-info__title">Core Values:</p>
						<p class="company-info__text">Cooperation, innovation, and foresight</p>
					</div>
					
					<div class="company-info__section">
						<!-- <h3 class="company-info__title">Management Philosophy</h3> -->
						<p class="company-info__title">Management Philosophy:</p>
						<p class="company-info__text">People-oriented, customer-first</p>
						<p class="company-info__text">Progressing hand in hand for mutual benefit and win-win cooperation</p>
					</div>
				</div>
			</div>
		</transition>
	</section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import coverBg from '../assets/微信图片_20250912104117_7221_12.png'
import yihaiLogo from '../assets/yihai.svg'

const router = useRouter()

const coverStyle = {
	backgroundImage: `url(${coverBg})`
}

const showCatalogue = ref(false)
const showCompanyInfo = ref(false)

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

function navigateToIndustry() {
	showCatalogue.value = false
	router.push('/industry-background')
}

function navigateToMarket() {
	showCatalogue.value = false
	router.push('/market-demand')
}

function navigateToBusiness() {
	showCatalogue.value = false
	router.push('/business-model')
}

function navigateToTeam() {
	showCatalogue.value = false
	router.push('/team-composition')
}

function navigateToProduct() {
	showCatalogue.value = false
	router.push('/product-introduction')
}

onMounted(() => { document.addEventListener('keydown', onKeydown) })
onBeforeUnmount(() => { document.removeEventListener('keydown', onKeydown) })
</script>

<style scoped>
/* 封面尺寸与基底（FRAME: 1920x1080，背景色 paint_0:2635/#3B4756） */
.cover {
	position: relative;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #3B4756;
	/* 叠加背景图（paint_0:2637），设计中有约 0.62 透明度 */
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}

/* 左上 catalogue 块：标题与展开后的子项同属一个容器 */
.catalogue-wrap {
	position: absolute;
	top: 56px;
	left: 133px;
	color: #DCDCDC;
}
.catalogue-head {
	color: #DCDCDC;
	font-size: 20px;
	letter-spacing: .08em;
	text-transform: uppercase;
	background: none;
	border: none;
	cursor: pointer;
	position: relative;
	transition: all 0.3s ease;
}

.catalogue-head::after {
	content: '';
	position: absolute;
	bottom: -4px;
	left: 0;
	width: 0;
	height: 2px;
	background-color: #DCDCDC;
	transition: width 0.3s ease;
}

.catalogue-head:hover::after {
	width: 100%;
}

/* 当catalogue展开时，移除悬停效果 */
.catalogue-wrap.is-open .catalogue-head:hover::after {
	width: 0;
}
.catalogue-wrap.is-open {
	background: rgba(255,255,255,0.2);
	backdrop-filter: blur(2px);
	border-radius: 13px;
	padding: 16px 16px 12px;
}

/* 右上白色圆形按钮（34px 圆 + 42px 包裹） */
.corner-btn {
	position: absolute;
	top: 56px;
	right: 178px; /* 1920- (1742+42) 近似到右距 */
	width: 42px;
	height: 42px;
	border: none;
	background: none;
	padding: 0;
	cursor: pointer;
	outline: none;
}

.corner-btn:focus {
	outline: none;
}

.corner-btn:focus-visible {
	outline: none;
}
.corner-btn::before {
	content: '';
	position: absolute;
	top: 4px;
	left: 4px;
	width: 34px;
	height: 34px;
	border-radius: 50%;
	background: #FFFFFF; /* paint_0:2639 */
}
.corner-btn__icon {
	position: relative;
	width: 42px;
	height: 42px;
	display: block;
	object-fit: contain;
}

/* Catalogue panel 列表区域（容器背景由 .catalogue-wrap.is-open 提供） */
.catalogue-panel { margin-top: 12px; width: 240px; }
.catalogue-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.catalogue-item { 
	color: #DCDCDC; 
	font-size: 11px; 
	line-height: 1.2; 
	padding-bottom: 8px; 
	border-bottom: 1px solid rgba(220,220,220,0.35); 
	white-space: nowrap; 
	cursor: pointer;
	transition: color 0.3s ease;
}
.catalogue-item:hover {
	color: #ffffff;
}
.catalogue-item:last-child { border-bottom: none; padding-bottom: 0; }

/* fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* 公司信息内容样式 */
.company-info {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
	max-width: 800px;
	width: 90%;
}

.company-info__content {
	/* background: rgba(255, 255, 255, 0.95); */
	/* backdrop-filter: blur(10px); */
	/* border-radius: 20px; */
	padding: 40px;
	/* box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); */
	color: #FFFFFF;
	text-align: center;
}

.company-info__section {
	margin-bottom: 30px;
}

.company-info__section:last-child {
	margin-bottom: 0;
}

.company-info__title {
	font-size: 18px;
	font-weight: 600;
	color: #FFFFFF;
	margin-bottom: 15px;
	text-transform: uppercase;
	letter-spacing: 0.5px;
}

.company-info__text {
	font-size: 14px;
	line-height: 1.6;
	color: #FFFFFF;
	margin-bottom: 8px;
}

.company-info__text:last-child {
	margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
	.company-info {
		width: 95%;
		padding: 20px;
	}
	
	.company-info__content {
		padding: 30px 20px;
	}
	
	.company-info__title {
		font-size: 16px;
	}
	
	.company-info__text {
		font-size: 13px;
	}
}
</style>

