module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    // 端口配置
    port: 8080,
    // 反向代理配置
    proxy: {
      '/api': {
        target: 'http://localhost',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
