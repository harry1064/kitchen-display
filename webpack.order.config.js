/**
 * Created by quintotechnologiespvtltd on 01/02/18.
 */
const path = require('path')
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const PATHS = {
    app: path.resolve(__dirname, 'OrderFrontEnd'),
    build: path.resolve(__dirname, 'Public/js')
};

module.exports = {
    entry: {
        app: PATHS.app + '/index.js'
    },
    // devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: PATHS.build
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.order.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader? limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MinifyPlugin()
    ]
}
