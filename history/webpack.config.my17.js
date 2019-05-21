let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        noParse: /jquery/, // 不去解析这个包中有没有别的依赖（单独的模块用这个可以提高编译速度）
        rules: [
            {test:/\.js$/, use: {
                loader: 'baber-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            }}
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve()
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};
