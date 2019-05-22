let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    module: {
        noParse: /jquery/,
        rules: [
            {
                test:/\.js$/, 
                exclude: /node_modules/,
                include: path.resolve('src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.IgnorePlugin(/\.\/local/, /moment/), // 排除moment 里面的 ./local 这个包
    ]
};
