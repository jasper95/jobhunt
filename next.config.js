const path = require('path')

module.exports = {
  webpack (config) {
    config.resolve.modules = [path.join(__dirname, 'src'), ...config.resolve.modules]
    return config
  }
}