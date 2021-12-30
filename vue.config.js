module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    // 端口配置
    port: 80,
    // 反向代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
