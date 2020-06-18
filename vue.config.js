/* eslint no-param-reassign:
    ["error", { "props": true, "ignorePropertyModificationsFor": ["options"] }] */
module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.module.rule('eslint').use('eslint-loader')
      .tap((options) => {
        options.fix = true // auto-fix 옵션
        return options
      })
  },
  pwa: {
    iconPaths: {
      favicon32: './favicon.png',
      favicon16: './favicon.png',
      appleTouchIcon: './favicon.png',
      maskIcon: './favicon.png',
      msTileImage: './favicon.png',
    },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
}
