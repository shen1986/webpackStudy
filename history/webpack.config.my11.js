const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  watch: true, // 监视文件夹变动， 有变动重新打包
  watchOptions: {
    // 监控的选项
    poll: 1000, // 每秒问我1000次
    aggregateTimeout: 500, // 防抖 我一直输入代码
    ignored: /node_modules/ // 忽略某个文件夹
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    })
  ]
};
