const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '/'
  },
  dev: {
    env: require('./dev.env'),
    port: {
      'http': 9180,
      'https': 9143
    },
    autoOpenBrowser: true,
    proxyTable: {
      "/v1": {
        target: "http://qi.testfreelog.com",
        secure: false, 
        changeOrigin: true,
      }
    },
  }
}
