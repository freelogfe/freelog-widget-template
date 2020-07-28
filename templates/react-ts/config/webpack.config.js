
const path = require('path')
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')
const CWD = process.cwd()
const appName = require(path.join(CWD, 'package.json')).name
const [ appEntry, appOutputPath ] = [ path.join(CWD, 'src/index.js'), path.join(CWD, 'dist') ]

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  entry: `${appEntry}`, 
  output: {
    path: `${appOutputPath}`,
    filename: `${appName}.js`,
    publicPath: '/',
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx','.json' ],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
          }
        }],
      },
      {
        test: /\.m?jsx?$/,
        enforce: 'pre',
        use: [ 'babel-loader', ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        exclude: /node-modules/,
        use: [  'awesome-typescript-loader' ]
      },
      {
        test: /\.((c|sa|sc|le)ss)$/i,
        use: [ 
          'style-loader', 
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                name: 'assets/fonts/[name].[ext]'
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                name: 'assets/images/[name].[ext]'
              }
            }
          }
        ]
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'assets/media/[name].[ext]'
                }
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
