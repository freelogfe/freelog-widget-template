
const webpack = require('webpack')
const path = require('path')
const CWD = process.cwd()

const [ appName, appEntry, appOutputPath ] = [
  'app-react',
  '/Users/wwz/FrontEnd/freelogfe/freelog-examples/packages/app-react/src/index.js',
  '/Users/wwz/FrontEnd/freelogfe/freelog-examples/packages/app-react/dist',
]

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
    extensions: [ '.mjs', '.js', '.jsx','.json', '.wasm' ],
    alias: {
      'react-native': 'react-native-web',
    }
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
        loader: 'babel-loader',
        exclude: /node_modules/
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
    new webpack.HotModuleReplacementPlugin(),
  ]
}