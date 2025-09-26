// 全局 lib-flexible 适配工具
// 确保整个应用只初始化一次，避免页面切换时的字体闪烁

// 设计稿尺寸
const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

// 全局状态管理
let isInitialized = false
let resizeHandler = null
let originalFontSize = ''

// 保存原始根字体大小 wheel1.png
function saveOriginalFontSize() {
  if (!originalFontSize) {
    originalFontSize = document.documentElement.style.fontSize || '16px'
  }
}

// 设置根字体大小
function setRootFontSize() {
  const screenWidth = window.innerWidth
  const fontSize = (screenWidth / DESIGN_WIDTH) * 10
  document.documentElement.style.fontSize = fontSize + 'px'
  
  console.log('Global flexible - Root font size set to:', fontSize + 'px')
}

// 全局 resize 处理函数
function handleGlobalResize() {
  let timer = null
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      setRootFontSize()
    }, 100)
  }
}

// 初始化全局适配（只初始化一次）
export function initGlobalFlexible() {
  if (isInitialized) {
    console.log('Global flexible already initialized, skipping...')
    return
  }
  
  saveOriginalFontSize()
  setRootFontSize()
  
  // 添加全局 resize 监听器
  resizeHandler = handleGlobalResize()
  window.addEventListener('resize', resizeHandler)
  
  isInitialized = true
  console.log('Global flexible adaptation initialized')
}

// 销毁全局适配
export function destroyGlobalFlexible() {
  if (!isInitialized) {
    return
  }
  
  // 移除 resize 监听器
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  
  // 恢复原始字体大小
  if (originalFontSize) {
    document.documentElement.style.fontSize = originalFontSize
  } else {
    document.documentElement.style.fontSize = '16px'
  }
  
  isInitialized = false
  console.log('Global flexible adaptation destroyed')
}

// 兼容性函数 - 保持向后兼容
export function initPageFlexible() {
  initGlobalFlexible()
  return () => {} // 返回空的清理函数，因为全局管理不需要页面级清理
}

export function destroyPageFlexible() {
  // 页面级销毁时不执行任何操作，由全局管理器统一处理
  console.log('Page-level destroy called, but global flexible is managed centrally')
}

// px 转 rem 工具函数
export function px2rem(px) {
  const screenWidth = window.innerWidth
  const fontSize = (screenWidth / DESIGN_WIDTH) * 10
  return (px / fontSize).toFixed(3)
}

// 获取当前缩放比例
export function getScale() {
  const screenWidth = window.innerWidth
  return screenWidth / DESIGN_WIDTH
}
