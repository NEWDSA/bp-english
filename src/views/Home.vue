<template>
	<!-- 根据 MasterGo 封面设计还原（FRAME 名称：封面） -->
	<section class="cover">
		<!-- 视频背景 -->
		<video
			class="cover-video"
			autoplay
			muted
			loop
			playsinline
		>
			<source :src="homeVideo" type="video/mp4">
		</video>
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
import homeVideo from '../assets/home.mp4'
import yihaiLogo from '../assets/yihai.svg'

const router = useRouter()

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
	overflow: hidden;
}

/* 视频背景样式 */
.cover-video {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	min-width: 100%;
	min-height: 100%;
	width: 100%;
	height: 100%;
	object-fit: cover;
	z-index: 1;
}

/* 左上 catalogue 块：标题与展开后的子项同属一个容器 */
.catalogue-wrap {
	position: absolute;
	top: 56px;
	left: 133px;
	color: #DCDCDC;
	z-index: 20;
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
	padding: 8px 16px;
	border-radius: 8px;
	font-weight: bold;
	text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
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

.catalogue-head:hover {
	background: rgba(255,255,255,0.1);
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(255,255,255,0.2);
}

/* 当catalogue展开时，移除悬停效果 */
.catalogue-wrap.is-open .catalogue-head:hover::after {
	width: 0;
}
.catalogue-wrap.is-open {
	background: rgba(255,255,255,0.15);
	backdrop-filter: blur(10px);
	border-radius: 16px;
	padding: 16px 16px 12px;
	border: 1px solid rgba(255,255,255,0.2);
	box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

/* 右上白色圆形按钮（34px 圆 + 42px 包裹） */
.corner-btn {
	position: absolute;
	top: 56px;
	right: 178px;
	width: 58px;
	height: 58px;
	border: none;
	background: none;
	padding: 0;
	cursor: pointer;
	outline: none;
	transition: all 0.3s ease;
	z-index: 20;
}

.corner-btn:focus {
	outline: none;
}

.corner-btn:focus-visible {
	outline: none;
}

.corner-btn:hover {
	transform: scale(1.1);
}

.corner-btn:active {
	transform: scale(0.95);
}

.corner-btn::before {
	content: '';
	position: absolute;
	top: 4px;
	left: 4px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: #FFFFFF;
	transition: all 0.3s ease;
	box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.corner-btn:hover::before {
	box-shadow: 0 4px 16px rgba(255,255,255,0.3);
}

.corner-btn__icon {
	position: relative;
	width: 58px;
	height: 58px;
	display: block;
	object-fit: contain;
	transition: transform 0.3s ease;
}

.corner-btn:hover .corner-btn__icon {
	transform: rotate(10deg);
}

/* Catalogue panel 列表区域（容器背景由 .catalogue-wrap.is-open 提供） */
.catalogue-panel { margin-top: 12px; width: 240px; }
.catalogue-list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 12px;
	animation: slideDown 0.3s ease-out;
}
.catalogue-item {
	color: #DCDCDC;
	font-size: 11px;
	line-height: 1.2;
	padding: 10px 12px;
	border-bottom: 1px solid rgba(220,220,220,0.35);
	white-space: nowrap;
	cursor: pointer;
	transition: all 0.3s ease;
	border-radius: 8px;
	position: relative;
	overflow: hidden;
	font-weight: bold;
	text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
}
.catalogue-item:hover {
	color: #ffffff;
	background: rgba(255,255,255,0.1);
	transform: translateX(5px);
}
.catalogue-item::before {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: 3px;
	background: linear-gradient(135deg, #646cff, #535bf2);
	transform: scaleY(0);
	transition: transform 0.3s ease;
}
.catalogue-item:hover::before {
	transform: scaleY(1);
}
.catalogue-item:last-child { border-bottom: none; padding-bottom: 0; }

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
	transform: scale(1.3);
	font-weight: bold;
	text-shadow: 2px 2px 6px rgba(0,0,0,0.9);
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

	/* 移动端导航优化 */
	.catalogue-wrap {
		top: 20px;
		left: 20px;
	}

	.catalogue-head {
		font-size: 16px;
		padding: 6px 12px;
	}

	.corner-btn {
		top: 20px;
		right: 20px;
		width: 36px;
		height: 36px;
	}

	.corner-btn::before {
		top: 3px;
		left: 3px;
		width: 30px;
		height: 30px;
	}

	.corner-btn__icon {
		width: 36px;
		height: 36px;
	}

	.catalogue-list {
		gap: 8px;
	}

	.catalogue-item {
		font-size: 10px;
		padding: 8px 10px;
	}
}

@media (max-width: 480px) {
	.catalogue-wrap {
		top: 15px;
		left: 15px;
	}

	.corner-btn {
		top: 15px;
		right: 15px;
	}

	.catalogue-head {
		font-size: 14px;
	}
}
</style>

