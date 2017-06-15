const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const common = {
    entry: {
        script: './source/index.js',
        style: './source/style.less'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './js/[name].js'
    },
    module: {
        rules: [{
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {loader: "css-loader", options: { importLoaders: 1 } }, "less-loader"
                    ]
                })
            }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './css/[name].css'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

const developmentConfig = {
    devServer: {
        stats: "errors-only",
        port: 9000
    }
}

module.exports = function (env) {
    if (env === 'production') {
        return common;
    }
    if (env === 'development') {
        return Object.assign(
            {},
            common,
            developmentConfig
        )
    }
}