const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0


module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      }),
      new webpack.DefinePlugin({
        'process.env': {
            PACKAGE_VERSION: '"' + version + '"',
            NODE_ENV: 'development'
        }
    })
    ]
  },
  pwa: {
    name: 'Vue Argon Dashboard',
    themeColor: '#172b4d',
    msTileColor: '#172b4d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#172b4d'
  },
  css: {
    // Enable CSS source maps.
    sourceMap:isProd
  }
};