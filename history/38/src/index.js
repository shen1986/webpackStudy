console.log('hello');
// 在最前面加上 -！ 那么 pre 和 normal 就不会执行了。
// 在最前面加上 ！ 那么 normal 就不会执行了。
// 在最前面加上 ！！ ， 那么 什么都不会执行。
require('!!inline-loader!./a.js');

// loader 是由2部分组成 一个是pitch 另一个是normal，有个阻断的功能。