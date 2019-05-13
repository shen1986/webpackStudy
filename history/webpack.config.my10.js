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
  // 1) 源码映射 会单独生成一个sourceMap文件，出错了 会标识 当前报错的列和行 大而全 是独立的
//   devtool: "source-map", // 增加映射文件可以帮我们调试源代码
  // 2) 不会产生单独的文件，但是可以显示列和行
//   devtool: 'eval-source-map',
  // 3) 不会产生列 但是是一个单独的映射文件
//   devtool: 'cheap-module-source-map', // 产生后你可以保留起来
  // 4) 不会产生文件 继承在打包后的文件中 不会产生列
  devtool: 'cheap-module-eval-source-map',
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
