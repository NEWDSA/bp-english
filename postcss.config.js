import pxToViewport from 'postcss-px-to-viewport'

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 1920, // 设计稿宽度，比如1920
      unitPrecision: 6,
      propList: ['*'], // 全部属性都转
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      minPixelValue: 1,
      mediaQuery: true,
      // 排除除了指定三个文件之外的所有文件
      // exclude: [
      //   /^(?!.*(?:ProductIntroduction|BusinessModel|TeamComposition)\.vue$).*$/,
      // ],

      selectorBlackList: [
        'h-\\[',
        'w-\\[',
        'left-\\[',
        'text-\\[',
        'mr-\\['
      ],
    },
  },
}
