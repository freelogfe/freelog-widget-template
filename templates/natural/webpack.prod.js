const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    entry: {},
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        // options: {
                        //     minimize: true,
                        //     sourceMap: true,
                        // }
                    }
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*']}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
});