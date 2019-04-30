require('dotenv').config()

const Dotenv = require('dotenv-webpack')
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')
const path = require('path')

module.exports = withCss(withSass({
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
<<<<<<< HEAD
        path: path.join(__dirname, '.env')
=======
        path: path.join(__dirname, '.env'),
>>>>>>> 80909166da4bdd03354f55ec820109b324b91290
        // systemvars: true
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
}))