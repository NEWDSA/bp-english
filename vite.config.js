import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    tailwindcss(),
    // Gzip 压缩
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // 只压缩大于 1KB 的文件
      deleteOriginFile: false, // 保留原文件
      filter: /\.(js|mjs|json|css|html|svg|xml)$/i, // 只压缩这些类型的文件，排除视频和图片
      compressionOptions: {
        level: 9, // 最高压缩级别
      },
    }),
    // Brotli 压缩（更好的压缩率）
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html|svg|xml)$/i, // 只压缩这些类型的文件，排除视频和图片
      compressionOptions: {
        level: 11, // Brotli 最高压缩级别
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // 使用esbuild压缩 - 速度更快，兼容性更好
    minify: 'esbuild',
    // esbuild压缩选项
    esbuild: {
      drop: ['console', 'debugger'], // 移除console和debugger
      legalComments: 'none', // 移除所有注释
    },
    // 资源内联阈值 - 小图片内联，大图片压缩
    assetsInlineLimit: 2048, // 2KB以下内联为base64
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 增加 chunk 大小警告阈值（适应大型 3D 库和视频资源）
    chunkSizeWarningLimit: 2000,
    // 启用 sourcemap（生产环境可选，用于调试）
    sourcemap: false,
    // 压缩 CSS
    cssMinify: true, // 启用 CSS 压缩
    // 报告压缩后的大小
    reportCompressedSize: true,
    // 优化构建目标
    target: 'es2015', // 支持现代浏览器，减少代码体积
    rollupOptions: {
      output: {
        // 资源分块策略
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
            return `assets/videos/[name]-[hash][extname]`
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        // 代码分割 - 更细粒度的分割策略
        manualChunks: (id) => {
          // Vue 核心库
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) {
            return 'vue-vendor'
          }
          // Vue Router
          if (id.includes('node_modules/vue-router')) {
            return 'vue-router'
          }
          // Three.js 相关库（体积大，单独打包）
          if (id.includes('node_modules/three')) {
            return 'three'
          }
          // Globe.gl（依赖 Three.js，单独打包）
          if (id.includes('node_modules/globe.gl')) {
            return 'globe'
          }
          // ECharts（图表库，单独打包）
          if (id.includes('node_modules/echarts')) {
            return 'echarts'
          }
          // GSAP（动画库，单独打包）
          if (id.includes('node_modules/gsap')) {
            return 'gsap'
          }
          // 其他 node_modules
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        // 优化 chunk 文件名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  // 开发服务器配置
  server: {
    port: 5173,
    open: true,
    // 启用 HTTP/2
    http2: true,
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: [
      'vue', 
      'vue-router',
      'globe.gl', // 需要预构建以解决 frame-ticker 导出问题
      'three', // 需要预构建以解决模块兼容性问题
      'frame-ticker', // 显式包含 frame-ticker 以解决导出问题
    ],
    // 处理 globe.gl 的依赖问题
    esbuildOptions: {
      // 确保正确处理 CommonJS 模块
      mainFields: ['module', 'main'],
      // 处理 frame-ticker 的 CommonJS 导出
      format: 'esm',
    },
  },
})