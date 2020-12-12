const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

const path = require('path')
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0


module.exports = {
  
  outputDir: path.resolve(__dirname, "../dist/public"),
  configureWebpack: {
    
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    }),
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