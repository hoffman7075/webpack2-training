const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const less = require('./webpack/less');
const uglifyJS = require('./webpack/js.uglify');

const common = {
    entry: {
        script: './source/index.js',
        style: './source/style.less'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: './js/[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

module.exports = function (env) {
    return merge([
        common,
        less(),
        uglifyJS()
    ]);

    if (env === 'development') {
        return merge([
            common,
            less(),
            devserver()
        ]);
    }
}