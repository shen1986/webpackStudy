let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  devServer: {
    port: 3000,
    open: true,
    contentBase: "./dist",
    hot: true // 开启热更新
  },
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve("src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-syntax-dynamic-import"]
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: "boundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.NamedModulesPlugin(), // 打印更新的模块路劲
    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ]
};
