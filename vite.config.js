import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss(),],
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
    },
    // 资源内联阈值 - 小图片内联，大图片压缩
    assetsInlineLimit: 2048, // 2KB以下内联为base64
    rollupOptions: {
      output: {
        // 资源分块策略
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        // 代码分割
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          echarts: ['echarts'],
        },
      },
    },
  },
  // 开发服务器配置
  server: {
    port: 5173,
    open: true,
  },
})