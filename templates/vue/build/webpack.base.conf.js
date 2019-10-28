var path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const pkg = require(path.join(__dirname, '../package.json'))
const config = require('../config')
var cssLoaders = function (options) {
  options = options || {}
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

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
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader'
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
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
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
              limit: 4096,
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
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}
