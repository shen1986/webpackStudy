let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Happypack = require('happypack');
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
                use: 'Happypack/loader?id=js'
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    plugins: [
        new Happypack({
            id: 'js',
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ]
};
