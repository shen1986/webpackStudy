<!--
 * @Description: webpack学习笔记
 * @Author: shenxf
 * @Date: 2019-04-28 15:53:24
 -->
# webpackStudy
webpack学习笔记

前提必须先安装：webpack和webpack-cli。而且最好不要全局安装，因为全局安装就会定死一个版本。这样太不灵活了。

## 笔记1

- 可以直接用 `npx webpack` 来运行。

- webpack启动的时候默认会读取文件夹下的 "webpack.config.js", "webpackfile.js"
    + 参照webpack-cli的源码：convert-argv.js里面有写。
- 也可以手动指定webpack的配置文件 --config webpack.config.dev.js
- 手动指定参数的话每次启动都很不方便，可以在package.json里面配置
    + "build": "webpack --config webpack.config.my.js"
- 也可以在运行的时候手动传参
    + `npm run build -- --config webpack.config.my.js`

- webpack-dev-server 会自动帮我们启动一个服务，方便我们进行开发。它不会帮我们打包文件，只会在内存中生成打包文件，这样加载更加的快速。

- 简单webpack例子，每个参数都加了注释
```javascript
let path = require('path');

// 这个插件会帮我打包.html 文件，并且把js文件自动绑定到html的body里面去
let HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack是用node写的，支持所有的node语法
module.exports = {
    devServer: { // 开发服务的配置 webpack-dev-server 启动时会查看这个配置
        port: 3000,    // 指定服务运行的端口号
        progress: true, // 打开进度条
        contentBase: './dist', // 指定启动时参照的目录
        compress: true  // 指定进行压缩
    },
    mode: 'production', // 默认有两种模式 production（生产） development（开发） 设置模式以后运行命令将不会报错
    // 入口指定
    entry: './src/index.js',
    // 出口指定
    output: {
        // 出口的路径指定，必须是绝对路径，所以要用path组件
        path: path.resolve(__dirname, './dist'),
        // 出口文件名指定
        filename: 'bunde.[hash:8].js'// 因为可能会有缓存，所以最好每次生成的文件都有一个hash挫，让每次生成的文件不一样，这个hash挫可以指定位数
    },
    plugins:[ // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html', // 指定模板文件所在的位置
            filename: 'index.html', // 打包后文件的名字
            minify: {               // 配置Html压缩
               removeAttributeQuotes: true, // 删除html中的双引号
               collapseWhitespace: true,    // 变成一行去除space
               
            },
            hash: true                  //引用时加上hash挫
        })
    ]
}
```

## 笔记2

- 要引css的话在.html引入是没有用的，而且webpack也不会帮我们打包，所以我们只能在入口文件里面通过require来引入，但是启动webpack的时候会报错，说不支持css。这是需要引入 css-loader 和 style-loader。

```javascript

  module: {
    // 用来导入模块
    rules: [
      // 规则   css-loader 接续 @import这种语法的
      // style-loader 他是把css 插入到head的标签中
      // loader的特点 希望单一
      // loader的用法 字符串只用一个loader
      // 多个loader需要[]
      // loader的处理顺序默认是从右向左执行 或则 从下到上执行。
      // loader还可以写成 对象方式
      // { test: /\.css$/, use: ['style-loader','css-loader'] }
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            //   option: '' 写成对象的好处是可以设置参数
            options: {
              insertAt: "top" // 指定style插入的位置 这样不会覆盖你自己卸载html中的样式。
            }
          },
          "css-loader"
        ]
      },
      {
        // 可以处理less文件 sass   node-sass sass-loader
        // stylus stylus-loader
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            //   option: '' 写成对象的好处是可以设置参数
            options: {
              insertAt: "top" // 指定style插入的位置 这样不会覆盖你自己卸载html中的样式。
            }
          },
          "css-loader",
          "less-loader" // 把less -> css
        ]
      }
    ]
  }
```

## 笔记3
- 笔记2的方法只能把css样式设置到header里面，使用`mini-css-extract-plugin`能把css样式抽离出来
- 抽离出来以后通过`MiniCssExtractPlugin.loader`给html添加link标签
- 如果想要给动画加上前缀，要引入第三方插件`autoprefixer`,而这个插件要通过`postcss-loader`来导入
- 但是想要把css样式压缩必须配置优化项 
    + 导入`optimize-css-assets-webpack-plugin` 来压缩 css 文件
    + 导入`uglifyjs-webpack-plugin` 来压缩 js 文件
```javascript

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
      new OptimizeCss(), // 压缩css文件
      new UglifyJsPlugin({
        cache: true, // 是否用缓存
        parallel: true, // 并发打包
        sourceMap: true // es6 -> es5 转换时会用到
      })
    ]
  },

  // 中间省略。。。。

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
          //   {   这段代码会把样式放到header里面，如果要抽离css，不能用它
          //     loader: "style-loader",
          //     options: {
          //       insertAt: "top"
          //     }
          //   },
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
```