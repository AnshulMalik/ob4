var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'build/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
    devtool: 'cheap-module-source-map',
    entry: [
        'whatwg-fetch',
        'webpack-hot-middleware/client',
        path.join(__dirname, '/src/index.js')],
    output: {
        path: path.join(__dirname, '/build/'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader :'babel',
                query: {
                    presets: ['es2015', 'react'],
                    cacheDirectory: '/tmp/'
                }
            },
            {
                test: /\.css?$/,
                loader: 'style.css'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
            'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
module.exports = config;
