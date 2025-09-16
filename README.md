# BP English - Vue 3 项目

这是一个基于 Vue 3 + Vite 的现代化前端项目，实现了精美的首页设计和交互效果。

## 项目功能

### 首页设计
- **背景图片**: 使用自定义背景图片，营造专业的视觉效果
- **CATALOGUE 按钮**: 左上角的目录按钮，支持点击展开/收起功能
- **悬停效果**: CATALOGUE 按钮支持鼠标悬停时显示下横线动画效果
- **圆形图标按钮**: 右上角的白色圆形按钮，点击显示公司信息
- **公司信息展示**: 点击右侧图标在页面中心显示公司使命、愿景、核心价值观和管理理念
- **页面导航**: CATALOGUE菜单支持跳转到各个子页面

### 子页面功能
- **Industry Background** (`/industry-background`): 行业背景页面，包含收入模型图表、渠道策略和地图展示
- **Market Demand** (`/market-demand`): 市场需求页面，包含市场分析、趋势图表和全球市场分布
- **Business Model** (`/business-model`): 商业模式页面，展示收入模型和渠道策略的详细分析
- **Team Composition** (`/team-composition`): 团队构成页面，展示团队结构、核心能力和经验水平
- **Product Introduction** (`/product-introduction`): 产品介绍页面，包含产品特性、技术规格和3D展示
- **独立路由**: 每个页面都是独立的Vue组件，通过Vue Router进行路由管理
- **统一导航栏**: 每个页面都有统一的顶部导航栏，支持页面间跳转和返回首页
- **数据可视化**: 动态柱状图、趋势图表、进度条等多种数据展示方式
- **交互式地图**: 3D发光效果的地图展示，支持标记点动画

### 技术特性
- 使用 Vue 3 Composition API 和 `<script setup>` 语法
- 响应式设计，适配不同屏幕尺寸
- 平滑的 CSS 过渡动画效果
- 键盘交互支持（ESC 键关闭目录）

## 开发说明

### 项目结构
```
src/
├── views/
│   └── Home.vue          # 首页组件
├── components/           # 可复用组件
├── assets/              # 静态资源
└── router/              # 路由配置
```

### 样式特点
- 使用 CSS 伪元素实现悬停下划线效果
- 支持毛玻璃背景效果（backdrop-filter）
- 平滑的过渡动画（transition）
- 公司信息弹窗采用现代化卡片设计
- 响应式布局，适配移动端和桌面端

## 运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 技术栈
- Vue 3
- Vite
- CSS3 动画
- 响应式设计
