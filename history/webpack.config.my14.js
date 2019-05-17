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
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
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
  resolve: {
    // 解析 第三方包 common
    modules: [path.resolve("node_modules")], // 就在当前目录找。
    // alias: {
    //   // 别名
    //   bootstrap: "bootstrap/dist/css/bootstrap.css"
    // }

    mainFields: ["style", "main"], // 先找style 再找 main
    // mainFiles: [] // 入口文件的名字 index.js
    extensions: [".css", ".js", ".json"] // 当没写扩展名的时候，自动添加扩展名
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    })
  ]
};
