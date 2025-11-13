/**
 * 懒加载指令
 * 支持图片、视频等资源的懒加载
 * 使用 Intersection Observer API 实现
 */
export const lazyLoad = {
  mounted(el, binding) {
    const src = binding.value

    if (!src) {
      console.warn('lazyLoad: 未提供资源路径')
      return
    }

    // 保存原始src
    el._lazyLoadSrc = src

    // 创建 Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 元素进入视口，开始加载资源
            loadResource(el, src)
            // 加载后停止观察
            observer.unobserve(el)
          }
        })
      },
      {
        // 提前200px开始加载（优化用户体验）
        rootMargin: '200px',
        threshold: 0.01,
      }
    )

    // 保存observer引用，用于卸载时清理
    el._lazyLoadObserver = observer

    // 开始观察元素
    observer.observe(el)
  },

  updated(el, binding) {
    // 如果src改变，重新设置
    if (el._lazyLoadSrc !== binding.value) {
      el._lazyLoadSrc = binding.value
      // 如果已经加载过，直接更新
      if (el.tagName === 'IMG' && el.src) {
        el.src = binding.value
      } else if (el.tagName === 'VIDEO' && el.src) {
        el.src = binding.value
      }
    }
  },

  unmounted(el) {
    // 清理observer
    if (el._lazyLoadObserver) {
      el._lazyLoadObserver.disconnect()
    }
    delete el._lazyLoadSrc
  },
}

/**
 * 加载资源
 */
function loadResource(el, src) {
  if (el.tagName === 'IMG') {
    const img = el
    // 先设置一个占位图或显示加载状态
    img.style.opacity = '0'
    img.style.transition = 'opacity 0.3s'

    // 创建新图片对象预加载
    const tempImg = new Image()
    tempImg.onload = () => {
      img.src = src
      img.style.opacity = '1'
    }
    tempImg.onerror = () => {
      console.error('图片加载失败:', src)
      img.style.opacity = '1'
      // 可以设置一个错误占位图
    }
    tempImg.src = src
  } else if (el.tagName === 'VIDEO') {
    const video = el
    // 对于视频，设置src属性（移除现有的 source 标签）
    const existingSource = video.querySelector('source')
    if (existingSource) {
      existingSource.remove()
    }
    video.src = src
    // 如果需要自动播放，确保已设置相关属性
    if (video.hasAttribute('autoplay')) {
      video.load()
    }
  } else if (el.tagName === 'IFRAME') {
    el.src = src
  } else {
    // 其他元素，设置background-image或其他属性
    el.style.backgroundImage = `url(${src})`
  }
}

