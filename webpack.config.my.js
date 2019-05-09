/*
 * @Description: webpack配置
 * @Author: shenxf
 * @Date: 2019-04-30 12:26:38
 */
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let OptimizeCss = require("optimize-css-assets-webpack-plugin");
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let webpack = require('webpack');

module.exports = {
  optimization: {
    minimizer: [
      new OptimizeCss(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bunde.[hash:8].js",
    // publicPath: 'http://www.shenxf.com/' // 统一的在资源头上加上这个字符串,最后一个斜杠要加
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
    //   filename: "main.css"
        filename: 'css/main.css' // 把css放到css目录下
    }),
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ],
  externals: {
    jquery: "$"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
                limit: 1,
                outputPath: '/img/', // 输出的路径
                // 对某一个样式实现cdn
                publicPath: 'http://www.shenxf.com' // 写在这里只处理图片的路径
            }
          }
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader"
        ]
      }
    ]
  }
};
