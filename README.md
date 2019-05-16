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
              insertAt: "top" // 指定style插入的位置 这样不会覆盖你自己写在html中的样式。
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
              insertAt: "top" // 指定style插入的位置 这样不会覆盖你自己写在html中的样式。
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
    + postcss-loader 是通过 postcss.config.js 这里文件里面配置来运行来的
    ```javascript
    // postcss.config.js例子
    module.exports = {
        plugins: [
            require('precss'),
            require('autoprefixer')
        ] // 导入加前缀的插件
    }
    ```
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

## 笔记4
- 使用babel把 es6 转化为 es5
- `npm i babel-loader @babel/core @babel/preset-env -D`
- @babel/preset-env 就是用来转换所有语法的。
- `npm i @babel/plugin-proposal-class-properties -D`用来支持es7的class语法
- `decorators-legacy` 用来支持装饰器
- 东西太多了，想用什么就去babel官网上查找。 [babeljs](https://babeljs.io) `@babel/plugin-proposal-decorators`
```javascript

/*
 * @Description: webpack配置
 * @Author: shenxf
 * @Date: 2019-04-30 12:26:38
 */
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            // 用babel-loader 需要把es6-es5
            presets: [
              // 预设置，用来配置插件库 ，大插件的配置
              "@babel/preset-env"
            ],
            plugins: [
              // 小插件在这里配置
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
          }
        }
      }
```

## 笔记5
- `@babel/plugin-transform-runtime` 支持promise以及yield等高级的函数
- 需要组合`@babel/runtime`一起使用。 不能-D
- 如果用到更高级的语法要安装 `@babel/polyfill` 不能-D
- 用`eslint`来校验代码是否规范 [eslint](https://eslint.org)
```javascript
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
        include: path.resolve(__dirname, 'src'), // 找哪个文件夹下面的代码
        exclude: /node_modules/  // 必须排除掉不然会报错。
      },


    {
        test: /\.js$/,
        use: {
            loader: "eslint-loader",
            options: {
                enforce:'pre' // 强制最先执行 post-最后执行
            }
        }
    },
```

## 笔记6
- 第三方插件的使用
- 1.expose-loader 暴露到window上
- 2.providePlugin 给每个人提供一个$
- 3.引入不打包
```javascript
// 通过expose-loader暴露给全局
import $ from 'expose-loader?$jquery';
console.log(window.$);

// 在rule里面配置jquery暴露给全局
{
test: require.resolve("jquery"), // 当代码里面require了jquery
use: "expose-loader?$" // 在这里写内联的暴露给全局
},

// 使用providePlugin，自动把jquery注入到所有模块
new webpack.ProvidePlugin({
    // 提供插件，自动把jquery注入到所有模块
    $: "jquery"
})

// 在主html中加入cdn连接
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
console.log(window.$);

// 但是这样的话就不需要打包下面这段代码，所有需要在webpack里面配置忽略打包，不import也不会打包
import $ from 'jquery';

externals: { // 这个模块是外部导入的它并不需要被打包。
    jquery:'$'
},
```

## 笔记7
- 图片处理
- `npm i file-loader -D` 用来load图片。
    + file-loader 默认会在内部生成一张图片 到build目录下
    + 把生成的图片的名字返回回来
- `npm i html-withimg-loader -D`
    + 解决在html里面直接引用图片
- `npm i url-loader -D` 
    + 在图片引用之前，把图片变成base64码。
    + 可以做一个限制，当我们的图片小于多少k的时候 用base64来转化，大于的时候直接用file-loader来解析。

```javascript
// webpack打包我们的图片
// 1) 在js中创建图片来引入
// 2) 在css引入 background('url')
// 3) <img src="" />

import logo from './404.png'; // 把图片引入， 返回的结果是一个新的图片
let image = new Image();
console.log(logo);
// image.src = './404.png'; // 就是一个普通的字符串
image.src = logo; // 引入图片
document.body.appendChild(image);

      {
        test: /\.html$/, // 用来解析在html中的图片
        use: "html-withimg-loader"
      },


      {
          test: /\.(png|jpg|gif)$/, // 用来解析图片
          use: 'file-loader'
      },

      
      {
          test: /\.(png|jpg|gif)$/, // 用来解析图片
          use: {
            loader: 'url-loader',
            options: {
                limit: 1 // 200k大小限制
            }
          }
      },
```

## 笔记8
- 文件压缩好后怎么分类放在不同的文件夹下。
    + 通过自`options`里面指定`outputPath`
    + plugin的filename 里面加上文件夹路径
```javascript
    {
        test: /\.(png|jpg|gif)$/,
        use: {
        loader: 'url-loader',
        options: {
            limit: 1,
            outputPath: '/img/', // 输出的路径
            }
        }
    }

    new MiniCssExtractPlugin({
    //   filename: "main.css"
        filename: 'css/main.css' // 把css放到css目录下
    }),
```

- 怎么在所有资源前面加上一个域名（cdn服务器）
    + 在全局配置里面加上`outputPath`
```javascript
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bunde.[hash:8].js",
    publicPath: 'http://www.shenxf.com/' // 统一的在资源头上加上这个字符串,最后一个斜杠要加
  },
```

- 只对某一种资源局部加上域名
```javascript
    {
        test: /\.(png|jpg|gif)$/,
        use: {
        loader: 'url-loader',
        options: {
            limit: 1,
            outputPath: '/img/',
            // 对某一个样式实现cdn
            publicPath: 'http://www.shenxf.com' // 写在这里只处理图片的路径
            }
        }
    }
```


## 笔记9
- 多页应用

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: "development",
  // 多入口,写成对象的形式
  entry: {
    home: "./src/index.js",
    other: "./src/other.js"
  },
  output: {
    // [name] home , other
    filename: "[name].js", // 文件名根据入口名字决定，不这么写会报错
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "home.html",
      chunks: ["home"] // 指定装哪个js文件
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "other.html",
      chunks: ["other",'home']  // 指定装哪个js文件
    })
  ]
};
```

## 笔记10
- webpack中的sourceMap
    + 源码映射 方便调试用，可以找到源码中那个位置有问题。
```javascript
  // 1) 源码映射 会单独生成一个sourceMap文件，出错了 会标识 当前报错的列和行 大而全 是独立的
  devtool: "source-map", // 增加映射文件可以帮我们调试源代码
  // 2) 不会产生单独的文件，但是可以显示列和行
  devtool: 'eval-source-map',
  // 3) 不会产生列 但是是一个单独的映射文件
  devtool: 'cheap-module-source-map', // 产生后你可以保留起来
  // 4) 不会产生文件 继承在打包后的文件中 不会产生列
  devtool: 'cheap-module-eval-source-map',
```

## 笔记11
- 实时打包

```javascript
  watch: true, // 监视文件夹变动， 有变动重新打包
  watchOptions: {
    // 监控的选项
    poll: 1000, // 每秒问我1000次
    aggregateTimeout: 500, // 防抖 我一直输入代码
    ignored: /node_modules/ // 忽略某个文件夹
  },
```

## 笔记12
- webpack 小插件应用

```javascript
// 1） cleanWebpackPlugin // 每次清除dist目录再生成编译后文件
const CleanWepackPlugin = require('clean-webpack-plugin');
// 2)  copyWebpackPlugin  // 赋值某个文件到dist目录中去
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 3)  bannerPlugin 内置  // 版权声明插件
const webpack = require('webpack');

  plugins: [
    new CleanWepackPlugin({
      cleanOnceBeforeBuildPatterns: "./dist" // 生成文件之前先删除
    }),
    new CopyWebpackPlugin([
      { from: "./doc", to: "./" } // 从doc目录复制到dist目录
    ]),
    new webpack.BannerPlugin('make 2019 by shenxf') // 版权说明
  ]

```

## 笔记13
- 跨域问题
    1. 通过代理来运行服务端程序
    ```javascript
     // 设置方法1
     proxy: {
         '/api': 'http://localhost:3000' // 设置代理
     }
     // 设置方法2
     proxy: {
       "/api": {
         target: "http://localhost:3000",
         pathRewrite: {'/api': ''} // 把api替换成空  // 重写的方式
       }
     }
    ```
    2. 通过webpack内置的express
    ```javascript
    devServer: {
        before(app){
            app.get('/user', (req, res) => {
                res.json({name: '小沈架构2'})
            });
        }
    },
    ```
    3. 有服务端 不用用代理处理 能不能在服务端里面直接运行webpack
    - 需要安装中间件 `npm i webpack-dev-middleware -D`
    - 这个时候只要运行服务端就可以，不需要运行 webpack-dev-server
    ```javascript
    let express = require('express');
    let app = express();
    let webpack = require('webpack');

    // 中间件
    let middle = require('webpack-dev-middleware');

    let config = require('./webpack.config.my');

    let compiler = webpack(config);

    app.use(middle(compiler));

    app.get('/user', (req, res) => {
        res.json({name: '小沈架构1'})
    });

    app.listen(3000, function(){
        console.log('3000端口已经启动了！');
    })
    ```