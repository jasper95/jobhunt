const path = require('path')

module.exports = {
  webpack (config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.join(__dirname, 'components'),
      lib: path.join(__dirname, 'lib')
    }
    return config
  }
}