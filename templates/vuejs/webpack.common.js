const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        // app: './src/index.js',
        app: './src/index.js',
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'raw-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'raw-loader',
                    },
                    {
                        loader: "less-loader",
                    },
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
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ],
    },
};
