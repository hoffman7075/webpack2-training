/**
 * Created by user on 16.06.2017.
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(paths) {
    return {
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
            })
        ]
    };
};