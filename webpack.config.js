var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.join(__dirname, 'web/js'),
        filename: "main.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    resolve: {
        alias: {
            jquery: 'jquery/dist/jquery',
            'jquery-u': 'jquery-ui/jquery-ui.js',
            modules: path.join(__dirname, 'node_modules'),
        }
    }
};
