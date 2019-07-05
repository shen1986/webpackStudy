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
  },
  devtool: "source-map",
  watch: true,
  module: {
    rules: [
        {
            test: /\.less/,
            use: ['style-loader','css-loader','less-loader']
        },
        {
            test: /\.jpg$/,
            // 根据图片生成一个MD5挫 发射到dist目录下，file-loader返回当前的路径。
            // use: 'file-loader'
            // 会处理路径
            use: {
                loader: 'url-loader',
                options: {
                    limit: 200*1024
                }
            }
        },
      {
        test: /\.js$/,
        use: {
          loader: "banner-loader",
          options: {
            text: "小沈学习1",
            filename: path.resolve(__dirname, "./src/banner.js")
          }
        }
      }
    ]
  }
};
