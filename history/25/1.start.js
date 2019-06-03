// webpack 内部的核心模块
let {SyncHook} = require('tapable');

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncHook(['name']) // 注册一个同步钩子，有一个参数 name
        }
    }
    // 注册2个事件
    tap() {
        this.hooks.arch.tap('node', function(name) {
            console.log('node', name);
        });
        this.hooks.arch.tap('react', function(name) {
            console.log("react", name);
        });
    }
    // 启动所有事件
    start() {
        this.hooks.arch.call('jw');
    }
    
}

let l = new Lesson();
l.tap(); // 注册事件
l.start(); // 启动钩子