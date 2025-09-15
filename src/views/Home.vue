<template>
	<!-- 根据 MasterGo 封面设计还原（FRAME 名称：封面） -->
	<section class="cover" :style="coverStyle">
		<!-- 左上：CATALOGUE 块（标题与子项为一个整体） -->
		<div class="catalogue-wrap" :class="{ 'is-open': showCatalogue }">
			<button class="catalogue-head" type="button" @click="toggleCatalogue" :aria-expanded="showCatalogue ? 'true' : 'false'">CATALOGUE</button>
			<ul v-if="showCatalogue" class="catalogue-list" role="list">
				<li class="catalogue-item">Industry Background</li>
				<li class="catalogue-item">Market Demand</li>
				<li class="catalogue-item">Business Model</li>
				<li class="catalogue-item">Team Composition</li>
				<li class="catalogue-item">Product Introduction</li>
			</ul>
		</div>

		<!-- 右上：圆形按钮（白底），覆盖一张图作为图标 -->
		<button class="corner-btn" aria-label="version">
			<img class="corner-btn__icon" alt="version" :src="yihaiLogo" />
		</button>



		<!-- 中心区域留空（按要求：首页中间不显示文字） -->
	</section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import coverBg from '../assets/微信图片_20250912104117_7221_12.png'
import yihaiLogo from '../assets/yihai.svg'

const coverStyle = {
	backgroundImage: `url(${coverBg})`
}

const showCatalogue = ref(false)

function onKeydown(e) {
	if (e.key === 'Escape') showCatalogue.value = false
}

function toggleCatalogue() {
	showCatalogue.value = !showCatalogue.value
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
.catalogue-item { color: #DCDCDC; font-size: 11px; line-height: 1.2; padding-bottom: 8px; border-bottom: 1px solid rgba(220,220,220,0.35); white-space: nowrap; }
.catalogue-item:last-child { border-bottom: none; padding-bottom: 0; }

/* fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* 中心标题占位 */
/* 中心无文字，因此去除相关样式 */
</style>

