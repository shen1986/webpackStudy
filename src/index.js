/*
 * @Description: 主入口
 * @Author: shenxf
 * @Date: 2019-04-30 12:26:54
 */
console.log("niasd");
require('./a');

require('./index.css');

require('./index.less');

let fn = () => {
    console.log(111);
}

fn();

@log
class A { // new A() a = 1
    a = 1;
}

let a = new A();
console.log(a.a);

function log(target){
    console.log(target);
}