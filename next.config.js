const path = require('path')

require('dotenv')
  .config(path.resolve(__dirname, '.env'))

const Dotenv = require('dotenv-webpack')
const withSass = require('@zeit/next-sass')
const withOffline = require('next-offline')
const withCss = require('@zeit/next-css')

module.exports = withOffline(withCss(withSass({
  // target: 'serverless',
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
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