/*
 * @Description: webpack配置
 * @Author: shenxf
 * @Date: 2019-04-30 12:26:38
 */
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
// 抽离css样式
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 用来压缩分离出来的css样式
let OptimizeCss =  require('optimize-css-assets-webpack-plugin');
// 用来压缩js
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  optimization: {
    // 优化项
    minimizer: [
      new OptimizeCss(),
      new UglifyJsPlugin({
        cache: true, // 是否用缓存
        parallel: true, // 并发打包
        sourceMap: true // es6 -> es5 转换时会用到
      })
    ]
  },
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bunde.[hash:8].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "main.css" // 抽离出来样式的名字
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 创建link标签
          "css-loader",
          "postcss-loader" // 给style式样加上前缀
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 创建link标签, 名字一样是抽离成一个css文件，如果想不一样就要require多次，且要报名字定义成不一样
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader"
        ]
      }
    ]
  }
};
