import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')
const IndustryBackground = () => import('../views/IndustryBackground.vue')

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'home', component: Home },
		{ path: '/industry-background', name: 'industry-background', component: IndustryBackground }
	]
})

export default router

