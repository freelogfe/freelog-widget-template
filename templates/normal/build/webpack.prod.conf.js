var webpack = require('webpack')
var merge = require('webpack-merge')

const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: '#source-map',
  performance: {
    hints: false
  },

  module: {
    rules: [
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        use: [
          {{#if enableShadowDom}}{{else}}'style-loader',{{/if}}
          'css-loader',
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less)$/,
        use: [
          {{#if enableShadowDom}}{{else}}'style-loader',{{/if}}
          'css-loader',
          'less-loader',
        ]
      },
    ]
  },

  optimization: {
    concatenateModules: true,
    nodeEnv: 'production',
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
})
