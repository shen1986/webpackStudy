let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Happypack = require('happypack');
module.exports = {
  mode: "development",
  optimization: {
    // 分割代码块
    splitChunks: {
      // 缓存组
      cacheGroups: {
        common: {
          // 公共的模块
          chunks: "initial",
          minSize: 0,
          minChunks: 2
        },
        vendor: {
          priority: 1, // 权重为1 优先抽离
          test: /node_modules/, // 把node_modules中的代码抽离出来
          chunks: "initial", // 指定入口
          minSize: 0, // 公共代码部分大小超过 0 就抽离
          minChunks: 2 // 入口数量，现在这个webpack 有2个入口所以是2
        }
      }
    }
  },
  entry: {
    index: "./src/index.js",
    other: "./src/other.js"
  },
  devServer: {
    port: 3000,
    open: true,
    contentBase: "./dist"
  },
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve("src"),
        use: "Happypack/loader?id=js"
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new Happypack({
      id: "js",
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
