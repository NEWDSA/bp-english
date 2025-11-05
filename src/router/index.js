import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')
const IndustryBackground = () => import('../views/IndustryBackground.vue')
const MarketDemand = () => import('../views/MarketDemand.vue')
const BusinessModel = () => import('../views/BusinessModel.vue')
const TeamComposition = () => import('../views/TeamComposition.vue')
const ProductIntroduction = () => import('../views/ProductIntroduction.vue')

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'home', component: Home },
		{ path: '/product-introduction', name: 'product-introduction', component: ProductIntroduction },
		{ path: '/industry-background', name: 'industry-background', component: IndustryBackground },
		{ path: '/market-demand', name: 'market-demand', component: MarketDemand },
		{ path: '/business-model', name: 'business-model', component: BusinessModel },
		{ path: '/team-composition', name: 'team-composition', component: TeamComposition }
	]
})

export default router

