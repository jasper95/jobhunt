require('dotenv').config()

const withSass = require('@zeit/next-sass')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = withSass({
  webpack (config) {
    if (config.resolve.alias) {
      delete config.resolve.alias['react']
      delete config.resolve.alias['react-dom']
    }
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
})