export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
    'postcss-pxtorem': {
      // 根元素字体大小
      rootValue: 10, // 基于 1920px 设计稿，1rem = 10px
      // 需要转换的属性
      propList: ['*'],
      // 保留的小数位数
      unitPrecision: 3,
      // 不需要转换的选择器
      selectorBlackList: [],
      // 最小转换值
      minPixelValue: 1,
      // 媒体查询中是否转换
      mediaQuery: false,
      // 排除的文件 - 排除组件和资源文件
      exclude: [
        /node_modules/,
        /src\/components/,
        /src\/assets/,
        /src\/router/,
        /src\/App\.vue$/
      ],
      // 包含所有需要适配的页面
      include: [
        /src\/views\/Home\.vue$/,
        /src\/views\/IndustryBackground\.vue$/,
        /src\/views\/MarketDemand\.vue$/,
        /src\/views\/BusinessModel\.vue$/,
        /src\/views\/TeamComposition\.vue$/,
        /src\/views\/ProductIntroduction\.vue$/
      ],
      // 替换而不是添加
      replace: true
    }
  },
}
