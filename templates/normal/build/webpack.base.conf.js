var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const pkg = require(path.join(__dirname, '../package.json'))
const config = require('../config')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/app/index.js')
  },
  output: {
    path: config.build.assetsRoot,
    filename: `${pkg.name}.js`
  },
  module: {
    rules: [
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      /* config.module.rule('html') */
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true,
            collapseWhitespace: false
          }
        }],
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        use: [
          {{#if enableShadowDom}}{{else}}'style-loader',{{/if}}
          'css-loader'
        ],
      },
      /* config.module.rule('less') */
      {
        test: /\.less/,
        use: [
          {{#if enableShadowDom}}{{else}}'style-loader',{{/if}}
          'css-loader',
          'less-loader'
        ],
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'public/fonts/[name].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'public/img/[name].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'public/img/[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
  ]
}
