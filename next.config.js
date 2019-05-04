require('dotenv').config()

const Dotenv = require('dotenv-webpack')
const withSass = require('@zeit/next-sass')
const withOffline = require('next-offline')
const withCss = require('@zeit/next-css')
const path = require('path')

module.exports = withOffline(withCss(withSass({
  target: 'serverless',
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
        systemvars: true
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
})))