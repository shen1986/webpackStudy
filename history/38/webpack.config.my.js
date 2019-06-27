let path = require('path');
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "dist")
  },
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")]
    // // 别名
    // alias: {
    //   loader1: path.resolve(__dirname, "loaders", "loader1.js")
    // }
  },
  module: {
    rules: [
      // 以数组的方式配置多个loader 执行循序从右向左
      //   {
      //     test: /\.js$/,
      //     use: ['loader1', 'loader2', 'loader3']
      //   }
      // 以多个对象的方式来执行loader，顺序是从下到上
      //   {
      //     test: /\.js$/,
      //     use: {
      //       loader: "loader1"
      //     }
      //   },
      //   {
      //     test: /\.js$/,
      //     use: {
      //       loader: "loader2"
      //     }
      //   },
      //   {
      //     test: /\.js$/,
      //     use: {
      //       loader: "loader3"
      //     }
      //   }
      // loader 的分配 pre -> normal -> inline -> post
      {
        test: /\.js$/,
        use: {
          loader: "loader1"
        },
        enforce: "pre"
      },
      {
        test: /\.js$/,
        use: {
          loader: "loader2"
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: "loader3"
        },
        enforce: "post"
      }
    ]
  }
};
