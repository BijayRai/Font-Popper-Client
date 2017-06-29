const webpack = require('webpack')
const USE_PREFETCH = process.env.NODE_ENV !== 'test'
module.exports = {
  webpack: (config, { dev }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.USE_PREFETCH': JSON.stringify(USE_PREFETCH)
      })
    )

    return config
  }
}
