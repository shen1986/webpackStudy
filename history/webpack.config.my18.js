let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        noParse: /jquery/,
        rules: [
            {
                test:/\.js$/, 
                exclude: /node_modules/,  // 排除某个包
                include: path.resolve('src'), // 只看这个包里面是否满足规则
                use: {
                    loader: 'baber-loader',
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
        path: path.resolve()
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.IgnorePlugin(/\.\/local/,/moment/),
    ]
};
