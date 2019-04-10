require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  webpack (config) {
    config.resolve.modules = [
      path.join(__dirname, 'src'),
      ...config.resolve.modules
    ]
    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
      })
    ]
    config.node = {
      ...config.node || {},
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
    return config
  }
}