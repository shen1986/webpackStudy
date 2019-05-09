/*
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-04-30 12:26:54
 */
// /*
//  * @Description: 主入口
//  * @Author: shenxf
//  * @Date: 2019-04-30 12:26:54
//  */
// console.log("niasd");
// require('./a');

require('./index.css');

require('./index.less');

// let fn = () => {
//     console.log(111);
// }

// fn();

// @log
// class A { // new A() a = 1
//     a = 1;
// }

// let a = new A();
// console.log(a.a);

// function log(target){
//     console.log(target);
// }

// import $ from 'jquery';
// expose-loader 暴露全局的 loader 内联的loader
// pre 前面执行的loader normal 普通loader 内联loader 后置
// console.log($); // 在每个模块中注入$对象
// import $ from 'jquery';
// console.log(window.$);

// 1.expose-loader 暴露到window上
// 2.providePlugin 给每个人提供一个$
// 3.引入不打包

// webpack打包我们的图片
// 1) 在js中创建图片来引入
// 2) 在css引入 background('url')
// 3) <img src="" />

// import logo from './404.png'; // 把图片引入， 返回的结果是一个新的图片
// let image = new Image();
// console.log(logo);
// // image.src = './404.png'; // 就是一个普通的字符串
// image.src = logo; // 引入图片
// document.body.appendChild(image);