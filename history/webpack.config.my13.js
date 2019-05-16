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
  devServer: {
      // 1）
    // proxy: {
    //     '/api': 'http://localhost:3000' // 设置代理
    // }
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     pathRewrite: {'/api': ''} // 把api替换成空  // 重写的方式
    //   }
    // }
    // 2) 通过webpack内置的express
    // before(app){
    //     app.get('/user', (req, res) => {
    //         res.json({name: '小沈架构2'})
    //     });
    // }
    // 3) 有服务端 不用用代理处理 能不能在服务端里面直接运行webpack
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
