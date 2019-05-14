const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 1） cleanWebpackPlugin // 每次清除dist目录再生成编译后文件
const CleanWepackPlugin = require('clean-webpack-plugin');
// 2)  copyWebpackPlugin  // 赋值某个文件到dist目录中去
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 3)  bannerPlugin 内置  // 版权声明插件
const webpack = require('webpack');
module.exports = {
  mode: "production",
  entry: {
    home: "./src/index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new CleanWepackPlugin({
      cleanOnceBeforeBuildPatterns: "./dist" // 生成文件之前先删除
    }),
    new CopyWebpackPlugin([
      { from: "./doc", to: "./" } // 从doc目录复制到dist目录
    ]),
    new webpack.BannerPlugin('make 2019 by shenxf') // 版权说明
  ]
};
