import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from './router/index.js'
import { lazyLoad } from './directives/lazyLoad.js'

const app = createApp(App)

// 注册懒加载指令
app.directive('lazy-load', lazyLoad)

app.use(router).mount('#app')
